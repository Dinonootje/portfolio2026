(function () {
  "use strict";

  var grid = document.querySelector("[data-projects-grid]");
  if (!grid) return;

  (window.PROJECTS || []).forEach(function (project, index) {
    var card = document.createElement("article");
    card.className = "project-card";
    card.style.animationDelay = index * 60 + "ms";

    var statusClass = project.status === "Live" ? " project-card__status--live" : "";

    card.innerHTML =
      '<span class="project-card__status' + statusClass + '">' + project.status + "</span>" +
      '<h3 class="project-card__title"></h3>' +
      '<p class="project-card__desc"></p>' +
      '<div class="project-card__tags"></div>' +
      '<a class="project-card__link" href="' + project.link + '">Bekijk project →</a>';

    card.querySelector(".project-card__title").textContent = project.title;
    card.querySelector(".project-card__desc").textContent = project.description;

    var tagsEl = card.querySelector(".project-card__tags");
    project.tags.forEach(function (tag) {
      var span = document.createElement("span");
      span.textContent = tag;
      tagsEl.appendChild(span);
    });

    grid.appendChild(card);
  });
})();
