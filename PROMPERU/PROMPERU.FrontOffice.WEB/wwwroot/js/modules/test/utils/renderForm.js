export function renderForm(schema, initialData = {}) {
  const form = document.createElement("form");
  form.id = schema.id;

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
          input.appendChild(opt);
        });
      } else {
        input = document.createElement("input");
        input.type = field.type;
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
        input.disabled = true;
      }

      wrapper.appendChild(input);

      if (field.validation?.message) {
        const error = document.createElement("div");
        error.className = "invalid-feedback";
        error.textContent = field.validation.message;
        wrapper.appendChild(error);
      }

      fieldsWrapper.appendChild(wrapper);
    });
    sectionWrapper.appendChild(fieldsWrapper);
    form.appendChild(sectionWrapper);
  });

  return form.outerHTML;
}
