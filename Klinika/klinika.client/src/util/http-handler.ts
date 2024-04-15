interface ErrorDetail {
  response?: {
    status?: number;
  };
  request?: any;
}

type AxiosError = {
  message: string;
  name: string;
  stack: string;
  config: {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: any[];
    transformResponse: any[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: {};
    headers: {
      Accept: string;
    };
    baseURL: string;
    method: string;
    url: string;
  };
  code: string;
  status: null | number;
};

interface ErrorResponse {
  error?: ErrorDetail;
}

export default function getErrorMessage({ error }: ErrorResponse) {
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

// function getErrorMessage(error) {
//     if (error.response) {
//       switch (error.response.status) {
//         case 400:
//           return 'Oops! It seems there was an issue with the request. Please check the information you entered and try again.';
//         case 401:
//           return 'Sorry, you are not authorized to access this page. Please make sure you are logged in with the correct credentials.';
//         case 403:
//           return 'Sorry, you do not have permission to access this page. Please contact support if you believe this is an error.';
//         case 404:
//           return 'Oops! The page you are looking for cannot be found. Please check the URL or try navigating back to the homepage.';
//         case 500:
//           return 'Oops! Something went wrong on our end. Our team has been notified and we are working to fix it. Please try again later.';
//         default:
//           return 'Oops! Something unexpected happened while processing your request. Please try again later.';
//       }
//     } else if (error.request) {
//       return 'Oops! We are having trouble connecting to our servers. Please check your internet connection and try again.';
//     } else {
//       return 'Oops! We encountered an error while setting up your request. Please try again later or contact support for assistance.';
//     }
//   }
