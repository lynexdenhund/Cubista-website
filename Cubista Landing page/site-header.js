(function () {
  var script = document.currentScript;
  var base = script.getAttribute("data-base") || ".";

  var html =
    '<header class="site-header">' +
      '<div class="container nav-row">' +
        '<a class="brand" href="' + base + '/index.html">' +
          '<img src="' + base + '/assets/imgs/cubista-blue-logo.png" alt="Cubista" />' +
        "</a>" +
        '<nav class="main-nav" id="site-nav" aria-label="Main navigation">' +
          '<a href="' + base + '/product/product.html">Product</a>' +
          '<a href="' + base + '/research/research.html">Research</a>' +
          '<a href="' + base + '/about/about.html">About</a>' +
          '<a class="nav-cta header-cta" href="#">Schedule a Demo</a>' +
        "</nav>" +
        '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Toggle navigation">' +
          "<span></span><span></span><span></span>" +
        "</button>" +
        '<a class="header-cta" href="#">' +
          '<img src="' + base + '/assets/svg/calendar-check-02.svg" alt="" aria-hidden="true" />' +
          "<span>Schedule a Demo</span>" +
        "</a>" +
      "</div>" +
    "</header>";

  document.body.insertAdjacentHTML("afterbegin", html);
  document.body.classList.add("loaded");

  var path = window.location.pathname;
  document.querySelectorAll(".main-nav a:not(.nav-cta)").forEach(function (link) {
    if (path.indexOf(link.getAttribute("href").replace(/^\.\.?\//, "").replace(/^\.\//, "")) !== -1 &&
        link.getAttribute("href") !== "#") {
      link.classList.add("is-active");
    }
  });

  var menuToggle = document.querySelector(".menu-toggle");
  var mainNav = document.querySelector(".main-nav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) closeMenu();
    });
  }
})();
