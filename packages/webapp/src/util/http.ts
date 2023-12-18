import { ApiError, AuthenticationError } from "./error";

const JSON_TYPES = ["application/json"];

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = <T>(path: string) => {
    return this.invoke<T>("GET", path);
  };

  post = <T>(path: string, body?: unknown) => {
    return this.invoke<T>("POST", path, body);
  };

  put = <T>(path: string, body?: unknown) => {
    return this.invoke<T>("PUT", path, body);
  };

  delete = <T>(path: string) => {
    return this.invoke<T>("DELETE", path);
  };

  private invoke = <T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> => {
    const { abort, signal } = new AbortController();
    const headers = this.getHeaders(body);

    const request = new Request(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
      signal,
    });

    const promise = fetch(request)
      .then(this.verifyAuthenticated)
      .then(this.verifyResponseOk)
      .then((res) => (this.isJsonResponse(res) ? res.json() : res));

    // @ts-ignore
    promise.cancel = () => {
      abort();
    };

    return promise;
  };

  private verifyAuthenticated = async (response: Response) => {
    if (response.status === 401) {
      this.dispatchUnAuthenticatedEvent();
      return Promise.reject(new AuthenticationError());
    }

    return response;
  };

  private verifyResponseOk = (response: Response) => {
    if (!response.ok) {
      return this.isJsonResponse(response)
        ? response
          .json()
          .then((body) => Promise.reject(new ApiError(response, body)))
        : Promise.reject(response);
    }
    return response;
  };

  private isJsonResponse = (response: Response) => {
    return JSON_TYPES.some((type) =>
      response.headers.get("Content-Type")?.includes(type)
    );
  };

  private dispatchUnAuthenticatedEvent = () => {
    window.dispatchEvent(
      new CustomEvent("unAuthenticated", {
        detail: { returnUrl: location.pathname },
      })
    );
  };

  private getHeaders = (body?: unknown) => {
    const headers = new Headers();

    if (body instanceof FormData) {
      return headers;
    }
    headers.append("Content-Type", "application/json");
    return headers;
  };
}

export const client = new HttpClient(process.env.NEXT_PUBLIC_API_DESTINATION ??
  "https://api-service-ehe4ffvi7q-uc.a.run.app/api");
