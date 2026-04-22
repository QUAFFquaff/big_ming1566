# 《逐玉》CG 生成指南

说明：`rpg-web/src/content.js` 会加载 `rpg-web/assets/cg/` 下的固定文件名。
所有图均为 `16:9` PNG。

---

## 一、一致性方案（必读）

保证每张图人物面貌与画风一致，需三层锁定同时使用：

### 1. 参考图（最重要）

**风格 + 角色参考图：`C1_N1v2.jpg`**（本文件同目录）

提交到 GitHub 后，raw URL 为：
```
https://raw.githubusercontent.com/QUAFFquaff/big_ming1566/main/rpg-web/assets/cg/C1_N1v2.jpg
```

#### Midjourney 用法
每条 prompt 末尾固定追加：
```
--cref [上方URL] --sref [上方URL] --cw 80 --ar 16:9
```
- `--cref`：锁定角色面貌（人脸、发型、服饰）
- `--sref`：锁定画风（笔触、配色、光影）
- `--cw 80`：角色一致性强度，可调 0–100，越高越像参考图
- 若角色不在参考图中出现（如纯背景图），去掉 `--cref`，只保留 `--sref`

#### Leonardo AI 用法
1. 生成前点击 **Character Reference** 标签，上传 `C1_N1v2.jpg`
2. 将 Character Strength 调至 **0.75–0.85**
3. 同时在 **Style Reference** 上传同一张图，Style Strength **0.5–0.6**
4. 模型选择：**Leonardo Anime XL** 或 **Kino XL**，固定 **Seed**（首次生成后记录），后续所有图用同一 Seed

---

### 2. 角色特征文字描述（参考图失效时的兜底）

每条 prompt 中需包含对应角色的特征描述（见下方角色 tag，按需复制）。

#### 【女主角色 tag】
```
young Chinese woman, 18 years old, petite slender figure,
black hair tied in a neat high bun (full round bun, no loose strands),
oval face, sharp determined dark eyes with double eyelids,
thin straight eyebrows, pale fair skin, thin lips natural color,
wearing red short-front hanfu jacket with green trim collar,
dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes,
gray sash belt at waist, heroic and capable demeanor
```

#### 【谢征角色 tag】
```
Chinese man, 25 years old, tall broad-shouldered imposing figure,
black long hair loosely falling, square jawline, prominent cheekbones,
narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure,
warm bronze skin tone, defined facial structure,
wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest,
heavy luxurious fabric, cold stern dangerous aura
```

---

### 3. 统一风格 tag（每张图必附）

```
Chinese ancient dynasty visual novel CG, high-quality 2D game art,
cinematic composition, full moon backlighting with frost-white moonlight,
cold blue snowy night atmosphere, strong warm-cool color contrast,
dynamic falling snow particles, expressive characters with strong body language,
dual-layer composition (close-up foreground characters + ancient architecture silhouette background),
precise prop details, ultra-detailed, 16:9 aspect ratio
```

#### 统一 Negative Prompt（Leonardo 填入 Negative Prompt 栏；MJ 用 `--no`）
```
deformed face, extra limbs, missing fingers, low quality, blurry, watermark,
modern clothing, western fantasy, multiple people when scene calls for one,
inconsistent character design, chibi, sketch, unfinished lineart
```

---

## 二、各场景 Prompt

> **使用方式**：将「场景描述」+「所需角色 tag」+「统一风格 tag」拼接后提交。
> Midjourney 用户末尾追加 `--cref [URL] --sref [URL] --cw 80 --ar 16:9`。

---

### `C1_N1.png` — 后院异响

**场景描述：**
Winter night, the young woman cautiously pushes open a half-open wooden gate with one hand,
leaning sideways to peer into the rear courtyard.
The full moon hangs directly above the gate frame casting dramatic backlighting,
the snow-covered courtyard is silent and vast, a faint fallen silhouette visible in the far distance.
Her expression is alert, brows slightly furrowed, right hand gripping the gate frame instinctively.
Foreground: weathered wooden gate frame and her hand in close-up detail.
Background: snow-covered yard and dark tiled rooftop silhouettes.

