# 《逐玉》第二章 CG Prompts for `image2`

说明：
- 适用于通用图像模型的单张生成，尤其是 `image2` 一类不依赖 `--cref/--sref` 参数的工作流。
- 每条 prompt 都改成了更稳定的“场景 -> 人物 -> 构图 -> 光线 -> 约束”结构。
- 建议统一输出：`16:9`，视觉小说 CG，高清 2D 国风叙事插画。
- 如果工作流支持参考图，可额外上传 `C1_N1v2.jpg` 作为角色与风格参考，但这些 prompt 本身已尽量自洽。

## 固定角色设定

女主固定设定：
```text
young Chinese woman, 18 years old, petite and slender, pale fair skin, oval face, sharp dark eyes, thin straight eyebrows, black hair tied in a neat high bun with no loose strands, wearing a red short-front hanfu jacket with green-trimmed collar, dark gray loose pants, white leg wraps, black cloth shoes, gray sash belt, capable and guarded temperament
```

谢征固定设定：
```text
Chinese man, 25 years old, tall and broad-shouldered, warm bronze skin, square jawline, prominent cheekbones, narrow eyes, thick eyebrows, black long hair loosely falling, wearing a black official robe with subtle gold cloud embroidery on shoulders and chest, heavy luxurious fabric, stern restrained dangerous aura
```

统一风格：
```text
Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration, cinematic composition, realistic fabric folds, expressive body language, detailed props, elegant ancient Chinese architecture, winter atmosphere, restrained color palette, strong warm-cool contrast, emotionally tense but subtle, polished character art
```

统一负面约束：
```text
no modern clothing, no western fantasy elements, no extra fingers, no extra limbs, no malformed face, no blurry image, no watermark, no text overlay, no chibi, no sketch, no unfinished lineart, no exaggerated anime proportions
```

## 场景 Prompts

### `C2_N1.png` 大伯上门
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: an oppressive daytime confrontation inside a small ancient Chinese shop, when the heroine's uncle comes to pressure her
Scene/backdrop: cramped shop interior in an old Chinese town, wooden counter in the foreground, rear courtyard door visible in the background and slightly ajar, winter daylight filtered through the doorway, dust floating in still air
Subject: the young woman stands behind the counter, guarded and composed, one hand resting on the counter; an older heavy-set uncle in plain merchant clothing stands in the doorway with two family members behind him, his eyes calculating and appraising, glancing between her and the rear door
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: medium-wide shot, the woman centered behind the counter, uncle framed by the doorway, rear courtyard door visible deeper in the composition to imply hidden danger
Lighting/mood: warm indoor daylight but oppressive atmosphere, tension, silent power struggle over property and survival
Color palette: muted wood browns, dusty warm light, restrained reds, winter gray accents
Materials/textures: worn wood counter, cloth garments, dusty air, aged shop interior
Constraints: heroine must match fixed character design; no visible Xie Zheng, only imply his presence through the slightly open rear door; no comedy, no action pose
Avoid: no modern objects, no extra people beyond the described family members, no exaggerated facial expressions
```

### `C2_N2A.png` 强硬驱赶
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: the heroine forcefully driving away her uncle's family without actually attacking
Scene/backdrop: same small shop interior, wooden counter prominent, doorway open as the uncle retreats
Subject: the young woman stands behind the counter with a cleaver laid flat across the countertop, not raised, making the threat feel controlled and cold; her chin slightly lifted, expression unflinching; the uncle and family step backward toward the exit in anger and humiliation; in the background near the inner doorway, Xie Zheng stands silently watching, unreadable and attentive
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: medium-wide shot, cleaver and counter in foreground, heroine dominant in mid-frame, retreating uncle near doorway, Xie Zheng small but visible in the background
Lighting/mood: hard side light, dramatic shadows, dry tense air, confrontation frozen at its peak
Color palette: dark woods, muted daylight, heroine's red jacket as a controlled focal point, Xie Zheng's black robe as visual weight
Materials/textures: worn wooden counter, metal cleaver, heavy robe fabric, airborne dust
Constraints: no swinging or attacking motion; the threat must come from stillness and posture; both leads must match fixed designs
Avoid: no slapstick, no exaggerated fear faces, no action blur
```

