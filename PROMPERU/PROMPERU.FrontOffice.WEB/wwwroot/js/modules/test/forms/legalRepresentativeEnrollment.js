export default {
  id: "userForm",
  title: "Solicitud de Inscripción",
  sections: [
    {
      subtitle: "Datos del Representante Legal",
      fields: [
        {
          type: "text",
          name: "fullNameRepresentative",
          label: "Nombres y Apellidos",
          placeholder: "Ingrese sus Nombres y Apellidos",
          required: true,
          validation: {
            message: "Por favor, ingrese sus Nombres y Apellidosa",
          },
        },
        {
          type: "text",
          name: "documentType",
          label: "Tipo de documento de identidad",
          placeholder: "Seleccione su tipo de documento",
          required: true,
          validation: {
            message: "Por favor, ingresa su N° de asiento",
          },
        },
        {
          type: "text",
          name: "documentNumber",
          label: "Número de documento",
          placeholder: "Ingrese su N° de documento",
          required: true,
          validation: {
            message: "Por favor, ingrese su N° de documento",
          },
        },
      ],
    },
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
            message: "Por favor, ingrese su N° de partida",
          },
        },
        {
          type: "text",
          name: "asiento",
          label: "Asiento N°",
          placeholder: "Ingrese su N° de asiento",
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
  ],
};
