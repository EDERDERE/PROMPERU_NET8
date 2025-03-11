export default {
  "tests": [
    {
      "title": "Test Tipo A",
      "icono": "../../shared/assets/inscripcion/diagnostic.svg",
      "value":"A",
      "current": true
    },
    {
      "title": "Test Tipo B",
      "icono": "../../shared/assets/inscripcion/diagnostic.svg",
      "value":"B",
      "current": false
    },
    {
      "title": "Test Tipo C",
      "icono": "../../shared/assets/inscripcion/diagnostic.svg",
      "value":"C",
      "current": false
    }
  ],
  "testType": {
    "value": "A",
    "label": "Test Tipo A"
  },
  "hasInstructions": true,
  "instructions": {
    "title": "Instrucciones del Test",
    "description": `<p>
          Con esta evaluación conocerás la capacidad de tu empresa para afrontar los retos del sector turismo.
          Te pedimos que este test sea respondido por la persona que toma las decisiones comerciales en la
          empresa (gerente general, gerente comercial, gerente de ventas o propietario); así como, la persona
          que se encarga del área digital para responder el tercer módulo de presencia digital.
        </p>
        <p>
          Debes de llenar el 100% del test para que puedas recibir los resultados del diagnóstico de tu empresa.
        </p>
        <p>
          Si tienes alguna duda sobre el test, puedes escribir a: <a
            href="mailto:programacomercialruta@promperu.gob.pe">programacomercialruta@promperu.gob.pe</a>
        </p>`,
    "alert": "<p>Las respuestas marcadas no podrán modificarse después del envío.</p>",
    "alertIcon": "../../shared/assets/inscripcion/alert-triangle.png",
    "buttonText": "Iniciar Test",
    "buttonIcon": "icono-inicio.png"
  },
  "elements": [
    {
      "id": 1,
      "order":1,
      "type": "question",
      "questionText": "¿Cuál es la capital de España?",
      "isComputable": false,
      "category": "Geografía",
      "answerType": "single_choice",
      "answers": [
        {
          "text": "Madrid",
          "value": null
        },
        {
          "text": "Barcelona",
          "value": null
        },
        {
          "text": "Valencia",
          "value": null
        }
      ]
    },
    {
      "id": 2,
      "order":2,
      "type": "question",
      "questionText": "¿Cuánto es 5 + 3?",
      "isComputable": true,
      "course": {
        "value": "B",
        "label": "Direccion de empresas"
      },
      "answerType": "multiple_choice",
      "answers": [
        {
          "text": "6",
          "value": 0
        },
        {
          "text": "8",
          "value": 1
        },
        {
          "text": "10",
          "value": 0
        }
      ]
    },

    {
      "id": 3,
      "order":3,
      "type": "question",
      "questionText": "Describe la importancia de la fotosíntesis.",
      "isComputable": false,
      "category": "Biología",
      "answerType": "text",
      "text": "texto"
    },

    {
      "id": 4,
      "order":4,
      "type": "cover",
      "title": "Bienvenido al Test",
      "description": "<p>Este test te ayudará a evaluar tus conocimientos.</p>"
    },
    {
      "id": 5,
      "order":5,
      "type": "form",
      "selectedForm": {
        "value": "form_contac",
        "label": "Formulario de Contacto"
      }
    }
  ]
}