### `C2_N2B.png` 息事宁人
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: a quiet kitchen scene after conflict, where Xie Zheng silently comforts the heroine with hot water
Scene/backdrop: small cluttered ancient Chinese kitchen, rough wooden table, dim warm interior, simple household objects, enclosed intimate space
Subject: the young woman sits at the table with both hands resting on the wood, trying to hide a slight tremble; Xie Zheng enters quietly from the side and places a bowl of hot water beside her hands without speaking; she looks down at the bowl, emotions complicated and restrained
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: medium shot from table height, bowl of steaming water near foreground, heroine seated as emotional center, Xie Zheng standing nearby but not looming
Lighting/mood: warm dim kitchen light, soft steam, calm after pressure, subtle intimacy without overt romance
Color palette: warm amber light, desaturated browns, quiet reds and blacks
Materials/textures: steam from hot water, rough wood grain, layered winter clothing, ceramic bowl
Constraints: no direct eye contact required; comfort should feel understated and wordless; both leads must match fixed designs
Avoid: no hugging, no melodramatic crying, no overt smile
```

### `C2_N2C.png` 谢征出面
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: Xie Zheng calmly stepping in and verbally cornering the uncle in the shop
Scene/backdrop: old shop interior, doorway behind the uncle, counter and inner room framing the confrontation
Subject: Xie Zheng stands slightly in front of the heroine, composed and unhurried, speaking with terrifying calm; the uncle is frozen between anger and speechlessness; the heroine stands slightly behind Xie Zheng, looking at him from the side with a newly unsettled expression, as if seeing a side of him she did not expect
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: layered composition, Xie Zheng in the foreground as the dominant silhouette, heroine behind him, uncle near the exit in visible retreat
Lighting/mood: controlled, tense, intellectually threatening rather than physically violent
Color palette: subdued interior tones, black robe creating a strong anchor, heroine's muted red adding contrast
Materials/textures: heavy official robe fabric, old wooden shop structure, diffused daylight
Constraints: Xie Zheng should appear calm and precise, not shouting; heroine's reaction should be subtle, not dramatic
Avoid: no action fighting, no weapon in Xie Zheng's hand, no crowd scene
```

### `C2_N3.png` 通缉画像
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: a tense dusk scene where the heroine and Xie Zheng confront a wanted poster resembling him
Scene/backdrop: quiet room at dusk, low wooden table between two seated characters, dim candlelight, enclosed private interior
Subject: a wanted poster lies flat on the table and is the foreground focal point; its portrait is blurred but clearly resembles Xie Zheng; Xie Zheng sits across from the heroine, looking first at the poster and then at her; the heroine stares at the poster with a carefully blank expression, processing the danger
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: table-level composition, wanted poster in foreground, both faces in midground, negative space used to emphasize silence
Lighting/mood: dim dusk and candlelight, heavy stillness, unspoken decision-making
Color palette: muted brown wood, low amber candlelight, winter blue-gray undertone
Materials/textures: paper poster, wood table, candle glow, layered robes
Constraints: poster must be readable as a wanted notice image but should not require clear text; this scene is about silence and implication, not argument
Avoid: no overt action, no extra background figures, no smiling
```

### `C2_N4A.png` 无法出城
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: Xie Zheng explaining that he cannot safely leave the city yet
Scene/backdrop: same interior room as the wanted poster scene, evening shadows deepening, poster still on the table between them
Subject: Xie Zheng sits leaning slightly forward with elbows near his knees, jaw set, posture of a cornered man who is still composed; he has just refused the idea of leaving the city; the heroine looks at him steadily, trying to judge whether he is telling the truth
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: intimate two-person composition across the table, wanted poster visually anchoring the space between them
Lighting/mood: evening dimness, narrowing options, pressure and strategic honesty
Color palette: dark neutrals, warm low light, winter gray-blue in the shadows
Materials/textures: old paper poster, wooden table, heavy robe folds, subdued interior surfaces
Constraints: emotion should be restrained; he is not pleading, only presenting a hard reality
Avoid: no shouting, no dramatic gestures, no clutter that distracts from the poster and faces
```

### `C2_N4B.png` 答应假婚
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: the exact still moment after the heroine agrees to the fake marriage
Scene/backdrop: same room at night, low table between them, candlelight flickering softly, wanted poster still present and partially obscured by a teacup
Subject: the heroine has just said yes and now meets Xie Zheng's gaze directly, calm and resolved; Xie Zheng looks at her steadily, unreadable but intent, as if weighing the promise and its consequences; the space between them feels charged and newly changed
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: medium two-shot across the table, eye contact as the true center, wanted poster and teacup lower in frame
Lighting/mood: intimate candlelight, quiet turning point, emotional stillness with tension underneath
Color palette: warm candle amber against deep winter darkness, subdued red and black clothing
Materials/textures: candle glow, ceramic teacup, paper poster, layered fabric
Constraints: no smile, no physical contact; this is a serious agreement scene, not a romantic confession
Avoid: no wedding decorations, no comedic awkwardness, no bright saturated colors
```

### `C2_RULES.png` 约法三章
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: a formal scene of the two setting the rules of their fake marriage
Scene/backdrop: candlelit interior at night, low table in the center, carved wooden screen behind them, side window showing cold night outside
Subject: the two sit formally across from each other; an open marriage contract scroll lies on the table weighted by an inkstone; Xie Zheng sits upright on the left with one hand pressed flat to the table, gaze fixed and controlled; the heroine sits on the right, calm and attentive, fingertip lightly touching the corner of the marriage contract
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: symmetrical seated composition, table and scroll as the tension core, both characters equally weighted
Lighting/mood: warm candlelight in front, cold night beyond, ritual-like seriousness, fragile alliance
Color palette: amber candlelight, deep black robe, muted red clothing, dark carved wood, cold blue window light
Materials/textures: scroll paper, inkstone, polished wood, heavy robe fabric, carved screen details
Constraints: the mood should feel contractual and solemn, not romantic ceremony; both leads must remain restrained and intelligent
Avoid: no festive decorations, no smiles, no wedding crowd
```

