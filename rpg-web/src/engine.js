(() => {
const { ROLES, SCENES, STAT_DEFS } = window.RPG.content;

const STAT_KEYS = STAT_DEFS.map((s) => s.key);

function nowIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function clampStat(key, value) {
  const def = STAT_DEFS.find((s) => s.key === key);
  if (!def) return value;
  const v = Math.max(def.min, Math.min(def.max, value));
  return key === "silver" ? Math.round(v) : v;
}

function defaultStats() {
  const base = {};
  for (const def of STAT_DEFS) base[def.key] = def.key === "silver" ? 100 : 50;
  base.renown = 50;
  base.silver = 100;
  base.influence = 20;
  base.military = 20;
  return base;
}

function newGame() {
  return {
    v: 1,
    roleId: null,
    sceneId: "start",
    stats: defaultStats(),
    flags: {},
    history: [],
    lastDelta: {},
    startedAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function getRole(roleId) {
  return ROLES.find((r) => r.id === roleId) || null;
}

function getScene(sceneId) {
  return SCENES[sceneId] || null;
}

function evalCond(cond, state) {
  if (!cond) return true;
  if (cond.all) return cond.all.every((c) => evalCond(c, state));
  if (cond.any) return cond.any.some((c) => evalCond(c, state));
  if (cond.not) return !evalCond(cond.not, state);

  if (cond.flags) {
    for (const [k, v] of Object.entries(cond.flags)) {
      if ((state.flags?.[k] ?? false) !== v) return false;
    }
  }
  if (cond.stats) {
    for (const [k, rule] of Object.entries(cond.stats)) {
      const cur = Number(state.stats?.[k] ?? 0);
      if (rule.gte != null && !(cur >= rule.gte)) return false;
      if (rule.lte != null && !(cur <= rule.lte)) return false;
      if (rule.gt != null && !(cur > rule.gt)) return false;
      if (rule.lt != null && !(cur < rule.lt)) return false;
      if (rule.eq != null && !(cur === rule.eq)) return false;
    }
  }

  return true;
}

function listAvailableChoices(scene, state) {
  const out = [];
  for (const choice of scene.choices || []) {
    if (choice.if && !evalCond(choice.if, state)) continue;
    out.push(choice);
  }
  return out;
}

function applyRoleSideEffects(state) {
  const roleId = state.roleId;
  state.flags.role_censor = roleId === "censor";
  state.flags.role_merchant = roleId === "merchant";
  state.flags.role_general = roleId === "general";
}

function applyEffects(state, effects) {
  const delta = {};
  for (const k of STAT_KEYS) delta[k] = 0;

  if (!effects) return delta;
  if (effects.flags) {
    state.flags = { ...state.flags, ...effects.flags };
  }
  if (effects.stats) {
    for (const [k, dv] of Object.entries(effects.stats)) {
      const cur = Number(state.stats[k] ?? 0);
      const next = clampStat(k, cur + Number(dv));
      delta[k] = next - cur;
      state.stats[k] = next;
    }
  }
  return delta;
}

function setRole(state, roleId) {
  const role = getRole(roleId);
  if (!role) return;
  state.roleId = role.id;
  state.sceneId = role.start.sceneId;
  state.stats = { ...state.stats, ...role.start.stats };
  state.flags = { ...state.flags, ...role.start.flags };
  applyRoleSideEffects(state);
  state.lastDelta = {};
  for (const k of STAT_KEYS) state.lastDelta[k] = 0;
  state.history.push({ t: nowIso(), text: `选择角色：${role.name}` });
}

function step(state, choice) {
  const scene = getScene(state.sceneId);
  if (!scene) throw new Error(`Unknown scene: ${state.sceneId}`);
  if (choice.if && !evalCond(choice.if, state)) return state;

  const nextState = typeof structuredClone === "function" ? structuredClone(state) : JSON.parse(JSON.stringify(state));

  if (choice.setRole) {
    setRole(nextState, choice.setRole);
    nextState.updatedAt = Date.now();
    return nextState;
  }

  const delta = applyEffects(nextState, choice.effects);
  nextState.lastDelta = delta;

  const logText = choice.log || `选择：${choice.label}`;
  nextState.history.push({ t: nowIso(), text: logText });
  nextState.sceneId = choice.next;
  nextState.updatedAt = Date.now();
  return nextState;
}

window.RPG = window.RPG || {};
window.RPG.engine = { defaultStats, newGame, getRole, getScene, evalCond, listAvailableChoices, step };
})();

