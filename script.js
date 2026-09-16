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

(function ambientGradient() {
  var canvas = document.getElementById("ambient-bg");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var gl = canvas.getContext("webgl2", {
    premultipliedAlpha: true,
    alpha: true,
    antialias: true,
  });
  if (!gl) return;

  var VERTEX_SHADER =
    "#version 300 es\n" +
    "in vec4 a_position;\n" +
    "void main() {\n" +
    "  gl_Position = a_position;\n" +
    "}";

  var FRAGMENT_SHADER =
    "#version 300 es\n" +
    "precision highp float;\n" +
    "\n" +
    "uniform float u_time;\n" +
    "uniform float u_pixelRatio;\n" +
    "uniform vec2 u_resolution;\n" +
    "\n" +
    "uniform float u_scale;\n" +
    "uniform float u_rotation;\n" +
    "uniform vec4 u_color1;\n" +
    "uniform vec4 u_color2;\n" +
    "uniform vec4 u_color3;\n" +
    "uniform float u_proportion;\n" +
    "uniform float u_softness;\n" +
    "uniform float u_shape;\n" +
    "uniform float u_shapeScale;\n" +
    "uniform float u_distortion;\n" +
    "uniform float u_swirl;\n" +
    "uniform float u_swirlIterations;\n" +
    "\n" +
    "out vec4 fragColor;\n" +
    "\n" +
    "#define TWO_PI 6.28318530718\n" +
    "#define PI 3.14159265358979323846\n" +
    "\n" +
    "vec2 rotate(vec2 uv, float th) {\n" +
    "  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;\n" +
    "}\n" +
    "\n" +
    "float random(vec2 st) {\n" +
    "  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);\n" +
    "}\n" +
    "\n" +
    "float noise(vec2 st) {\n" +
    "  vec2 i = floor(st);\n" +
    "  vec2 f = fract(st);\n" +
    "  float a = random(i);\n" +
    "  float b = random(i + vec2(1.0, 0.0));\n" +
    "  float c = random(i + vec2(0.0, 1.0));\n" +
    "  float d = random(i + vec2(1.0, 1.0));\n" +
    "\n" +
    "  vec2 u = f * f * (3.0 - 2.0 * f);\n" +
    "\n" +
    "  float x1 = mix(a, b, u.x);\n" +
    "  float x2 = mix(c, d, u.x);\n" +
    "  return mix(x1, x2, u.y);\n" +
    "}\n" +
    "\n" +
    "vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {\n" +
    "    vec3 color1 = c1.rgb * c1.a;\n" +
    "    vec3 color2 = c2.rgb * c2.a;\n" +
    "    vec3 color3 = c3.rgb * c3.a;\n" +
    "\n" +
    "    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);\n" +
    "    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);\n" +
    "\n" +
    "    vec3 blended_color_2 = mix(color1, color2, r1);\n" +
    "    float blended_opacity_2 = mix(c1.a, c2.a, r1);\n" +
    "\n" +
    "    vec3 c = mix(blended_color_2, color3, r2);\n" +
    "    float o = mix(blended_opacity_2, c3.a, r2);\n" +
    "    return vec4(c, o);\n" +
    "}\n" +
    "\n" +
    "void main() {\n" +
    "    vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n" +
    "\n" +
    "    float t = .5 * u_time;\n" +
    "\n" +
    "    float noise_scale = .0005 + .006 * u_scale;\n" +
    "\n" +
    "    uv -= .5;\n" +
    "    uv *= (noise_scale * u_resolution);\n" +
    "    uv = rotate(uv, u_rotation * .5 * PI);\n" +
    "    uv /= u_pixelRatio;\n" +
    "    uv += .5;\n" +
    "\n" +
    "    float n1 = noise(uv * 1. + t);\n" +
    "    float n2 = noise(uv * 2. - t);\n" +
    "    float angle = n1 * TWO_PI;\n" +
    "    uv.x += 4. * u_distortion * n2 * cos(angle);\n" +
    "    uv.y += 4. * u_distortion * n2 * sin(angle);\n" +
    "\n" +
    "    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));\n" +
    "    for (float i = 1.; i <= iterations_number; i++) {\n" +
    "        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);\n" +
    "        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);\n" +
    "    }\n" +
    "\n" +
    "    float proportion = clamp(u_proportion, 0., 1.);\n" +
    "\n" +
    "    float shape = 0.;\n" +
    "    float mixer = 0.;\n" +
    "    if (u_shape < .5) {\n" +
    "      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);\n" +
    "      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);\n" +
    "      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);\n" +
    "    } else if (u_shape < 1.5) {\n" +
    "      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);\n" +
    "      float f = fract(stripes_shape_uv.y);\n" +
    "      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);\n" +
    "      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);\n" +
    "    } else {\n" +
    "      float sh = 1. - uv.y;\n" +
    "      sh -= .5;\n" +
    "      sh /= (noise_scale * u_resolution.y);\n" +
    "      sh += .5;\n" +
    "      float shape_scaling = .2 * (1. - u_shapeScale);\n" +
    "      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));\n" +
    "      mixer = shape;\n" +
    "    }\n" +
    "\n" +
    "    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);\n" +
    "\n" +
    "    fragColor = vec4(color_mix.rgb, color_mix.a);\n" +
    "}";

  function compileShader(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  var vertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
  var fragmentShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  gl.useProgram(program);

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  var positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  var uniforms = {
    u_time: gl.getUniformLocation(program, "u_time"),
    u_resolution: gl.getUniformLocation(program, "u_resolution"),
    u_pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
    u_scale: gl.getUniformLocation(program, "u_scale"),
    u_rotation: gl.getUniformLocation(program, "u_rotation"),
    u_color1: gl.getUniformLocation(program, "u_color1"),
    u_color2: gl.getUniformLocation(program, "u_color2"),
    u_color3: gl.getUniformLocation(program, "u_color3"),
    u_proportion: gl.getUniformLocation(program, "u_proportion"),
    u_softness: gl.getUniformLocation(program, "u_softness"),
    u_shape: gl.getUniformLocation(program, "u_shape"),
    u_shapeScale: gl.getUniformLocation(program, "u_shapeScale"),
    u_distortion: gl.getUniformLocation(program, "u_distortion"),
    u_swirl: gl.getUniformLocation(program, "u_swirl"),
    u_swirlIterations: gl.getUniformLocation(program, "u_swirlIterations"),
  };

  function hexToRgba(hex) {
    var c = (hex || "#888888").trim().replace("#", "");
    if (c.length === 3) {
      c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    var r = parseInt(c.substring(0, 2), 16) / 255;
    var g = parseInt(c.substring(2, 4), 16) / 255;
    var b = parseInt(c.substring(4, 6), 16) / 255;
    return [r || 0, g || 0, b || 0, 1];
  }

  var rootStyle = getComputedStyle(document.documentElement);
  var color1 = hexToRgba(rootStyle.getPropertyValue("--background"));
  var color2 = hexToRgba(rootStyle.getPropertyValue("--accent"));
  var color3 = hexToRgba(rootStyle.getPropertyValue("--ink"));

  // Calm, slow-moving background params: soft edge blend of the dealer's
  // own background/accent/ink colors, low speed and distortion so it reads
  // as ambient depth behind the glass panels, never as a busy foreground
  // effect competing with the page content.
  var params = {
    rotation: 0,
    scale: 0.55,
    speed: 10,
    distortion: 3,
    swirl: 30,
    swirlIterations: 5,
    softness: 100,
    offset: 0,
    proportion: 42,
    shape: 2, // Edge
    shapeScale: 55,
  };

  var PIXEL_RATIO_CAP = 1.5;

  function resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var pixelRatio = Math.min(window.devicePixelRatio || 1, PIXEL_RATIO_CAP);
    canvas.width = Math.max(1, Math.floor(width * pixelRatio));
    canvas.height = Math.max(1, Math.floor(height * pixelRatio));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  resize();
  window.addEventListener("resize", resize);

  var startTime = performance.now();
  var frameId;

  function animate(time) {
    var elapsed = (time - startTime) / 1000;
    var speed = (params.speed / 100) * 5;

    gl.uniform1f(uniforms.u_time, elapsed * speed + params.offset * 0.01);
    gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.u_pixelRatio, Math.min(window.devicePixelRatio || 1, PIXEL_RATIO_CAP));
    gl.uniform1f(uniforms.u_scale, params.scale);
    gl.uniform1f(uniforms.u_rotation, (params.rotation * Math.PI) / 180);
    gl.uniform4f(uniforms.u_color1, color1[0], color1[1], color1[2], color1[3]);
    gl.uniform4f(uniforms.u_color2, color2[0], color2[1], color2[2], color2[3]);
    gl.uniform4f(uniforms.u_color3, color3[0], color3[1], color3[2], color3[3]);
    gl.uniform1f(uniforms.u_proportion, params.proportion / 100);
    gl.uniform1f(uniforms.u_softness, params.softness / 100);
    gl.uniform1f(uniforms.u_shape, params.shape);
    gl.uniform1f(uniforms.u_shapeScale, params.shapeScale / 100);
    gl.uniform1f(uniforms.u_distortion, params.distortion / 50);
    gl.uniform1f(uniforms.u_swirl, params.swirl / 100);
    gl.uniform1f(
      uniforms.u_swirlIterations,
      params.swirl === 0 ? 0 : params.swirlIterations
    );

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    frameId = requestAnimationFrame(animate);
  }

  frameId = requestAnimationFrame(animate);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      cancelAnimationFrame(frameId);
    } else {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(animate);
    }
  });
})();
