import { regionOptions } from "../constants/region.js";
import { tourismBusinessTypeOptions } from "../constants/selects.js";
import {
  ANY_INPUT_REGEX,
  NAME_REGEX,
  NUMBERS_REGEX,
  PHONE_REGEX,
} from "../utils/validators.js";

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
          required: true,
          validation: {
            message: "Selecciona una Provincia",
          },
        },
        {
          type: "select",
          name: "tourismBusinessType",
          label: "¿Cuál es el tipo de su empresa turística?",
          options: tourismBusinessTypeOptions,
          required: true,
          validation: {
            message: "Selecciona el tipo de empresa",
          },
        },
        {
          type: "text",
          name: "lodgingCategory",
          label:
            "¿Cuál es la categoría y/o clasificación de su establecimiento de hospedaje?",

          required: true,
          validation: {
            pattern: ANY_INPUT_REGEX,
            message: "Selecciona la categoría de hospedaje",
          },
        },
      ],
    },
  ],
};
