/* =========================================================
   紀とり ｜ KITORI — interactions
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Preloader ---------- */
  window.addEventListener("load", function () {
    const pre = document.getElementById("preloader");
    if (pre) {
      setTimeout(function () {
        pre.classList.add("is-hidden");
      }, 600);
    }
  });

  /* ---------- 現在の年 ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- ヘッダー scroll 状態 & to-top ---------- */
  const header = document.getElementById("header");
  const totop = document.getElementById("totop");
  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (totop) totop.classList.toggle("is-visible", y > window.innerHeight);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- モバイルナビ ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (burger && nav) {
    burger.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---------- スクロール出現 (reveal) ---------- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            const el = entry.target;
            // 同じグループ内で少し時間差をつける
            const delay = el.dataset.revealDelay
              ? parseFloat(el.dataset.revealDelay)
              : (i % 3) * 0.08;
            el.style.transitionDelay = delay + "s";
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---------- 熾火パーティクル (canvas) ---------- */
  const canvas = document.getElementById("embers");
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;
    const COUNT = Math.min(
      48,
      Math.max(18, Math.floor(window.innerWidth / 26))
    );

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: h + Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vy: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.3,
        life: Math.random(),
        flick: Math.random() * 0.04 + 0.01,
        hue: 28 + Math.random() * 18,
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        const p = makeParticle();
        p.y = Math.random() * h;
        particles.push(p);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.2;
        p.life += p.flick;
        const alpha = (0.35 + Math.sin(p.life) * 0.3) * 0.7;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, "hsla(" + p.hue + ", 90%, 62%, " + alpha + ")");
        grd.addColorStop(1, "hsla(" + p.hue + ", 90%, 50%, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        if (p.y < -10 || p.x < -10 || p.x > w + 10) {
          Object.assign(p, makeParticle());
        }
      }
      raf = requestAnimationFrame(draw);
    }

    init();
    draw();
    let rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(resize, 200);
    });
    // タブ非表示時は停止
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        draw();
      }
    });
  }

  /* ---------- ヒーロー パララックス ---------- */
  const glow = document.querySelector(".hero__glow");
  if (glow && !prefersReduced) {
    window.addEventListener(
      "scroll",
      function () {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          glow.style.transform =
            "translateX(-50%) translateY(" + y * 0.18 + "px)";
        }
      },
      { passive: true }
    );
  }
})();
