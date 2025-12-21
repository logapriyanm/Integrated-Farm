// utils/auth.js
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getAuthUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};


export const isAdmin = () => {
  const role = getUserRole();
  return role === 'admin';
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = '/login';
};