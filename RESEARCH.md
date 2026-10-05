# Rendering research and attribution

Research date: October 5, 2026.

## Primary sources

Adam Robinson-Yu, "Crafting a tiny open world: A look behind the scenes at the creation of A Short Hike", PlayStation Blog, August 5, 2021:
https://blog.playstation.com/2021/08/05/crafting-a-tiny-open-world-a-look-behind-the-scenes-at-the-creation-of-a-short-hike/

Verified creator statements: deliberately pixelated 3D presentation, flat cohesive shading, anti-aliasing disabled, soft outlines for readability, adjustable pixel size, a compact world that rewards curiosity and detours.

Adam Robinson-Yu, "Crafting A Tiny Open World: A Short Hike Postmortem", official GDC Festival of Gaming YouTube upload, March 27, 2020:
https://www.youtube.com/watch?v=ZW8gWgpptI8
GDC listing: https://www.gdcvault.com/play/1026613/

We downloaded and read the original-English automatically generated captions using yt-dlp 2026.8.19. No publisher-authored subtitles were listed. We did not watch the complete video or perform a new speech-to-text pass. Automatic captions may misrecognize technical terms.

- 5:44: low-resolution RenderTexture enlarged using point filtering
  https://www.youtube.com/watch?v=ZW8gWgpptI8&t=344s
- 6:25–6:56: mostly-unlit custom shading, controlled shadows, stepped lighting ramp biased toward white to preserve the palette
  https://www.youtube.com/watch?v=ZW8gWgpptI8&t=385s
- 8:02–8:32: fog, edge-detection silhouettes, blue-shadow color correction
  https://www.youtube.com/watch?v=ZW8gWgpptI8&t=482s
- 12:18–12:36: triplanar terrain materials and crisp terrain-paint blends
  https://www.youtube.com/watch?v=ZW8gWgpptI8&t=738s
- 18:28 onward: landmarks, item trails, paths and signs invite curiosity and give gentle guidance
  https://www.youtube.com/watch?v=ZW8gWgpptI8&t=1108s

## Retrieval outcomes

Official YouTube captions: successful download (approximately 687 KB). Audio-only attempt: response was a 195-byte Site Unavailable HTML document, confirmed invalid media by ffprobe. Direct GDC Vault extraction: broken extractor/login warning; no bypass attempted. Captions were sufficient for research, so no transcription service was needed. Neither copyrighted video/audio nor the full caption transcript is included or redistributed.

## Our implementation choices

Aster Cove uses the documented principles of low-res rendering, point filtering, restrained shading, adjustable pixel scale, subtle edge delineation and inviting landmark routes. It does not replicate the game's precise shader pipeline. Three.js Standard materials, hemisphere lighting, vertex-colored terrain, color quantization, the particular depth-outline kernel, orthographic following, procedural water and sampled foam bands are our approximations/design choices. We do not claim to implement A Short Hike's triplanar material system, custom mostly-unlit lighting shader or depth-intersection foam.
