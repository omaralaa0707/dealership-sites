// document.documentElement.classList.add("js") now runs inline in
// template.html's <head>, before first paint, to avoid a flash of
// hidden-then-visible content on slow connections.

(function revealOnScroll() {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();

(function heroScene() {
  var canvas = document.getElementById("scene");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var supportsWebGL = (function () {
    try {
      var testCanvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  })();

  if (!supportsWebGL || typeof THREE === "undefined") return;

  var hero = canvas.closest(".hero");
  var width = hero.clientWidth;
  var height = hero.clientHeight;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 6);
  camera.lookAt(0, 0, 0);

  var geometry = new THREE.IcosahedronGeometry(1.4, 0);
  var material = new THREE.MeshBasicMaterial({
    color: 0xf5f5f5,
    wireframe: true,
    transparent: true,
    opacity: 0.16,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(2.3, -0.6, 0);
  scene.add(mesh);

  var frameId;
  function animate() {
    mesh.rotation.x += 0.0015;
    mesh.rotation.y += 0.0022;
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", function () {
    width = hero.clientWidth;
    height = hero.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      cancelAnimationFrame(frameId);
    } else {
      cancelAnimationFrame(frameId);
      animate();
    }
  });
})();
