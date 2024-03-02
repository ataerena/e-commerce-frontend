export class StringValidator {
  static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  static passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  static isValidEmail(email) {
    return this.emailRegex.test(email);
  }
  
  static isValidPassword(password) {
    return this.passwordRegex.test(password);
  }
}