using Azure;
using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Wordprocessing;
using PROMPERU.BE;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;
using ServiceExterno;
using System.Collections.Generic;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Xml.Linq;
using static PROMPERU.BE.MaestrosBE;

namespace PROMPERU.BL
{
    public class TestBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly CursoDA _cursoDA;
        private readonly InscripcionDA _inscripcionDA;
        private readonly PreguntaDA _preguntaDA;
        private readonly PreguntaCursoDA _preguntaCursoDA;
        private readonly RespuestaDA _respuestaDA;
        private readonly PortadaTestDA _portadaTestDA;
        private readonly ContenidoTestDA _contenidoTestDA;
        private readonly FormularioTestDA _formularioTestDA;
        private readonly InscripcionBL _inscripcionBL;
        private readonly SunatService _sunatService;
        private readonly TestDA _testDA;

        // Constructor con inyección de dependencias
        public TestBL(CursoDA cursoDA , InscripcionDA inscripcionDA, PortadaTestDA portadaTestDA, ContenidoTestDA contenidoTestDA, FormularioTestDA formularioTestDA, PreguntaDA preguntaDA, RespuestaDA respuestaDA, PreguntaCursoDA preguntaCursoDA, TestDA testDA, InscripcionBL inscripcionBL, SunatService sunatService)
        {
            _cursoDA = cursoDA;
            _inscripcionDA = inscripcionDA;
            _portadaTestDA = portadaTestDA;
            _contenidoTestDA = contenidoTestDA;
            _formularioTestDA = formularioTestDA;
            _preguntaDA = preguntaDA;
            _respuestaDA = respuestaDA;
            _preguntaCursoDA = preguntaCursoDA;
            _inscripcionBL = inscripcionBL;
            _testDA = testDA;
            _inscripcionBL = inscripcionBL;
            _sunatService = sunatService;
        }
        public async Task<List<EtapaBE>> ListarTestAsync()
        {
            try
            {       
                var ListadoTest = await _testDA.ListarTestsAsync();               
                return ListadoTest;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Maestros", ex);
            }
        }
        public async Task<List<MaestrosBE>> ListarMaestrosAsync()
        {
            try
            {
                var listado = new List<MaestrosBE>();

                var cursos = await _cursoDA.ListarCursosAsync();               
                var inscripcions = await _inscripcionDA.ListarInscripcionsAsync();
                // solo se debe mostrar Test disponibles
                var ListadoTest = await _testDA.ListarTestsAsync();
                var etapas = inscripcions
                   .Where(x => x.Insc_Orden > 0)
                   .Select(e => new EtapaBE
                   {
                       ID = e.Insc_ID,
                       Paso = e.Insc_Paso,
                       Titulo = e.Insc_TituloPaso,
                       UrlIcono = e.Insc_URLImagen
                   })
                   .Where(y => !ListadoTest.Any(t => t.ID == y.ID)) // Excluye elementos que ya están en listadoTest
                   .ToList();

                var test = new MaestrosBE()
                {
                    Cursos = cursos, 
                    Etapas = etapas
                };

                listado.Add(test);

                return listado;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Maestros", ex);
            }
        }
        public async Task<TestModelDto> CrearTestAsync(TestModelDto testModel, string usuario, string ip)
        {
            if (testModel == null) throw new ArgumentNullException(nameof(testModel));

            try
            {
                var tasks = new List<Task>();

                // Insertar Portada Principal si existe
                if (testModel.HasInstructions && testModel.Instructions != null)
                {
                    var portada = new PortadaTestBE
                    {
                        Insc_ID = testModel.TestType?.Value ?? 0,
                        Ptes_Titulo = testModel.Instructions.Title,
                        Ptes_Descripcion = testModel.Instructions.Description,
                        Ptes_NombreBoton = testModel.Instructions.ButtonText,
                        Ptes_UrlIconoBoton = testModel.Instructions.ButtonIcon,
                        Ptes_MensajeAlert = testModel.Instructions.Alert,
                        Ptes_UrlIconoAlrt = testModel.Instructions.AlertIcon
                    };

                    tasks.Add(_portadaTestDA.InsertarPortadaTestAsync(portada, usuario, ip));
                }

                // Validar elementos antes de iterar
                if (testModel.Elements?.Count > 0)
                {
                    foreach (var e in testModel.Elements)
                    {
                        if (e.Type == "question")
                        {
                            // Insertar Pregunta
                            var pregunta = new PreguntaBE
                            {
                                Insc_ID = testModel.TestType?.Value ?? 0,
                                Preg_NumeroPregunta = e.Order,
                                Preg_TextoPregunta = e.QuestionText ?? string.Empty,
                                Preg_EsComputable = e.IsComputable ?? false,
                                Preg_Etiqueta = e.Label ?? string.Empty,
                                Preg_TipoRespuesta = e.AnswerType ?? string.Empty,
                                Preg_Categoria = e.Category ?? string.Empty,
                                Curs_ID = (e.IsComputable == true && e.Course?.Value > 0) ? e.Course.Value : 0
                            };

                            var preguntaID = await _preguntaDA.InsertarPreguntaAsync(pregunta, usuario, ip);

                            // Insertar Respuestas en paralelo si existen
                            if (e.Answers?.Count > 0)
                            {
                                tasks.AddRange(e.Answers.Select(resp =>
                                    _respuestaDA.InsertarRespuestaAsync(new RespuestaBE
                                    {
                                        Preg_ID = preguntaID,
                                        Resp_Orden = resp.Order,
                                        Resp_Respuesta = resp.Text ?? string.Empty,
                                        Resp_Valor = resp.Value
                                    }, usuario, ip)));
                            }
                        }

                        // Insertar Contenido si tiene título o descripción
                        if (!string.IsNullOrEmpty(e.Title) || !string.IsNullOrEmpty(e.Description))
                        {
                            var contenido = new ContenidoTestBE
                            {
                                Insc_ID = testModel.TestType?.Value ?? 0,
                                Ctes_Orden = e.Order,
                                Ctes_Titulo = e.Title,
                                Ctes_Descripcion = e.Description
                            };

                            tasks.Add(_contenidoTestDA.InsertarContenidoTestAsync(contenido, usuario, ip));
                        }

                        // Insertar Formulario si existe
                        if (e.SelectedForm != null)
                        {
                            var formulario = new FormularioTestBE
                            {
                                Insc_ID = testModel.TestType?.Value ?? 0,
                                Ftes_Orden = e.Order,
                                Ftes_Texto = e.SelectedForm.Label,
                                Ftes_Valor = e.SelectedForm.Value
                            };

                            tasks.Add(_formularioTestDA.InsertarFormularioTestAsync(formulario, usuario, ip));
                        }
                    }
                }

                // Esperar todas las inserciones en paralelo
                await Task.WhenAll(tasks);

                return testModel;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear el test", ex);
            }
        }
        public async Task<bool> ActualizarTestAsync(TestModelDto testModel, string usuario, string ip, int id)
        {
            try
            {
                var tareas = new List<Task>();
                // Eliminar registros previos antes de actualizar o insertar
                await _testDA.EliminarTestAsync(usuario, ip, testModel.TestType.Value);

                int preguntaID = 0;

                // Actualizar o insertar la portada principal
                if (testModel.HasInstructions && testModel.Instructions != null)
                {
                    var portada = new PortadaTestBE
                    {
                        Ptes_ID = testModel.Instructions.ID ?? 0,
                        Insc_ID = testModel.TestType?.Value ?? 0,
                        Ptes_Titulo = testModel.Instructions.Title,
                        Ptes_Descripcion = testModel.Instructions.Description,
                        Ptes_NombreBoton = testModel.Instructions.ButtonText,
                        Ptes_UrlIconoBoton = testModel.Instructions.ButtonIcon,
                        Ptes_MensajeAlert = testModel.Instructions.Alert,
                        Ptes_UrlIconoAlrt = testModel.Instructions.AlertIcon
                    };

                    tareas.Add(portada.Ptes_ID > 0
                                       ? _portadaTestDA.ActualizarPortadaTestAsync(portada, usuario, ip, portada.Ptes_ID)
                                       : _portadaTestDA.InsertarPortadaTestAsync(portada, usuario, ip));
                }

                // Validar elementos antes de procesarlos
                if (testModel.Elements?.Count > 0)
                {
              

                    foreach (var e in testModel.Elements)
                    {
                        if (e.Type == "question")
                        {
                            // Insertar o actualizar pregunta
                            var pregunta = new PreguntaBE
                            {
                                ID = e.ID ?? 0,
                                Insc_ID = testModel.TestType?.Value ?? 0,
                                Preg_NumeroPregunta = e.Order,
                                Preg_TextoPregunta = e.QuestionText ?? string.Empty,
                                Preg_EsComputable = e.IsComputable ?? false,
                                Preg_Etiqueta = e.Label ?? string.Empty,
                                Preg_TipoRespuesta = e.AnswerType ?? string.Empty,
                                Preg_Categoria = e.Category ?? string.Empty,
                                Curs_ID = (e.IsComputable == true && e.Course?.Value > 0) ? e.Course.Value : 0
                            };

                            if (pregunta.ID > 0)
                                tareas.Add(_preguntaDA.ActualizarPreguntaAsync(pregunta, usuario, ip, pregunta.ID));
                            else
                                preguntaID = await _preguntaDA.InsertarPreguntaAsync(pregunta, usuario, ip);


                            // Insertar respuestas si existen
                            if (e.Answers?.Count > 0)
                            {
                                foreach (var resp in e.Answers)
                                {
                                    var respuesta = new RespuestaBE
                                    {
                                        ID = resp.ID ?? 0,
                                        Preg_ID = pregunta.ID > 0 ? pregunta.ID : preguntaID,
                                        Resp_Orden = resp.Order,
                                        Resp_Respuesta = resp.Text ?? string.Empty,
                                        Resp_Valor = resp.Value
                                    };

                                    tareas.Add(respuesta.ID > 0
                                        ? _respuestaDA.ActualizarRespuestaAsync(respuesta, usuario, ip, respuesta.ID)
                                        : _respuestaDA.InsertarRespuestaAsync(respuesta, usuario, ip));
                                }
                            }
                        }

                        // Insertar o actualizar contenido
                        if (!string.IsNullOrEmpty(e.Title) || !string.IsNullOrEmpty(e.Description))
                        {
                            var contenido = new ContenidoTestBE
                            {
                                Ctes_ID = e.ID ?? 0,
                                Insc_ID = testModel.TestType?.Value ?? 0,
                                Ctes_Orden = e.Order,
                                Ctes_Titulo = e.Title,
                                Ctes_Descripcion = e.Description
                            };

                            tareas.Add(contenido.Ctes_ID > 0
                                ? _contenidoTestDA.ActualizarContenidoTestAsync(contenido, usuario, ip, contenido.Ctes_ID)
                                : _contenidoTestDA.InsertarContenidoTestAsync(contenido, usuario, ip));
                        }

                        // Insertar o actualizar formulario
                        if (e.SelectedForm != null)
                        {
                            var formulario = new FormularioTestBE
                            {
                                Ftes_ID = e.SelectedForm.ID ?? 0,
                                Insc_ID = testModel.TestType?.Value ?? 0,
                                Ftes_Orden = e.Order,
                                Ftes_Texto = e.SelectedForm.Label,
                                Ftes_Valor = e.SelectedForm.Value
                            };

                            tareas.Add(formulario.Ftes_ID > 0
                                ? _formularioTestDA.ActualizarFormularioTestAsync(formulario, usuario, ip, formulario.Ftes_ID)
                                : _formularioTestDA.InsertarFormularioTestAsync(formulario, usuario, ip));
                        }
                    }

                    await Task.WhenAll(tareas);
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Requisito", ex);
            }
        }
        public async Task<TestModelDto> ObtenerTestPorIdAsync(int Id)
        {
            try
            {
                var test = new TestModelDto
                {
                    Elements = new List<Elements>() // Inicializar la lista
                };

                // Obtener datos en paralelo
                var inscripcionsTask = _inscripcionDA.ListarInscripcionsAsync();
                var portadaTestTask = _portadaTestDA.ListarPortadaTestsAsync();
                var preguntaTestTask = _preguntaDA.ListarPreguntasAsync();
                var respuestaTestTask = _respuestaDA.ListarRespuestasAsync();
                var contenidoTestTask = _contenidoTestDA.ListarContenidoTestsAsync();
                var formularioTestTask = _formularioTestDA.ListarFormularioTestsAsync();

                await Task.WhenAll(inscripcionsTask, portadaTestTask, preguntaTestTask, respuestaTestTask, contenidoTestTask, formularioTestTask);

                // Obtener datos de las tareas
                var inscripcions = inscripcionsTask.Result ?? new List<InscripcionBE>();
                var portadaTes = portadaTestTask.Result ?? new List<PortadaTestBE>();
                var preguntaTest = preguntaTestTask.Result ?? new List<PreguntaBE>();
                var respuestaTest = respuestaTestTask.Result ?? new List<RespuestaBE>();
                var contenidoTest = contenidoTestTask.Result ?? new List<ContenidoTestBE>();
                var formularioTest = formularioTestTask.Result ?? new List<FormularioTestBE>();

                // Obtener etapas del test
                test.TestType = inscripcions
                    .Where(x => x.Insc_Orden > 0 && x.Insc_ID == Id)
                    .Select(e => new TestType { Value = e.Insc_ID, Label = e.Insc_TituloPaso })
                    .FirstOrDefault() ?? new TestType();

                // Obtener portada

                var instruction = portadaTes?
                   .Where(x => x.Insc_ID == Id)
                   .Select(e => new Instructions
                   {
                       ID = e.Ptes_ID,
                       Title = e.Ptes_Titulo,
                       Description = e.Ptes_Descripcion,
                       Alert = e.Ptes_MensajeAlert,
                       AlertIcon = e.Ptes_UrlIconoAlrt,
                       ButtonText = e.Ptes_NombreBoton,
                       ButtonIcon = e.Ptes_UrlIconoBoton
                   })
                   .FirstOrDefault();

                test.Instructions = instruction?.ID > 0 ? instruction : null;
                test.HasInstructions = test.Instructions != null;


                // Agregar preguntas
                test.Elements.AddRange(
                    preguntaTest
                        .Where(x => x.Insc_ID == Id)
                        .Select(p => new Elements
                        {
                            ID = p.ID,
                            Order = p.Preg_NumeroPregunta,
                            Type = "question",
                            QuestionText = p.Preg_TextoPregunta,
                            IsComputable = p.Preg_EsComputable,
                            Label=p.Preg_Etiqueta,
                            Category = p.Preg_Categoria,
                            AnswerType = p.Preg_TipoRespuesta,
                            Course = (bool)p.Preg_EsComputable ? new Course
                            {
                                Value = p.Curs_ID,
                                Label = p.Curs_Nombre_Curso
                            } : null,
                            Answers = respuestaTest
                                .Where(r => r.Preg_ID == p.ID)
                                .Select(r => new Answer
                                {
                                    ID = r.ID,
                                    Order = r.Resp_Orden,
                                    Text = r.Resp_Respuesta,
                                    Value = r.Resp_Valor
                                })
                                .ToList()
                        })
                );

                // Agregar contenido
                test.Elements.AddRange(
                    contenidoTest
                        .Where(x => x.Insc_ID == Id)
                        .Select(e => new Elements
                        {
                            ID = e.Ctes_ID,
                            Order = e.Ctes_Orden,
                            Type = "cover",
                            Title = e.Ctes_Titulo,
                            Description = e.Ctes_Descripcion
                        })
                );

                // Agregar formularios
                test.Elements.AddRange(
                    formularioTest
                        .Where(x => x.Insc_ID == Id)
                        .Select(e => new Elements
                        {
                            ID= e.Ftes_ID,
                            Order = e.Ftes_Orden,
                            Type = "form",
                            SelectedForm = new SelectedForm
                            {                           
                                ID = e.Ftes_ID,
                                Label = e.Ftes_Texto,
                                Value = e.Ftes_Valor
                            }
                        })
                );

                test.Elements = test.Elements.OrderBy(y => y.Order).ToList();
                return test;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al obtener el Test", ex);
            }
        }
        public async Task<bool> EliminarTestAsync(TestModelDto testModel, string usuario, string ip, int id)
        {
            try
            {
                if (testModel == null)
                    throw new ArgumentNullException(nameof(testModel), "El modelo de prueba no puede ser nulo.");

                int inscId = testModel.TestType?.Value ?? 0; // Validación única para reutilizar

                // Eliminar Portada Principal si existe
                if (testModel.HasInstructions && testModel.Instructions != null)
                {
                    int portadaId = testModel.Instructions.ID ?? 0;
                    await _portadaTestDA.EliminarPortadaTestAsync(usuario, ip, portadaId);
                }

                // Validar existencia de elementos
                if (testModel.Elements?.Count > 0)
                {
                    foreach (var e in testModel.Elements)
                    {
                        int elementId = e.ID ?? 0;

                        // Eliminar Preguntas y Respuestas
                        if (e.Type == "question")
                        {
                            await _preguntaDA.EliminarPreguntaAsync(usuario, ip, elementId);

                            if (e.Answers?.Count > 0)
                            {
                                foreach (var resp in e.Answers)
                                {
                                    int respuestaId = resp.ID ?? 0;
                                    await _respuestaDA.EliminarRespuestaAsync(usuario, ip, respuestaId);
                                }
                            }
                        }

                        // Eliminar Contenido si tiene título o descripción
                        if (!string.IsNullOrWhiteSpace(e.Title) || !string.IsNullOrWhiteSpace(e.Description))
                        {
                            await _contenidoTestDA.EliminarContenidoTestAsync(usuario, ip, elementId);
                        }

                        // Eliminar Formulario si existe
                        if (e.SelectedForm != null)
                        {
                            int formularioId = e.SelectedForm.ID ?? 0;
                            await _formularioTestDA.EliminarFormularioTestAsync(usuario, ip, formularioId);
                        }
                    }
                }

                return true;
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentException("Error: Parámetro nulo detectado en la eliminación del test.", ex);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el Test.", ex);
            }
        }
        public async Task<List<ProcesoTestBE>> ListarProcesoTestAsync(string ruc)
        {
            try
            {
                var ListadoTest = await _testDA.ListarProcesoTestsAsync(ruc);
                return ListadoTest;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar el proceso del test", ex);
            }
        }
        public async Task<(bool, JsonElement?)> ValidarRespuestaSunat(string resultadoSunatJson)
        {
            if (string.IsNullOrWhiteSpace(resultadoSunatJson))
            {
                return (false, null);
            }

            try
            {
                return await _sunatService.ValidarSunatAsync(resultadoSunatJson);
            }
            catch (Exception ex)
            {                
                return (false, null);
            }
        }

        public async Task<List<Step>> ObtenerPasosInscripcion()
        {
            var etapas = await _inscripcionBL.ListarEtapasInscripcionAsync();
            etapas = etapas.Select(e =>
            {
                e.Current = (e.id == 2); // Marcar como actual solo el Test de Diagnóstico
                return e;
            }).ToList();

            return etapas.Select(e => new Step
            {
                Id = e.id,
                StepNumber = e.paso,
                IconName = e.nombreIcono,
                IconUrl = e.urIcono,
                Current = e.Current ?? false,
                IsComplete = false,
                isApproved = false
            }).ToList();
        }
        public Evaluated ExtraerDatosEvaluacion(JsonElement? evaluadoResult, string ruc)
        {
            if (!evaluadoResult.HasValue)
            {
                return null;
            }

            var evaluatedData = evaluadoResult.Value.ValueKind == JsonValueKind.Array
                ? evaluadoResult.Value.EnumerateArray().FirstOrDefault()
                : evaluadoResult.Value;

            return evaluatedData.ValueKind == JsonValueKind.Object
                ? new Evaluated
                {
                    Ruc = ruc,
                    LegalName = ObtenerValorPropiedad(evaluatedData, "razon", "RazonSocial"),
                    TradeName = ObtenerValorPropiedad(evaluatedData, "nombrecomercial", "NombreComercial"),
                    Phone = ObtenerValorPropiedad(evaluatedData, "Telefono"),
                    Email = ObtenerValorPropiedad(evaluatedData, "Correo"),
                    Address = ObtenerValorPropiedad(evaluatedData, "direccionfiscal"),
                    Region = ObtenerValorPropiedad(evaluatedData, "Region"),
                    Province = ObtenerValorPropiedad(evaluatedData, "Provincia")
                }
                : null;
        }
        public string ObtenerValorPropiedad(JsonElement json, params string[] keys)
        {
            foreach (var key in keys)
            {
                if (json.TryGetProperty(key, out var value))
                {
                    return value.GetString();
                }
            }
            return string.Empty;
        }
        public async Task<TestModelRequestDto> GuardarProgresoTest(TestModelRequestDto testModel)
        {
            if (testModel == null) throw new ArgumentNullException(nameof(testModel));

            try
            {
                var tasks = new List<Task>();           

                // Obtener el estado del Test 
                var statusTest = testModel.Steps.FirstOrDefault(x => x.Id == testModel.ActiveTest?.TestType?.Value);
                string ruc = testModel.CompanyData?.Ruc?.Trim() ?? string.Empty;
                bool isComplete = statusTest?.IsComplete ?? false;

                // Consultar el progreso del test
                var procesoTest = await _testDA.ListarProcesoTestsAsync(ruc);      
              
                    // Guardar Test
                    var test = new ProcesoTestBE
                    {
                        ID = procesoTest.Count > 0 ? procesoTest.FirstOrDefault().ID : 0,
                        Eval_RUC = ruc,
                        Insc_ID = testModel.ActiveTest?.TestType?.Value ?? 0,
                        Ieva_Estado = isComplete ? "COMPLETADO" : "PENDIENTE"
                    };
                if(procesoTest.Count == 0) 

                    tasks.Add(_testDA.InsertarProgresoTestAsync(test));

                else
                    tasks.Add(_testDA.ActualizarProgresoTestAsync(test));


                //2. Guardar Preguntas y respuesta seleccionada


                if (testModel.ActiveTest?.Elements?.Any() == true)
                {
                    foreach (var item in testModel.ActiveTest.Elements)
                    {
                        if (item?.SelectAnswers?.Any() == true)
                        {
                            foreach (var item2 in item.SelectAnswers)
                            {
                                var respuestaSelect = new RespuestaSeleccionadaBE
                                {
                                    Preg_ID = item.Id ?? 0,
                                    Eval_RUC = ruc,
                                    Rsel_TextoRespuesta = item2?.Input ?? string.Empty, // Evita nulos en Input
                                    Resp_ID = item2?.Id
                                };

                                tasks.Add(_testDA.InsertarRespuestaSelectTestAsync(respuestaSelect));
                            }
                        }
                    }
                }

                //3. Guardar Datos Generales
                if (testModel.CompanyData != null && testModel.CompanyData.LegalName != null)
                {
                    var datos = new DatosGeneralesBE
                    {
                        ID = testModel.CompanyData.ID, 
                        RazonSocial = testModel.CompanyData.LegalName,
                        NombresApellidos  = testModel.CompanyData.FullName,
                        NombreComercial = testModel.CompanyData.TradeName,
                        Ruc = testModel.CompanyData.Ruc,
                        Region = testModel.CompanyData.Region ,
                        Provincia = testModel.CompanyData.Province ,
                        Telefono = testModel.CompanyData.PhoneNumber ,
                        CorreoElectronico = testModel.CompanyData.Email ,
                        FechaInicioActividades = testModel.CompanyData.StartDate,
                        TipoPersoneria = testModel.CompanyData.LegalEntityType,
                        TipoEmpresa = testModel.CompanyData.CompanyType,
                        TipoPrestadorServiciosTuristicos = testModel.CompanyData.TourismServiceProviderType,
                        ActividadEconomica = testModel.CompanyData.BusinessActivity,
                        TelefonoFijo = testModel.CompanyData.Landline,
                        PaginaWeb  = testModel.CompanyData.Website,
                        TipoEmpresaTuristica = testModel.CompanyData.TourismBusinessType,
                        CategoriaHospedaje = testModel.CompanyData.LodgingCategory,
                    };
                    tasks.Add(_testDA.InsertarDatosGeneralesTestAsync(datos));
                }

              
                //4. Guardar Inscripcion
                //5. Guardar Malla Curricular
                //6. Guardar Logica de Cursos


                // Esperar todas las inserciones en paralelo
                await Task.WhenAll(tasks);

                return testModel;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear el test", ex);
            }
        }

        public async Task<List<RespuestaSeleccionadaBE>> ListarRespuestaSelectTestsAsync(string ruc)
        {
            try
            {
                var ListadoTest = await _testDA.ListarRespuestaSelectTestsAsync(ruc);
                return ListadoTest;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar el proceso del test", ex);
            }
        }

        public async Task<List<DatosGeneralesBE>> ListarDatosGeneralesTestAsync(string ruc)
        {
            try
            {
                var ListadoTest = await _testDA.ListarDatosGeneralesTestsAsync(ruc);
                return ListadoTest;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar el proceso del test", ex);
            }
        }
    }
}
