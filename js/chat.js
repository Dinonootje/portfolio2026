(function () {
  "use strict";

  var log = document.querySelector("[data-chat-log]");
  var form = document.querySelector("[data-chat-form]");
  var input = document.querySelector("[data-chat-input]");
  var hints = document.querySelectorAll("[data-chat-hint]");
  var bootEl = document.querySelector("[data-boot-text]");

  if (!log || !form || !input) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- boot line ---------- */
  var bootMessage = "Systeem geladen. Typ /help om te beginnen.";
  if (bootEl) {
    if (reduceMotion) {
      bootEl.textContent = bootMessage;
    } else {
      typeText(bootEl, bootMessage, 28);
    }
  }

  function typeText(el, text, speed) {
    el.textContent = "";
    var i = 0;
    (function step() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        window.setTimeout(step, speed);
      }
    })();
  }

  /* ---------- message rendering ---------- */
  function scrollToEnd() {
    log.scrollTop = log.scrollHeight;
  }

  function addUserMessage(text) {
    var msg = document.createElement("div");
    msg.className = "msg msg--user";
    msg.innerHTML =
      '<div class="msg__avatar">JIJ</div>' +
      '<div class="msg__bubble"><p></p></div>';
    msg.querySelector("p").textContent = text;
    log.appendChild(msg);
    scrollToEnd();
  }

  function addAiMessage(bodyNode) {
    var msg = document.createElement("div");
    msg.className = "msg msg--ai";
    var avatar = document.createElement("div");
    avatar.className = "msg__avatar";
    avatar.textContent = "Q";
    var bubble = document.createElement("div");
    bubble.className = "msg__bubble";
    bubble.appendChild(bodyNode);
    msg.appendChild(avatar);
    msg.appendChild(bubble);
    log.appendChild(msg);
    scrollToEnd();
  }

  function textNode(html) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    return wrap;
  }

  /* ---------- commands ---------- */
  function renderHelp() {
    return textNode(
      "<p>Hier zijn de commando's die ik ken:</p>" +
      "<ul>" +
      "<li><code>/help</code> — toont dit overzicht van commando's</li>" +
      "<li><code>/projecten</code> — toont Quinten's projecten als kaarten</li>" +
      "<li><code>/quinten</code> — wie is Quinten?</li>" +
      "<li><code>/skills</code> — waar Quinten mee werkt en wat hij leert</li>" +
      "<li><code>/contact</code> — hoe je Quinten kunt bereiken</li>" +
      "</ul>"
    );
  }

  function renderProjects() {
    var wrap = document.createElement("div");
    var intro = document.createElement("p");
    intro.textContent = "Projecten geladen — hier zijn de laatste:";
    wrap.appendChild(intro);

    var grid = document.createElement("div");
    grid.className = "result-grid";

    (window.PROJECTS || []).forEach(function (project, index) {
      var card = document.createElement("article");
      card.className = "project-card";
      card.style.animationDelay = index * 70 + "ms";

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

    wrap.appendChild(grid);
    return wrap;
  }

  function renderAbout() {
    return textNode(
      "<p><strong>Quinten Weijer</strong> duikt in AI: hij bouwt kleine projecten om te leren hoe modellen, " +
      "prompts en interfaces in elkaar zitten.</p>" +
      "<p>Dit portfolio is zelf onderdeel van dat leerproces — een chat-gestuurde interface, volledig " +
      "gebouwd met vanilla HTML, CSS en JavaScript.</p>" +
      '<p>Meer lezen? Typ <code>/skills</code> of ga naar de pagina "Over mij" via het menu.</p>'
    );
  }

  function renderSkills() {
    var wrap = document.createElement("div");
    var intro = document.createElement("p");
    intro.textContent = "Waar Quinten mee werkt — en wat hij momenteel leert:";
    wrap.appendChild(intro);

    var list = document.createElement("div");
    list.className = "skill-list";

    (window.SKILLS || []).forEach(function (skill) {
      var pill = document.createElement("span");
      pill.className = "skill-pill" + (skill.learning ? " skill-pill--learning" : "");
      pill.textContent = skill.learning ? skill.name + " · leert nog" : skill.name;
      list.appendChild(pill);
    });

    wrap.appendChild(list);
    return wrap;
  }

  function renderContact() {
    var c = window.CONTACT || {};
    var wrap = document.createElement("div");
    var intro = document.createElement("p");
    intro.textContent = "Je kunt Quinten hier bereiken:";
    wrap.appendChild(intro);

    var ul = document.createElement("ul");
    ul.className = "contact-list";
    ul.innerHTML =
      '<li><a href="mailto:' + c.email + '">' + c.email + "</a></li>" +
      '<li><a href="' + c.github + '" target="_blank" rel="noopener">GitHub</a></li>' +
      '<li><a href="' + c.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li>';
    wrap.appendChild(ul);
    return wrap;
  }

  function renderUnknown(raw) {
    return textNode(
      '<p>Onbekend commando: <code>' + escapeHtml(raw) + '</code>.</p>' +
      "<p>Probeer <code>/help</code> voor een overzicht van wat ik kan.</p>"
    );
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  var commands = {
    "/help": function () {
      addAiMessage(renderHelp());
    },
    "/projecten": function () {
      addAiMessage(renderProjects());
    },
    "/quinten": function () {
      addAiMessage(renderAbout());
    },
    "/skills": function () {
      addAiMessage(renderSkills());
    },
    "/contact": function () {
      addAiMessage(renderContact());
    }
  };

  function handleSubmit(raw) {
    var trimmed = raw.trim();
    if (!trimmed) return;

    addUserMessage(trimmed);

    var key = trimmed.toLowerCase().split(/\s+/)[0];
    var run = commands[key];

    window.setTimeout(function () {
      if (run) {
        run();
      } else if (key.charAt(0) === "/") {
        addAiMessage(renderUnknown(trimmed));
      } else {
        addAiMessage(
          textNode(
            "<p>Ik reageer op commando's, geen vrij gesprek. Begin met <code>/</code> — typ <code>/help</code> om te starten.</p>"
          )
        );
      }
    }, 180);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = input.value;
    input.value = "";
    handleSubmit(value);
  });

  hints.forEach(function (btn) {
    btn.addEventListener("click", function () {
      input.value = btn.textContent.trim();
      input.focus();
    });
  });
})();