**附加：** 【女主角色 tag】 + 【统一风格 tag】

---

### `C1_N2.png` — 雪地发现伤者

**场景描述：**
The young woman stands in the near-right of frame, bending forward in shock,
staring at the foreground — a tall man in black robes (Xie Zheng) lying face-down in thick snow,
blood pooling around him half-covered by fresh snowfall.
His outstretched right hand tightly grips a shattered jade pendant split in two,
the jade's green luminescence reflecting against the white snow.
Full moon directly overhead, snowflakes swirling.
Strong tricolor contrast: her red jacket, his black robe, white snow.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C1_N3A.png` — 立刻施救

**场景描述：**
Dim interior. The young woman strains to half-carry half-lift Xie Zheng onto a wooden bed,
his arm draped across her shoulders, head hanging limp, unconscious.
Candlelight from the side casts warm orange glow, illuminating the sweat on her forehead and his pale cheek.
A torn cloth strip and medicine bowl scattered on the table.
Background: wooden lattice window with cold snow-light filtering in, creating warm-cool contrast.
Camera angle slightly overhead, emphasizing her effort to support his weight alone.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C1_N3B.png` — 藏入柴房

**场景描述：**
After dragging Xie Zheng into the woodshed, the young woman kneels on one knee,
one hand pressing down on his chest wound, the other holding the door ajar to peer outside,
expression tense and guarded.
The shed is dark; only a thin line of moonlight slices diagonally through the door crack,
illuminating half her face and the bloodstain on his cheek.
Stacked firewood logs fill the background, creating a heavy oppressive atmosphere.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C1_N3C.png` — 搜身确认身份

**场景描述：**
The young woman crouches beside Xie Zheng, drawing a half-torn crumpled letter from inside his robe,
her other hand cradling the cracked jade pendant up to examine it in moonlight.
Camera from behind her shoulder looking toward the props —
the scorched-edged letter fragments and the jade's clean shear-cut break dominate the foreground,
her solemn profile in the midground, dark courtyard behind.
Prop detail: jade break surface smooth as a blade cut, letter paper has charred edges.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C1_FEVER.png` — 深夜发热 ⭐

**场景描述：**
Interior night. A small oil lamp sits at the bedside, warm orange halo enveloping the bed.
Xie Zheng lies feverish, a damp cloth on his forehead.
The young woman sits sideways at the edge of the bed, reaching to change the cloth —
his hand has unconsciously closed around her wrist, just enough to make her pause.
She looks down at her captured wrist, expression complex and unresolved.
Both figures carry their own unspoken thoughts.
Outside the window: deep blue snowy night creating an extreme warm-cool contrast with the interior light.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C1_N4.png` — 苏醒试探

**场景描述：**
Early morning pale light filters through wooden lattice windows.
Xie Zheng half-props himself up, eyes sharp as a blade scanning the unfamiliar room,
his right hand quietly feeling under the pillow (finding nothing).
The young woman stands by the window in backlit silhouette, holding a medicine bowl,
calmly meeting his gaze without flinching.
Their eye contact forms a silent standoff across the middle of the frame.
Cold white morning light vs. the heavy gravity of his black robe.
Foreground: medicine bowl with rising steam in close-up.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C1_N5.png` — 官差巡街

**场景描述：**
The young woman presses against the wall inside a half-closed wooden door,
peering through the gap to the outside.
Outside: a row of constables in dark uniforms carrying lanterns march in formation through a snow-covered alley,
their warm lantern light casting long orange shadows on the snow.
The door frame divides the image into two spaces —
inside: dark and oppressive; outside: lit and dangerous.
Her profile is outlined by the light leaking through the gap, expression holding her breath.
In the far background, Xie Zheng's reclining silhouette is faintly visible.

