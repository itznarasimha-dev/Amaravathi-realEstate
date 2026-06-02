# Blender Asset Specification

Export all assets as `.glb`, web optimized, Draco compressed, under `src/assets/3d/exports/`.

## Floating Crystal
- Faceted low-poly crystal with beveled edges and internal cyan/purple emission planes.
- Target: under 8k triangles, 1 material, transmission/glass shader baked to PBR-friendly textures.
- Animation: slow Y rotation, subtle bobbing loop, 6 seconds.

## Abstract Tech Orb
- Nested transparent orb with rotating inner rings and small data-node anchors.
- Target: under 12k triangles, 2 materials, emissive cyan ring map.
- Animation: inner ring counter-rotation, 8 seconds.

## Glass Panels
- Three rectangular panels with rounded bevels, light scratches, and edge glow.
- Target: under 2k triangles each, reusable instanced mesh.
- Animation: entrance from Z depth, hover-ready origin centered.

## Data Nodes
- Small glowing capsules/spheres connected by beveled curves.
- Target: under 5k triangles for a 24-node set.
- Animation: pulse emissive intensity baked as named action.

## Environment Elements
- Minimal capital-region terrain plane, river ribbon, landmark pylons.
- Target: under 15k triangles, baked ambient occlusion, muted dark material.
- Animation: landmark light sweeps, 10 seconds.

## Animated Meshes
- Use named actions: `idle_float`, `intro_reveal`, `pulse_signal`.
- Keep pivots centered, scale in meters, apply transforms before export.
- Compress with Draco and test in Spline plus React Three Fiber.

