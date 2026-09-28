(() => {
  const form = document.querySelector("[data-site-search]");
  const input = form?.querySelector("[data-search-input]");
  const status = form?.querySelector("[data-search-status]");
  const results = form?.querySelector("[data-search-results]");
  const script = document.querySelector("script[data-search-index]");
  if (!form || !input || !status || !results || !script) return;

  const idleMessage = form.dataset.idleMessage || "";
  let indexPromise;
  let timer;

  const normalize = (value) => String(value || "").normalize("NFKC").toLocaleLowerCase();

  async function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(script.dataset.searchIndex, { headers: { Accept: "application/json" } })
        .then((response) => {
          if (!response.ok) throw new Error("Search index request failed");
          return response.json();
        })
        .then((data) => Array.isArray(data.items) ? data.items : []);
    }
    return indexPromise;
  }

  function render(items) {
    results.replaceChildren();
    for (const item of items) {
      const row = document.createElement("li");
      const link = document.createElement("a");
      link.href = item.url;
      const type = document.createElement("span");
      type.className = "result-type";
      type.textContent = item.type || "";
      const title = document.createElement("strong");
      title.textContent = item.title || "";
      link.append(type, title);
      row.append(link);
      if (item.description) {
        const description = document.createElement("p");
        description.textContent = item.description;
        row.append(description);
      }
      results.append(row);
    }
  }

  async function search() {
    const query = normalize(input.value.trim());
    if (!query) {
      results.replaceChildren();
      status.textContent = idleMessage;
      return;
    }
    status.textContent = "…";
    try {
      const terms = query.split(/\s+/).filter(Boolean);
      const items = await loadIndex();
      const matches = items.filter((item) => {
        const haystack = normalize([item.title, item.description, ...(item.tags || [])].join(" "));
        return terms.every((term) => haystack.includes(term));
      }).slice(0, 12);
      render(matches);
      status.textContent = matches.length
        ? `${matches.length} / ${items.length}`
        : form.dataset.emptyMessage || "";
    } catch {
      results.replaceChildren();
      status.textContent = form.dataset.errorMessage || "";
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.clearTimeout(timer);
    search();
  });
  input.addEventListener("input", () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(search, 140);
  });
})();
