export class StringValidator {
  private static emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  static isValidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
  
  static isValidPassword(password: string): boolean {
    return this.passwordRegex.test(password);
  }
}