(function () {
  "use strict";

  var toggle = document.querySelector("[data-menu-toggle]");
  var panel = document.querySelector("[data-nav-panel]");
  var scrim = document.querySelector("[data-nav-scrim]");

  if (!toggle || !panel || !scrim) return;

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    panel.setAttribute("data-open", "true");
    scrim.setAttribute("data-open", "true");
    panel.querySelector("a") && panel.querySelector("a").focus();
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    panel.setAttribute("data-open", "false");
    scrim.setAttribute("data-open", "false");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  scrim.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();
