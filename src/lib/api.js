const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return data;
}

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function get(path, params = {}, token) {
  const url = new URL(API_BASE + path);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  const res = await fetch(url.toString(), { headers: authHeaders(token) });
  return handle(res);
}

async function post(path, body, token) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(body),
  });
  return handle(res);
}

async function del(path, token) {
  const res = await fetch(API_BASE + path, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handle(res);
}

export const api = {
  getCategories: () => get("/api/categories"),
  getStates: (category) => get("/api/states", { category }),
  getPlaces: (filters) => get("/api/places", filters),
  getPlace: (id) => get(`/api/places/${id}`),
  getReviews: (place) => get("/api/reviews", { place }),
  postReview: (payload, token) => post("/api/reviews", payload, token),
  deleteReview: (id, token) => del(`/api/reviews/${id}`, token),
  signup: (payload) => post("/api/auth/signup", payload),
  login: (payload) => post("/api/auth/login", payload),
  me: (token) => get("/api/auth/me", {}, token),
};
