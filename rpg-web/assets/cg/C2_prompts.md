# 《逐玉》第二章 CG 生成指南

说明：第二章主题为“假婚避祸”。建议统一输出为 `16:9` PNG。

参考图：
- 角色与风格参考：`C1_N1v2.jpg`
- Raw URL：`https://raw.githubusercontent.com/QUAFFquaff/big_ming1566/main/rpg-web/assets/cg/C1_N1v2.jpg`

推荐在 Midjourney 每条 prompt 末尾追加：
```text
--cref https://raw.githubusercontent.com/QUAFFquaff/big_ming1566/main/rpg-web/assets/cg/C1_N1v2.jpg --sref https://raw.githubusercontent.com/QUAFFquaff/big_ming1566/main/rpg-web/assets/cg/C1_N1v2.jpg --cw 80 --ar 16:9
```

统一角色 tag：

女主：
```text
young Chinese woman, 18 years old, petite slender figure,
black hair tied in a neat high bun (full round bun, no loose strands),
oval face, sharp determined dark eyes with double eyelids,
thin straight eyebrows, pale fair skin, thin lips natural color,
wearing red short-front hanfu jacket with green trim collar,
dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes,
gray sash belt at waist, heroic and capable demeanor
```

谢征：
```text
Chinese man, 25 years old, tall broad-shouldered imposing figure,
black long hair loosely falling, square jawline, prominent cheekbones,
narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure,
warm bronze skin tone, defined facial structure,
wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest,
heavy luxurious fabric, cold stern dangerous aura
```

统一风格 tag：
```text
Chinese ancient dynasty visual novel CG, high-quality 2D game art,
cinematic composition, winter atmosphere, cold blue snowy light,
strong warm-cool color contrast, expressive characters with strong body language,
precise prop details, ultra-detailed, 16:9 aspect ratio
```

统一 negative prompt：
```text
deformed face, extra limbs, missing fingers, low quality, blurry, watermark,
modern clothing, western fantasy, inconsistent character design,
chibi, sketch, unfinished lineart
```

## 第二章剧情重点

第二章核心冲突是：族亲逼压、身份暴露风险、用“假婚”建立对外身份。视觉重点不是打斗，而是压迫感、试探、沉默中的结盟，以及“从利用到微妙信任”的关系变化。

## 场景 Prompt

