# Playground — 4-piece website stack

This repo follows [The 4-Step Claude Code Website Build](https://www.notion.so/The-4-Step-Claude-Code-Website-Build-Full-Setup-Guide-3cbdb0f70c92802792efe5536f308521).

| Piece | Role |
| --- | --- |
| Vite + React + TypeScript | App runtime |
| [Motion](https://motion.dev/docs/react) (`motion`) | Animations that actually run in the browser |
| [UI UX Max Pro](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Design intelligence — load this skill for all UI work |
| [motion.dev/motion-ui](https://motion.dev/motion-ui) | 430+ animated sections to adapt, not invent from scratch |

## Rules

- Load the **ui-ux-pro-max** skill before designing or building any page or component.
- Use `import { motion } from 'motion/react'` for animation. Do not invent CSS-only animation systems.
- Prefer adapting a section from [motion.dev/motion-ui](https://motion.dev/motion-ui) over writing a hero/section from scratch.
- Say "match the design system in the UI UX Max Pro skill" when generating UI.
- Respect `prefers-reduced-motion`. No emoji as icons.

## Commands

```bash
npm run dev      # local server
npm run build    # type-check + production build
npm run preview  # preview production build
```
