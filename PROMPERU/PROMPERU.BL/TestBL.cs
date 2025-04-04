﻿using System.Data;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Azure;
using DinkToPdf;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using PROMPERU.BE;
using PROMPERU.BL.Dtos;
using PROMPERU.BL.Utilities;
using PROMPERU.DA;
using ServiceExterno;
using static PROMPERU.BE.UbigeoBE;

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
        private readonly RegistroDA _registroDA;
        private readonly TitularRepresentanteDA _titularRepresentanteDA;
        private readonly RepresentanteAdicionalDA _representanteAdicionalDA;
        private readonly EvaluadoDA _evaluadoDA;
        private readonly EmailService _emailService; 
        // Constructor con inyección de dependencias
        public TestBL(
                    CursoDA cursoDA ,
                    InscripcionDA inscripcionDA,
                    PortadaTestDA portadaTestDA,
                    ContenidoTestDA contenidoTestDA, 
                    FormularioTestDA formularioTestDA,
                    PreguntaDA preguntaDA, 
                    RespuestaDA respuestaDA, 
                    PreguntaCursoDA preguntaCursoDA,
                    TestDA testDA, 
                    InscripcionBL inscripcionBL, 
                    SunatService sunatService,
                    EmailService emailService,
                    RegistroDA registroDA,
                    TitularRepresentanteDA titularRepresentanteDA,
                    RepresentanteAdicionalDA representanteAdicionalDA,
                    DomicilioDA domicilioDA,
                    EvaluadoDA evaluadoDA)
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
            _emailService = emailService;
            _registroDA = registroDA;
            _representanteAdicionalDA = representanteAdicionalDA;
            _titularRepresentanteDA = titularRepresentanteDA;
            _evaluadoDA = evaluadoDA;
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
                            IsComplete = false,
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

        public async Task<List<Step>> ObtenerPasosInscripcion( int Insc_ID, bool IsComplete)
        {
            var etapas = await _inscripcionBL.ListarEtapasInscripcionAsync();
            etapas = etapas.Select(e =>
            {
                e.Current = (e.id == Insc_ID); // Marcar como actual solo el Test de Diagnóstico
                return e;
            }).ToList();

            return etapas.Select(e => new Step
            {
                Id = e.id,
                StepNumber = e.paso,
                IconName = e.nombreIcono,
                IconUrl = e.urIcono,
                Current = e.Current ?? false,
                IsComplete = IsComplete ? (e.id == Insc_ID) : IsComplete!,
                isApproved = false
            }).ToList();
        }
        public Evaluated ExtraerDatosEvaluado(JsonElement? evaluadoResult, string ruc)
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
        public async Task<TestResponseDto> ConsultarRUCAsync(string ruc, string WebRootPath)
        {
            var response = new TestResponseDto();

            // 1. Validar si el RUC ya tiene un test en curso
            var procesoTest = await _testDA.ListarProcesoTestsAsync(ruc);
            if (procesoTest.Any())
            {
                var datosEvaluado = await _evaluadoDA.ListarDatosGeneralesTestsAsync(ruc);
                var datosRepresentanteLegal =  await _registroDA.ListarRepresentanteLegalAsync(ruc);
                var datosTitular = await _titularRepresentanteDA.ListarTitularRepresentantesAsync(ruc);
            
                var testIncompleto = procesoTest.LastOrDefault(x => x.Ieva_Estado == EstadoEtapaTest.EnProceso);
                var testCompleto = procesoTest.LastOrDefault(x => x.Ieva_Estado == EstadoEtapaTest.Terminado);             


                var generalData = datosEvaluado.Select(item => new Evaluated
                {
                    ID = item.ID,
                    LegalName = item.RazonSocial,
                    FullName = item.NombresApellidos,
                    TradeName = item.NombreComercial,
                    Ruc = item.Ruc,
                    Region = item.Region,
                    Province = item.Provincia,
                    Phone = item.Telefono,
                    Email = item.CorreoElectronico,
                    StartDate = item.FechaInicioActividades,
                    LegalEntityType = item.TipoPersoneria,
                    CompanyType = item.TipoEmpresa,
                    TourismServiceProviderType = item.TipoPrestadorServiciosTuristicos,
                    BusinessActivity = item.ActividadEconomica,
                    Landline = item.TelefonoFijo,
                    Website = item.PaginaWeb,
                    TourismBusinessType = item.TipoEmpresaTuristica,
                    LodgingCategory = item.CategoriaHospedaje,               
                    RegistrationNumber = item.NumeroPartida,
                    EntryNumber = item.NumeroAsiento,
                   City = item.Ciudad,                       
                   Address = item.Direccion,
                   District = item.Distrito,
                   Urbanization = item.Urbanizacion,
                   PostalCode = item.CodigoPostal  
                }).FirstOrDefault();

                // Representante legal 

                var RepresentanteLegal = datosRepresentanteLegal.Select(item => new LegalRepresentative
                {
                        FullName = item.Regi_NombreApellido,
                      TypeDocument = item.Regi_TipoDocumento,
                    DocumentNumber = item.Regi_NumeroDocumento,
                    RegistrationNumber = item.Regi_NumeroPartida,
                        EntryNumber = item.Regi_NumeroDocumento,
                        City = item.Regi_Ciudad
                }).FirstOrDefault();


                // Titular Representante
                var TitularRepresentante = datosTitular.Select(item => new TitularRepresentative
                {
                    FullName = item.Trep_NombreCompleto,
                    Gender = item.Trep_Sexo,
                    Age = item.Trep_Edad,
                    EducationLevel = item.Trep_GradoInstruccion,
                    RepresentativePosition = item.Trep_CargoRepresentante,
                    RepresentativePhone = item.Trep_CelularRepresentante,                
                }).FirstOrDefault();

                IEnumerable<AdditionalRepresentative> RepresentantesAdicionales = Enumerable.Empty<AdditionalRepresentative>();

                // Titular Representante Adicional
                if (TitularRepresentante is not null)
                {
                    var datosTitularesAdicionales = await _representanteAdicionalDA
                        .ListarRepresentanteAdicionalsAsync(TitularRepresentante.ID.Value);

                     RepresentantesAdicionales = datosTitularesAdicionales
                        .Select(item => new AdditionalRepresentative
                        {
                            FullName = item.Radi_NombreCompleto,
                            Email = item.Radi_CorreoElectronico,
                            PhoneNumber = item.Radi_NumeroCelular
                        })
                        .ToList();                    
                }


                // false TEST INCOMPLETO
                // true TEST COMPLETO

                if (testIncompleto != null)
                {
                    var stepsProgress = await ObtenerPasosInscripcion(testIncompleto.Insc_ID,false);
                    // Actualizar el estado del test
                    var dictProgreso = procesoTest
                    .GroupBy(p => p.Insc_ID)
                    .ToDictionary(g => g.Key, g => g.First().Ieva_Estado); // o g.Last()

                    foreach (var step in stepsProgress)
                    {
                        if (dictProgreso.TryGetValue(step.Id, out var estado))
                        {
                            step.IsComplete = estado == EstadoEtapaTest.Terminado;
                        }
                    }                   
                    response = await ObtenerTestEnCurso(procesoTest, testIncompleto, generalData,TitularRepresentante, RepresentantesAdicionales,RepresentanteLegal, stepsProgress);
                    return response;
                }
                else if (testCompleto != null)
                {
                    var stepsProgress = await ObtenerPasosInscripcion(testCompleto.Insc_ID,true);
                    // Actualizar el estado del test
                    var dictProgreso = procesoTest.ToDictionary(p => p.Insc_ID, p => p.Ieva_Estado);

                    foreach (var step in stepsProgress)
                    {
                        if (dictProgreso.TryGetValue(step.Id, out var estado))
                        {
                            step.IsComplete = estado == EstadoEtapaTest.Terminado;
                        }
                    }
                    response =  await ObtenerTestCompleto(testCompleto, generalData, stepsProgress, WebRootPath);
                   
                  
                    return response;
                }

                response.Success = true;
                response.Message = "El usuario ya tiene un proceso en curso.";
                response.Test = new { procesoTest };
                return response;

              
            }

            // 2. Consultar en SUNAT
            var resultadoSunatJson = await _sunatService.ConsultarRUCAsync(ruc);
            var (esValidoSunat, evaluadoResult) = await ValidarRespuestaSunat(resultadoSunatJson);

            // 3. Validar en otras entidades
            var validaciones = new Dictionary<string, bool> { { "SUNAT", esValidoSunat } };
            if (!esValidoSunat)
            {
                response.Success = false;
                response.Message = $"El RUC {ruc} no pasó las validaciones requeridas.";
                response.Validations = validaciones;
                return response;
            }    

            // 4. Construir nuevo Test de Diagnóstico
            response = await ObtenerNuevoTest(ruc, ExtraerDatosEvaluado(evaluadoResult, ruc));
            return response;
        }

        public async Task<TestModelRequestDto> GuardarProgresoTest(TestModelRequestDto testModel, string WebRootPath)
        {
            if (testModel == null) throw new ArgumentNullException(nameof(testModel));

            try
            {
                var tasks = new List<Task>();
                string ruc = testModel.CompanyData?.Ruc?.Trim() ?? string.Empty;

                // Obtener el estado del Test 
                var statusTest = testModel.Steps.Where( y => y.Current == true).FirstOrDefault(x => x.Id == testModel.ActiveTest?.TestType?.Value);
                bool isComplete = statusTest?.IsComplete ?? false;

                int Insc_ID = statusTest.Id ;

                // Consultar el progreso del test
                var procesoTest = await _testDA.ListarProcesoTestsAsync(ruc);
                var testExistente = procesoTest
                                    .Where( x => x.Ieva_Estado == EstadoEtapaTest.EnProceso || x.Ieva_Estado == EstadoEtapaTest.Terminado && x.Insc_ID == statusTest.Id)
                                    .FirstOrDefault();


                // Eliminar registros previos antes de insertar
                //await _testDA.EliminarProgresoTestAsync(Insc_ID, ruc);

                // Guardar o actualizar el progreso del Test
                var test = new ProcesoTestBE
                {
                    ID = testExistente?.ID ?? 0,
                    Eval_RUC = ruc,
                    Insc_ID = Insc_ID,
                    Ieva_Estado = isComplete ? "COMPLETADO" : "PENDIENTE"
                };

                tasks.Add(test.ID == 0
                    ? _testDA.InsertarProgresoTestAsync(test)
                    : _testDA.ActualizarProgresoTestAsync(test));


                // Guardar Preguntas y Respuestas
                foreach (var elemento in testModel.ActiveTest?.Elements ?? Enumerable.Empty<Elements>())
                {
                    foreach (var respuesta in elemento.SelectAnswers ?? Enumerable.Empty<SelectAnswer>())
                    {
                        var respuestaSelect = new RespuestaSeleccionadaBE
                        {
                            Rsel_ID = respuesta.Rsel_ID ?? 0,
                            Preg_ID = elemento.ID ?? 0,
                            Eval_RUC = ruc,
                            Rsel_TextoRespuesta = respuesta.Input ?? string.Empty,
                            Resp_ID = respuesta.ID
                        };
                                               
                                tasks.Add(respuestaSelect.Rsel_ID == 0
                          ? _testDA.InsertarRespuestaSelectTestAsync(respuestaSelect)
                          : _testDA.ActualizarRespuestaSelectTestAsync(respuestaSelect));
                    }
                }

                //3. Guardar Datos Generales
                // Guardar Datos Generales
                if (testModel.CompanyData?.LegalName is not null)
                {
                    var datos = new EvaluadoBE
                    {
                        ID = testModel.CompanyData.ID ?? 0,
                        RazonSocial = testModel.CompanyData.LegalName,
                        NombresApellidos = testModel.CompanyData.FullName,
                        NombreComercial = testModel.CompanyData.TradeName,
                        Ruc = testModel.CompanyData.Ruc,
                        Region = testModel.CompanyData.Region,
                        Provincia = testModel.CompanyData.Province,
                        Telefono = testModel.CompanyData.Phone,
                        CorreoElectronico = testModel.CompanyData.Email,
                        FechaInicioActividades = testModel.CompanyData.StartDate,
                        TipoPersoneria = testModel.CompanyData.LegalEntityType,
                        TipoEmpresa = testModel.CompanyData.CompanyType,
                        TipoPrestadorServiciosTuristicos = testModel.CompanyData.TourismServiceProviderType,
                        ActividadEconomica = testModel.CompanyData.BusinessActivity,
                        TelefonoFijo = testModel.CompanyData.Landline,
                        PaginaWeb = testModel.CompanyData.Website,
                        TipoEmpresaTuristica = testModel.CompanyData.TourismBusinessType,
                        CategoriaHospedaje = testModel.CompanyData.LodgingCategory,
                        NumeroPartida = testModel.CompanyData.RegistrationNumber,
                        NumeroAsiento = testModel.CompanyData.EntryNumber,
                        Ciudad = testModel.CompanyData.City,
                        Direccion = testModel.CompanyData.Address,
                        Distrito = testModel.CompanyData.District,
                        Urbanizacion = testModel.CompanyData.Urbanization,
                        CodigoPostal = testModel.CompanyData.PostalCode,
                    };

                  
                    tasks.Add(datos.ID == 0
                     ? _evaluadoDA.InsertarDatosGeneralesTestAsync(datos)
                     : _evaluadoDA.ActualizarDatosGeneralesTestAsync(datos));
                }


                //4. Guardar Inscripcion

               // guardar representante legal
                if (testModel.LegalRepresentative?.RegistrationNumber is not null)
                {
                    var registro = new RegistroBE
                    {
                        Eval_Ruc = ruc,
                        Regi_NombreApellido = testModel.LegalRepresentative.FullName,
                        Regi_NumeroDocumento = testModel.LegalRepresentative.DocumentNumber,
                        Regi_TipoDocumento = testModel.LegalRepresentative.TypeDocument,
                        Regi_NumeroPartida = testModel.LegalRepresentative.RegistrationNumber,
                        Regi_NumeroAsiento = testModel.LegalRepresentative.EntryNumber,
                        Regi_Ciudad = testModel.LegalRepresentative.City,
                    };

                    tasks.Add(registro.Eval_Ruc == ""
                                 ? _registroDA.InsertarRegistroAsync(registro)
                                 : _registroDA.ActualizarRegistroAsync(registro));
                }


                //// Guardar Datos domicilio
                //if (testModel.Registration?.Home?.Address is not null)
                //{
                //    var datos = new DomicilioBE
                //    {
                //        Domi_ID = testModel.Registration.Home.ID ?? 0,
                //        Domi_Direccion = testModel.Registration.Home.Address,
                //        Domi_Distrito = testModel.Registration.Home.District,
                //        Domi_Urbanizacion = testModel.Registration.Home.Urbanization,
                //        Domi_CodigoPostal = testModel.Registration.Home.PostalCode,
                //    };

                //    tasks.Add(datos.Domi_ID == 0
                //     ? _domicilioDA.InsertarDomicilioAsync(datos)
                //     : _domicilioDA.ActualizarDomicilioAsync(datos));
                //}


                // Guardar Datos Representate
                if (testModel.TitularRepresentative?.FullName is not null)
                {
                    var datos = new TitularRepresentanteBE
                    {
                        Trep_ID = testModel.TitularRepresentative.ID ?? 0,
                        Trep_NombreCompleto = testModel.TitularRepresentative.FullName,
                        Trep_Sexo = testModel.TitularRepresentative.Gender,
                        Trep_Edad = testModel.TitularRepresentative.Age,      
                        Trep_GradoInstruccion = testModel.TitularRepresentative.EducationLevel,
                        Trep_CargoRepresentante = testModel.TitularRepresentative.RepresentativePosition,
                        Trep_CelularRepresentante = testModel.TitularRepresentative.RepresentativePhone,                    

                    }; 

                    tasks.Add(datos.Trep_ID == 0
                     ? _titularRepresentanteDA.ActualizarTitularRepresentanteAsync(datos)
                     : _titularRepresentanteDA.ActualizarTitularRepresentanteAsync(datos));


                    foreach (var representanteAdicional in testModel.TitularRepresentative.AdditionalRepresentatives)
                    {
                        // Guardar Datos Representante adicional
                        if (representanteAdicional.FullName is not null)
                        {
                            var datosR = new RepresentanteAdicionalBE
                            {
                                Radi_ID = representanteAdicional.ID ?? 0,
                                Trep_ID = datos.Trep_ID,
                                Radi_NombreCompleto = representanteAdicional.FullName,
                                Radi_CorreoElectronico = representanteAdicional.Email,
                                Radi_NumeroCelular = representanteAdicional.PhoneNumber,                            
                            };                                             
                                                
                                                tasks.Add(datosR.Radi_ID == 0
                                                 ? _representanteAdicionalDA.InsertarRepresentanteAdicionalAsync(datosR)
                                                 : _representanteAdicionalDA.ActualizarRepresentanteAdicionalAsync(datosR));
                        }
                    }
                }

              

                //5. Guardar Malla Curricular
                //6. Guardar Logica de Cursos
                if (isComplete == true)
                {

                    foreach (var elemento in testModel.ActiveTest?.Elements ?? Enumerable.Empty<Elements>())
                    {
                        if (elemento.IsComputable == true)
                        {
                            tasks.Add(_testDA.InsertarProgresoCursoTestAsync(elemento.Course.Value, ruc, testModel.ActiveTest?.TestType?.Value ?? 0, elemento.ID ?? 0));

                        }
                    }

                    if (Insc_ID == EtapasConstants.TesDiagnostico)
                    {
                        // Resultados para Diagnostico Inicio 
                        var resul = await ResultadoTestDiagnosticoInicial(ruc, Insc_ID);


                        var html = GenerarHtmlTestDiagnosticoInicial(resul.ApprovedCourses, resul.DisapprovedCourses, WebRootPath);
                        var (rutaArchivoPdf, pdfBytes) = GenerarYGuardarPdf(ruc, html, WebRootPath);

                        // descomentar en PROD
                        //await _emailService.EnviarCorreoAsync("Adjunto el reporte en PDF.", "Test", pdfBytes,datos.Email);

                        await _emailService.EnviarCorreoAsync("Adjunto el reporte en PDF.", "Test", pdfBytes, "alessandro.callirgos@echogroup.pe");

                    }

                    // Resultado para  Inscripcion Programa

                    if (Insc_ID == EtapasConstants.TesInscripcionPrograma)
                    {
                        // Resultados para Diagnostico Inicio 
                        var resul = await ResultadoTestInscripcionPrograma(ruc, Insc_ID);


                        var html = GenerarHtmlTestInscripcionPrograma(resul.CompanyData, resul.LegalRepresentative, WebRootPath);
                        var (rutaArchivoPdf, pdfBytes) = GenerarYGuardarPdf(ruc, html, WebRootPath);

                        // descomentar en PROD
                        //await _emailService.EnviarCorreoAsync("Adjunto el reporte en PDF.", "Test", pdfBytes,datos.Email);

                        await _emailService.EnviarCorreoAsync("Adjunto el reporte en PDF.", "Test", pdfBytes, "alessandro.callirgos@echogroup.pe");

                    }


                    // Resultado para  Inscripcion Curso
                    if (Insc_ID == EtapasConstants.TesInscripcionCurso)
                    {
                        // Resultados para Diagnostico Inicio 
                        var resul = await ResultadoTestInscripcionCurso(ruc, Insc_ID);


                        //var html = GenerarHtmlTestInscripcionCurso(resul.ApprovedCourses, resul.DisapprovedCourses, WebRootPath);
                        //var (rutaArchivoPdf, pdfBytes) = GenerarYGuardarPdf(ruc, html, WebRootPath);

                        // descomentar en PROD
                        //await _emailService.EnviarCorreoAsync("Adjunto el reporte en PDF.", "Test", pdfBytes,datos.Email);

                        await _emailService.EnviarCorreoAsync("Adjunto el reporte en PDF.", "Test", null, "alessandro.callirgos@echogroup.pe");

                    }
                    // Resultado para Diagnostico Salida
                    if (Insc_ID == EtapasConstants.TesSalida)
                    {
                        // Resultados para Diagnostico Inicio 
                        var resul = await ResultadoTestDiagnosticoSalida(ruc, Insc_ID);


                        //var html = GenerarHtml(resul.ApprovedCourses, resul.DisapprovedCourses, WebRootPath);
                        //var (rutaArchivoPdf, pdfBytes) = GenerarYGuardarPdf(ruc, html, WebRootPath);

                        // descomentar en PROD
                        //await _emailService.EnviarCorreoAsync("Adjunto el reporte en PDF.", "Test", pdfBytes,datos.Email);

                        await _emailService.EnviarCorreoAsync("Adjunto el reporte en PDF.", "Test", null, "alessandro.callirgos@echogroup.pe");

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

        public async Task<List<RespuestaSeleccionadaBE>> ListarRespuestaSelectTestsAsync(string ruc, int Insc_ID)
        {
            try
            {
                var ListadoTest = await _testDA.ListarRespuestaSelectTestsAsync(ruc, Insc_ID);
                return ListadoTest;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar el proceso del test", ex);
            }
        }

        public async Task<List<EvaluadoBE>> ListarDatosGeneralesTestAsync(string ruc)
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
        private async Task<TestResponseDto> ObtenerNuevoTest(string ruc, Evaluated evaluado)
        {
            var steps = await ObtenerPasosInscripcion(EtapasConstants.TesDiagnostico,false);// Test Diagnostico
            var activeTest = await ObtenerTestPorIdAsync(steps[0].Id);

            return new TestResponseDto
            {
                Success = true,
                Message = "Validaciones completadas. Iniciando Test de Diagnóstico.",
                Test = new
                {
                    Steps = steps,
                    ActiveTest = activeTest,
                    CompanyData = evaluado
                }
            };
        }

        private async Task<TestResponseDto> ObtenerTestEnCurso(IEnumerable<ProcesoTestBE> procesoTest, ProcesoTestBE testIncompleto,
      Evaluated datos,TitularRepresentative titularRepresentative, IEnumerable<AdditionalRepresentative> additionalRepresentative, LegalRepresentative legalRepresentative, IEnumerable<Step> stepsProgress)
        {
            var response = new TestResponseDto { Success = true };           
            var respuestaTest = await ListarRespuestaSelectTestsAsync(testIncompleto.Eval_RUC,testIncompleto.Insc_ID);
            var activeTestProgress = await ObtenerTestPorIdAsync(testIncompleto.Insc_ID);

            foreach (var element in activeTestProgress.Elements)
            {
                if (respuestaTest == null)
                    continue;

                // Filtramos y asignamos respuestas
                element.SelectAnswers = respuestaTest
                    .Where(r => r.Preg_ID == element.ID)
                    .Select(r => new SelectAnswer
                    {
                        Rsel_ID = r.Rsel_ID,
                        ID = r.Resp_ID > 0 ? r.Resp_ID : null,
                        Input = r.Rsel_TextoRespuesta ?? string.Empty
                    })
                    .ToList();

                // Si hay respuestas, marcamos como completo
                element.IsComplete = element.SelectAnswers.Any();
            }


            response.Message = $"Validaciones completadas. {testIncompleto.Eval_Etapa}";
            response.Test = new
            {
                Steps = stepsProgress,
                ActiveTest = activeTestProgress,
                CompanyData = datos,
                TitularRepresentative = titularRepresentative,
                AdditionalRepresentative = additionalRepresentative,
                LegalRepresentative = legalRepresentative

            };

            return response;
        }

        private async Task<TestResponseDto> ObtenerTestCompleto(ProcesoTestBE testCompleto,
      Evaluated datos, IEnumerable<Step> stepsProgress, string WebRootPath)
        {
            var response = new TestResponseDto { Success = true };          
            
                var result = await ResultadoTestDiagnosticoInicial(testCompleto.Eval_RUC, testCompleto.Insc_ID);
                var result2 = await ResultadoTestDiagnosticoSalida(testCompleto.Eval_RUC, testCompleto.Insc_ID);

            // calcular si el alumno aprobo el tes por completo
            if (result.DisapprovedCoursesCount == 0)
                {

                    stepsProgress = stepsProgress.Select(e => new Step
                    {
                        Id = e.Id,
                        StepNumber = e.StepNumber,
                        IconName = e.IconName,
                        IconUrl = e.IconUrl,
                        Current = e.Current,
                        IsComplete = e.IsComplete,
                        isApproved = (e.Id == testCompleto.Insc_ID)
                    }).ToList();
                   
                

              
            }
            string filePath = "";
            if (testCompleto.Insc_ID == EtapasConstants.TesDiagnostico)
                filePath = ObtenerRutaMayorCorrelativo(WebRootPath, testCompleto.Eval_RUC, "resumen", "ReporteCursos");
            if (testCompleto.Insc_ID == EtapasConstants.TesInscripcionPrograma)
                filePath = ObtenerRutaMayorCorrelativo(WebRootPath, testCompleto.Eval_RUC, "fichaInscripcion", "ReporteInscripcion");

            response.Message = $"Validaciones completadas. {testCompleto.Eval_Etapa}";
            response.Test = new
            {
                Steps = stepsProgress,
                CompanyData = datos,
                Resumen = result,
                FilePath = filePath ?? null,
            };
            return response;
            
           
        }


        private async Task<ResponseTestDiagnosticoInicialDto> ResultadoTestDiagnosticoInicial(string eval_RUC, int? insc_ID)
        {
            var progresoCurso = (await _testDA.ObtenerProgresoCursoTestAsync(eval_RUC, insc_ID ?? 0))
            .Where(x => x.Curs_CodigoCurso != null && x.Curs_NombreCurso != null) // Filtrar elementos nulos
            .GroupBy(x => x.Curs_CodigoCurso)  // Agrupar por código de curso
            .Select(group => group.First())    // Tomar el primer elemento de cada grupo
            .Select(x => new ProcesoCursoBE
            {
                Curs_CodigoCurso = x.Curs_CodigoCurso,
                Curs_NombreCurso = x.Curs_NombreCurso,
                Ceva_PuntajeIndividual = x.Ceva_PuntajeIndividual,
                Ceva_PuntajeGlobal = x.Ceva_PuntajeGlobal,
                Ceva_Estado = x.Ceva_Estado
            })
            .ToList();

            var groupedCourses = progresoCurso
            .GroupBy(y => new {  y.Curs_CodigoCurso ,y.Ceva_Estado }) // Agrupar antes de la proyección
            .ToDictionary(
                g => g.Key,
                g => g.Select(y => new CoursesScore
                {
                    CourseName = y.Curs_NombreCurso,
                    IndividualScore = y.Ceva_PuntajeIndividual,
                    GlobalScore = y.Ceva_PuntajeGlobal,
                    CourseStatus = y.Ceva_Estado
                }).ToList()
            );
                    

            // Obtener listas de cursos aprobados y desaprobados
            var approvedCourses = groupedCourses
                .Where(kv => kv.Key.Ceva_Estado == EstadoCurso.Aprobado)
                .SelectMany(kv => kv.Value) // Extraer todos los cursos de cada grupo
                .Distinct()
                .ToList();

            var disapprovedCourses = groupedCourses
                .Where(kv => kv.Key.Ceva_Estado == EstadoCurso.Desaprobado) // O el estado que definas
                .SelectMany(kv => kv.Value)
                .Distinct()
                .ToList();
      

            return new ResponseTestDiagnosticoInicialDto
            {
                ApprovedCourses = approvedCourses,
                DisapprovedCourses = disapprovedCourses,
                ApprovedCoursesCount = approvedCourses.Count,
                DisapprovedCoursesCount = disapprovedCourses.Count,
                CoursesCount = approvedCourses.Count + disapprovedCourses.Count
            };
        }
        private async Task<ResponseTestDiagnosticoSalidaDto> ResultadoTestDiagnosticoSalida(string eval_RUC, int insc_ID)
        {
            var progresoCursoTestFinal = (await _testDA.ObtenerProgresoCursoTestAsync(eval_RUC, insc_ID))
           .Where(x => x.Curs_CodigoCurso != null && x.Curs_NombreCurso != null) // Filtrar elementos nulos
           .GroupBy(x => x.Curs_CodigoCurso)  // Agrupar por código de curso
           .Select(group => group.First())    // Tomar el primer elemento de cada grupo
           .Select(x => new ProcesoCursoBE
           {
               Curs_CodigoCurso = x.Curs_CodigoCurso,
               Curs_NombreCurso = x.Curs_NombreCurso,
               Ceva_PuntajeIndividual = x.Ceva_PuntajeIndividual,
               Ceva_PuntajeGlobal = x.Ceva_PuntajeGlobal,
               Ceva_Estado = x.Ceva_Estado
           })
           .ToList();

            // Comparar con Test de Diagnostico
            var progresoCursoTestInicial = (await _testDA.ObtenerProgresoCursoTestAsync(eval_RUC, EtapasConstants.TesDiagnostico))
             .Where(x => x.Curs_CodigoCurso != null && x.Curs_NombreCurso != null) // Filtrar elementos nulos
             .GroupBy(x => x.Curs_CodigoCurso)  // Agrupar por código de curso
             .Select(group => group.First())    // Tomar el primer elemento de cada grupo
             .Select(x => new ProcesoCursoBE
             {
                 Curs_CodigoCurso = x.Curs_CodigoCurso,
                 Curs_NombreCurso = x.Curs_NombreCurso,
                 Ceva_PuntajeIndividual = x.Ceva_PuntajeIndividual,
                 Ceva_PuntajeGlobal = x.Ceva_PuntajeGlobal,
                 Ceva_Estado = x.Ceva_Estado
             })
             .ToList();


           

            //var groupedCourses = progresoCurso
            //.GroupBy(y => new { y.Curs_CodigoCurso, y.Ceva_Estado }) // Agrupar antes de la proyección
            //.ToDictionary(
            //    g => g.Key,
            //    g => g.Select(y => new CoursesScore
            //    {
            //        CourseName = y.Curs_NombreCurso,
            //        IndividualScore = y.Ceva_PuntajeIndividual,
            //        GlobalScore = y.Ceva_PuntajeGlobal,
            //        CourseStatus = y.Ceva_Estado
            //    }).ToList()
            //);


            //// Obtener listas de cursos aprobados y desaprobados
            //var approvedCourses = groupedCourses
            //    .Where(kv => kv.Key.Ceva_Estado == EstadoCurso.Aprobado)
            //    .SelectMany(kv => kv.Value) // Extraer todos los cursos de cada grupo
            //    .Distinct()
            //    .ToList();

            //var disapprovedCourses = groupedCourses
            //    .Where(kv => kv.Key.Ceva_Estado == EstadoCurso.Desaprobado) // O el estado que definas
            //    .SelectMany(kv => kv.Value)
            //    .Distinct()
            //    .ToList();


            return new ResponseTestDiagnosticoSalidaDto
            {
                TesInicial = null,
                TestFinal = null                
            };
        }

        private async Task<ResponseTestInscripcionProgramaDto> ResultadoTestInscripcionPrograma(string eval_RUC, int? insc_ID)
        {

            var datosEvaluado = await _evaluadoDA.ListarDatosGeneralesTestsAsync(eval_RUC);
            var datosRepresentanteLegal = await _registroDA.ListarRepresentanteLegalAsync(eval_RUC);

            var generalData = datosEvaluado.Select(item => new Evaluated
            {
                ID = item.ID,
                LegalName = item.RazonSocial,
                FullName = item.NombresApellidos,
                TradeName = item.NombreComercial,
                Ruc = item.Ruc,
                Region = item.Region,
                Province = item.Provincia,
                Phone = item.Telefono,
                Email = item.CorreoElectronico,
                StartDate = item.FechaInicioActividades,
                LegalEntityType = item.TipoPersoneria,
                CompanyType = item.TipoEmpresa,
                TourismServiceProviderType = item.TipoPrestadorServiciosTuristicos,
                BusinessActivity = item.ActividadEconomica,
                Landline = item.TelefonoFijo,
                Website = item.PaginaWeb,
                TourismBusinessType = item.TipoEmpresaTuristica,
                LodgingCategory = item.CategoriaHospedaje,
                RegistrationNumber = item.NumeroPartida,
                EntryNumber = item.NumeroAsiento,
                City = item.Ciudad,
                Address = item.Direccion,
                District = item.Distrito,
                Urbanization = item.Urbanizacion,
                PostalCode = item.CodigoPostal
            }).FirstOrDefault();

            // Representante legal 

            var RepresentanteLegal = datosRepresentanteLegal.Select(item => new LegalRepresentative
            {
                FullName = item.Regi_NombreApellido,
                TypeDocument = item.Regi_TipoDocumento,
                DocumentNumber = item.Regi_NumeroDocumento,
                RegistrationNumber = item.Regi_NumeroPartida,
                EntryNumber = item.Regi_NumeroDocumento,
                City = item.Regi_Ciudad
            }).FirstOrDefault();


            return new ResponseTestInscripcionProgramaDto
            {
                CompanyData = generalData,
                LegalRepresentative = RepresentanteLegal
            };
        }

        private async Task<ResponseTestInscripcionCursoDto> ResultadoTestInscripcionCurso(string eval_RUC, int? insc_ID)
        {
            var progresoCurso = (await _testDA.ObtenerProgresoCursoTestAsync(eval_RUC, insc_ID ?? 0))
            .Where(x => x.Curs_CodigoCurso != null && x.Curs_NombreCurso != null) // Filtrar elementos nulos
            .GroupBy(x => x.Curs_CodigoCurso)  // Agrupar por código de curso
            .Select(group => group.First())    // Tomar el primer elemento de cada grupo
            .Select(x => new ProcesoCursoBE
            {
                Curs_CodigoCurso = x.Curs_CodigoCurso,
                Curs_NombreCurso = x.Curs_NombreCurso,
                Ceva_PuntajeIndividual = x.Ceva_PuntajeIndividual,
                Ceva_PuntajeGlobal = x.Ceva_PuntajeGlobal,
                Ceva_Estado = x.Ceva_Estado
            })
            .ToList();

            var groupedCourses = progresoCurso
            .GroupBy(y => new { y.Curs_CodigoCurso, y.Ceva_Estado }) // Agrupar antes de la proyección
            .ToDictionary(
                g => g.Key,
                g => g.Select(y => new CoursesScore
                {
                    CourseName = y.Curs_NombreCurso,
                    IndividualScore = y.Ceva_PuntajeIndividual,
                    GlobalScore = y.Ceva_PuntajeGlobal,
                    CourseStatus = y.Ceva_Estado
                }).ToList()
            );


            // Obtener listas de cursos aprobados y desaprobados
            var approvedCourses = groupedCourses
                .Where(kv => kv.Key.Ceva_Estado == EstadoCurso.Aprobado)
                .SelectMany(kv => kv.Value) // Extraer todos los cursos de cada grupo
                .Distinct()
                .ToList();

            var disapprovedCourses = groupedCourses
                .Where(kv => kv.Key.Ceva_Estado == EstadoCurso.Desaprobado) // O el estado que definas
                .SelectMany(kv => kv.Value)
                .Distinct()
                .ToList();


            return new ResponseTestInscripcionCursoDto
            {
               ProcesoCurso = null
            };
        }
        private async Task<ResponseTestDiagnosticoSalidaDto> ResultadoTestDiagnosticoSalida(string eval_RUC, int? insc_ID)
        {
            var progresoCurso = (await _testDA.ObtenerProgresoCursoTestAsync(eval_RUC, insc_ID ?? 0))
            .Where(x => x.Curs_CodigoCurso != null && x.Curs_NombreCurso != null) // Filtrar elementos nulos
            .GroupBy(x => x.Curs_CodigoCurso)  // Agrupar por código de curso
            .Select(group => group.First())    // Tomar el primer elemento de cada grupo
            .Select(x => new ProcesoCursoBE
            {
                Curs_CodigoCurso = x.Curs_CodigoCurso,
                Curs_NombreCurso = x.Curs_NombreCurso,
                Ceva_PuntajeIndividual = x.Ceva_PuntajeIndividual,
                Ceva_PuntajeGlobal = x.Ceva_PuntajeGlobal,
                Ceva_Estado = x.Ceva_Estado
            })
            .ToList();

            var groupedCourses = progresoCurso
            .GroupBy(y => new { y.Curs_CodigoCurso, y.Ceva_Estado }) // Agrupar antes de la proyección
            .ToDictionary(
                g => g.Key,
                g => g.Select(y => new CoursesScore
                {
                    CourseName = y.Curs_NombreCurso,
                    IndividualScore = y.Ceva_PuntajeIndividual,
                    GlobalScore = y.Ceva_PuntajeGlobal,
                    CourseStatus = y.Ceva_Estado
                }).ToList()
            );


            // Obtener listas de cursos aprobados y desaprobados
            var approvedCourses = groupedCourses
                .Where(kv => kv.Key.Ceva_Estado == EstadoCurso.Aprobado)
                .SelectMany(kv => kv.Value) // Extraer todos los cursos de cada grupo
                .Distinct()
                .ToList();

            var disapprovedCourses = groupedCourses
                .Where(kv => kv.Key.Ceva_Estado == EstadoCurso.Desaprobado) // O el estado que definas
                .SelectMany(kv => kv.Value)
                .Distinct()
                .ToList();


            return new ResponseTestDiagnosticoSalidaDto
            {
                TesInicial = null,
                TestFinal = null
            };
        }

        private string ObtenerRutaMayorCorrelativo(string webRootPath, string ruc, string carpetaDestino, string nombreArchivoBase)
        {
            // Definir la ruta base donde están los archivos PDF
            string rutaBase = Path.Combine(webRootPath, "js", "modules", "test", "templates", carpetaDestino);

            // Verificar si la carpeta existe
            if (!Directory.Exists(rutaBase))
            {
                return null; // No hay archivos, devolver null
            }

            // Obtener todos los archivos PDF que coincidan con el patrón
            var archivos = Directory.GetFiles(rutaBase, $"{nombreArchivoBase}_{ruc}_*.pdf");

            // Expresión regular para extraer el correlativo
            var regex = new Regex($@"{Regex.Escape(nombreArchivoBase)}_{ruc}_(\d{{3}})\.pdf$", RegexOptions.IgnoreCase);

            string archivoConMayorCorrelativo = null;
            int mayorCorrelativo = 0;

            foreach (var archivo in archivos)
            {
                var match = regex.Match(Path.GetFileName(archivo));
                if (match.Success && int.TryParse(match.Groups[1].Value, out int correlativo))
                {
                    if (correlativo > mayorCorrelativo)
                    {
                        mayorCorrelativo = correlativo;
                        archivoConMayorCorrelativo = archivo;
                    }
                }
            }

            return archivoConMayorCorrelativo;
        }

        private string GenerarHtmlTestDiagnosticoInicial(IEnumerable<CoursesScore> approvedCourses, IEnumerable<CoursesScore> failedCourses, string WebRootPath)
        {
            // Ruta del archivo HTML
            string filePath = Path.Combine(WebRootPath, "js", "modules", "test", "templates", "resumen", "resultados_test.html");

            // Leer el archivo HTML
            string htmlContent = System.IO.File.ReadAllText(filePath, Encoding.UTF8);

            // Datos dinámicos
            decimal CantidadCursosAprobados = approvedCourses.Count();
            decimal CantidadTotalCursos = approvedCourses.Count() + failedCourses.Count();
            decimal CantidadCursosDesaprobados = failedCourses.Count();

            // Generar HTML dinámico para los cursos
            StringBuilder ListaCursosAprobadosHtml = new StringBuilder();
            StringBuilder ListaCursosDesaprobadosHtml = new StringBuilder();

            foreach (var curso in approvedCourses)
            {
                ListaCursosAprobadosHtml.AppendLine($"<div class=\"d-flex align-items-center justify-content-center flex-column\"><div class=\"item css\"><div class=\"content\"><h3>{curso.IndividualScore} de {curso.IndividualScore + curso.GlobalScore}</h3><span>${curso.CourseName}</span></div><svg class=\"chart-svg\" width=\"210\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\"><circle class=\"circle_animation\" r=\"96\" cy=\"105\" cx=\"105\" stroke-width=\"15\" stroke=\"#EE7C30\" fill=\"none\" style=\"--percent: 100;\" /><circle class=\"circle_animation\" r=\"96\" cy=\"105\" cx=\"105\" stroke-width=\"15\" stroke=\"#4196BE\" fill=\"none\" style=\"--percent: {curso.IndividualScore / (curso.IndividualScore + curso.GlobalScore) * 100};\" /></svg></div></div><div class=\"legend\"><div class=\"legend-item\"><div class=\"legend-color\" style=\"background-color: #4196BE;\"></div><span>Puntaje individual: {curso.IndividualScore}</span></div><div class=\"legend-item\"><div class=\"legend-color\" style=\"background-color: #EE7C30;\"></div><span>Puntaje global: {curso.GlobalScore}</span></div></div>");
            }

            foreach (var curso in failedCourses)
            {
                ListaCursosDesaprobadosHtml.AppendLine($" <div class=\"card-custom\">\r\n\t\t\t<div class=\"d-flex align-items-center\">\r\n\t\t\t  <div class=\"circle\"></div>\r\n\t\t\t  <span>{curso.CourseName}</span>\r\n\t\t\t</div>\r\n\t\t  </div>");
            }            


            // Reemplazar placeholders con valores reales
            htmlContent = htmlContent.Replace("{CantidadCursosAprobados}", CantidadCursosAprobados.ToString())
                                     .Replace("{CantidadTotalCursos}", CantidadTotalCursos.ToString())
                                     .Replace("{CantidadCursosDesaprobados}", CantidadCursosDesaprobados.ToString())
                                     .Replace("{ListaCursosAprobados}", ListaCursosAprobadosHtml.ToString())
                                     .Replace("{ListaCursosDesaprobados}", ListaCursosDesaprobadosHtml.ToString());
            return htmlContent;
        }
        private string GenerarHtmlTestInscripcionPrograma(Evaluated companyData, LegalRepresentative legalRepresentative, string WebRootPath)
        {
            // Ruta del archivo HTML
            string filePath = Path.Combine(WebRootPath, "js", "modules", "test", "templates", "fichaInscripcion", "FichadeInscripcionProgramaComercialparaEmpresa.html");

            // Leer el archivo HTML
            string htmlContent = System.IO.File.ReadAllText(filePath, Encoding.UTF8);

            // Datos Generales
            if (companyData.LegalEntityType.Contains("Natural"))


                // Reemplazar placeholders con valores reales
                htmlContent = htmlContent.Replace("{PersonaJuridica}", companyData.LegalEntityType.Contains("Natural") ? " " : "X")
                                         .Replace("{PersonaNatural}", companyData.LegalEntityType.Contains("Natural") ? "X" : " ")
                                         .Replace("{RazonSocial}", companyData.LegalName.ToString())
                                         .Replace("{NombreComercial}", companyData.TradeName.ToString())
                                         .Replace("{Ruc}", companyData.Ruc.ToString())
                                         .Replace("{ActividadSocial}", companyData.BusinessActivity.ToString())
                                         .Replace("{FechaActividad}", companyData.StartDate.ToString())
                                         .Replace("{PartidaRegistral}", companyData.RegistrationNumber.ToString())
                                         .Replace("{Asiento}", companyData.EntryNumber.ToString())
                                         .Replace("{Ciudad}", companyData.City.ToString())
                                         .Replace("{Direccion}", companyData.Address.ToString())
                                         .Replace("{Urbanizacion}", companyData.Urbanization.ToString())
                                         .Replace("{Distrito}", companyData.District.ToString())
                                         .Replace("{Provincia}", companyData.Province.ToString())
                                         .Replace("{Departamento}", companyData.Region.ToString())      
                                         .Replace("{CodigoPostal}", companyData.PostalCode.ToString())
                                         .Replace("{PaginaWeb}", companyData.Website.ToString())
                                         .Replace("{Telefono}", companyData.Landline.ToString())
                                         .Replace("{Correo}", companyData.Email.ToString())
                                         .Replace("{Celular}", companyData.Phone.ToString())
                                         .Replace("{Acreditada}", companyData.Province.ToString())
                                         .Replace("{NoAcreditada}", companyData.RegistrationNumber.ToString())
                                         .Replace("{AgenciaViaje}", companyData.EntryNumber.ToString())
                                         .Replace("{EstablecimientoHospedaje}", companyData.City.ToString())
                                         .Replace("{SiPrestadorServicio}", companyData.Address.ToString())
                                         .Replace("{NoPrestadorServicio}", companyData.Urbanization.ToString())
                                         .Replace("{SiRequisitosPrestadorServicio}", companyData.District.ToString())
                                         .Replace("{NoRequisitosPrestadorServicio}", companyData.Province.ToString())
                                         .Replace("{SiSancion}", companyData.StartDate.ToString())
                                         .Replace("{NoSancion}", companyData.RegistrationNumber.ToString());


       // Representante Legal
            // Reemplazar placeholders con valores reales
            htmlContent = htmlContent.Replace("{Dni}", legalRepresentative.TypeDocument.Contains("Dni") ? "X" : "")
                                     .Replace("{Carne}", legalRepresentative.TypeDocument.Contains("Carne") ? "X" : "")
                                     .Replace("{Pasaporte}", legalRepresentative.TypeDocument.Contains("Pasaporte") ? "X" : "")
                                     .Replace("{PartidaRegistralRL}", legalRepresentative.RegistrationNumber.ToString())
                                     .Replace("{AsientoRL}", legalRepresentative.EntryNumber.ToString())
                                     .Replace("{CiudadRL}", legalRepresentative.City.ToString());
            return htmlContent;
        }

        public byte[] ConvertirHtmlAPdf(string html)
        {
            var converter = new BasicConverter(new PdfTools());

            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings
                {
                    ColorMode = ColorMode.Color,
                    Orientation = DinkToPdf.Orientation.Portrait,
                    PaperSize = PaperKind.A4
                },
                Objects = { new ObjectSettings { HtmlContent = html } }
            };

            return converter.Convert(doc);
        }

        public (string rutaArchivo, byte[] pdfBytes) GenerarYGuardarPdf(string ruc, string html, string webRootPath)
        {
            string rutaBase = Path.Combine(webRootPath, "js", "modules", "test", "templates", "resumen");

            // 📌 Asegurar que la carpeta de destino existe
            if (!Directory.Exists(rutaBase))
                Directory.CreateDirectory(rutaBase);

            // Obtener el número correlativo basado en los archivos existentes
            var archivos = Directory.GetFiles(rutaBase, $"ReporteCursos_{ruc}_*.pdf");
            int correlativo = archivos.Length + 1;
            string nombreArchivo = $"ReporteCursos_{ruc}_{correlativo:D3}.pdf";
            string rutaArchivo = Path.Combine(rutaBase, nombreArchivo);

            // Configuración del documento PDF
            var converter = new BasicConverter(new PdfTools());
            var pdfDoc = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings()
                {
                    ColorMode = ColorMode.Color,
                    Orientation = Orientation.Portrait,
                    PaperSize = PaperKind.A4
                },
                Objects =
                    {
                        new ObjectSettings()
                        {
                            HtmlContent = html,
                            WebSettings = { DefaultEncoding = "utf-8" },
                            UseLocalLinks = true
                        }
                    }
            };
            try
            {
                // 📌 Convertir HTML a PDF en memoria
                byte[] pdfBytes = converter.Convert(pdfDoc);


                // 📌 Guardar el PDF en el sistema de archivos
                File.WriteAllBytes(rutaArchivo, pdfBytes);

                // 📌 Retornar la ruta y los bytes del PDF
                return (rutaArchivo, pdfBytes);
            }
            catch (Exception ex)
            {

                throw new Exception("ERRO PDF", ex);
            }  
      


        }


        //public (string rutaArchivo, byte[] pdfBytes) GenerarYGuardarPdf(string dni, string html, string webRootPath)
        //{
        //    // 📌 Activar licencia gratuita de QuestPDF
        //    QuestPDF.Settings.License = LicenseType.Community;

        //    string rutaBase = Path.Combine(webRootPath, "js", "modules", "test", "templates", "resumen");

        //    // 📌 Asegurar que la carpeta de destino existe
        //    if (!Directory.Exists(rutaBase))
        //        Directory.CreateDirectory(rutaBase);

        //    // Obtener el número correlativo basado en los archivos existentes
        //    var archivos = Directory.GetFiles(rutaBase, $"ReporteCursos_{dni}_*.pdf");
        //    int correlativo = archivos.Length + 1;
        //    string nombreArchivo = $"ReporteCursos_{dni}_{correlativo:D3}.pdf";
        //    string rutaArchivo = Path.Combine(rutaBase, nombreArchivo);

        //    // 📌 Limpiar el contenido HTML para evitar que se muestre como código
        //    string textoLimpio = LimpiarHtml(html);

        //    // 📌 Generar PDF con QuestPDF
        //    byte[] pdfBytes = GeneratePdf(textoLimpio);

        //    // 📌 Guardar el PDF en el sistema de archivos
        //    File.WriteAllBytes(rutaArchivo, pdfBytes);

        //    // 📌 Retornar la ruta y los bytes del PDF
        //    return (rutaArchivo, pdfBytes);
        //}

        //private byte[] GeneratePdf(string contenidoLimpio)
        //{
        //    return Document.Create(container =>
        //    {
        //        container.Page(page =>
        //        {
        //            page.Size(PageSizes.A4);
        //            page.Margin(30);
        //            page.DefaultTextStyle(x => x.FontSize(12));

        //            page.Header().Text("Reporte de Cursos").Bold().FontSize(18).AlignCenter();

        //            page.Content().PaddingVertical(20).Column(col =>
        //            {
        //                // Agregar cada párrafo de manera estructurada
        //                foreach (var parrafo in contenidoLimpio.Split("\n"))
        //                {
        //                    col.Item().Text(parrafo.Trim()).FontSize(12);
        //                }
        //            });

        //            page.Footer().AlignRight().Text(x => x.CurrentPageNumber());
        //        });
        //    }).GeneratePdf();
        //}

        //private string LimpiarHtml(string html)
        //{
        //    // 1️⃣ Remover etiquetas HTML usando una expresión regular
        //    string textoPlano = Regex.Replace(html, "<.*?>", String.Empty);

        //    // 2️⃣ Decodificar caracteres HTML (&lt;, &gt;, &amp;)
        //    textoPlano = System.Web.HttpUtility.HtmlDecode(textoPlano);

        //    // 3️⃣ Eliminar espacios en blanco adicionales
        //    return textoPlano.Trim();
        //}
    }
}
