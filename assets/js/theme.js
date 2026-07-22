(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function setIcon() {
    btn.textContent = root.getAttribute("data-theme") === "light" ? "☀️" : "🌙";
  }
  setIcon();

  btn.addEventListener("click", function () {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIcon();
  });
})();
