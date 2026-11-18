const EARLY_ACCESS_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSemhMmrRkaX1tVXVAnFY30TMv8Ykt_xGSARDZii_kbpeFyrRw/viewform";
const modal = document.querySelector("#modal");
const content = document.querySelector("#modal-content");
let lastFocus;
function openModal(markup) {
  if (!modal.open) lastFocus = document.activeElement;
  content.innerHTML = markup;
  modal.showModal();
  document.body.classList.add("modal-open");
}
function closeModal() {
  modal.close();
}
modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  lastFocus?.focus();
});
document.querySelector(".close-modal").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    const r = modal.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      closeModal();
  }
});
const templates = {
  design: {
    name: "Form",
    category: "Brand & creative",
    title: "Ideas that move you.",
    color: "purple",
    description:
      "A bold, expressive starting point for creative studios, brand designers, and your next big idea.",
  },
  consulting: {
    name: "Clarity",
    category: "Business & consulting",
    title: "A clear vision. A better direction.",
    color: "blue",
    description:
      "A considered, confident layout for strategies, consulting engagements, and a clear path forward.",
  },
  development: {
    name: "Structure",
    category: "Web & development",
    title: "Built for what’s next.",
    color: "",
    description:
      "A clean, purposeful starting point for websites, digital products, and technical partnerships.",
  },
};
function showGallery(selected = "design") {
  openModal(
    `<h2 id="modal-title">A starting point that feels like you.</h2><p class="modal-description">Explore three template concepts for the upcoming Propizet library.</p><div class="gallery-tabs" aria-label="Template categories">${Object.entries(
      templates,
    )
      .map(([key, t]) => `<button data-choice="${key}">${t.category}</button>`)
      .join(
        "",
      )}</div><div id="gallery-body"></div><p class="modal-note">Illustrative template concepts. Final designs and availability may change.</p>`,
  );
  const render = (key) => {
    const t = templates[key];
    content.querySelectorAll("[data-choice]").forEach((b) => {
      b.classList.toggle("active", b.dataset.choice === key);
      b.setAttribute(
        "aria-pressed",
        b.dataset.choice === key ? "true" : "false",
      );
    });
    document.querySelector("#gallery-body").innerHTML =
      `<div class="gallery-preview"><div class="demo-preview ${t.color}"><small>YOUR STUDIO / ${t.category.toUpperCase()}</small><h3>${t.title}</h3><p>Prepared for your next great client.<br>A thoughtful introduction to your best work.</p><strong>Project proposal</strong><div class="preview-label">YOUR NEXT CHAPTER STARTS HERE.</div></div><div><div class="eyebrow">THE ${t.name.toUpperCase()} COLLECTION</div><h3 style="margin-top:12px">${t.name}</h3><p>${t.description}</p><a class="button button-outline" data-early-access href="${EARLY_ACCESS_URL}" target="_blank" rel="noopener noreferrer">Create with this style <span>↗</span></a></div></div>`;
  };
  content
    .querySelectorAll("[data-choice]")
    .forEach((b) =>
      b.addEventListener("click", () => render(b.dataset.choice)),
    );
  render(selected);
}
document
  .querySelectorAll("[data-template]")
  .forEach((b) =>
    b.addEventListener("click", () => showGallery(b.dataset.template)),
  );

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navigation");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }
});
