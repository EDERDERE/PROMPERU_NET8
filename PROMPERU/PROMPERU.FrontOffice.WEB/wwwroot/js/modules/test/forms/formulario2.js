import { regionOptions } from "../constants/region.js";

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
            message: "",
          },
        },
        {
          type: "text",
          name: "legalName",
          label: "Razón Social",
          placeholder: "Ingresa tu Razón Social",
          required: true,
          validation: {
            pattern: "",
            message: "",
          },
        },
        {
          type: "text",
          name: "tradeName",
          label: "Nombre Comercial",
          placeholder: "Ingresa tu Nombre Comercial",
          required: true,
          validation: {
            pattern: "",
            message: "",
          },
        },
        {
          type: "text",
          name: "phone",
          label: "Teléfono",
          placeholder: "Ingresa tu Teléfono ",
          required: true,
          validation: {
            pattern: "",
            message: "",
          },
        },
        {
          type: "text",
          name: "fullName",
          label: "Nombres y Apellidos",
          placeholder: "Ingresa tus Nombres y Apellidos",
          required: true,
          validation: {
            pattern: "",
            message: "",
          },
        },
        {
          type: "email",
          name: "email",
          label: "Correo Electrónico",
          placeholder: "Ingresa tu correo electrónico",
          required: true,
        },
        {
          type: "select",
          name: "region",
          label: "Región",
          options: regionOptions,
          required: true,
        },
        {
          type: "select",
          name: "provincia",
          label: "Provincia",
          options: [],
          required: true,
        },
        {
          type: "select",
          name: "tipo-empresa",
          label: "¿Cuál es el tipo de su empresa turística?",
          options: [
            { value: "1", text: "microempresa" },
            { value: "2", text: "pequeña empresa" },
            { value: "3", text: "empresa" },
          ],
          required: true,
        },
        {
          type: "select",
          name: "hospedaje",
          label:
            "¿Cuál es la categoría y/o clasificación de su establecimiento de hospedaje?",
          options: [
            { value: "1", text: "casa" },
            { value: "2", text: "departamento" },
            { value: "3", text: "alquiler" },
          ],
          required: true,
        },
      ],
    },
  ],
};
