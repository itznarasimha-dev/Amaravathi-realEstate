# 3D Migration Architecture Plan

## Project Structure

```txt
src/
  components/3d/        Lazy Spline stages, ambient particles, future R3F canvas units
  components/motion/    21st.dev-style glass cards, magnetic buttons, reveal primitives
  components/layout/    Immersive page heroes and cinematic section shells
  spline/               Spline scene specifications and exported scene notes
  assets/3d/            Blender asset specs and future GLB exports
  hooks/                Interaction hooks such as magnetic pointer movement
  scenes/               Higher-level scene orchestration
  animations/           Framer Motion variants and easing
  lib/                  Scene URL registry and utilities
```

## Dependency Changes

- `@splinetool/react-spline`
- `@react-three/fiber`
- `@react-three/drei`
- `react-intersection-observer`
- Existing `framer-motion` remains the global motion system.

## Component Refactor Matrix

| Component/Page | Before | After | Reasoning |
|---|---|---|---|
| `SiteHeader` | Sticky 2D navbar | Floating glass navigation with animated mobile panel | Makes navigation feel like an overlay control surface |
| `SiteFooter` | Flat dark footer | Atmospheric glass footer with radial lighting | Keeps premium visual language through page end |
| `FloatingActions` | Static circular buttons | Motion glass action orbs | Maintains contact affordance without breaking immersion |
| `SectionHeading` | Serif real-estate heading | Animated high-contrast editorial heading | Aligns typography with product-launch references |
| `PlotCard` | Flat image card | Perspective glass product tile | Improves comparison, hover depth, and perceived quality |
| Home | Traditional hero and sections | Fullscreen 3D hero, Spline fallback, spatial search, cinematic sections | Establishes the next-generation experience |
| Plots | Sidebar plus flat grid | Glass filter cockpit plus 3D listing grid | Keeps utility while removing dashboard feel |
| Plot Detail | Static gallery/info/form | Cinematic header, 3D gallery, glass enquiry module | Makes an individual plot feel like a premium product |
| Gallery | Image hero and flat tabs | 3D media stage, glass segmented control, depth tiles | Turns media browsing into an immersive walkthrough |
| Blog | Standard article cards | Editorial signal feed with glass articles | Keeps content readable but visually consistent |
| Blog Detail | Traditional article layout | Cinematic image header and glass related cards | Preserves long-form readability |
| About | Flat story/values cards | Studio-style metrics and layered value surfaces | Makes brand story feel premium |
| Contact | Flat info list/form | Animated channel surfaces and glass form | Keeps conversion path accessible and polished |

## Migration Plan

1. Install 3D dependencies and confirm Vite resolves Spline/R3F packages.
2. Replace global color tokens with dark cinematic palette.
3. Add shared motion variants, magnetic hook, glass cards, and Spline fallback.
4. Convert root shell to floating navigation and ambient background.
5. Refactor shared content components.
6. Rebuild homepage as fullscreen 3D product experience.
7. Convert route pages one by one while preserving loaders, validation, forms, and maps.
8. Add Spline scene URLs in `src/lib/spline-scenes.ts`.
9. Export Blender `.glb` files into `src/assets/3d/exports/`.
10. Run build, lighthouse, and visual QA across desktop/tablet/mobile.

## Framer Motion System

- Shared variants live in `src/animations/motion.ts`.
- Page heroes animate on mount.
- Cards reveal on scroll and lift in 3D on hover.
- Buttons use magnetic pointer transform and press feedback.
- Ambient scene uses scroll-linked transforms for parallax.

## Responsive Strategy

- Desktop: split hero layouts, large 3D stages, sticky glass filters/forms.
- Tablet: preserve scene stages, reduce grid density, keep controls full-width.
- Mobile: stack copy and scene, compact floating nav, single-column cards, lazy media.

## Performance Strategy

- Spline scenes lazy load with procedural fallback.
- Images retain lazy loading outside hero context.
- Scene URLs remain configurable and can be kept empty for low-cost fallback.
- Avoid nested cards and excessive DOM effects.
- Respect `prefers-reduced-motion`.

