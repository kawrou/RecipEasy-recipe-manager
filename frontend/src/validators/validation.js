export const validateLoginForm = (email, password) => {

    const validationMsg = {};
    if (!email.trim()) {
      validationMsg.email =
        "Email address field was empty. Please enter an email address";
    }

    if (!password.trim()) {
      validationMsg.password =
        "Password field was empty. Please enter your password";
    }

    setValidation(validationMsg);
    
    if (Object.keys(validationMsg).length > 0){
      return
    }


    return
}