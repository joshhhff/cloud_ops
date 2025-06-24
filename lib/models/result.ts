export interface ResultOptions<T = any> {
    success: boolean;
    data?: T;
    errorMessage?: string;
    errorCode?: string | number;
}

export default class Result<T = any> {
    readonly success: boolean;
    readonly data?: T;
    readonly errorMessage?: string;
    readonly errorCode?: string | number;

    private constructor(options: ResultOptions<T>) {
        this.success = options.success;
        this.data = options.data;
        this.errorMessage = options.errorMessage;
        this.errorCode = options.errorCode;
    }

    static ok<T>(data?: T): Result<T> {
        return new Result<T>({ success: true, data });
    }

    static fail<T>(
        errorMessage: string,
        errorCode?: string | number
    ): Result<T> {
        return new Result<T>({ success: false, errorMessage, errorCode });
    }
}