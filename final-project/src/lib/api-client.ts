import { getSessionData } from "./getSession";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"]
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>
  ).toString();
  return `${url}?${queryString}`;
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    params,
    cache = "no-store",
    next,
    ...otherOptions
  } = options;

  const fullUrl = buildUrlWithParams(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    params
  );

  console.log("Api called: ", fullUrl);

  // Try to retrieve the session
  const session = await getSessionData().catch(() => null);

  // Construct headers, attaching authentication info only if the session exists
  const authHeaders = session?.accessToken
    ? {
        "x-client-id": session.user.id,
        Authorization: `Bearer ${session.accessToken}`,
      }
    : {};

  const response = await fetch(fullUrl, {
    ...otherOptions,
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeaders, // Add auth headers only if authenticated
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache,
    next,
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.log("ErrorBody: ", errorBody);
    const error = new Error(errorBody.message || "An error occurred");
    (error as any).status = errorBody.status;
    (error as any).code = errorBody.code;
    throw error;
  }

  return response.json();
}

export const customFetch = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
