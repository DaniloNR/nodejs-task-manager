export function extractQueryParams(query) {
  return Object.fromEntries(
    query
      .substr(1)
      .split("&")
      .map((queryParams) => queryParams.split("="))
  );
}
