export const validateForm = (formData) => {
  for (const key in formData) {
    if (
      formData[key] === undefined ||
      formData[key] === null ||
      formData[key] === ""
    ) {
      return false; // Form is invalid
    }
  }
  return true; // Form is valid
};
