const { z } = require("zod");

const validateLeadData = async (postData) => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .min(10, "There should be at least 10 characters in the email"),
  });

  // Validate the input data and return the validated data, or an error message.
  let validatedData;
  let hasError;
  let message;

  try {
    validatedData = schema.parse(postData);
    hasError = false;
    message = "";
  } catch (error) {
    hasError = true;
    message = "Validation failed. Please provide valid email and description.";
  }

  return { data: validatedData, hasError, message };
};

module.exports = { validateLeadData };
