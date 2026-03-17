(() => {
  const KEY = "rpg_web_demo_save_v1";

  function saveToLocal(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function loadFromLocal() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function clearLocal() {
    localStorage.removeItem(KEY);
  }

  function downloadJson(filename, obj) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function readJsonFile(file) {
    const text = await file.text();
    return JSON.parse(text);
  }

  window.RPG = window.RPG || {};
  window.RPG.storage = { saveToLocal, loadFromLocal, clearLocal, downloadJson, readJsonFile };
})();

