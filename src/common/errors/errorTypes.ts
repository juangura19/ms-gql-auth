export enum ErrorType {
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    FORBIDDEN = 'FORBIDDEN',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export class AppGraphQLError extends Error {
    type: ErrorType;

    constructor(message: string, type: ErrorType) {
        super(message);
        this.type = type;
        this.name = 'AppGraphQLError';
    }
}