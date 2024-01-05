/**
 * Represents the result of a validation operation.
 */
export default class ValidationResult {
    private errors: string[] = [];

    /**
     * Adds error messages to the validation result.
     * @param errorMessage - The error messages to add.
     */
    addErrors(errorMessage: string[]) {
        this.errors.push(...errorMessage);
    }

    /**
     * Gets the error messages from the validation result.
     * @returns An array of error messages.
     */
    getErrors(): string[] {
        return this.errors;
    }

    /**
     * Checks if the validation result has any errors.
     * @returns True if there are errors, false otherwise.
     */
    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    /**
     * Checks if the validation result is valid.
     * @returns True if there are no errors, false otherwise.
     */
    get isValid(): boolean {
        return this.errors.length === 0;
    }
}
