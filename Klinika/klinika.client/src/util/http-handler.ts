import {AxiosError} from "axios";

interface ErrorResponse {
    error?: AxiosError;
}

export default function getErrorMessage({error}: ErrorResponse) {
    if (error?.response) {
        switch (error.response.status) {
            case 400:
                return "The server could not understand the request due to invalid syntax.";
            case 401:
                return "Access to the requested resource is unauthorized. Please authenticate.";
            case 403:
                return "You do not have permission to access the requested resource.";
            case 404:
                return "The requested resource could not be found on the server.";
            case 500:
                return "The server encountered an unexpected condition that prevented it from fulfilling the request.";
            case 502:
                return "The server received an invalid response from the upstream server.";
            case 503:
                return "The server is currently unavailable. Please try again later.";
            case 504:
                return "The server did not receive a timely response from the upstream server.";
            default:
                return "An unexpected error occurred while processing your request.";
        }
    } else if (error?.request) {
        return "No response was received from the server. Please try again later.";
    } else {
        return "An error occurred while setting up the request. Please check your network connection and try again.";
    }
}

export function isAxiosError(error: unknown): error is AxiosError {
    return (
        (error as AxiosError).message !== undefined &&
        (error as AxiosError).name !== undefined &&
        (error as AxiosError).stack !== undefined &&
        (error as AxiosError).config !== undefined &&
        (error as AxiosError).code !== undefined
    );
}