(() => {
  const { GAME_META } = window.RPG.content;
  const { newGame, getRole, getScene, listAvailableChoices, step } = window.RPG.engine;
  const { saveToLocal, loadFromLocal, downloadJson, readJsonFile } = window.RPG.storage;

  const $ = (id) => document.getElementById(id);

  const els = {
    chapter:       $("chapter"),
    sceneTitle:    $("sceneTitle"),
    sceneText:     $("sceneText"),
    sceneImageWrap:$("sceneImageWrap"),
    sceneImage:    $("sceneImage"),
    choices:       $("choices"),
    roleCard:      $("roleCard"),
    log:           $("log"),
    buildInfo:     $("buildInfo"),
    btnNew:        $("btnNew"),
    btnSave:       $("btnSave"),
    btnLoad:       $("btnLoad"),
    btnExport:     $("btnExport"),
    importFile:    $("importFile"),
  };

  // ─── Toast 系统 ───────────────────────────────────────────────
  const TOAST_MAP = {
    affection:  { pos:{icon:'♡',text:'心弦微动',  cls:'good'}, neg:{icon:'♡',text:'渐生疏离',  cls:'bad'} },
    suspicion:  { pos:{icon:'⚠',text:'疑云渐浓',  cls:'bad' }, neg:{icon:'✦',text:'心防稍松',  cls:'warn'} },
    danger:     { pos:{icon:'⚠',text:'险象渐生',  cls:'bad' }, neg:{icon:'✦',text:'危机稍退',  cls:'warn'} },
    money:      { pos:{icon:'◈',text:'银钱入账',  cls:'good'}, neg:{icon:'◈',text:'银钱支出',  cls:'warn'} },
    reputation: { pos:{icon:'✦',text:'声名渐显',  cls:'good'}, neg:{icon:'✦',text:'名声有损',  cls:'bad'} },
    rumor:      { pos:{icon:'⚠',text:'流言四起',  cls:'bad' }, neg:{icon:'✦',text:'流言渐息',  cls:'good'} },
    property:   { pos:{icon:'⚠',text:'家产承压',  cls:'bad' }, neg:{icon:'✦',text:'压力稍减',  cls:'good'} },
  };
  // 优先展示最有叙事冲击力的 stat
  const TOAST_PRIORITY = ['affection','danger','suspicion','money','reputation','rumor','property'];

  const toastContainer = (() => {
    const el = document.createElement('div');
    el.className = 'toast-container';
    document.body.appendChild(el);
    return el;
  })();

  function showToast(delta) {
    if (!delta) return;
    const shown = [];
    for (const key of TOAST_PRIORITY) {
      const dv = delta[key];
      if (!dv) continue;
      const entry = TOAST_MAP[key];
      if (!entry) continue;
      shown.push(dv > 0 ? entry.pos : entry.neg);
      if (shown.length >= 2) break;
    }
    shown.forEach((t, i) => {
      const el = document.createElement('div');
      el.className = `toast toast--${t.cls}`;
      el.style.animationDelay = `${i * 160}ms`;
      el.innerHTML = `<span class="toast__icon">${t.icon}</span><span class="toast__text">${t.text}</span>`;
      toastContainer.appendChild(el);
      const delay = 1800 + i * 160;
      setTimeout(() => el.classList.add('toast--out'), delay);
      setTimeout(() => el.remove(), delay + 500);
    });
  }

  // ─── 渲染角色卡（只展示名字、简介、银钱符号、故事 flag）────────
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

    const tags = [];
    if (state.flags?.have_jade) tags.push(`<span class="tag warn">持有残玉</span>`);
    if (state.flags?.marriage)  tags.push(`<span class="tag good">婚约</span>`);
    if (state.flags?.alliance)  tags.push(`<span class="tag good">同盟</span>`);

    const money = Math.max(0, Math.min(10, Math.round(state.stats?.money ?? 0)));
    const moneyBar = '◈'.repeat(money) + '◇'.repeat(10 - money);

    els.roleCard.innerHTML = `
      <div class="role">
        <div class="role__name">${role.name}</div>
        <div class="role__desc">${role.desc}</div>
        <div class="role__money">
          <div class="role__money-label">银钱</div>
          <div class="role__money-bar">${moneyBar}</div>
        </div>
        ${tags.length ? `<div class="role__flags">${tags.join("")}</div>` : ""}
      </div>
    `;
  }

  // ─── 渲染记忆日志 ─────────────────────────────────────────────
  function renderLog(state) {
    const items = (state.history || []).slice(-40).reverse();
    if (items.length === 0) {
      els.log.innerHTML = `<div class="logline"><div class="logline__text">暂无记录。</div></div>`;
      return;
    }
    els.log.innerHTML = items
      .map(x => `
        <div class="logline">
          <div class="logline__time">${x.t}</div>
          <div class="logline__text">${escapeHtml(x.text)}</div>
        </div>
      `)
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
      .replaceAll('"',"&quot;").replaceAll("'","&#039;");
  }

  function replayAnim(el) {
    if (!el) return;
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  }

  // ─── 渲染场景 ─────────────────────────────────────────────────
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
    [els.sceneTitle, els.sceneText, els.sceneImageWrap].forEach(replayAnim);

    const imgSrc = scene.image || "";
    if (imgSrc) {
      els.sceneImage.src = imgSrc;
      els.sceneImage.alt = scene.title || "";
      els.sceneImageWrap.style.display = "";
    } else {
      els.sceneImageWrap.style.display = "none";
      els.sceneImage.removeAttribute("src");
      els.sceneImage.alt = "";
    }

    const available = listAvailableChoices(scene, state);
    els.choices.innerHTML = "";

    for (const choice of available) {
      const btn = document.createElement("button");
      btn.className = `btn choice ${scene.ending ? "btn--primary" : ""}`;
      btn.type = "button";
      // 只显示选项文字，不预告效果
      btn.innerHTML = `<div class="choice__label">${escapeHtml(choice.label)}</div>`;
      btn.addEventListener("click", () => {
        state = step(state, choice);
        showToast(state.lastDelta);
        saveToLocal(state);
        renderAll(state);
      });
      els.choices.appendChild(btn);
    }
  }

  function renderAll(state) {
    renderRole(state);
    renderLog(state);
    renderScene(state);
  }

  // ─── 存档 ─────────────────────────────────────────────────────
  function safeHydrateState(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.sceneId || !raw.stats) return null;
    raw.lastDelta = raw.lastDelta || {};
    raw.flags     = raw.flags     || {};
    raw.history   = raw.history   || [];
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
      if (!raw) { alert("没有找到可用存档。"); return; }
      setState(raw);
      flash(els.btnLoad, "已读取");
    });
    els.btnExport.addEventListener("click", () => {
      downloadJson(`rpg-save-${Date.now()}.json`, getState());
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
    if (!getScene(state.sceneId)) state.sceneId = "start";

    const getState = () => state;
    const setState = (s) => { state = s; renderAll(state); };

    wireControls(getState, setState);
    renderAll(state);
    saveToLocal(state);
  }

  init();
})();
