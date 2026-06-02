# Spline Scene Specifications

Scene URLs are configured in `src/lib/spline-scenes.ts`. Keep empty strings during local development to use the procedural fallback stage.

## Hero Scene
- Central object: faceted floating crystal or abstract land-intelligence orb.
- Camera: perspective, 45 degree FOV, mouse orbit limited to 8 degrees.
- Lighting: deep black environment, cyan key light, purple rim light, faint gold floor reflection.
- Motion: idle rotation, particle drift, scroll-controlled scale and parallax.
- Interaction: hover brightens edge glow and reveals small plot-data nodes.
- Performance: under 2 MB compressed, lazy loaded, no autoplay-heavy physics.

## Feature Scene
- Central object: capital-region connectivity model with orbiting landmark nodes.
- Camera: slow dolly on section reveal, mouse parallax.
- Lighting: cyan node highlights with purple atmospheric volume.
- Interaction: nodes react to pointer hover with labels in React overlay.
- Performance: mesh instancing for repeated nodes.

## Background Scene
- Ambient floating panels, particles, and distant data ribbons.
- Camera: static with subtle parallax driven by scroll.
- Lighting: extremely low contrast to avoid competing with text.
- Performance: under 1 MB compressed; must be safe for mobile lazy loading.

