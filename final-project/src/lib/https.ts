import wretch from 'wretch';

const http = wretch(process.env.NEXT_PUBLIC_API_ENDPOINT)
  .headers({
    'Content-Type': 'application/json',
  })
  .errorType('json')
  .resolve((response) => response.json());

const httpMethods = {
  get: async <T>(url: string, headers: Record<string, string> = {}): Promise<T> => {
    try {
      const response = await http.url(url).headers(headers).get();
      return response as T;
    } catch (error) {
      throw error;
    }
  },

  post: async <T>(
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<T> => {
    const response = await http.url(url).headers(headers).post(body);
    return response as T;
  },

  put: async <T>(
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<T> => {
    const response = await http.url(url).headers(headers).put(body);
    return response as T;
  },

  delete: async <T>(url: string, headers: Record<string, string> = {}): Promise<T> => {
    const response = await http.url(url).headers(headers).delete();
    return response as T;
  },
};

export default httpMethods;
