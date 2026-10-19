SS TRAINING — ORIGINAL LOGO HOME SCREEN ICONS

1. Upload the four PNG files and manifest.webmanifest into the same GitHub repository folder as index.html.
2. In index.html, inside the existing <head> section, add or update these lines:

<link rel="manifest" href="./manifest.webmanifest">
<link rel="icon" type="image/png" href="./favicon.png">
<link rel="apple-touch-icon" href="./apple-touch-icon.png">
<meta name="theme-color" content="#101015">

Do not replace index.html. Do not duplicate existing manifest/icon tags.
3. Wait for GitHub Pages deployment; refresh. Remove and re-add an old home-screen shortcut if it retains the cached icon.
4. These files do not change the Appwrite connection.
