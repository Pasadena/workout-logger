const BASE_URL = process.env.BASE_URL || "http://localhost:4000/dev/";

export const formatUrl = (pathFragment: string) => `${BASE_URL}${pathFragment}`;

const requestConfig = (method: string, payload: unknown) => {
  if (["POST", "PUT"].includes(method)) {
    return {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
  }
  return { method };
};

export const request = async (
  path: string,
  method: string,
  payload?: any,
  responseValidator?: (status: number) => boolean
) => {
  try {
    const isValidResponse =
      responseValidator || ((status: number) => status === 200);
    const url = formatUrl(path);
    const response = await fetch(url, requestConfig(method, payload));
    if (!isValidResponse(response.status)) {
      console.log("Error in request", response);
      throw new Error(`${method} to ${url} failed!`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Unknown error happened during request", err);
    throw err;
  }
};

export const post = async (path: string, payload: any) => {
  return request(path, "POST", payload, (status: number) => status === 201);
};

export const deleteRequest = async (path: string) => {
  return request(path, "DELETE");
};