**附加：** 【女主角色 tag】 + 【统一风格 tag】

---

### `C1_END.png` — 章节结尾

**场景描述：**
The young woman stands alone under the covered corridor, one hand resting on a wooden pillar,
gazing up as the line of patrol lanterns gradually disappears around the far end of the snowy alley.
Her back occupies the near foreground, full moon centered high in the frame, snowflakes falling silently.
Behind her the courtyard is quiet; the woodshed door stands slightly ajar
with a single thin line of warm light — the secret hidden within.
Overall palette: cold silver-blue, with only that one door-crack warm glow as the visual focal point.

**附加：** 【女主角色 tag】 + 【统一风格 tag】

---

---

## 第二章 CG · 假婚避祸

> 所有图末尾追加：`--cref https://raw.githubusercontent.com/QUAFFquaff/big_ming1566/main/rpg-web/assets/cg/C1_N1v2.jpg --sref https://raw.githubusercontent.com/QUAFFquaff/big_ming1566/main/rpg-web/assets/cg/C1_N1v2.jpg --cw 80 --ar 16:9`

---

### `C2_N1.png` — 大伯上门

**场景描述：**
Daytime interior of a small shop. An older man (the uncle, 50s, heavy-set, calculating eyes, plain merchant clothing) stands inside the shop doorway with two family members behind him, eyes scanning back and forth between the young woman and the rear courtyard door — a cold merchant's appraisal.
The young woman stands behind the counter, expression guarded and composed, one hand resting on the counter surface.
The rear courtyard door is visible in the background, slightly ajar, implying someone is listening from behind it.
Tension fills the space between the two parties — an unspoken power struggle over property and survival.
Warm but oppressive indoor light, dust motes in the air.

**附加：** 【女主角色 tag】 + 【统一风格 tag】（无谢征，只有门缝暗示他的存在）

---

### `C2_N2A.png` — 强硬驱赶

**场景描述：**
The young woman stands behind the shop counter, a cleaver laid flat and deliberately across the countertop — not raised, just placed there, which makes it more threatening.
Her expression is cold and unflinching, chin slightly lifted, posture absolutely steady.
The uncle and his family are retreating toward the door, the uncle's face darkened with anger and humiliation.
In the background near the inner room doorway, Xie Zheng stands silently watching the entire scene, arms at his sides, expression unreadable but attentive.
Hard side-lighting casting dramatic shadows, dust in the air.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_N2B.png` — 息事宁人

**场景描述：**
Kitchen interior, warm dim light. The young woman sits alone at a rough wooden table, hands resting on the table surface — they are trembling slightly, though she tries to hide it.
Xie Zheng enters quietly from the left, setting a bowl of hot water on the table beside her hands without a word.
Steam rises from the bowl.
He doesn't look at her directly, doesn't ask what happened — just places the bowl and stands nearby.
She looks down at the bowl, emotions complex and unspoken.
The kitchen is small and cluttered, giving a sense of warmth and confinement together.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_N2C.png` — 谢征出面

**场景描述：**
Shop interior. Xie Zheng stands in the foreground, positioned slightly in front of the young woman, addressing the uncle with absolute calm — his posture unhurried, voice measured, but every word precisely calculated to corner the opponent.
The uncle's face is frozen mid-expression — caught between anger and having no comeback, like someone grabbed by the throat.
The young woman stands slightly behind Xie Zheng, watching him from the side with a complicated, half-unsettled expression — he suddenly feels like a stranger to her.
The contrast between Xie Zheng's controlled black robes and the uncle's flustered retreat tells the entire story.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_N3.png` — 通缉画像

**场景描述：**
Indoor scene, dusk light. A wanted poster lies flat on the low table between them — the portrait on it is blurred but bears a 70% resemblance to Xie Zheng.
Xie Zheng sits across from the young woman, looking at the poster for a long moment, then shifts his gaze to her face.
The young woman stares at the poster, expression carefully blank, processing.
The room is very quiet — this silence is the visual subject of the scene.
Dim warm candlelight, a heavy atmosphere of unspoken decision-making.
The wanted poster is the focal point of the foreground; their faces in the midground.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_N4A.png` — 无法出城

