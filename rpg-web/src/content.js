(() => {
  const GAME_META = {
  title: "《逐玉》视觉小说原型（前三章）",
  build: "2026-03-18",
  };

  const STAT_DEFS = [
  { key: "affection", label: "谢征好感", min: 0, max: 100 },
  { key: "suspicion", label: "身份怀疑", min: 0, max: 100 },
  { key: "reputation", label: "名声", min: 0, max: 100 },
  { key: "rumor", label: "流言压力", min: 0, max: 100 },
  { key: "property", label: "家产压力", min: 0, max: 100 },
  { key: "danger", label: "危险度", min: 0, max: 100 },
  { key: "money", label: "银钱", min: 0, max: 10 },
  ];

  const ROLES = [
  {
    id: "fan_changyu",
    name: "樊长玉",
    desc: "雪夜收摊，风波上门。你只是想守住铺子与家人，却被卷入一枚碎玉与一桩旧案。",
    start: {
      sceneId: "C1_N1",
      stats: {
        affection: 20,
        suspicion: 0,
        reputation: 45,
        rumor: 10,
        property: 20,
        danger: 5,
        money: 3,
      },
      flags: { have_jade: false, marriage: false, alliance: false },
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
    chapter: "开始",
    title: "《逐玉》· 视觉小说原型",
    text:
      "你将扮演樊长玉。\n\n雪夜异响、重伤男子、碎裂玉佩与密信残页……\n你的每次选择都会改变关系、名声与风险，并影响后续章节走向。",
    choices: [
      { label: "开始故事", next: "C1_N1", setRole: "fan_changyu" },
    ],
  },
  C1_N1: {
    id: "C1_N1",
    chapter: "第一章 · 风雪夜救人",
    title: "后院异响",
    image: "assets/cg/C1_N1.png",
    text: "收摊将尽，雪落无声。\n\n你正要合上后门，忽听院外一声闷响，像是有人从墙头跌落。\n\n这条巷子素来不太平——你要不要去看？",
    choices: [
      { label: "查看异响", next: "C1_N2", log: "你提灯走向后院，想看清那声闷响从何而来。" },
      {
        label: "先锁门再查看",
        next: "C1_N2",
        effects: { stats: { suspicion: +1 } },
        tags: ["谨慎+1"],
        log: "你先把门闩扣牢，再提灯去看——谨慎，总能少吃亏。",
      },
    ],
  },

  C1_N2: {
    id: "C1_N2",
    chapter: "第一章 · 风雪夜救人",
    title: "雪地发现伤者",
    image: "assets/cg/C1_N2.png",
    text:
      "雪地里躺着一名男子，身上血迹被风雪糊成暗色。\n\n他右手死死攥着一枚碎裂玉佩，指节冻得发白。\n\n你若救他，便是把麻烦背进屋；若不救，今夜也许能睡得安稳。",
    choices: [
      {
        label: "立刻施救",
        next: "C1_N3A",
        log: "你顾不得多想，把人背进屋里，先止血再说。",
      },
      {
        label: "拖去柴房观察",
        next: "C1_N3B",
        log: "你把人拖进柴房，心里盘算：先藏起来，别引火烧身。",
      },
      {
        label: "搜身确认身份",
        next: "C1_N3C",
        log: "你先搜了搜他身上，至少得知道自己要救的是谁。",
      },
    ],
  },

  C1_N3A: {
    id: "C1_N3A",
    chapter: "第一章 · 风雪夜救人",
    title: "立刻施救",
    image: "assets/cg/C1_N3A.png",
    text:
      "你把人背进屋内，火盆旁的热气让他微微颤了一下。\n\n止血、清理、包扎——你手法熟练，像做过很多次。\n\n他没死。这一点，似乎就够了。",
    choices: [
      {
        label: "询问姓名",
        next: "C1_N4",
        effects: { stats: { affection: +15, reputation: +1 } },
        tags: ["好感+15", "名声+1"],
        log: "你问他姓名，语气尽量放轻。你救了他，也想知道他是谁。",
      },
      {
        label: "隐瞒姓名避免惹祸",
        next: "C1_N4",
        effects: { stats: { affection: +10, suspicion: +1, reputation: +1 } },
        tags: ["好感+10", "谨慎+1", "名声+1"],
        log: "你没有追问太多。活下去比真相更要紧——至少今晚如此。",
      },
    ],
  },

  C1_N3B: {
    id: "C1_N3B",
    chapter: "第一章 · 风雪夜救人",
    title: "拖去柴房观察",
    image: "assets/cg/C1_N3B.png",
    text:
      "柴房里潮冷，草垛带着霉味。\n\n他被你拖进来时闷哼了一声，像是痛醒又昏。\n\n你站在门口犹豫：送药还是等天亮？",
    choices: [
      {
        label: "深夜再送药",
        next: "C1_N4",
        effects: { stats: { affection: -5, suspicion: +1 } },
        tags: ["好感-5", "谨慎+1"],
        log: "你还是送了药。你不敢太靠近他，但也不想他死在你家柴房。",
      },
      {
        label: "天亮再说",
        next: "C1_N4",
        effects: { stats: { affection: -5, suspicion: +1, danger: +1 } },
        tags: ["好感-5", "谨慎+1", "危险+1"],
        log: "你决定等天亮。可你也知道，夜里最容易出事。",
      },
    ],
  },

  C1_N3C: {
    id: "C1_N3C",
    chapter: "第一章 · 风雪夜救人",
    title: "搜身确认身份",
    image: "assets/cg/C1_N3C.png",
    text:
      "你摸到一块残玉，纹样精细，不像寻常人家之物。\n\n他衣襟内侧还藏着一页被撕碎的纸，上头只有几行模糊的字迹。\n\n你忽然明白：这人身上带着麻烦，且不小。",
    choices: [
      {
        label: "归还残玉",
        next: "C1_N4",
        effects: { stats: { affection: -10 }, flags: { have_jade: false } },
        tags: ["好感-10"],
        log: "你把残玉放回他手边。你想保持距离，也想保住良心。",
      },
      {
        label: "暂时藏起残玉",
        next: "C1_N4",
        effects: { stats: { affection: -10, suspicion: +2 }, flags: { have_jade: true } },
        tags: ["好感-10", "怀疑+2", "持有残玉"],
        log: "你把残玉藏起。你不知道它值不值命，但至少值一个答案。",
      },
    ],
  },

  C1_N4: {
    id: "C1_N4",
    chapter: "第一章 · 风雪夜救人",
    title: "苏醒试探",
    image: "assets/cg/C1_N4.png",
    text:
      "他短暂醒来，目光像刀一样扫过屋内。\n\n他只说自己遭人追杀，别的都含糊。\n\n你听得出，他在试探你，你也在试探他。",
    choices: [
      {
        label: "相信其说辞",
        next: "C1_N5",
        effects: { stats: { affection: +5 } },
        tags: ["好感+5"],
        log: "你点头，装作只是好心收留。你想看看他会不会把你当成敌人。",
      },
      {
        label: "追问来历",
        next: "C1_N5",
        effects: { stats: { suspicion: +2 } },
        tags: ["怀疑+2"],
        log: "你追问来历。你救人可以，但不想救来一把刀。",
      },
      {
        label: "警告天亮必须离开",
        next: "C1_N5",
        effects: { stats: { affection: -3, reputation: -1 } },
        tags: ["好感-3", "名声-1"],
        log: "你警告他天亮就走。你害怕麻烦，但也怕自己心软。",
      },
    ],
  },

  C1_N5: {
    id: "C1_N5",
    chapter: "第一章 · 风雪夜救人",
    title: "官差巡街",
    image: "assets/cg/C1_N5.png",
    text:
      "外头忽然传来脚步与喝问声。\n\n“搜！通缉要犯，近日必藏于城中——”\n\n你心口一紧：他们找的，会不会就是你屋里这人？",
    choices: [
      {
        label: "藏入地窖",
        next: "C1_END",
        effects: { stats: { danger: -1, suspicion: +1 } },
        tags: ["危险-1", "谨慎+1"],
        log: "你把他藏进地窖。你不确定这是不是对，但至少能拖过眼前这一关。",
      },
      {
        label: "假称远房表兄",
        next: "C1_END",
        effects: { stats: { reputation: +1, danger: +1 } },
        tags: ["名声+1", "危险+1"],
        log: "你编了个身份。话说出口那一刻，你知道自己已经站边了。",
      },
      {
        label: "让他独自应付",
        next: "C1_END",
        effects: { stats: { affection: -10, danger: +2 } },
        tags: ["好感-10", "危险+2"],
        log: "你退到一旁，让他自己应付。你保全了自己，却失了他的信任。",
      },
    ],
  },

  C1_END: {
    id: "C1_END",
    chapter: "第一章 · 风雪夜救人",
    title: "章节结尾",
    image: "assets/cg/C1_END.png",
    text:
      "巡街声渐远，雪却下得更紧。\n\n谢征暂时留在猪肉铺。\n你明白，今夜之后，你再难置身事外。",
    choices: [{ label: "进入第二章", next: "C2_N1", log: "你深吸一口气，准备迎接更难的明天。" }],
  },

  C2_N1: {
    id: "C2_N1",
    chapter: "第二章 · 假婚避祸",
    title: "铺中风波",
    image: "assets/cg/C2_N1.png",
    text:
      "第二日，大伯一家上门，张口便要你交出铺面。\n\n他们目光落在后院，话里话外都在试探：那个男人是谁？\n\n你感到家产与名声都在被人掐住。",
    choices: [
      {
        label: "强硬驱赶",
        next: "C2_N2A",
        effects: { stats: { reputation: +2, property: +1 } },
        tags: ["名声+2", "家产压力+1"],
        log: "你持刀镇住众人。你赢了气势，却也更树敌。",
      },
      {
        label: "息事宁人",
        next: "C2_N2B",
        effects: { stats: { property: +2 } },
        tags: ["家产压力+2"],
        log: "你忍着火气，试图缓和。可有些人只会得寸进尺。",
      },
      {
        label: "让谢征出面",
        next: "C2_N2C",
        effects: { stats: { affection: +10, suspicion: +1 } },
        tags: ["好感+10", "怀疑+1"],
        log: "谢征出面周旋，话锋冷静利落。你更怀疑他究竟是什么人。",
      },
    ],
  },

  C2_N2A: {
    id: "C2_N2A",
    chapter: "第二章 · 假婚避祸",
    title: "强硬驱赶",
    image: "assets/cg/C2_N2A.png",
    text: "你把刀横在案上，语气不重，却足够硬。\n\n大伯脸色难看地退开，临走时丢下一句狠话。",
    choices: [{ label: "继续经营", next: "C2_N3", log: "你强撑着把日子过下去。可麻烦不会自己消失。" }],
  },

  C2_N2B: {
    id: "C2_N2B",
    chapter: "第二章 · 假婚避祸",
    title: "息事宁人",
    image: "assets/cg/C2_N2B.png",
    text: "你压住火气，赔了笑脸。\n\n他们暂时退了，却像在你门口插了根针：随时会扎回来。",
    choices: [{ label: "继续经营", next: "C2_N3", log: "你把铺子收拾好，心里却更沉。" }],
  },

  C2_N2C: {
    id: "C2_N2C",
    chapter: "第二章 · 假婚避祸",
    title: "谢征出面",
    image: "assets/cg/C2_N2C.png",
    text: "谢征语气平静，字字都像算过。\n\n他几句话就让对方进退两难。你看着他，忽然觉得陌生。",
    choices: [{ label: "继续经营", next: "C2_N3", log: "你让风波暂缓，但也把谢征推到了更亮的地方。" }],
  },

  C2_N3: {
    id: "C2_N3",
    chapter: "第二章 · 假婚避祸",
    title: "通缉画像",
    image: "assets/cg/C2_N3.png",
    text:
      "城门口贴出新画像：眉眼模糊，却像极了谢征。\n\n继续同住，风险加剧。\n\n谢征却说：‘若要避祸，最稳的法子，是让所有人相信我们是夫妻。’",
    choices: [
      {
        label: "提议送他离城",
        next: "C2_N4A",
        effects: { stats: { affection: -10, danger: +1 } },
        tags: ["好感-10", "危险+1"],
        log: "你提议送他离城。你想甩开麻烦，也怕自己越陷越深。",
      },
      {
        label: "接受他提出的假婚方案",
        next: "C2_N4B",
        effects: { stats: { affection: +10 }, flags: { marriage: true } },
        tags: ["好感+10", "婚约=true"],
        log: "你接受假婚。你不知这算不算赌，但你已经没有太多路。",
      },
      {
        label: "要求先说实话",
        next: "C2_N4C",
        effects: { stats: { suspicion: +2 } },
        tags: ["怀疑+2"],
        log: "你要求他坦白。合作之前，你至少要知道他在躲什么。",
      },
    ],
  },

  C2_N4A: {
    id: "C2_N4A",
    chapter: "第二章 · 假婚避祸",
    title: "送他离城",
    image: "assets/cg/C2_N4A.png",
    text:
      "谢征摇头：‘我伤未愈，城外更危险。’\n\n他看你的眼神有些淡，像是把某种期待收回去了。",
    choices: [{ label: "重新考虑假婚", next: "C2_N5", log: "你意识到，拖延只会让事更糟。" }],
  },

  C2_N4B: {
    id: "C2_N4B",
    chapter: "第二章 · 假婚避祸",
    title: "接受假婚",
    image: "assets/cg/C2_N4B.png",
    text:
      "你们约定口径，拟好称谓。\n\n从今天起，对外你们是夫妻。\n对内——你也说不清算什么。",
    choices: [{ label: "准备婚书", next: "C2_N5", log: "你开始准备婚书，心里却像压了块石头。" }],
  },

  C2_N4C: {
    id: "C2_N4C",
    chapter: "第二章 · 假婚避祸",
    title: "要求坦白",
    image: "assets/cg/C2_N4C.png",
    text:
      "谢征沉默很久，只说自己牵涉旧案。\n\n他不能说全，但承诺：不会让你白白受牵连。\n\n你听见这句承诺，反而更不安。",
    choices: [
      {
        label: "接受假婚",
        next: "C2_N5",
        effects: { stats: { affection: +5 }, flags: { marriage: true } },
        tags: ["好感+5", "婚约=true"],
        log: "你接受假婚。你不知道这是不是信任，但你决定先活下去。",
      },
      {
        label: "拒绝合作，但先把局面稳住",
        next: "C2_N5",
        effects: { stats: { affection: -5, suspicion: +2 } },
        tags: ["好感-5", "怀疑+2"],
        log: "你没答应他。可局面逼人，你只能先稳住外头。",
      },
    ],
  },

  C2_N5: {
    id: "C2_N5",
    chapter: "第二章 · 假婚避祸",
    title: "成婚过场",
    image: "assets/cg/C2_N5.png",
    text:
      "无论真心与否，你都得决定‘婚礼’的样子。\n\n它会影响外界的观感，也会影响你与谢征之间的距离。",
    choices: [
      {
        label: "简办只求遮掩",
        next: "C2_END",
        log: "你选择简办。只求遮掩，不谈体面。",
      },
      {
        label: "体面操办稳住族人（花费银钱）",
        next: "C2_END",
        effects: { stats: { money: -1, reputation: +1, rumor: -1 } },
        tags: ["银钱-1", "名声+1", "流言-1"],
        if: { stats: { money: { gte: 1 } } },
        log: "你体面操办。银钱少了，风声也小了些。",
      },
      {
        label: "拒绝婚礼只演戏",
        next: "C2_END",
        effects: { stats: { affection: -5, rumor: +1 } },
        tags: ["好感-5", "流言+1"],
        log: "你拒绝婚礼，只演给外人看。谢征的目光沉了沉。",
      },
    ],
  },

  C2_END: {
    id: "C2_END",
    chapter: "第二章 · 假婚避祸",
    title: "章节结尾",
    image: "assets/cg/C2_END.png",
    text:
      "假婚关系确立。\n\n谢征正式住入樊家后院。\n从此你们要共同对抗外界，也要共同面对彼此的秘密。",
    choices: [{ label: "进入第三章", next: "C3_N1", log: "你掀开新的一页，纸上却已沾了旧案的灰。" }],
  },

  C3_N1: {
    id: "C3_N1",
    chapter: "第三章 · 残玉旧案",
    title: "婚后清晨",
    image: "assets/cg/C3_N1.png",
    text:
      "邻里议论纷纷，铺子生意也被流言影响。\n\n你明白：名声是刀，能护你，也能伤你。",
    choices: [
      {
        label: "主动解释婚事",
        next: "C3_N2A",
        effects: { stats: { reputation: +1, suspicion: +1, rumor: -1 } },
        tags: ["名声+1", "怀疑+1", "流言-1"],
        log: "你主动解释婚事。流言稍缓，但你也暴露了婚事仓促。",
      },
      {
        label: "埋头做生意",
        next: "C3_N2B",
        effects: { stats: { money: +1, rumor: +1 } },
        tags: ["银钱+1", "流言+1"],
        log: "你埋头做生意。短期有收益，流言却更发酵。",
      },
      {
        label: "请谢征帮忙记账招呼",
        next: "C3_N2C",
        effects: { stats: { affection: +10, suspicion: +1, rumor: -1 } },
        tags: ["好感+10", "怀疑+1", "流言-1"],
        log: "谢征帮忙得体利落。你更怀疑他的来历，也更离不开他的手段。",
      },
    ],
  },

  C3_N2A: {
    id: "C3_N2A",
    chapter: "第三章 · 残玉旧案",
    title: "主动解释",
    image: "assets/cg/C3_N2A.png",
    text: "你把话说清楚，脸上带笑，背后却发冷。\n\n有些人听进去了，有些人只想看你出丑。",
    choices: [{ label: "前往集市", next: "C3_N3", log: "你决定去集市转转，打听些消息。" }],
  },

  C3_N2B: {
    id: "C3_N2B",
    chapter: "第三章 · 残玉旧案",
    title: "埋头做生意",
    image: "assets/cg/C3_N2B.png",
    text: "你把刀磨得更亮，把账记得更细。\n\n可流言像灰，落在每个来客的眼里。",
    choices: [{ label: "前往集市", next: "C3_N3", log: "你还是得出去一趟，看看风声从哪儿来。" }],
  },

  C3_N2C: {
    id: "C3_N2C",
    chapter: "第三章 · 残玉旧案",
    title: "谢征帮忙",
    image: "assets/cg/C3_N2C.png",
    text: "谢征记账极快，招呼客人也极稳。\n\n这不像一个‘逃命之人’该有的从容。",
    choices: [{ label: "前往集市", next: "C3_N3", log: "你带着疑问出门，想找个答案。" }],
  },

  C3_N3: {
    id: "C3_N3",
    chapter: "第三章 · 残玉旧案",
    title: "当铺线索",
    image: "assets/cg/C3_N3.png",
    text: (state) => {
      const have = !!state.flags?.have_jade;
      return have
        ? "当铺掌柜盯着你拿出的残玉，神色一变。\n\n‘这纹样……我见过。十余年前，一桩灭门旧案里，也有同样的玉。’\n\n他压低声音：‘你别再拿出来，拿出来就是招祸。’"
        : "当铺掌柜提起一则传闻：十余年前曾有灭门旧案，牵连到一枚刻纹极深的玉。\n\n你听着，只觉得后颈发凉。\n\n若你手里真有那样的东西——你也许已经走进局里了。";
    },
    choices: [
      {
        label: "继续追问旧案",
        next: "C3_N4A",
        effects: { stats: { danger: +1, suspicion: +1 } },
        tags: ["危险+1", "怀疑+1"],
        log: "你继续追问。越问越危险，但你停不下来。",
      },
      {
        label: "先回去与谢征商量",
        next: "C3_N4B",
        effects: { stats: { affection: +5 } },
        tags: ["好感+5"],
        log: "你决定先回去商量。你不想再一个人扛着这份不安。",
      },
      {
        label: "隐瞒线索自行调查",
        next: "C3_N4C",
        effects: { stats: { affection: -10, suspicion: +2 } },
        tags: ["好感-10", "怀疑+2"],
        log: "你选择隐瞒。你不完全信他，也不愿把命押在他身上。",
      },
    ],
  },

  C3_N4A: {
    id: "C3_N4A",
    chapter: "第三章 · 残玉旧案",
    title: "追问旧案",
    image: "assets/cg/C3_N4A.png",
    text:
      "你得知旧案幸存者可能藏身宛州。\n\n线索像火星，落在干草上。\n你知道从这一刻起，追查会变成追命。",
    choices: [{ label: "夜探旧宅", next: "C3_N5", log: "你决定夜探旧宅，去找更硬的证据。" }],
  },

  C3_N4B: {
    id: "C3_N4B",
    chapter: "第三章 · 残玉旧案",
    title: "与谢征商量",
    image: "assets/cg/C3_N4B.png",
    text:
      "谢征听完，神色罕见动摇。\n\n他没有否认，只说：‘此案与我过去有关。’\n\n你第一次意识到：你们可能不得不并肩。",
    choices: [{ label: "夜探旧宅", next: "C3_N5", log: "你决定和他一起准备，夜里去旧宅一探。" }],
  },

  C3_N4C: {
    id: "C3_N4C",
    chapter: "第三章 · 残玉旧案",
    title: "自行调查",
    image: "assets/cg/C3_N4C.png",
    text:
      "你决定不完全相信谢征。\n\n你独自摸查旧宅，心里盘算每条退路。\n\n可你也知道：独行更轻快，也更容易死。",
    choices: [{ label: "夜探旧宅", next: "C3_N5", log: "你收好灯与刀，决定夜里动身。" }],
  },

  C3_N5: {
    id: "C3_N5",
    chapter: "第三章 · 残玉旧案",
    title: "夜探旧宅",
    image: "assets/cg/C3_N5.png",
    text:
      "废宅里风声穿堂，像有人低语。\n\n你在暗格里摸到半页账册，纹路竟与残玉隐隐相合。\n\n下一瞬，门外传来脚步——有人发现了你。",
    choices: [
      {
        label: "呼叫谢征协助",
        next: "C3_ENDA",
        effects: { stats: { affection: +15, danger: -2 }, flags: { alliance: true } },
        tags: ["好感+15", "危险-2", "同盟=true"],
        log: "你呼叫谢征。他出现得太快，像早就预备好了这一刻。",
      },
      {
        label: "独自逃离",
        next: "C3_ENDB",
        effects: { stats: { danger: +1 } },
        tags: ["危险+1"],
        log: "你带着账册逃回家。你保住了线索，却留下裂痕。",
      },
      {
        label: "与神秘人对峙",
        next: "C3_ENDC",
        effects: { stats: { danger: +2, suspicion: +1 } },
        tags: ["危险+2", "怀疑+1"],
        log: "你选择对峙。你想看清对方是谁，也想看清自己有几分胆。",
      },
    ],
  },

  C3_ENDA: {
    id: "C3_ENDA",
    chapter: "第三章 · 残玉旧案",
    title: "并肩初成",
    image: "assets/cg/C3_ENDA.png",
    text:
      "谢征及时出现，把你拉出险境。\n\n你们第一次真正站在同一阵线。\n\n故事到此，新的路才刚开始。\n\n【第三章结尾：并肩初成】",
    ending: true,
    choices: [{ label: "回到标题", next: "start" }],
  },

  C3_ENDB: {
    id: "C3_ENDB",
    chapter: "第三章 · 残玉旧案",
    title: "各怀心思",
    image: "assets/cg/C3_ENDB.png",
    text:
      "你带着账册逃回家。\n\n谢征看你的眼神变了，他察觉你有所隐瞒。\n\n故事到此，信任开始裂开。\n\n【第三章结尾：各怀心思】",
    ending: true,
    choices: [{ label: "回到标题", next: "start" }],
  },

  C3_ENDC: {
    id: "C3_ENDC",
    chapter: "第三章 · 残玉旧案",
    title: "险中得讯",
    image: "assets/cg/C3_ENDC.png",
    text:
      "神秘人未下杀手，只留下一句：\n\n“你们查错了方向。”\n\n故事到此，线索更真也更假。\n\n【第三章结尾：险中得讯】",
    ending: true,
    choices: [{ label: "回到标题", next: "start" }],
  },
  };

  window.RPG = window.RPG || {};
  window.RPG.content = { GAME_META, STAT_DEFS, ROLES, SCENES };
})();

