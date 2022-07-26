class Validator {
  constructor() {
    this.nameErr = "";
    this.emailErr = "";
    this.passwordErr = "";
  }

  validateName(input) {
    if(input.validity.valid) {
      this.nameErr = "";
    } else {
      this.nameErr = input.validationMessage;
    }
  }

  validateEmail(input) {
    if(input.checkValidity()) {
      this.emailErr = "";
    } else {
      this.emailErr = input.validationMessage;
    }
  }

  validatePassword(input) {
    if(input.checkValidity()) {
      this.passwordErr = "";
    } else {
      this.passwordErr = input.validationMessage;
    }

  }
}

const vldtr = new Validator();

export { vldtr };
