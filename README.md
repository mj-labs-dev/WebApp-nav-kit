# WebApp Nav Kit

Production-ready navigation system with dual layout support (Sidebar + Top Nav).

## Features

- **Smart Rail Sidebar** — 64px collapsed → 240px expanded on hover/pin
- **Horizon Top Nav** — Single horizontal navigation bar
- **Theme Switching** — Auto/Light/Dark
- **Layout Switching** — Toggle between sidebar and top nav
- **Mobile Responsive** — Slide-in drawer
- **localStorage Persistence** — Remembers layout and theme
- **Smooth Animations** — Hardware-accelerated transitions
- **Accessible** — ARIA labels, keyboard navigation

## Quick Start

```tsx
import { LayoutRoot } from './src/LayoutRoot';
import { Outlet } from 'react-router';

export function App() {
  return (
    <LayoutRoot>
      <Outlet />
    </LayoutRoot>
  );
}
```

## Customize

Edit `src/navConfig.ts` to add your navigation items.

## Files

- `LayoutRoot.tsx` — Orchestrator (state + theme)
- `LayoutA.tsx` — Smart Rail sidebar
- `LayoutB.tsx` — Horizon top nav
- `navConfig.ts` — Nav items configuration

## Dependencies

React 18+, React Router 7+, Lucide React, Tailwind CSS 3+

## License

MIT License — See [LICENSE](./LICENSE) file for details.

---

Built with ❤️ in the Pacific Northwest by [MJ Labs LLC](https://mj-labs.dev)

**Support**: [hello@mj-labs.dev](mailto:hello@mj-labs.dev)
