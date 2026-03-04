(function () {
  var script = document.currentScript;
  var base = script.getAttribute("data-base") || ".";
  var API_URL = "https://staging.cubista.link/api/contact/landing/";
  var TURNSTILE_SITE_KEY = "0x4AAAAAACiqvXUut-FDDY7C";

  if (!document.querySelector('script[src*="turnstile"]')) {
    var ts = document.createElement("script");
    ts.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    ts.async = true;
    document.head.appendChild(ts);
  }

  var html =
    '<div class="demo-overlay" id="demoOverlay">' +
      '<div class="demo-modal">' +
        '<button class="demo-close" aria-label="Close" type="button">' +
          '<img src="' + base + '/assets/svg/demo/Voice.svg" alt="" />' +
        "</button>" +
        "<h2>Get in Touch.</h2>" +
        '<p class="demo-subtitle">Schedule a demo or ask us anything.</p>' +
        '<form class="demo-form" id="demoForm">' +
          '<div class="demo-field">' +
            '<img src="' + base + '/assets/svg/demo/input icons-4.svg" alt="" aria-hidden="true" />' +
            '<input type="text" name="name" placeholder="Name*" required />' +
          "</div>" +
          '<div class="demo-field">' +
            '<img src="' + base + '/assets/svg/demo/input icons-3.svg" alt="" aria-hidden="true" />' +
            '<input type="email" name="email" placeholder="Email*" required />' +
          "</div>" +
          '<div class="demo-field">' +
            '<img src="' + base + '/assets/svg/demo/input icons-2.svg" alt="" aria-hidden="true" />' +
            '<input type="text" name="company" placeholder="Company*" required />' +
          "</div>" +
          '<div class="demo-field">' +
            '<img src="' + base + '/assets/svg/demo/input icons-1.svg" alt="" aria-hidden="true" />' +
            '<input type="text" name="role" placeholder="Role/Title*" required />' +
          "</div>" +
          '<div class="demo-field demo-field--textarea">' +
            '<img src="' + base + '/assets/svg/demo/input icons.svg" alt="" aria-hidden="true" />' +
            '<textarea name="additional_info" placeholder="What\'s your biggest relationship data challenge?"></textarea>' +
          "</div>" +
          '<p class="demo-required">*Required fields</p>' +
          '<div class="demo-turnstile" id="demoTurnstile"></div>' +
          '<p class="demo-feedback" id="demoFeedback"></p>' +
          '<div class="demo-actions">' +
            '<button class="demo-btn-cancel" type="button">Cancel</button>' +
            '<button class="demo-btn-submit" type="submit">Request Demo</button>' +
          "</div>" +
        "</form>" +
      "</div>" +
    "</div>";

  document.body.insertAdjacentHTML("beforeend", html);

  var overlay = document.getElementById("demoOverlay");
  var form = document.getElementById("demoForm");
  var feedback = document.getElementById("demoFeedback");
  var submitBtn = form.querySelector(".demo-btn-submit");
  var turnstileContainer = document.getElementById("demoTurnstile");
  var turnstileWidgetId = null;

  function renderTurnstile() {
    if (turnstileWidgetId !== null) return;
    if (typeof turnstile === "undefined") {
      setTimeout(renderTurnstile, 200);
      return;
    }
    turnstileWidgetId = turnstile.render(turnstileContainer, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      size: "normal",
    });
  }

  function resetTurnstile() {
    if (turnstileWidgetId !== null && typeof turnstile !== "undefined") {
      turnstile.reset(turnstileWidgetId);
    }
  }

  function openDemo(e) {
    e.preventDefault();
    overlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
    feedback.textContent = "";
    feedback.className = "demo-feedback";
    renderTurnstile();
  }

  function closeDemo() {
    if (!overlay.classList.contains("is-active")) return;
    overlay.classList.add("is-closing");
    overlay.addEventListener("animationend", function handler() {
      overlay.removeEventListener("animationend", handler);
      overlay.classList.remove("is-active", "is-closing");
      document.body.style.overflow = "";
    });
  }

  document.querySelectorAll(".header-cta, .hero-cta").forEach(function (btn) {
    btn.addEventListener("click", openDemo);
  });

  overlay.querySelector(".demo-close").addEventListener("click", closeDemo);
  overlay.querySelector(".demo-btn-cancel").addEventListener("click", closeDemo);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeDemo();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("is-active")) closeDemo();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var token = "";
    if (typeof turnstile !== "undefined" && turnstileWidgetId !== null) {
      token = turnstile.getResponse(turnstileWidgetId);
    }

    if (!token) {
      feedback.textContent = "Please complete the captcha verification.";
      feedback.className = "demo-feedback is-error";
      return;
    }

    var body = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      company: form.elements.company.value.trim(),
      role: form.elements.role.value.trim(),
      additional_info: form.elements.additional_info.value.trim(),
      captcha_token: token,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    feedback.textContent = "";
    feedback.className = "demo-feedback";

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed (" + res.status + ")");
        return res.json();
      })
      .then(function () {
        feedback.textContent = "Thank you! We'll be in touch soon.";
        feedback.className = "demo-feedback is-success";
        form.reset();
        resetTurnstile();
        setTimeout(closeDemo, 2000);
      })
      .catch(function () {
        feedback.textContent = "Something went wrong. Please try again.";
        feedback.className = "demo-feedback is-error";
        resetTurnstile();
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Request Demo";
      });
  });
})();