### `C2_N1.png` 大伯上门
```text
Daytime interior of a small ancient Chinese shop. An older man in his 50s, heavy-set, calculating eyes, plain merchant clothing, stands inside the shop doorway with two family members behind him. He scans back and forth between the young woman and the rear courtyard door with cold appraisal. The young woman stands behind the counter, expression guarded and composed, one hand resting on the countertop. The rear courtyard door is visible in the background, slightly ajar, implying someone is listening behind it. Tension fills the space, an unspoken struggle over property and survival. Warm but oppressive indoor light, floating dust in the air, cinematic composition.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_N2A.png` 强硬驱赶
```text
Small shop interior. The young woman stands behind the counter with a cleaver laid flat across the countertop, not raised, which makes it more threatening. Her expression is cold and unflinching, chin slightly lifted, posture absolutely steady. The uncle and his family retreat toward the door, the uncle's face darkened with anger and humiliation. In the background near the inner room doorway, Xie Zheng stands silently watching, arms at his sides, expression unreadable but attentive. Hard side-lighting casting dramatic shadows, dust in the air, tense stillness.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_N2B.png` 息事宁人
```text
Kitchen interior, warm dim light. The young woman sits alone at a rough wooden table, hands resting on the tabletop, trembling slightly though she tries to hide it. Xie Zheng enters quietly from the left, setting a bowl of hot water beside her hands without a word. Steam rises from the bowl. He does not look at her directly and does not ask what happened, only stands nearby. She looks down at the bowl, emotions complex and unspoken. Small cluttered kitchen, warmth mixed with confinement, intimate silence.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_N2C.png` 谢征出面
```text
Shop interior. Xie Zheng stands in the foreground, slightly in front of the young woman, addressing the uncle with absolute calm. His posture is unhurried, voice measured, but every word feels calculated to corner the opponent. The uncle's face is frozen between anger and speechlessness, like someone gripped by the throat. The young woman stands slightly behind Xie Zheng, watching him from the side with a complicated, unsettled expression. The contrast between Xie Zheng's controlled black robes and the uncle's flustered retreat tells the whole story.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_N3.png` 通缉画像
```text
Indoor dusk scene. A wanted poster lies flat on a low table between them, the portrait blurred but bearing a seventy percent resemblance to Xie Zheng. Xie Zheng sits across from the young woman, looking at the poster for a long moment, then shifting his gaze to her face. The young woman stares at the poster, expression carefully blank, processing the implication. The room is very quiet; the silence itself is the visual subject. Dim warm candlelight, heavy atmosphere of unspoken decision-making. The wanted poster is the focal point in the foreground, their faces in the midground.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_N4A.png` 无法出城
```text
The same room with the wanted poster still on the table. Xie Zheng slowly shakes his head, jaw set, glancing at the poster and then back to the young woman's face. His expression is calm but heavy with the certainty of someone who has calculated every option and found them closed. He sits slightly forward, elbows on knees, posture of a man cornered but not broken. The young woman looks at him steadily, trying to read whether he is telling the truth. Evening light, deepening shadows, the wanted poster anchoring the tension between them.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_N4B.png` 答应假婚
```text
Interior night by candlelight. The young woman has just said yes. A beat of stillness fills the room, as if the air itself shifted shape. Xie Zheng looks at her steadily, expression unreadable but gaze intent and searching, as if asking whether she will regret this. The young woman meets his gaze without looking away, not warm, not cold, only direct and resolved. The space between them across the low table feels charged. Candlelight flickers slightly. The wanted poster remains on the table, partially covered by a teacup.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_RULES.png` 约法三章
```text
Interior candlelight. The two sit formally across from each other at a low table. On the table lies an open marriage contract scroll weighted by an inkstone. Xie Zheng sits on the left, posture perfectly upright, gaze fixed directly on her face, expression controlled and restrained, right hand pressed flat on the table. The young woman sits on the right, eyes calm and composed, head slightly lowered as she listens, one fingertip lightly pressing the corner of the marriage scroll. The table surface and marriage contract between them are the tension core of the frame. Background: carved wooden screen, swaying warm candle shadows, cold night visible through a side window.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_N4C.png` 要求坦白
```text
A long silence has just ended. Xie Zheng sits with his head slightly bowed, having just admitted there is an old unresolved case and people who want him dead before it closes. Now he lifts his head to look at her directly. His expression is rare, not guarded and not calculating, but quieter and more vulnerable beneath the surface. The young woman listens, her expression shifting from suspicion toward something more unsettled, because what he said sounds like protection. A candle burns between them on the table, becoming the emotional center of the frame.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_N5.png` 婚礼形式
```text
Daytime, soft winter light. The two sit in the main room with a blank sheet of paper on the table between them, the unwritten wedding plan. Xie Zheng leans back slightly, arms loosely folded, watching her with an expression that says this is your world, you decide. The young woman looks at the paper, then glances at him, trying to figure out whether this is trust or simply him passing the burden. A quiet scene with no immediate crisis, only two people working out a shared survival arrangement. Pale winter sunlight through lattice windows.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

### `C2_END.png` 第二章终
```text
Night. The fake marriage is settled. Split composition with a thin wall dividing the frame. On the left, the young woman lies awake in her room, staring at the ceiling, an oil lamp casting a small warm circle of light around her. On the right beyond the wall, Xie Zheng sits up slightly in darkness, motionless, unclear whether asleep or awake. The wall between them is the visual and emotional center. Both figures are enclosed in separate light and shadow, each carrying thoughts the other cannot hear. Outside, the snow has stopped and the courtyard is very still. Quiet, ambiguous warmth.

young Chinese woman, 18 years old, petite slender figure, black hair tied in a neat high bun (full round bun, no loose strands), oval face, sharp determined dark eyes with double eyelids, thin straight eyebrows, pale fair skin, thin lips natural color, wearing red short-front hanfu jacket with green trim collar, dark gray wide-leg pants, white cloth wrappings on lower legs, black cloth shoes, gray sash belt at waist, heroic and capable demeanor

Chinese man, 25 years old, tall broad-shouldered imposing figure, black long hair loosely falling, square jawline, prominent cheekbones, narrow single-eyelid eyes, thick strong eyebrows, deep-set gaze with intense pressure, warm bronze skin tone, defined facial structure, wearing black wide-sleeve official robe with gold cloud embroidery on shoulders and chest, heavy luxurious fabric, cold stern dangerous aura

Chinese ancient dynasty visual novel CG, high-quality 2D game art, cinematic composition, winter atmosphere, cold blue snowy light, strong warm-cool color contrast, expressive characters with strong body language, precise prop details, ultra-detailed, 16:9 aspect ratio
```

## 建议出图顺序

如果你想先验证角色稳定性，优先生成这 4 张：
1. `C2_N1.png`
2. `C2_N2C.png`
3. `C2_N3.png`
4. `C2_N4B.png`

如果这四张角色脸和服装稳定，再补全其余张数，返工成本最低。
