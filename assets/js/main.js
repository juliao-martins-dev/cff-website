/* CFF Website — interactions (no dependencies) */
(function () {
  "use strict";

  // trigger online/offline
  // Function to handle status updates
  // function updateOnlineStatus() {
  //   const labelStatus = document.querySelector(".label-status");
  //   if (navigator.onLine) {
  //       labelStatus.textContent = "✅ Online";
  //     // Add your "back online" logic here (e.g., sync data, hide alert)
  //   } else {
  //     console.log("❌ Website is OFFLINE");
  //       labelStatus.textContent = "❌ Offline";
  //     // Add your "offline" logic here (e.g., show warning toast)
  //   }
  // }

  // // Listen for network changes
  // window.addEventListener('online', updateOnlineStatus);
  // window.addEventListener('offline', updateOnlineStatus);

  // Run once on page load to check initial state
  // updateOnlineStatus();

  /* Mobile navigation toggle */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    // close menu after navigating on mobile
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal-on-scroll */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Count-up for hero stats (honest: only animates numbers already in DOM) */
  var nums = document.querySelectorAll("[data-count]");
  if (nums.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1100, start = performance.now();
        function step(now) {
          var p = Math.min((now - start) / dur, 1);
          var val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
          el.textContent = val.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { co.observe(el); });
  }

  /* Contact form — front-end only (no backend wired yet) */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.hidden = false;
        var lang = document.documentElement.lang;
        status.textContent = lang === "tet"
          ? "Obrigadu/Obrigada. Ne'e formuláriu demo — bainhira email/CRM konekta ona, ita-nia mensajen sei haruka ba contact@cff.tl."
          : lang === "pt"
          ? "Obrigado. Este é um formulário de demonstração — assim que o email/CRM estiver ligado, a sua mensagem será enviada para contact@cff.tl."
          : "Thank you. This is a demo form — once email/CRM is connected your message will be sent to contact@cff.tl.";
      }
      form.reset();
    });
  }

  /* Footer year */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* Language toggle EN / TE / PT */
  (function () {
    var btns = document.querySelectorAll("[data-lang-btn]");
    var SUPPORTED = { en: true, tet: true, pt: true };
    function setLang(l) {
      var lang = SUPPORTED[l] ? l : "en";
      document.documentElement.lang = lang;
      try { localStorage.setItem("cff-lang", lang); } catch (e) {}
      btns.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-lang-btn") === lang));
      });
    }
    var saved = "en";
    try { saved = localStorage.getItem("cff-lang") || "en"; } catch (e) {}
    setLang(saved);
    btns.forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang-btn")); });
    });
  })();
})();
