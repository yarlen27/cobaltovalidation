export default class ValidationResult {
  private errors: string[] = [];

  addErrors(errorMessage: string[]) {
    this.errors.push(...errorMessage);
  }

  getErrors(): string[] {
    return this.errors;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  get isValid(): boolean {
    return this.errors.length === 0;
  }
}