### `C2_N4C.png` 要求坦白
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: a vulnerable candlelit conversation where Xie Zheng reveals the danger around him
Scene/backdrop: quiet night interior, low table, single candle between them, enclosed private atmosphere
Subject: Xie Zheng sits with his head slightly bowed, then lifts his gaze directly toward the heroine after admitting he is tied to an old unresolved case and people want him dead; his expression is unusually unguarded and quiet; the heroine listens closely, her suspicion shifting into something more unsettled because his words sound like protection
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: medium two-shot with candle flame centered or near-centered between them, faces and subtle expressions emphasized
Lighting/mood: low candlelight, intimate, vulnerable, dangerous truth spoken quietly
Color palette: warm amber center light fading into cool shadow
Materials/textures: soft candle flame, robe folds, wooden table, shadowed room
Constraints: vulnerability must stay subtle; no tears, no dramatic collapse, no physical touching
Avoid: no melodrama, no extra props that distract from the emotional exchange
```

### `C2_N5.png` 婚礼形式
```text
Use case: illustration-story
Asset type: visual novel CG
Primary request: two people calmly discussing how the fake wedding should be presented to the town
Scene/backdrop: main room in winter daytime, lattice windows letting in pale sunlight, low table between them with a blank sheet of paper representing the unwritten wedding plan
Subject: Xie Zheng leans back slightly with arms loosely folded, watching the heroine as if telling her this is her world and she should decide; the heroine looks at the blank page and then toward him, trying to decide whether this is trust or burden; the mood is quieter, practical, and newly cooperative
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: calm two-person seated composition, blank page visible on the table as a symbolic focal point
Lighting/mood: pale winter daylight, low-stakes on the surface but emotionally meaningful underneath
Color palette: soft winter whites, pale warm light, subdued red and black garments, brown wood
Materials/textures: blank paper, worn wood table, window lattice, winter robes
Constraints: no overt romance and no crisis action; the feeling should be tentative cooperation
Avoid: no wedding decorations, no crowd, no bright celebratory palette
```

### `C2_END.png` 第二章终
```text
Use case: illustration-story
Asset type: chapter ending CG
Primary request: a split-composition night scene showing the heroine and Xie Zheng separated by a wall after agreeing to the fake marriage
Scene/backdrop: quiet winter night inside a modest ancient residence, thin wall dividing two adjacent rooms, courtyard outside still after snowfall
Subject: on the left side of the frame, the heroine lies awake under lamplight, staring at the ceiling in thought; on the right side beyond the dividing wall, Xie Zheng sits up slightly in darkness, motionless, unclear whether asleep or awake; both are alone with their thoughts, newly connected but still separate
Style/medium: Chinese ancient-town visual novel CG, high-quality 2D narrative game illustration
Composition/framing: split composition with the wall as the visual and emotional center, left and right sides balanced, each figure contained in separate pools of shadow and light
Lighting/mood: soft oil lamp glow on one side, deep quiet darkness on the other, ambiguous warmth, stillness after tension
Color palette: dim amber, muted charcoal, winter blue-gray
Materials/textures: plaster wall, bedding, wooden room details, soft lamp glow
Constraints: no direct interaction between them; the sense of connection must come only from composition and atmosphere
Avoid: no extra props, no bright moonbeam fantasy look, no overly romantic pose
```

## 使用建议

如果 `image2` 支持参考图：
- 上传 `C1_N1v2.jpg` 作为角色参考。
- 一次只生成一张，不要把多张场景混在一次请求里。
- 先跑这 4 张验证角色稳定性：`C2_N1`、`C2_N2C`、`C2_N3`、`C2_N4B`。

如果首轮角色脸不稳定：
- 在对应 prompt 的 `Constraints` 后补一句：`keep facial features and hairstyle consistent with the provided reference image`

如果首轮画风不稳定：
- 在 `Style/medium` 后补一句：`consistent with polished East Asian visual novel character illustration`
