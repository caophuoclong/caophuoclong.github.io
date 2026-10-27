document.documentElement.classList.add("js");

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initClock();
  initReveal();
  initCardTilt();
  initContactForm();
  initShader(document.querySelector(".hero-canvas"));
  document.getElementById("year").textContent = new Date().getFullYear();
});

function initHeader() {
  const header = document.querySelector(".site-header");
  const links = [...header.querySelectorAll("nav a")];
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the nav link for the section currently in view.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  for (const link of links) observer.observe(document.querySelector(link.hash));
}

function initClock() {
  const el = document.getElementById("local-time");
  const format = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tick = () => (el.textContent = format.format(new Date()));
  tick();
  setInterval(tick, 15000);
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  // Stagger siblings that enter together.
  for (const parent of new Set([...items].map((el) => el.parentElement))) {
    [...parent.children].filter((el) => el.classList.contains("reveal")).forEach((el, i) => el.style.setProperty("--i", i));
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

function initCardTilt() {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  for (const card of document.querySelectorAll(".project")) {
    const article = card.querySelector("article");
    card.addEventListener("pointermove", (e) => {
      const r = article.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      if (reducedMotion.matches) return;
      card.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
      card.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  // form.elements avoids clashing with HTMLFormElement's own `name` property.
  const { topic, name: nameInput, message: messageInput } = form.elements;
  const [step1, step2] = form.querySelectorAll(".step");
  const error = form.querySelector(".form-error");

  const show = (step) => {
    step1.hidden = step !== step1;
    step2.hidden = step !== step2;
    step.querySelector("input, textarea").focus();
  };

  form.querySelector("[data-next]").addEventListener("click", () => {
    if (topic.value) show(step2);
    else topic[0].focus();
  });
  form.querySelector("[data-back]").addEventListener("click", () => show(step1));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (!name || !message) {
      error.textContent = "Add your name and a few lines so I know what it's about.";
      error.hidden = false;
      (name ? messageInput : nameInput).focus();
      return;
    }
    error.hidden = true;
    const subject = `${topic.value} — from ${name}`;
    location.href = `mailto:caophuoclong.se@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });
}

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Domain-warped fbm fluid, lit by a soft light that trails the pointer,
// with a cheap radial light-shaft pass, bloom-ish glow, vignette and grain.
const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = rot * p * 2.02; a *= 0.5; }
  return v;
}

float field(vec2 p, float t) {
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.06)), fbm(p + vec2(5.2, 1.3) - t * 0.04));
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.05), fbm(p + 3.5 * q + vec2(8.3, 2.8)));
  return fbm(p + 3.0 * r);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.6;
  vec2 m = vec2(uMouse.x * aspect, uMouse.y) * 1.6;
  float t = uTime;

  // Pull the fluid gently toward the light.
  vec2 toM = m - p;
  p += toM * 0.08 * exp(-dot(toM, toM) * 1.5);

  float f = field(p, t);

  vec3 ink = vec3(0.027, 0.035, 0.047);
  vec3 deep = vec3(0.05, 0.19, 0.29);
  vec3 blue = vec3(0.24, 0.45, 0.85);
  vec3 warm = vec3(1.0, 0.62, 0.3);

  vec3 col = mix(ink, deep, smoothstep(0.25, 0.75, f));
  col = mix(col, blue, smoothstep(0.62, 0.95, f) * 0.55);

  // Light shafts: march a few steps from the pixel toward the light.
  float d = length(toM);
  float shafts = 0.0;
  vec2 dir = toM / 8.0;
  vec2 sp = p;
  for (int i = 0; i < 8; i++) { sp += dir; shafts += smoothstep(0.45, 0.8, fbm(sp * 1.2 + t * 0.03)); }
  shafts /= 8.0;
  float glow = exp(-d * 1.6);
  col += warm * glow * (0.35 + 0.65 * f) * 0.55;
  col += warm * shafts * glow * 0.35;
  col += blue * pow(f, 4.0) * 0.6;

  // Vignette, tone map, grain.
  col *= 1.0 - 0.55 * pow(length(uv - 0.5) * 1.25, 2.0);
  col = col / (1.0 + col);
  col = pow(col, vec3(0.9));
  col += (hash(gl_FragCoord.xy + fract(t) * 100.0) - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

function initShader(canvas) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return; // CSS gradient on .hero stays as the fallback.

  const program = gl.createProgram();
  for (const [type, src] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ]) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(shader));
      return;
    }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, "uRes");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uMouse = gl.getUniformLocation(program, "uMouse");

  // Render below native resolution: the field is soft, so this is invisible and much cheaper.
  const resize = () => {
    const scale = Math.min(devicePixelRatio, 1.5) * 0.6;
    canvas.width = Math.round(canvas.clientWidth * scale);
    canvas.height = Math.round(canvas.clientHeight * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  const target = { x: 0.72, y: 0.62 };
  const mouse = { ...target };
  addEventListener(
    "pointermove",
    (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
    },
    { passive: true }
  );

  let visible = true;
  let frame = 0;
  let last = performance.now();
  let time = 8;

  const draw = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    // Critically damped follow gives the light some inertia.
    const k = 1 - Math.exp(-dt * 2.5);
    mouse.x += (target.x - mouse.x) * k;
    mouse.y += (target.y - mouse.y) * k;
    gl.uniform1f(uTime, time);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const loop = (now) => {
    draw(now);
    frame = requestAnimationFrame(loop);
  };

  const update = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    last = performance.now();
    if (reducedMotion.matches) draw(last);
    else if (visible && !document.hidden) frame = requestAnimationFrame(loop);
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  }).observe(canvas);
  document.addEventListener("visibilitychange", update);
  reducedMotion.addEventListener("change", update);

  draw(last);
  canvas.classList.add("ready");
}
