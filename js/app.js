const state = {
  query: "",
  shell: "all",
  topic: "All",
};

const catalog = document.getElementById("catalog");
const topicsNav = document.getElementById("topics");
const search = document.getElementById("search");

const topics = ["All", ...new Set(COMMANDS.map((item) => item.topic))];

function matches(item) {
  const hay = [item.title, item.blurb, item.topic, item.cmd, item.pwsh, item.linux]
    .join(" ")
    .toLowerCase();
  const q = state.query.trim().toLowerCase();
  const topicOk = state.topic === "All" || item.topic === state.topic;
  return topicOk && (!q || hay.includes(q));
}

function shellBlock(kind, label, code) {
  if (state.shell !== "all" && state.shell !== kind) return "";
  return `
    <article class="shell ${kind}">
      <h3>
        ${label}
        <button class="copy" type="button" data-copy="${encodeURIComponent(code)}">Copy</button>
      </h3>
      <pre><code>${escapeHtml(code)}</code></pre>
    </article>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderTopics() {
  topicsNav.innerHTML = topics
    .map(
      (topic) => `
        <button class="topic${topic === state.topic ? " is-active" : ""}" data-topic="${topic}" type="button">
          ${topic}
        </button>
      `
    )
    .join("");
}

function renderCatalog() {
  const items = COMMANDS.filter(matches);
  if (!items.length) {
    catalog.innerHTML = `<p class="empty">No commands match that search. Try “copy”, “process”, or “grep”.</p>`;
    return;
  }

  catalog.innerHTML = items
    .map(
      (item) => `
        <article class="card" id="${item.id}">
          <header>
            <h2>${item.title}</h2>
            <span class="tag">${item.topic}</span>
          </header>
          <p>${item.blurb}</p>
          <div class="grid">
            ${shellBlock("cmd", "CMD", item.cmd)}
            ${shellBlock("pwsh", "PowerShell", item.pwsh)}
            ${shellBlock("linux", "Linux", item.linux)}
          </div>
        </article>
      `
    )
    .join("");
}

function render() {
  renderTopics();
  renderCatalog();
}

search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderCatalog();
});

document.querySelectorAll("[data-shell]").forEach((button) => {
  button.addEventListener("click", () => {
    state.shell = button.dataset.shell;
    document.querySelectorAll("[data-shell]").forEach((el) => el.classList.remove("is-active"));
    button.classList.add("is-active");
    renderCatalog();
  });
});

topicsNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-topic]");
  if (!button) return;
  state.topic = button.dataset.topic;
  render();
});

catalog.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  const text = decodeURIComponent(button.dataset.copy);
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
    button.classList.add("copied");
    setTimeout(() => {
      button.textContent = "Copy";
      button.classList.remove("copied");
    }, 1200);
  } catch {
    button.textContent = "Select the text";
  }
});

render();
