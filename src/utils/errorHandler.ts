class ErrorHandler {
    static handle(error: Error, statusCode = 500) {
        if (error instanceof CustomError) {
            return error;
        }

        console.error(error);

        const message = `${error.message || 'An internal server error occurred.'} (Status Code: ${statusCode})`;

        return new CustomError(message, statusCode, error);
    }

    static custom(message: string, statusCode = 500, originalError?: Error) {
        return new CustomError(message, statusCode, originalError);
    }
}

class CustomError extends Error {
    statusCode: number;
    originalError?: Error;

    constructor(message: string, statusCode: number, originalError?: Error) {
        super(message);
        this.statusCode = statusCode;
        this.originalError = originalError;
    }
}

export { ErrorHandler };
