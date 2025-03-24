export function renderForm(schema, initialData = {}) {
  const form = document.createElement("form");
  form.id = schema.id;

  const errors = initialData.errors || {};

  schema.sections.forEach((section) => {
    const sectionWrapper = document.createElement("div");
    sectionWrapper.className = "form-section";

    const fieldsWrapper = document.createElement("div");
    fieldsWrapper.className = "form-section-fields";

    if (section.title) {
      const sectionTitle = document.createElement("h3");
      sectionTitle.textContent = section.title;
      sectionWrapper.appendChild(sectionTitle);
    }

    section.fields.forEach((field) => {
      const wrapper = document.createElement("div");
      wrapper.className = "form-group";

      const label = document.createElement("label");
      label.textContent = field.label;
      label.htmlFor = field.name;
      wrapper.appendChild(label);

      let input;
      if (field.type === "select") {
        input = document.createElement("select");
        field.options.forEach((option) => {
          const opt = document.createElement("option");
          opt.value = option.value;
          opt.textContent = option.text;
          if (
            initialData[field.name] !== undefined &&
            initialData[field.name] === option.value
          ) {
            opt.selected = true;
            opt.setAttribute("selected", "selected");
          }
          input.appendChild(opt);
        });
      } else {
        input = document.createElement("input");
        input.type = field.type;
        if(field.min){
          input.min = field.min
        }
        if(field.max){
          input.max = field.max
        }
      }

      input.name = field.name;
      input.placeholder = field.placeholder || "";
      if (field.required) input.required = true;
      if (field.validation?.pattern) input.pattern = field.validation.pattern;
      if (field.validation?.minLength)
        input.minLength = field.validation.minLength;

      if (
        initialData[field.name] !== undefined &&
        initialData[field.name].toString().trim() !== ""
      ) {
        input.value = initialData[field.name];
        input.setAttribute("value", initialData[field.name]);
        if (["ruc", "legalName", "tradeName"].includes(field.name)) {
          input.disabled = true;
        }
      }

      if (errors[field.name] && errors[field.name].trim() !== "") {
        input.classList.add("is-invalid");
      }

      wrapper.appendChild(input);

      if (field.validation?.message) {
        const error = document.createElement("div");
        error.className = "invalid-feedback";
        error.textContent = errors[field.name] || field.validation.message;
        wrapper.appendChild(error);
      }

      fieldsWrapper.appendChild(wrapper);
    });
    sectionWrapper.appendChild(fieldsWrapper);
    form.appendChild(sectionWrapper);
  });

  return form.outerHTML;
}
