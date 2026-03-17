# RPG Web Demo（零构建）

这是一个**纯 HTML/CSS/JS** 的分支剧情 RPG Demo（类似你给的网页示例风格），包含：

- 角色选择（3 个角色，不同初始属性/旗标）
- 剧情节点 + 条件分支（属性阈值 / 旗标）
- 属性变化（声望/银两/权势/兵势）与变化提示
- 日志
- 存档：`localStorage`（保存/读取）+ 导出/导入 JSON

## 如何运行

### 方式 A：直接打开（最简单）

双击打开 `index.html`。

> 如果你的浏览器对本地脚本有限制，建议用方式 B 起一个本地静态服务器（更稳）。

### 方式 B：本地静态服务器（推荐）

在 `rpg-web/` 目录启动任意静态服务器：

- Python（若你装了 Python）：

```bash
python -m http.server 5173
```

然后访问 `http://localhost:5173/`

- VSCode/Cursor 扩展：Live Server（也可以）

## 内容与引擎位置

- 剧情与角色：`src/content.js`
- 引擎（条件/效果/推进）：`src/engine.js`
- 存档（localStorage + 导入导出）：`src/storage.js`
- UI 渲染与交互：`src/main.js`

## 下一步（你说一声我就继续加）

- 增加更多章回/角色/道具/随机事件
- 加“关系”系统（NPC 好感/派系）
- 增加“对话式 UI”（更像互动小说）
- 做一个“剧情编辑器”（在浏览器里可视化编辑 JSON/节点）

