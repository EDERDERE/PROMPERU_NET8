export default {
  id: "userForm",
  title: "Solicitud de Inscripción",
  sections: [
    {
      subtitle:
        "Inscripción  en el Registro de Personas Jurídicas de la Sunarp",
      fields: [
        {
          type: "text",
          name: "registral",
          label: "Partida Registral N°",
          placeholder: "Ingrese su N° de partida",
          required: true,
          validation: {
            message: "Por favor, ingresa tu partida",
          },
        },
        {
          type: "text",
          name: "asiento",
          label: "Asiento N°",
          placeholder: "Ingrese su N° de asiento",
          required: true,
          validation: {
            message: "Por favor, ingresa su N° de asiento",
          },
        },
        {
          type: "text",
          name: "city",
          label: "Ciudad (Oficia Registral)",
          placeholder: "Ingrese su lugar de oficina",
          required: true,
          validation: {
            message: "Por favor, ingrese su lugar de oficina",
          },
        },
      ],
    },
    {
      subtitle: "Domicilio",
      fields: [
        {
          type: "text",
          name: "district",
          label: "Distrito",
          placeholder: "Escriba su distrito",
          required: true,
          validation: {
            message: "Por favor, ingresa su distrito",
          },
        },
        {
          type: "text",
          name: "urbanization",
          label: "Av./Calle/Psje./Jr.°",
          placeholder: "Ingrese su dirección",
          required: true,
          validation: {
            message: "Por favor, ingrese su dirección",
          },
        },
        {
          type: "text",
          name: "urbanization",
          label: "Urbanización",
          placeholder: "Ingrese su urbanización",
          required: true,
          validation: {
            message: "Por favor, ingrese su urbanización",
          },
        },
        {
          type: "text",
          name: "postalCode",
          label: "Codigo postal",
          placeholder: "Ingrese su codigo postal",
          required: true,
          validation: {
            message: "Por favor, ingrese su codigo postal",
          },
        },
      ],
    },
  ],
};
