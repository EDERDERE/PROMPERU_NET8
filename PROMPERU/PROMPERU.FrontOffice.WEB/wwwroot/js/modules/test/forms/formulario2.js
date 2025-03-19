export default {
    id: "userForm",
    sections: [
      {
        title: "",
        fields: [
          {
            type: "text",
            name: "ruc",
            label: "RUC",
            placeholder: "Ingresa tu ruc",
            required: true,
            validation: {
              pattern: "",
              message: ""
            }
          },
          {
            type: "text",
            name: "razon-social",
            label: "Razón Social",
            placeholder: "Ingresa tu Razón Social",
            required: true,
            validation: {
              pattern: "",
              message: ""
            }
          },
          {
            type: "text",
            name: "nombre-comercial",
            label: "Nombre Comercial",
            placeholder: "Ingresa tu Nombre Comercial",
            required: true,
            validation: {
              pattern: "",
              message: ""
            }
          },
          {
            type: "text",
            name: "phone",
            label: "Teléfono",
            placeholder: "Ingresa tu Teléfono ",
            required: true,
            validation: {
              pattern: "",
              message: ""
            }
          },
          {
            type: "text",
            name: "names",
            label: "Nombres y Apellidos",
            placeholder: "Ingresa tus Nombres y Apellidos",
            required: true,
            validation: {
              pattern: "",
              message: ""
            }
          },
          {
            type: "email",
            name: "email",
            label: "Correo Electrónico",
            placeholder: "Ingresa tu correo electrónico",
            required: true
          },
          {
            type: "select",
            name: "region",
            label: "Región",
            options: [
              { value: "1", text: "Costa" },
              { value: "2", text: "Sierra" },
              { value: "3", text: "Selva" }
            ],
            required: true
          },
          {
            type: "select",
            name: "provincia",
            label: "Provincia",
            options: [
              { value: "1", text: "Lima" },
              { value: "2", text: "Junin" },
              { value: "3", text: "Ucayali" }
            ],
            required: true
          },
          {
            type: "select",
            name: "tipo-empresa",
            label: "¿Cuál es el tipo de su empresa turística?",
            options: [
              { value: "1", text: "microempresa" },
              { value: "2", text: "pequeña empresa" },
              { value: "3", text: "empresa" }
            ],
            required: true
          },
          {
            type: "select",
            name: "hospedaje",
            label: "¿Cuál es la categoría y/o clasificación de su establecimiento de hospedaje?",
            options: [
              { value: "1", text: "casa" },
              { value: "2", text: "departamento" },
              { value: "3", text: "alquiler" }
            ],
            required: true
          },
        ]
      },
    ]
  };