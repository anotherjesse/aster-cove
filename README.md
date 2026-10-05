# Aster Cove

An original explorable Three.js island. All scene geometry, characters, story, layout, materials, and UI are original. No A Short Hike game assets are used.

## Run from a restored ZIP

1. Unzip into an empty directory.
2. Run `python3 -m http.server 4173 --directory dist` (Python 3), or any static HTTP server.
3. Open http://localhost:4173.

No package installation or build is required. Three.js 0.180.0 is vendored, including its MIT license. Internet access is not required after the files are present.

## Play

WASD/arrows move relative to the camera. Space hops; E interacts. Q/R orbit. Drag the ground to orbit and scroll to zoom. Click/tap ground to walk. Touch direction/action controls appear on coarse-pointer devices. Three skyglass pieces wake the hilltop lantern. Talk to three neighbors, sit at a lookout, or toggle the campfire. Render Lab changes resolution, outlines, color quantization, shadows, follow camera, and sun direction; hold its comparison button to render clean full-resolution 3D.

## Honest scope

Single-client simulation only. The three neighbors follow local routes; they are not AI models or real connected people. Quest progress uses this browser's localStorage. There is no server state, multiuser networking, authentication inside the application, or external model call. The private Site's access gate is managed by Sites.

## Agent hooks

`window.asterCove.observe()` returns position, quest state, nearby interactables, neighbor state, render settings and recent events.
`window.asterCove.objects()` returns semantic object IDs and world coordinates.
`window.asterCove.act(action)` shares player controls. Actions: `walk_to` (x/z), `interact` (id, proximity required), `hop`, `follow_trail`, `return_to_landing`, `set_render`.

Walk targets are bounded to walkable terrain; object collisions remain active. Walking starts an asynchronous journey. Use observe to verify arrival. No arbitrary script execution or server write endpoint is exposed.

Feature-detected browser WebMCP tools `aster_observe` and `aster_act` wrap the same hooks. Unsupported browsers retain the JS API and visual state inspector. Native WebMCP registration requires a supporting browser.

## Rendering

Real 3D meshes share world coordinates, an orthographic camera, depth, occlusion, and shadow projection. Low-resolution color/depth render targets use nearest filtering. A subtle depth-edge postpass and optional 28-step-per-channel quantization control the image. Water is a simple procedural fragment shader; coastline foam is an explicitly approximate sampled band. All 3D content is procedural and deterministic.

## Preservation

The ZIP includes `.git` and a Git bundle as independent recovery paths. `git fsck --full` verifies repository consistency; `git bundle verify aster-cove.bundle` verifies the bundle. See the companion restoration report for tested hashes and recovery results.
