"use strict";

const nav = document.getElementById("nav");
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
const mobile = window.matchMedia("(max-width: 760px)");
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

function setMenu(open, restoreFocus = false) {
  links.classList.toggle("open", open);
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  links.inert = mobile.matches && !open;
  if (restoreFocus) toggle.focus();
}
if (toggle && links) {
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  links
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  mobile.addEventListener("change", () => setMenu(false));
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    )
      setMenu(false, true);
  });
  document.addEventListener("click", (event) => {
    if (
      !nav.contains(event.target) &&
      toggle.getAttribute("aria-expanded") === "true"
    )
      setMenu(false);
  });
  setMenu(false);
}

const stage = document.getElementById("stage");
const projects = {
  sandslinger: {
    title: "SAND\nSLINGER",
    category: "Games / Sandslinger",
    description: "Farben verbinden. Sand räumen. Kombos bilden.",
  },
  "dead-air": {
    title: "DEAD\nAIR",
    category: "Games / Dead Air",
    description: "Retro-Cartoon-Look. Ein Spiel mit eigenem Charakter.",
  },
  "bq-pruefung": {
    title: "BQ\nPrüfung",
    category: "Apps / Lernen",
    description: "Dein Ziel. Dein Tempo. Deine Prüfung.",
  },
  tinyminds: {
    title: "Tiny\nMinds",
    category: "Apps / Familie",
    description: "Ein liebevoller Begleiter für die ersten Jahre.",
  },
};
const showcaseButtons = [...document.querySelectorAll("[data-showcase]")];
showcaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const id = button.dataset.showcase;
    const project = projects[id];
    stage.dataset.project = id;
    const title = document.getElementById("stage-title");
    title.replaceChildren();
    project.title.split("\n").forEach((line, i) => {
      if (i) title.append(document.createElement("br"));
      title.append(document.createTextNode(line));
    });
    document.getElementById("stage-category").textContent = project.category;
    document.getElementById("stage-description").textContent =
      project.description;
    document.getElementById("stage-link").href = "#" + id;
    document.getElementById("showcase-index").textContent =
      `0${index + 1} / 04`;
    showcaseButtons.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
  });
});

const cards = [...document.querySelectorAll(".project-card")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
function filterProjects(category) {
  let count = 0;
  cards.forEach((card) => {
    card.hidden = category !== "all" && card.dataset.category !== category;
    if (!card.hidden) count++;
  });
  filterButtons.forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === category),
    ),
  );
  document.getElementById("project-count").textContent = `${count} Projekte`;
}
filterButtons.forEach((button) =>
  button.addEventListener("click", () => filterProjects(button.dataset.filter)),
);
function revealLinkedProject() {
  const card = cards.find((item) => "#" + item.id === location.hash);
  if (card && card.hidden) {
    filterProjects("all");
    card.scrollIntoView({ block: "start" });
  }
}
window.addEventListener("hashchange", revealLinkedProject);
// The same hash may be clicked again after changing the filter.
document.querySelectorAll('a[href^="#"]').forEach((link) =>
  link.addEventListener("click", () => {
    const card = cards.find(
      (item) => "#" + item.id === link.getAttribute("href"),
    );
    if (card && card.hidden) filterProjects("all");
  }),
);
revealLinkedProject();

const dialog = document.getElementById("product-dialog");
const dialogContent = document.getElementById("dialog-content");
let dialogTrigger;
document.querySelectorAll("[data-detail]").forEach((button) =>
  button.addEventListener("click", () => {
    const card = document.getElementById(button.dataset.detail);
    if (!card || !dialog || typeof dialog.showModal !== "function") return;
    const category = document.createElement("p");
    category.className = "label";
    category.textContent =
      card.querySelector(".project-type").textContent + " / Dasc Interactive";
    const title = document.createElement("h2");
    title.id = "dialog-title";
    title.textContent = card.querySelector("h3").textContent;
    const description = card
      .querySelector(".project-description")
      .cloneNode(true);
    const extra = card.querySelector(".extended-description").cloneNode(true);
    extra.hidden = false;
    const actions = document.createElement("div");
    actions.className = "dialog-links";
    card
      .querySelectorAll(".project-actions a")
      .forEach((link) => actions.append(link.cloneNode(true)));
    const artwork = card.querySelector(".project-artwork");
    const content = [category, title];
    if (artwork) {
      const preview = artwork.cloneNode(true);
      preview.className = "dialog-artwork";
      preview.loading = "eager";
      content.push(preview);
    }
    content.push(description, extra, actions);
    dialogContent.replaceChildren(...content);
    dialogTrigger = button;
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }),
);
if (dialog) {
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    dialogTrigger?.focus();
  });
}

const copyButton = document.getElementById("copy-email");
if (copyButton)
  copyButton.addEventListener("click", async () => {
    const status = document.getElementById("copy-status");
    try {
      await navigator.clipboard.writeText("hello@dasc-interactive.de");
      status.textContent = "E-Mail-Adresse kopiert.";
    } catch {
      status.textContent = "Bitte markiere und kopiere die E-Mail-Adresse.";
    }
  });

if ("IntersectionObserver" in window && links) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.querySelectorAll("a").forEach((link) => {
          const active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -60% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}
document.documentElement.classList.add("enhanced");
