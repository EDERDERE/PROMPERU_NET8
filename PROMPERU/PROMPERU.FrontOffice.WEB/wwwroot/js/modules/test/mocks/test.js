export default {
  "steps": [
      {
          "id": 2,
          "stepNumber": 1,
          "iconName": "Test de Diagnóstico",
          "iconUrl": "../../shared/assets/home/etapas/cursos.svg",
          "current": true,
          "isComplete": false,
          "isApproved": false
      },
      {
          "id": 3,
          "stepNumber": 2,
          "iconName": "Inscripción del Programa",
          "iconUrl": "../../shared/assets/home/etapas/inscripcion.svg",
          "current": false,
          "isComplete": false,
          "isApproved": false
      },
      {
          "id": 4,
          "stepNumber": 3,
          "iconName": "Inscripción de Cursos",
          "iconUrl": "../../shared/assets/home/etapas/cursos.svg",
          "current": false,
          "isComplete": false,
          "isApproved": false
      },
      {
          "id": 5,
          "stepNumber": 4,
          "iconName": "Test de Salida",
          "iconUrl": "../../shared/assets/home/etapas/test.svg",
          "current": false,
          "isComplete": false,
          "isApproved": false
      }
  ],
  "activeTest": {
      "testType": {
          "value": 2,
          "label": "Test de Diagnóstico"
      },
      "hasInstructions": true,
      "instructions": {
          "id": 32,
          "title": "Diagnóstico Empresarial",
          "description": "<p>Con esta evaluación conocerás la capacidad de tu empresa para afrontar los retos del sector turismo. Te pedimos que este test sea respondido por la persona que toma las decisiones comerciales en la empresa  (gerente general, gerente comercial, gerente de ventas o propietario); así como, la persona que se encarga  del área digital para responder el tercer módulo de presencia digital.</p><p><br></p><p>Debes de llenar el 100% del test para que puedas recibir los resultados del diagnóstico de tu empresa.</p><p><br></p><p>Si tienes alguna duda sobre el test, puedes escribir a: <a href=\"mailto:programacomercialruta@promperu.gob.pe\" target=\"_blank\">programacomercialruta@promperu.gob.pe</a></p>",
          "alert": "<p>Recuerda que debes leer detenidamente las instrucciones, recuerda que no puedes regresar a este punto.</p>",
          "alertIcon": "../../shared/assets/home/etapas/cursos.svg",
          "buttonText": "Iniciar Diagnostico",
          "buttonIcon": "../../shared/assets/home/etapas/cursos.svg"
      },
      "elements": [
          {
              "id": 35,
              "order": 1,
              "type": "form",
              "questionText": null,
              "isComputable": null,
              "label": null,
              "category": null,
              "answerType": null,
              "answers": null,
              "selectAnswers": null,
              "course": null,
              "title": null,
              "description": null,
              "selectedForm": {
                  "id": 35,
                  "value": "generalBusinessTest",
                  "label": "Datos Generales - Test Empresarial / Test Salida"
              },
              "completed": true
          },
          {
              "id": 108,
              "order": 2,
              "type": "question",
              "questionText": "¿Qué tipo de turismo atiende?",
              "isComputable": false,
              "label": "",
              "category": "Detalles de la empresa",
              "answerType": "singleChoice",
              "answers": [
                  {
                      "id": 149,
                      "order": 1,
                      "text": "Turismo Receptivo",
                      "value": 0
                  },
                  {
                      "id": 150,
                      "order": 2,
                      "text": "Turismo Interno",
                      "value": 0
                  },
                  {
                      "id": 151,
                      "order": 3,
                      "text": "Turismo Emisor",
                      "value": 0
                  }
              ],
              "selectAnswers": [
                  {
                      "id": 150
                  }
              ],
              "course": null,
              "title": null,
              "description": null,
              "selectedForm": null,
              "completed": true
          },
          {
              "id": 109,
              "order": 3,
              "type": "question",
              "questionText": "¿Cuál de los siguientes canales de venta utiliza? (puede marcar más de una opción)",
              "isComputable": false,
              "label": "",
              "category": "Detalles de la empresa",
              "answerType": "multipleChoice",
              "answers": [
                  {
                      "id": 152,
                      "order": 1,
                      "text": "Booking, Expedia o similares",
                      "value": 0
                  },
                  {
                      "id": 153,
                      "order": 2,
                      "text": "Local (puerta a la calle)",
                      "value": 0
                  },
                  {
                      "id": 154,
                      "order": 3,
                      "text": "Agencia de viajes",
                      "value": 0
                  },
                  {
                      "id": 155,
                      "order": 4,
                      "text": "Página web propia",
                      "value": 0
                  },
                  {
                      "id": 156,
                      "order": 5,
                      "text": "Teléfono",
                      "value": 0
                  },
                  {
                      "id": 157,
                      "order": 6,
                      "text": "WhatsApp",
                      "value": 0
                  },
                  {
                      "id": 158,
                      "order": 7,
                      "text": "Instagram",
                      "value": 0
                  },
                  {
                      "id": 159,
                      "order": 8,
                      "text": "Facebook",
                      "value": 0
                  }
              ],
              "selectAnswers": [
                  {
                      "id": 154
                  },
                  {
                      "id": 155
                  },
                  {
                      "id": 157
                  }
              ],
              "course": null,
              "title": null,
              "description": null,
              "selectedForm": null,
              "completed": true
          },
          {
              "id": 91,
              "order": 4,
              "type": "question",
              "questionText": "Número de trabajadores",
              "isComputable": false,
              "label": "Ingresa el N° de trabajadores",
              "category": "Detalles de la empresa",
              "answerType": "text",
              "answers": [],
              "selectAnswers": [
                  {
                      "input": "Hola mundo"
                  }
              ],
              "course": null,
              "title": null,
              "description": null,
              "selectedForm": null,
              "completed": false
          },
          {
              "id": 107,
              "order": 5,
              "type": "question",
              "questionText": "Procesos pre establecidos de ventas (protocolos de venta)",
              "isComputable": true,
              "label": "",
              "category": "",
              "answerType": "singleChoice",
              "answers": [
                  {
                      "id": 147,
                      "order": 1,
                      "text": "Se ha establecido sin planificación previa o sustento técnico.",
                      "value": 1
                  },
                  {
                      "id": 148,
                      "order": 2,
                      "text": "Cuenta con un protocolo de ventas diseñado para  su empresa pero no lo han implementado aún.",
                      "value": 2
                  },
                  {
                      "id": 160,
                      "order": 3,
                      "text": "Ha iniciado la implantación de los procesos pre establecidos de ventas están en etapa de prueba o inicial.",
                      "value": 3
                  },
                  {
                      "id": 161,
                      "order": 4,
                      "text": "Aplica todos los procesos pre establecidos de ventas.",
                      "value": 4
                  },
                  {
                      "id": 162,
                      "order": 5,
                      "text": "Aplica los procesos pre establecidos de ventas y ha evaluado o realizado una medición de resultados.",
                      "value": 5
                  }
              ],
              "selectAnswers": [
                  {
                      "id": 160
                  }
              ],
              "course": {
                  "value": 13,
                  "label": "Ventas"
              },
              "title": null,
              "description": null,
              "selectedForm": null,
              "completed": false
          },
          {
              "id": 110,
              "order": 6,
              "type": "question",
              "questionText": "Herramientas de análisis y diagnóstico (para la elaboración del plan de marketing)",
              "isComputable": true,
              "label": "",
              "category": "",
              "answerType": "singleChoice",
              "answers": [
                  {
                      "id": 163,
                      "order": 1,
                      "text": "Se ha establecido sin planificación previa o sustento técnico.",
                      "value": 1
                  },
                  {
                      "id": 164,
                      "order": 2,
                      "text": "Se ha establecido un procedimiento para el análisis de fortalezas, debilidades, oportunidades y amenazas, pero aún no se ha implementado.",
                      "value": 2
                  },
                  {
                      "id": 165,
                      "order": 3,
                      "text": "Ha iniciado acciones para lograr un  análisis de fortalezas, debilidades, oportunidades y amenazas.",
                      "value": 3
                  },
                  {
                      "id": 166,
                      "order": 4,
                      "text": "Aplica el análisis de fortalezas, debilidades, oportunidades y amenazas para innovar en las estrategias comerciales.",
                      "value": 5
                  },
                  {
                      "id": 167,
                      "order": 5,
                      "text": "Aplica el análisis de fortalezas, debilidades, oportunidades y amenazas y lo vincula a la toma de decisiones comerciales.",
                      "value": 4
                  }
              ],
              "selectAnswers": [
                  {
                      "id": 165
                  }
              ],
              "course": {
                  "value": 12,
                  "label": "Segmentación"
              },
              "title": null,
              "description": null,
              "selectedForm": null,
              "completed": false
          },
          {
              "id": 111,
              "order": 7,
              "type": "question",
              "questionText": "¿La empresa anuncia en Booking?",
              "isComputable": true,
              "label": "",
              "category": "",
              "answerType": "singleChoice",
              "answers": [
                  {
                      "id": 168,
                      "order": 1,
                      "text": "Si",
                      "value": 0
                  },
                  {
                      "id": 169,
                      "order": 2,
                      "text": "No",
                      "value": 1
                  }
              ],
              "selectAnswers": [
                  {
                      "id": 168
                  }
              ],
              "course": {
                  "value": 13,
                  "label": "Ventas"
              },
              "title": null,
              "description": null,
              "selectedForm": null,
              "completed": false
          },
          {
              "id": 112,
              "order": 8,
              "type": "question",
              "questionText": "Promociones en OTAs y metabuscadores",
              "isComputable": true,
              "label": "",
              "category": "",
              "answerType": "singleChoice",
              "answers": [
                  {
                      "id": 170,
                      "order": 1,
                      "text": "Conoce sobre la importancia de las campañas promocionales en las OTAs/metabuscadores u otros, pero no las realiza.",
                      "value": 1
                  },
                  {
                      "id": 171,
                      "order": 2,
                      "text": "Se tiene una clara idea de cómo desarrollar campañas promocionales en las OTAs/metabuscadores u otros, pero todavía está en desarrollo.",
                      "value": 2
                  },
                  {
                      "id": 172,
                      "order": 3,
                      "text": "Se ha planificado desarrollar campañas promocionales en las OTAs/metabuscadores u otros, pero está en etapa inicial o de prueba.",
                      "value": 3
                  },
                  {
                      "id": 173,
                      "order": 4,
                      "text": "Se aplican campañas promocionales en las OTAs/metabuscadores u otros, pero de manera esporádica.",
                      "value": 4
                  },
                  {
                      "id": 174,
                      "order": 5,
                      "text": "Se aplican campañas promocionales en las OTAs/metabuscadores u otros, de manera periódica y planificada.",
                      "value": 5
                  }
              ],
              "selectAnswers": [
                  {
                      "id": 172
                  }
              ],
              "course": {
                  "value": 12,
                  "label": "Segmentación"
              },
              "title": null,
              "description": null,
              "selectedForm": null,
              "completed": false
          }
      ]
  },
  "evaluated": {
      "ruc": "10011280604",
      "legalName": "GELACIO CACHAY JOSE FERNANDO",
      "tradeName": "HOSPEDAJE VISTA VERDE",
      "phone": "",
      "email": "",
      "address": "JR.RAMON CASTILLA NRO. 930 URB.  LOS JARDINES  SAN MARTIN - SAN MARTIN - TARAPOTO",
      "region": "",
      "province": ""
  }
}