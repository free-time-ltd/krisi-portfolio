export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const apiGet = <T>(url: string): Promise<T> => {
  const baseUrl = getBaseUrl();

  return fetch(`${baseUrl}/${url}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<T>;
  });
};
