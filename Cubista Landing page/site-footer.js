(function () {
  var script = document.currentScript;
  var base = script.getAttribute("data-base") || ".";
  var dark = script.hasAttribute("data-dark");

  var inner =
    '<div class="site-footer container">' +
      '<img src="' + base + '/assets/imgs/cubista-black.png" alt="Cubista" />' +
      '<nav aria-label="Footer links">' +
        '<a href="' + base + '/product/product.html">Product</a>' +
        '<a href="' + base + '/research/research.html">Research</a>' +
        '<a href="' + base + '/about/about.html">About</a>' +
        '<a class="footer-linkedin" href="https://www.linkedin.com/company/cubista/" target="_blank" rel="noopener noreferrer">in</a>' +
      "</nav>" +
      "<p>Privacy Policy - © 2026 Cubista</p>" +
    "</div>";

  var html = dark
    ? '<footer class="site-footer-dark">' + inner + "</footer>"
    : '<footer class="site-footer container">' +
        '<img src="' + base + '/assets/imgs/cubista-black.png" alt="Cubista" />' +
        '<nav aria-label="Footer links">' +
          '<a href="' + base + '/product/product.html">Product</a>' +
          '<a href="' + base + '/research/research.html">Research</a>' +
          '<a href="' + base + '/about/about.html">About</a>' +
          '<a class="footer-linkedin" href="https://www.linkedin.com/company/cubista/" target="_blank" rel="noopener noreferrer">in</a>' +
        "</nav>" +
        "<p>Privacy Policy - © 2026 Cubista</p>" +
      "</footer>";

  document.body.querySelector("main").insertAdjacentHTML("afterend", html);
})();
