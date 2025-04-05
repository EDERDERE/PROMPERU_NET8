import { regionOptions } from "../constants/region.js";
import { tourismBusinessTypeOptions } from "../constants/selects.js";
import { NAME_REGEX, NUMBERS_REGEX, PHONE_REGEX } from "../utils/validators.js";

export default {
  id: "userForm",
  title: "Datos Generales",
  sections: [
    {
      fields: [
        {
          type: "text",
          name: "ruc",
          label: "RUC",
          placeholder: "Ingresa tu ruc",
          required: true,
          disabled: true,
          validation: {
            pattern: NUMBERS_REGEX,
            message: "Por favor, ingresa tu RUC",
          },
        },
        {
          type: "text",
          name: "legalName",
          label: "Razón Social",
          placeholder: "Ingresa tu Razón Social",
          required: true,
          disabled: true,
          validation: {
            pattern: NAME_REGEX,
            message: "Por favor, ingresa la Razón Social",
          },
        },
        {
          type: "text",
          name: "tradeName",
          label: "Nombre Comercial",
          placeholder: "Ingresa tu Nombre Comercial",
          required: true,
          disabled: true,
          validation: {
            message: "Por favor, ingresa el Nombre Comercial",
          },
        },
        {
          type: "text",
          name: "phone",
          label: "Teléfono",
          placeholder: "Ingresa tu Teléfono ",
          min: 9,
          required: true,
          disabled: true,
          validation: {
            pattern: PHONE_REGEX,
            message:
              "Ingresa un teléfono válido: este campo es obligatorio y solo acepta números.",
          },
        },
        {
          type: "text",
          name: "fullName",
          label: "Nombres y Apellidos",
          placeholder: "Ingresa tus Nombres y Apellidos",
          required: true,
          disabled: true,
          validation: {
            pattern: NAME_REGEX,
            minLength: 5,
            message: "Por favor, ingresa tus Nombres y Apellidos",
          },
        },
        {
          type: "email",
          name: "email",
          label: "Correo Electrónico",
          placeholder: "Ingresa tu correo electrónico",
          disabled: true,
          required: true,
          validation: {
            message: "Por favor, ingresa un correo electrónico válido",
          },
        },
        {
          type: "select",
          name: "region",
          label: "Región",
          options: regionOptions,
          disabled: true,
          required: true,
          validation: {
            message: "Selecciona una Región",
          },
        },
        {
          type: "select",
          name: "province",
          label: "Provincia",
          options: [{ value: "", text: "Seleccione una provincia" }],
          disabled: true,
          required: true,
          validation: {
            message: "Selecciona una Provincia",
          },
        },
        {
          type: "date",
          name: "startDate",
          label: "Fecha de inicio de actividades",
          placeholder: "Ingrese fecha",
          required: true,
          validation: {
            message: "Selecciona el tipo de empresa",
          },
        },
        {
          type: "text",
          name: "lodgingCategory",
          label: "Tipo de personería",
          options: tourismBusinessTypeOptions,
          required: true,
          validation: {
            message: "Selecciona tipo de personería",
          },
        },
        {
          type: "select",
          name: "tourismBusinessType",
          label: "Tipo de empresa",
          options: tourismBusinessTypeOptions,
          required: true,
          validation: {
            message: "Selecciona una Empresa",
          },
        },
        {
          type: "select",
          name: "tourismServiceProviderType",
          label: "Tipo de prestador de servicios turísticos",
          options: tourismBusinessTypeOptions,
          required: true,
          validation: {
            message: "Seleccione un tipo",
          },
        },
        {
          type: "text",
          name: "tourismServiceProviderType",
          label: "Objeto social / Actividad económica",
          placeholder: "Ingrese su objeto social",
          required: true,
          validation: {
            message: "Ingresa un objeto social/ actividad económica",
          },
        },
        {
          type: "text",
          name: "localPhone",
          label: "Telefono fijo",
          placeholder: "Ingrese su telefono fijo ",
          min: 6,
          required: true,
          validation: {
            pattern: PHONE_REGEX,
            message:
              "Ingresa un teléfono válido: este campo es obligatorio y solo acepta números.",
          },
        },

        {
          type: "text",
          name: "website",
          label: "Pagina web",
          placeholder: "Ingrese la url de su pagina web ",
          required: true,
          validation: {
            message: "Ingresa una página web.",
          },
        },
      ],
    },
  ],
};