**场景描述：**
The same room with the wanted poster still on the table.
Xie Zheng shakes his head slowly, jaw set, glancing at the poster then back to the young woman's face — his expression calm but carrying the weight of someone who has calculated every option and found them closed.
He sits slightly forward, elbows on knees, posture of a man cornered but not broken.
The young woman looks at him steadily, trying to read whether he's telling the truth.
The wanted poster between them on the table anchors the tension.
Evening light, shadows deepening.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_N4B.png` — 答应假婚

**场景描述：**
The young woman has just spoken — the moment right after she says yes.
A beat of stillness fills the room, as if the air itself shifted shape.
Xie Zheng looks at her steadily, expression unreadable but his gaze is intent and searching — "You won't regret this?"
The young woman meets his gaze without looking away — not warm, not cold, just direct and resolved.
The space between them across the low table feels charged.
Candlelight flickers slightly. The wanted poster is still on the table, partially covered by a teacup.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_RULES.png` — 约法三章 ⭐

**场景描述：**
Interior candlelight. The two sit formally across from each other at a low table.
On the table: an open marriage contract scroll weighted by an inkstone,
candlelight forming a warm-light foreground element.
Xie Zheng sits left, posture perfectly upright, gaze fixed directly on her face,
expression controlled and suppressed, right hand pressed flat on the table surface.
The young woman sits right, eyes calm and composed, head slightly lowered listening to him speak,
fingertip lightly pressing the corner of the marriage scroll.
The table surface and marriage contract between them are the tension core of the frame.
Background: carved wooden screen partition, candlelight casting swaying warm shadows across it,
contrasting with the cold night visible through a side window.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_N4C.png` — 要求坦白

**场景描述：**
A long silence just ended.
Xie Zheng sits with his head slightly bowed, having just spoken — confessing the existence of an old unresolved case, people who want him dead before it closes.
Now he lifts his head to look at her directly: "The less you know, the safer you are."
His expression is rare — not guarded, not calculating, but something quieter and more vulnerable underneath the surface.
The young woman listens, her expression shifting from suspicion to something more unsettled — because what he said sounds like protection.
Candlelight between them on the table.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_N5.png` — 婚礼形式

**场景描述：**
Daytime, soft winter light. The two sit in the main room, a blank sheet of paper on the table between them — the unwritten wedding plan.
Xie Zheng leans back slightly, arms loosely folded, watching her with an expression that says: this is your world, you decide.
"You know the people here better than I do."
The young woman looks at the paper, then glances at him — trying to figure out if this is trust or just him passing the burden.
A quieter scene: no crisis, just two people figuring out a shared survival arrangement.
Pale winter sunlight through lattice windows.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】

---

### `C2_END.png` — 第二章终

**场景描述：**
Night. The fake marriage is settled.
Split composition: a thin wall divides the frame. On the left, the young woman lies awake in her room, staring at the ceiling, oil lamp casting a small warm circle of light around her. On the right through the wall, Xie Zheng sits up slightly in the dark, motionless — it's unclear if he's asleep or awake.
The wall between them is the visual and emotional center of the image.
Both figures are enclosed in their own light and shadow, separately carrying thoughts the other can't hear.
Outside: snow has stopped. The courtyard is very still.
A quiet, ambiguous warmth — the feeling of: one more person in the world is now connected to you.

**附加：** 【女主角色 tag】 + 【谢征角色 tag】 + 【统一风格 tag】（C2_END 纯背景/氛围图可去掉 --cref，只保留 --sref）
