export function appendSearchParams(url: URL, params?: Record<string, any>) {
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != undefined && value != null && value != "") {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url;
}
