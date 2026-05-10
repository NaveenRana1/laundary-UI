export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const scrollTo = (id, setActiveNav, setMenuOpen) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  setActiveNav(id);
  setMenuOpen(false);
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};