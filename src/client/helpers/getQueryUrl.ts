export const getQueryURL = (rootURL: string, params: any) => {
  const esc = encodeURIComponent;
  for (var propName in params) {
    if (params[propName] === null || params[propName] === undefined) {
      delete params[propName];
    }
  }
  const query = Object.keys(params)
    .map(k => esc(k) + "=" + esc(params[k]))
    .join("&");
  return `${rootURL}?${query}`;
};
