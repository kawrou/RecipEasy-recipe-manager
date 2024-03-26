export const isEmpty = (value) => {
  return !value.trim();
};

export const validateLoginForm = (email, password) => {
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Email and password must be strings");
  }

  let validationErrMsg = {};

  if (isEmpty(email)) {
    validationErrMsg.email = "Email address is required";
  }

  if (isEmpty(password)) {
    validationErrMsg.password = "Password is required";
  }

  return Object.keys(validationErrMsg).length === 0 ? null : validationErrMsg;
};
