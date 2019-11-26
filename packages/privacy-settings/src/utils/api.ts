const get = (id, base = '/settings') => {
  const endpoint = `${base}/${id}`;
  return fetch(endpoint);
};

export default {
  get
};
