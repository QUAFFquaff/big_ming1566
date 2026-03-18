(() => {
  const { STAT_DEFS, GAME_META } = window.RPG.content;
  const { newGame, getRole, getScene, listAvailableChoices, step } = window.RPG.engine;
  const { saveToLocal, loadFromLocal, downloadJson, readJsonFile } = window.RPG.storage;

  const $ = (id) => document.getElementById(id);

  const els = {
    stats: $("stats"),
    chapter: $("chapter"),
    sceneTitle: $("sceneTitle"),
    sceneText: $("sceneText"),
    sceneImageWrap: $("sceneImageWrap"),
    sceneImage: $("sceneImage"),
    choices: $("choices"),
    roleCard: $("roleCard"),
    log: $("log"),
    buildInfo: $("buildInfo"),
    btnNew: $("btnNew"),
    btnSave: $("btnSave"),
    btnLoad: $("btnLoad"),
    btnExport: $("btnExport"),
    importFile: $("importFile"),
  };

  function fmtDelta(n) {
    if (!n) return null;
    return n > 0 ? `+${n}` : `${n}`;
  }

  function deltaClass(n) {
    if (!n) return "";
    if (n > 0) return "good";
    if (n < 0) return "bad";
    return "warn";
  }

  function statHtml(state) {
    const parts = [];
    for (const def of STAT_DEFS) {
      const v = state.stats?.[def.key] ?? 0;
      const d = state.lastDelta?.[def.key] ?? 0;
      parts.push(`
        <div class="stat">
          <div class="stat__label">${def.label}</div>
          <div class="stat__value">
            <span>${v}</span>
            ${d ? `<span class="stat__delta ${deltaClass(d)}">${fmtDelta(d)}</span>` : ""}
          </div>
        </div>
      `);
    }
    return parts.join("");
  }

  function renderRole(state) {
    const role = getRole(state.roleId);
    if (!role) {
      els.roleCard.innerHTML = `
        <div class="role">
          <div class="role__name">未选择</div>
          <div class="role__desc">在标题页选择一个角色以开始。</div>
        </div>
      `;
      return;
    }

    const kv = (k, v) => `
      <div class="kv">
        <div class="kv__k">${k}</div>
        <div class="kv__v">${v}</div>
      </div>
    `;

    const tags = [];
    if (state.flags?.have_jade) tags.push(`<span class="tag warn">持有残玉</span>`);
    if (state.flags?.marriage) tags.push(`<span class="tag good">婚约</span>`);
    if (state.flags?.alliance) tags.push(`<span class="tag good">同盟</span>`);

    els.roleCard.innerHTML = `
      <div class="role">
        <div class="role__name">${role.name}</div>
        <div class="role__desc">${role.desc}</div>
        <div class="role__grid">
          ${STAT_DEFS.map((def) => kv(def.label, state.stats?.[def.key] ?? 0)).join("")}
        </div>
        ${tags.length ? `<div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:2px;">${tags.join("")}</div>` : ""}
      </div>
    `;
  }

  function renderLog(state) {
    const items = (state.history || []).slice(-40).reverse();
    if (items.length === 0) {
      els.log.innerHTML = `<div class="logline"><div class="logline__text">暂无日志。</div></div>`;
      return;
    }
    els.log.innerHTML = items
      .map(
        (x) => `
        <div class="logline">
          <div class="logline__time">${x.t}</div>
          <div class="logline__text">${escapeHtml(x.text)}</div>
        </div>
      `
      )
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function tagFromChoice(choice) {
    const parts = [];
    const eff = choice.effects?.stats || null;
    if (eff) {
      for (const def of STAT_DEFS) {
        const dv = eff[def.key];
        if (!dv) continue;
        const cls = dv > 0 ? "good" : "bad";
        const txt = `${def.label}${dv > 0 ? "+" : ""}${dv}`;
        parts.push(`<span class="tag ${cls}">${txt}</span>`);
      }
    }
    if (choice.tags) {
      for (const t of choice.tags) parts.push(`<span class="tag">${escapeHtml(t)}</span>`);
    }
    return parts.join("");
  }

  function renderScene(state) {
    const scene = getScene(state.sceneId);
    if (!scene) {
      els.chapter.textContent = "";
      els.sceneTitle.textContent = "未知场景";
      els.sceneText.textContent = `找不到场景：${state.sceneId}`;
      els.choices.innerHTML = "";
      return;
    }

    els.chapter.textContent = `${scene.chapter || ""}${scene.ending ? " · 结局" : ""}`.trim();
    els.sceneTitle.textContent = scene.title;
    const text = typeof scene.text === "function" ? scene.text(state) : scene.text;
    els.sceneText.textContent = text || "";

    const imgSrc = scene.image || "";
    if (els.sceneImageWrap && els.sceneImage && imgSrc) {
      els.sceneImage.src = imgSrc;
      els.sceneImage.alt = scene.title || "";
      els.sceneImageWrap.style.display = "";
    } else if (els.sceneImageWrap) {
      els.sceneImageWrap.style.display = "none";
      if (els.sceneImage) {
        els.sceneImage.removeAttribute("src");
        els.sceneImage.alt = "";
      }
    }

    const available = listAvailableChoices(scene, state);
    els.choices.innerHTML = "";

    for (const choice of available) {
      const btn = document.createElement("button");
      btn.className = `btn choice ${scene.ending ? "btn--primary" : ""}`;
      btn.type = "button";
      btn.innerHTML = `
        <div class="choice__label">${escapeHtml(choice.label)}</div>
        <div class="choice__meta">${tagFromChoice(choice)}</div>
      `;
      btn.addEventListener("click", () => {
        state = step(state, choice);
        saveToLocal(state);
        renderAll(state);
      });
      els.choices.appendChild(btn);
    }
  }

  function renderAll(state) {
    els.stats.innerHTML = statHtml(state);

    renderRole(state);
    renderLog(state);
    renderScene(state);
  }

  function safeHydrateState(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.sceneId || !raw.stats) return null;
    raw.lastDelta = raw.lastDelta || {};
    raw.flags = raw.flags || {};
    raw.history = raw.history || [];
    return raw;
  }

  function wireControls(getState, setState) {
    els.btnNew.addEventListener("click", () => {
      const s = newGame();
      saveToLocal(s);
      setState(s);
    });

    els.btnSave.addEventListener("click", () => {
      saveToLocal(getState());
      flash(els.btnSave, "已保存");
    });

    els.btnLoad.addEventListener("click", () => {
      const raw = safeHydrateState(loadFromLocal());
      if (!raw) {
        alert("没有找到可用存档。");
        return;
      }
      setState(raw);
      flash(els.btnLoad, "已读取");
    });

    els.btnExport.addEventListener("click", () => {
      const s = getState();
      downloadJson(`rpg-save-${Date.now()}.json`, s);
    });

    els.importFile.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      try {
        const obj = await readJsonFile(file);
        const s = safeHydrateState(obj);
        if (!s) throw new Error("invalid save");
        saveToLocal(s);
        setState(s);
      } catch {
        alert("导入失败：文件不是有效存档。");
      }
    });
  }

  function flash(btn, text) {
    const old = btn.textContent;
    btn.textContent = text;
    setTimeout(() => (btn.textContent = old), 700);
  }

  function init() {
    els.buildInfo.textContent = `Build ${GAME_META.build}`;

    let state = safeHydrateState(loadFromLocal()) || newGame();
    // First launch: ensure title screen
    if (!getScene(state.sceneId)) state.sceneId = "start";

    const getState = () => state;
    const setState = (s) => {
      state = s;
      renderAll(state);
    };

    wireControls(getState, setState);
    renderAll(state);
    saveToLocal(state);
  }

  init();
})();

