(() => {
  const GAME_META = {
  title: "沉浸式权谋 RPG（Demo）",
  build: "2026-03-17",
  };

  const STAT_DEFS = [
  { key: "renown", label: "声望", min: 0, max: 100 },
  { key: "silver", label: "银两", min: 0, max: 9999 },
  { key: "influence", label: "权势", min: 0, max: 100 },
  { key: "military", label: "兵势", min: 0, max: 100 },
  ];

  const ROLES = [
  {
    id: "censor",
    name: "清流御史",
    desc: "你手握笔墨与风骨。言官之路危险重重，但也可能一言定国运。",
    start: {
      sceneId: "prologue",
      stats: { renown: 55, silver: 80, influence: 35, military: 10 },
      flags: { upright: true },
    },
  },
  {
    id: "merchant",
    name: "盐商巨贾",
    desc: "你擅长用银两打通关节。若把握得当，钱可通神；若失了分寸，便是抄家灭族。",
    start: {
      sceneId: "prologue",
      stats: { renown: 30, silver: 260, influence: 25, military: 5 },
      flags: { rich: true },
    },
  },
  {
    id: "general",
    name: "边镇总兵",
    desc: "你能用刀剑解决问题。朝堂不信你，你也不信朝堂；但天下终究要靠兵去守。",
    start: {
      sceneId: "prologue",
      stats: { renown: 40, silver: 120, influence: 15, military: 55 },
      flags: { iron: true },
    },
  },
  ];

// Conditions (simple DSL):
// - { stats: { renown: { gte: 50 } } }
// - { flags: { upright: true } }
// - { any: [cond1, cond2] }, { all: [...] }, { not: cond }
  const SCENES = {
  start: {
    id: "start",
    chapter: "序章",
    title: "选择你的角色",
    text:
      "风起于青萍之末。\n\n你将扮演不同身份踏入漩涡：清流、巨贾或边将。选择将影响初始属性、可走路线与可触发结局。",
    choices: [
      { label: "以清流御史入局", next: "prologue", setRole: "censor" },
      { label: "以盐商巨贾入局", next: "prologue", setRole: "merchant" },
      { label: "以边镇总兵入局", next: "prologue", setRole: "general" },
    ],
  },

  prologue: {
    id: "prologue",
    chapter: "第一回",
    title: "风入京师",
    text:
      "京师传言：海运税银亏空，盐引走私横行，边镇军饷拖欠。\n\n皇城之内，人人都有账本。你要先选一条路——从盐、从税、还是从兵。",
    choices: [
      {
        label: "先查盐：从盐引入手",
        next: "salt_1",
        effects: { stats: { influence: +4 } },
        log: "你决定从盐引入手，先摸清利益链条。",
      },
      {
        label: "先查税：追问海运亏空",
        next: "tax_1",
        effects: { stats: { renown: +4 } },
        log: "你决定把税银亏空摆到台面上，让账本说话。",
      },
      {
        label: "先稳兵：催饷以安边镇",
        next: "army_1",
        effects: { stats: { military: +4 } },
        log: "你决定先稳住边镇军心，再谈朝堂攻防。",
      },
    ],
  },

  salt_1: {
    id: "salt_1",
    chapter: "第一回",
    title: "盐引与人情",
    text:
      "你在盐运司外等了半个时辰。\n\n一名书吏递来一张条子：『要见主事，先递银。』你若应下，盐引档案立刻可查；不应，则要排到月末。",
    choices: [
      {
        label: "递银：先拿到档案再说",
        next: "salt_2",
        effects: { stats: { silver: -60, influence: +6 }, flags: { bribed: true } },
        tags: ["银两-60", "权势+6", "立刻推进"],
        log: "你用银两买来速度，也买来一枚钉子：『受贿』的把柄。",
      },
      {
        label: "不递：按规矩排队",
        next: "salt_wait",
        effects: { stats: { renown: +6, influence: -2 }, flags: { upright: true } },
        tags: ["声望+6", "权势-2", "更清白"],
        log: "你选择守规矩。有人暗笑你迂，也有人暗记你硬。",
      },
      {
        label: "反手点名：以法压人（需要声望≥50）",
        next: "salt_pressure",
        if: { stats: { renown: { gte: 50 } } },
        effects: { stats: { influence: +4, renown: -3 }, flags: { enemies: true } },
        tags: ["权势+4", "声望-3", "树敌"],
        log: "你当场点名训斥书吏。盐运司的人记住了你。",
      },
    ],
  },

  salt_wait: {
    id: "salt_wait",
    chapter: "第一回",
    title: "月末之前",
    text:
      "你按规矩递了文书。结果三天后，文书『不慎遗失』。\n\n有人好心提醒：若不想一直丢，得找个靠山。",
    choices: [
      {
        label: "找靠山：去拜会首辅门下",
        next: "court_1",
        effects: { stats: { influence: +6, silver: -30 }, flags: { patron: true } },
        tags: ["权势+6", "银两-30"],
        log: "你决定先结一条线，再谈清白与否。",
      },
      {
        label: "硬顶：继续按章办事",
        next: "ending_clean",
        effects: { stats: { renown: +10, influence: -6 }, flags: { martyr: true } },
        tags: ["声望+10", "权势-6", "结局"],
        log: "你选择硬顶。清名留下了，但路也到头了。",
      },
    ],
  },

  salt_pressure: {
    id: "salt_pressure",
    chapter: "第一回",
    title: "强硬的代价",
    text:
      "盐运司主事当夜就送来档案。\n\n但第二日，市井流言四起：『某某以清流自居，实则拿着密档勒索盐商。』你明白，这场仗开始了。",
    choices: [
      {
        label: "顺势追打：公开一部分证据",
        next: "court_1",
        effects: { stats: { renown: +5, influence: +2 }, flags: { salt_case: true } },
        tags: ["声望+5", "权势+2"],
        log: "你放出证据，逼对手出牌。",
      },
      {
        label: "先收声：把证据交给可靠之人",
        next: "court_1",
        effects: { stats: { influence: +3 }, flags: { quiet: true, salt_case: true } },
        tags: ["权势+3"],
        log: "你暂避锋芒，把证据递到更高处。",
      },
    ],
  },

  salt_2: {
    id: "salt_2",
    chapter: "第一回",
    title: "账本的阴影",
    text:
      "档案里只有半本账。\n\n另一半，被人撕走了。你知道那半本在哪儿：盐商会馆。\n\n夜里去取，可能遭伏；白天去谈，可能被拖。",
    choices: [
      {
        label: "夜取：带两名心腹潜入",
        next: "ambush",
        effects: { stats: { military: +3 }, flags: { night_ops: true } },
        tags: ["兵势+3", "高风险"],
        log: "你选择夜取，赌对手没准备好。",
      },
      {
        label: "昼谈：以利换账（需要银两≥120）",
        next: "deal",
        if: { stats: { silver: { gte: 120 } } },
        effects: { stats: { silver: -120, influence: +5 }, flags: { bought_ledger: true } },
        tags: ["银两-120", "权势+5"],
        log: "你用银两换来半本账，也换来一张人情券。",
      },
      {
        label: "请兵：借边将之力（需要兵势≥50 或 角色=边镇总兵）",
        next: "raid",
        if: {
          any: [{ stats: { military: { gte: 50 } } }, { flags: { role_general: true } }],
        },
        effects: { stats: { military: -6, influence: +6 }, flags: { raid: true } },
        tags: ["兵势-6", "权势+6"],
        log: "你借兵搜查。快、狠、有效，但朝堂会记一笔。",
      },
    ],
  },

  ambush: {
    id: "ambush",
    chapter: "第一回",
    title: "伏与反伏",
    text:
      "巷口黑影一闪。\n\n你被伏击了。若你兵势足，尚可反杀；若不足，只能弃账而走。",
    choices: [
      {
        label: "硬闯（需要兵势≥40）",
        next: "court_1",
        if: { stats: { military: { gte: 40 } } },
        effects: { stats: { military: -10, renown: +3 }, flags: { ledger: true, wounds: true } },
        tags: ["兵势-10", "声望+3"],
        log: "你带伤夺回账本。京师的夜，记得你的血。",
      },
      {
        label: "撤退：弃账保命",
        next: "court_1",
        effects: { stats: { influence: -4 }, flags: { enemies: true } },
        tags: ["权势-4"],
        log: "你选择撤退。对手知道你想要什么，也知道你会再来。",
      },
    ],
  },

  deal: {
    id: "deal",
    chapter: "第一回",
    title: "交易",
    text:
      "盐商会馆里，香火与算盘并置。\n\n对方把半本账推给你：『你拿走也行，但要记一句——这世上没有白账。』",
    choices: [
      {
        label: "收账：承诺不牵连会馆",
        next: "court_1",
        effects: { stats: { influence: +3, renown: -2 }, flags: { ledger: true, compromise: true } },
        tags: ["权势+3", "声望-2"],
        log: "你拿到账本，也留下了妥协的痕迹。",
      },
      {
        label: "反悔：回头就上疏弹劾",
        next: "ending_backfire",
        effects: { stats: { renown: -8 }, flags: { trust_broken: true } },
        tags: ["声望-8", "结局"],
        log: "你翻脸。你以为是正义，对方只当你是背信。",
      },
    ],
  },

  raid: {
    id: "raid",
    chapter: "第一回",
    title: "兵入会馆",
    text:
      "兵丁掀开会馆大门。\n\n你拿到了账，也拿到了『以兵干政』的罪名雏形。",
    choices: [
      {
        label: "上疏：把账本交上去",
        next: "court_1",
        effects: { stats: { renown: +2, influence: +2 }, flags: { ledger: true, salt_case: true } },
        tags: ["声望+2", "权势+2"],
        log: "你把账本递上去，逼朝堂表态。",
      },
      {
        label: "压住：先把账本握在自己手里",
        next: "court_1",
        effects: { stats: { influence: +4, renown: -3 }, flags: { ledger: true, blackmail: true } },
        tags: ["权势+4", "声望-3"],
        log: "你把账本握在手里。你开始像你讨厌的人。",
      },
    ],
  },

  tax_1: {
    id: "tax_1",
    chapter: "第一回",
    title: "海运亏空",
    text:
      "账目上，亏空写得很工整。\n\n工整得像是提前准备好的答案。你可以当众追问，也可以私下探听。",
    choices: [
      {
        label: "当众追问：让对方下不了台",
        next: "court_1",
        effects: { stats: { renown: +6, influence: -2 }, flags: { tax_case: true } },
        tags: ["声望+6", "权势-2"],
        log: "你当众追问，逼对方露出破绽。",
      },
      {
        label: "私下探听：先找一名账房先生",
        next: "clerk_1",
        effects: { stats: { influence: +3, silver: -20 }, flags: { tax_case: true } },
        tags: ["权势+3", "银两-20"],
        log: "你私下探听，准备拿到更硬的证据。",
      },
    ],
  },

  clerk_1: {
    id: "clerk_1",
    chapter: "第一回",
    title: "账房先生",
    text:
      "账房先生低声说：『亏空不在账上，在船上。』\n\n他给你两条线索：一条指向码头，一条指向内库。",
    choices: [
      {
        label: "去码头：查货、查船、查人",
        next: "dock_1",
        effects: { stats: { military: +2, influence: +1 }, flags: { dock: true } },
        tags: ["兵势+2", "权势+1"],
        log: "你决定去码头。脏活往往在最潮湿的地方。",
      },
      {
        label: "入内库：查『谁批的条子』（需要权势≥35）",
        next: "inner_1",
        if: { stats: { influence: { gte: 35 } } },
        effects: { stats: { influence: +4 }, flags: { inner: true } },
        tags: ["权势+4"],
        log: "你决定入内库。真正的权力往往写在一张条子上。",
      },
    ],
  },

  dock_1: {
    id: "dock_1",
    chapter: "第一回",
    title: "码头",
    text:
      "码头上，你看到几箱『盐』的封条异常。\n\n你可以当场扣押，也可以放线钓鱼。",
    choices: [
      {
        label: "扣押：立刻查封",
        next: "court_1",
        effects: { stats: { renown: +3, influence: +1 }, flags: { dock_seized: true } },
        tags: ["声望+3", "权势+1"],
        log: "你当场扣押。证据到手，但动静也更大了。",
      },
      {
        label: "放线：跟踪货主",
        next: "court_1",
        effects: { stats: { influence: +4, renown: -1 }, flags: { dock_tail: true } },
        tags: ["权势+4", "声望-1"],
        log: "你选择跟踪。证据可能更完整，但更容易被反侦。",
      },
    ],
  },

  inner_1: {
    id: "inner_1",
    chapter: "第一回",
    title: "内库条子",
    text:
      "内库门槛高，规矩更高。\n\n你拿到一张条子：签名被刮掉了，只留半个印。你需要决定如何用它。",
    choices: [
      {
        label: "交给首辅：借力打力",
        next: "court_1",
        effects: { stats: { influence: +6 }, flags: { patron: true } },
        tags: ["权势+6"],
        log: "你把条子交给首辅门下。你获得庇护，也欠下人情。",
      },
      {
        label: "自己留着：作为谈判筹码",
        next: "court_1",
        effects: { stats: { influence: +4, renown: -2 }, flags: { blackmail: true } },
        tags: ["权势+4", "声望-2"],
        log: "你把条子握在手里。你离权力更近，也更危险。",
      },
    ],
  },

  army_1: {
    id: "army_1",
    chapter: "第一回",
    title: "催饷",
    text:
      "边镇来信：『饷银再不到账，兵就要散。』\n\n你可以强硬催饷，也可以先找银两垫付以稳军心。",
    choices: [
      {
        label: "强硬催饷：直达御前",
        next: "court_1",
        effects: { stats: { military: +6, influence: -2 }, flags: { army_case: true } },
        tags: ["兵势+6", "权势-2"],
        log: "你把军饷问题直达御前。朝堂震动，但也有人恨你多事。",
      },
      {
        label: "垫付：先用银两稳军（需要银两≥150）",
        next: "court_1",
        if: { stats: { silver: { gte: 150 } } },
        effects: { stats: { silver: -150, military: +8, renown: +2 }, flags: { army_case: true } },
        tags: ["银两-150", "兵势+8", "声望+2"],
        log: "你垫付军饷稳住军心。银子少了，命却多了几条。",
      },
      {
        label: "做交易：让盐商出银换军权（需要盐商身份）",
        next: "court_1",
        if: { flags: { role_merchant: true } },
        effects: { stats: { silver: +120, influence: +4, renown: -5 }, flags: { dirty_deal: true, army_case: true } },
        tags: ["银两+120", "权势+4", "声望-5"],
        log: "你做了交易：银两入军，利益入账。有人称你务实，有人称你卖国。",
      },
    ],
  },

  court_1: {
    id: "court_1",
    chapter: "第二回",
    title: "朝堂之上",
    text:
      "你带着线索与账本走上朝堂。\n\n对手笑问：『你要的是国法，还是你的位置？』\n\n此刻，你必须选择：公开、妥协、或反制。",
    choices: [
      {
        label: "公开：把证据全摆出来（需要至少一个案件线索）",
        next: "ending_reform",
        if: { any: [{ flags: { salt_case: true } }, { flags: { tax_case: true } }, { flags: { army_case: true } }, { flags: { ledger: true } }] },
        effects: { stats: { renown: +10, influence: +2 }, flags: { truth: true } },
        tags: ["声望+10", "结局"],
        log: "你选择公开。风暴将至，但你不再回头。",
      },
      {
        label: "妥协：换取一个『安全的胜利』",
        next: "ending_compromise",
        effects: { stats: { influence: +8, renown: -6 }, flags: { compromise: true } },
        tags: ["权势+8", "声望-6", "结局"],
        log: "你选择妥协。你赢了一局，但你知道自己输了些什么。",
      },
      {
        label: "反制：用把柄逼对方让步（需要黑料）",
        next: "ending_blackmail",
        if: { any: [{ flags: { bribed: true } }, { flags: { blackmail: true } }, { flags: { ledger: true } }] },
        effects: { stats: { influence: +12, renown: -10 }, flags: { tyrant: true } },
        tags: ["权势+12", "声望-10", "结局"],
        log: "你选择反制。你把别人变成棋子，也把自己变成了棋手。",
      },
    ],
  },

  ending_clean: {
    id: "ending_clean",
    chapter: "终章",
    title: "清名",
    text:
      "你把自己守得很干净。\n\n但在这座城里，干净的人往往走不远。\n\n你被外放，远离漩涡。\n\n【结局：清名】",
    ending: true,
    choices: [{ label: "回到标题", next: "start" }],
  },

  ending_backfire: {
    id: "ending_backfire",
    chapter: "终章",
    title: "反噬",
    text:
      "你翻脸太快。\n\n从此，你的信用成了笑话；你的敌人却变成了同盟。\n\n你失去立足之地。\n\n【结局：反噬】",
    ending: true,
    choices: [{ label: "回到标题", next: "start" }],
  },

  ending_reform: {
    id: "ending_reform",
    chapter: "终章",
    title: "风暴与改制",
    text:
      "你把证据摊在朝堂上。\n\n有人哭，有人笑，有人沉默。\n\n改制从来不靠一人，但你点燃了引线。\n\n【结局：风暴与改制】",
    ending: true,
    choices: [{ label: "回到标题", next: "start" }],
  },

  ending_compromise: {
    id: "ending_compromise",
    chapter: "终章",
    title: "安全的胜利",
    text:
      "你赢了一个『安全的胜利』。\n\n你的位置更稳了，敌人更少了。\n\n但很多事，也就到此为止了。\n\n【结局：安全的胜利】",
    ending: true,
    choices: [{ label: "回到标题", next: "start" }],
  },

  ending_blackmail: {
    id: "ending_blackmail",
    chapter: "终章",
    title: "棋手",
    text:
      "你用把柄逼对方让步。\n\n京师安静了三个月，随后更大的风暴卷来。\n\n你成了棋手，也成了更大的靶子。\n\n【结局：棋手】",
    ending: true,
    choices: [{ label: "回到标题", next: "start" }],
  },
  };

  window.RPG = window.RPG || {};
  window.RPG.content = { GAME_META, STAT_DEFS, ROLES, SCENES };
})();

