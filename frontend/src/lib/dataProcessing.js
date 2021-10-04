export const readFormData = (inputs) => {
  return new Promise((resolve, reject) => {
    let hasFiles = false;
    const data = new FormData();
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].name) continue;
      if (inputs[i].files) {
        hasFiles = true;
        const reader = new FileReader();
        reader.readAsDataURL(inputs[i].files[0]);
        reader.onload = () => {
          data.append(inputs[i].name, reader.result);
          resolve(data);
        };
        continue;
      }
      data.append(inputs[i].name, inputs[i].value);
      if (i >= inputs.length - 1 && !hasFiles) resolve(data);
    }
  });
};

export const data = () => {};
