const BASE_URL = "/api";

export const api = async (
  endpoint,
  method = "GET",
  body,
  token,
  isForm = false
) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        ...(isForm ? {} : { "Content-Type": "application/json" }),
      }
    : isForm
    ? {}
    : { "Content-Type": "application/json" };

  const res = await fetch(BASE_URL + endpoint, {
    method,
    headers,
    body: isForm ? body : JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "API error");
  return data;
};
