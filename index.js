// --- Cursor ---
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 7}px, ${my - 7}px)`;
});
function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// --- Burger menu ---
const burgerBtn = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  burgerBtn.classList.toggle("open", menuOpen);
  mobileMenu.style.display = menuOpen ? "flex" : "none";
  setTimeout(() => mobileMenu.classList.toggle("open", menuOpen), 10);
}
function closeMenu() {
  menuOpen = false;
  burgerBtn.classList.remove("open");
  mobileMenu.classList.remove("open");
  setTimeout(() => {
    mobileMenu.style.display = "none";
  }, 300);
}

// --- Skills Marquee ---
const skills = [
  { icon: "🎨", name: "Figma", type: "Design Tool" },
  { icon: "💡", name: "Adobe XD", type: "Design Tool" },
  { icon: "🖌️", name: "Canva", type: "Design Tool" },
  { icon: "🌐", name: "HTML", type: "Development" },
  { icon: "✨", name: "CSS", type: "Development" },
  { icon: "⚡", name: "JavaScript", type: "Development" },
];
const track = document.getElementById("marqueeTrack");
// Duplicate 4x for seamless infinite loop
for (let d = 0; d < 4; d++) {
  skills.forEach((s) => {
    const pill = document.createElement("div");
    pill.className = "skill-pill";
    pill.innerHTML = `
          <span class="skill-pill-icon">${s.icon}</span>
          <div>
            <div class="skill-pill-name">${s.name}</div>
            <div class="skill-pill-type">${s.type}</div>
          </div>`;
    track.appendChild(pill);
  });
}

// --- Scroll reveal ---
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        e.target.querySelectorAll(".cert-item").forEach((child, i) => {
          child.style.opacity = "0";
          child.style.transform = "translateY(20px)";
          setTimeout(
            () => {
              child.style.transition =
                "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s";
              child.style.opacity = "1";
              child.style.transform = "translateY(0)";
            },
            i * 80 + 100,
          );
        });
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((r) => observer.observe(r));

// --- Nav active highlight ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--pink-accent)" : "";
  });
});

// === Like buttons per section with animated text bubble ===
function ensureRelative(el) {
  const cs = getComputedStyle(el);
  if (cs.position === 'static') el.style.position = 'relative';
}

function showLikeBubble(section, clickX, clickY) {
  const messages = ['Nice!', 'Liked!', 'Awesome!', 'So pretty!', 'Love it!'];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  const bubble = document.createElement('div');
  bubble.className = 'section-like-bubble';
  bubble.textContent = msg;
  section.appendChild(bubble);
  const rect = section.getBoundingClientRect();
  // position near click but keep within bounds
  const left = Math.min(Math.max(clickX - rect.left - 40, 12), rect.width - 80);
  const top = Math.min(Math.max(clickY - rect.top - 20, 12), rect.height - 40);
  bubble.style.left = left + 'px';
  bubble.style.top = top + 'px';
  // trigger animation
  requestAnimationFrame(() => {
    bubble.classList.add('show');
    bubble.classList.add('anim');
  });
  // cleanup after animation
  setTimeout(() => {
    bubble.remove();
  }, 950);
}

document.querySelectorAll('section[id]').forEach((sec) => {
  ensureRelative(sec);
  const btn = document.createElement('button');
  btn.className = 'section-like-btn';
  btn.setAttribute('aria-label', 'Like section');
  btn.innerHTML = '♡';
  sec.appendChild(btn);
  btn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const isHearted = btn.classList.toggle('hearted');
    btn.innerHTML = isHearted ? '♥' : '♡';
    const clickX = ev.clientX || (window.innerWidth / 2);
    const clickY = ev.clientY || (window.innerHeight / 2);
    showLikeBubble(sec, clickX, clickY);
  });
});
