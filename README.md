https://github.com/jables420/super-simple-canvas-game-engine-to-get-you-started/releases

[![Download Releases](https://img.shields.io/badge/download-releases-blue?logo=github&style=for-the-badge)](https://github.com/jables420/super-simple-canvas-game-engine-to-get-you-started/releases)

# Super Simple Canvas Game Engine — Bee-Ready JavaScript Starter 🐝

![Bee flying over canvas](https://upload.wikimedia.org/wikipedia/commons/4/45/Apis_mellifera_L_01.jpg)

Table of contents
- About this repo
- Quick release link
- Why this engine
- Key features
- Files and layout
- Install and run (release)
- Install and run (source)
- Browser support
- Core concepts
- API reference
  - Engine
  - Scene
  - Entity
  - Sprite
  - Input
  - Physics and collision
  - Audio
- Examples
  - Minimal start
  - Player sprite with physics
  - Spawning enemies
  - Simple UI overlay and score
- Tips for level design
- Debug and profiling
- Performance notes
- Roadmap
- Contributing
- License
- Credits and resources
- FAQ

About this repo
- A compact JavaScript canvas engine for small games.
- It grew out of an old school project and then got refined.
- Aim: get a playable prototype on screen fast.
- Focus: simple API, few files, no build step required.

Quick release link
- Download a packaged release and run the included file.
- Visit the releases page and download the release file from:
  https://github.com/jables420/super-simple-canvas-game-engine-to-get-you-started/releases
- After download, extract and open the included index.html in your browser or run a local HTTP server and load the folder.

Why this engine
- You want a small codebase that you can read start to finish.
- You want a canvas loop, sprite handling, input, and simple collision.
- You want code you can change without a build tool.
- This repo provides that. It keeps features minimal and clear.

Key features
- One small engine file, drop-in style.
- Scene management with start/stop hooks.
- Entity model with update and draw methods.
- Sprite loader that supports atlas and single images.
- Basic AABB collision helpers.
- Keyboard and pointer input mapping.
- Simple audio wrapper with play, loop, and stop.
- Minimal sample project that shows a player, enemies, and UI.
- No dependency on external libraries.

Files and layout
- index.html — demo and entry page
- engine.js — core engine code
- sample/ — small game demo assets and script
  - sample/main.js — demo code that uses engine
  - sample/assets/ — images, audio, data
- README.md — this file
- LICENSE — MIT license text

Install and run (release)
- Download the release archive from:
  https://github.com/jables420/super-simple-canvas-game-engine-to-get-you-started/releases
- Extract the archive.
- Open index.html in your browser, or run a local server:
  - Python 3: python -m http.server 8000
  - Node: npx http-server . -p 8000
- Point a browser to http://localhost:8000 and the demo should load.
- The release contains a ready demo file. Download it and execute the index.html file in your browser.

Install and run (source)
- Clone the repo:
  - git clone https://github.com/jables420/super-simple-canvas-game-engine-to-get-you-started.git
- Open index.html in a browser or run a small static server:
  - python -m http.server 8000
- The engine needs no build step. Edit engine.js or sample/main.js and re-load the page.

Browser support
- Works on modern desktop and mobile browsers.
- Uses Canvas 2D API.
- Test targets: Chrome, Firefox, Edge, Safari.
- Avoid using private browsing modes that restrict audio autoplay.

Core concepts
- The engine runs a clear game loop: update, render, repeat.
- Time step: fixed update step with interpolation for render.
- Scenes hold entities and manage lifecycle.
- Entities implement update(dt) and draw(ctx).
- Sprites are small wrappers over image elements plus frame data.
- Input maps keyboard and pointer events to logical actions.
- Physics uses axis-aligned bounding boxes (AABB).
- Audio wraps the Web Audio or HTMLAudioElement.

Engine design goals
- Predictable loop and timing.
- Low coupling between modules.
- Easy override and extend.
- Small API surface so you can learn it fast.

API reference

Engine
- Engine(config)
  - new Engine({ canvas, width, height, scale, fixedStep })
  - canvas: HTMLCanvasElement or selector
  - width/height: logical resolution
  - scale: CSS scale factor or device pixel ratio handling
  - fixedStep: update step in seconds (default 1/60)
- Methods
  - start() — start the game loop
  - stop() — stop the loop
  - setScene(scene) — swap current scene to scene
  - on(event, fn) — attach event handlers (e.g., 'pause', 'resume')
- Events
  - tick(dt) — fired each update step
  - render(alpha) — fired each render frame with interpolation

Scene
- Scene(name)
  - new Scene('main')
- Methods
  - add(entity) — add an entity instance
  - remove(entity) — remove an entity
  - clear() — remove all entities
  - start() — called when scene becomes active
  - stop() — called when scene is replaced
  - update(dt) — update all entities
  - draw(ctx, alpha) — draw all entities with given interpolation
- Hooks
  - onStart, onStop — function hooks you can set

Entity
- Base entity class
  - new Entity({ x, y, w, h })
  - Properties:
    - x, y — position
    - vx, vy — velocity
    - w, h — size
    - visible — whether to draw
    - alive — whether the entity should be updated
  - Methods
    - update(dt) — implement motion or logic
    - draw(ctx, alpha) — implement rendering
    - onCollision(other) — called when engine detects overlap
- How collision works
  - Engine or scene runs a simple AABB check per update.
  - Entities can opt in via entity.collidable = true

Sprite
- Sprite(image, options)
  - image: Image or URL
  - options:
    - frameWidth, frameHeight — size for atlas
    - frames — array of frame indices
    - fps — frame rate for animation
    - anchor — {x, y} normalized anchor point
- Methods
  - play(name or frames)
  - stop()
  - draw(ctx, x, y, scale, rotation)
- Loading
  - Sprite.load(url, cb) — small loader with callback or promise

Input
- Input maps device events into actions.
- Example map:
  - Input.map('left', ['ArrowLeft', 'KeyA'])
  - Input.map('jump', ['Space', 'KeyW'])
- Query:
  - Input.isDown('left')
  - Input.wasPressed('jump')
  - Input.pointer — { x, y, pressed }
- Pointer supports touch and mouse.

Physics and collision
- Built-in AABB helper:
  - Physics.overlap(a, b) — returns true/false
  - Physics.intersect(a, b) — returns intersection rect
- Collision response
  - Basic resolution pushes objects out along smaller axis.
  - This engine uses simple resolution and is enough for platformers and top-down games.

Audio
- Audio.load(url) — returns a sound object
- sound.play({ loop: false, volume: 1 })
- sound.stop()
- Uses HTMLAudioElement or Web Audio API if available.

Examples

Minimal start
- This example shows the smallest code to get an empty scene with a blue background.
- Place engine.js and index.html in the same folder.
- In index.html:
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Minimal</title>
  <style>
    body { margin: 0; background: #222; display:flex; align-items:center; justify-content:center; height:100vh; }
    canvas { background: #0b3; }
  </style>
</head>
<body>
  <canvas id="game" width="640" height="360"></canvas>
  <script src="./engine.js"></script>
  <script>
    const engine = new Engine({ canvas: '#game', width: 640, height: 360 });
    const scene = new Scene('main');
    scene.draw = function(ctx) {
      ctx.fillStyle = '#0b3';
      ctx.fillRect(0, 0, engine.width, engine.height);
    };
    engine.setScene(scene);
    engine.start();
  </script>
</body>
</html>
```
- Open index.html in a browser to run the demo.

Player sprite with physics
- This example shows a player that moves and collides with the ground.
- Add a Player entity that uses velocity and gravity.
```js
class Player extends Entity {
  constructor(x, y) {
    super({ x, y, w: 32, h: 48 });
    this.vx = 0;
    this.vy = 0;
    this.speed = 160;
    this.jumpPower = -380;
    this.collidable = true;
    this.onGround = false;
  }

  update(dt) {
    const left = Input.isDown('left');
    const right = Input.isDown('right');
    if (left) this.vx = -this.speed;
    else if (right) this.vx = this.speed;
    else this.vx = 0;

    if (Input.wasPressed('jump') && this.onGround) {
      this.vy = this.jumpPower;
      this.onGround = false;
    }

    // gravity
    this.vy += 900 * dt;

    // basic motion
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // floor
    if (this.y + this.h > 320) {
      this.y = 320 - this.h;
      this.vy = 0;
      this.onGround = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ffd54f';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
}
```
- Add the player to a scene and set up input keys:
```js
Input.map('left', ['ArrowLeft', 'KeyA']);
Input.map('right', ['ArrowRight', 'KeyD']);
Input.map('jump', ['Space', 'KeyW']);
```

Spawning enemies
- Use a spawn timer to add enemies at intervals.
```js
class Spawner extends Entity {
  constructor() {
    super({ x:0, y:0, w:0, h:0 });
    this.timer = 0;
    this.rate = 2; // spawn every 2 seconds
  }

  update(dt) {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = this.rate;
      const enemy = new Entity({ x: 700, y: 280, w: 24, h: 24 });
      enemy.vx = -120;
      enemy.update = function(dt) {
        this.x += this.vx * dt;
        if (this.x + this.w < 0) this.alive = false;
      };
      enemy.draw = function(ctx) {
        ctx.fillStyle = '#ff5252';
        ctx.fillRect(this.x, this.y, this.w, this.h);
      };
      this.scene.add(enemy);
    }
  }
}
```
- Add Spawner to the scene to see continuous enemies.

Simple UI overlay and score
- Use a dedicated UI scene or draw UI after scene draw.
- Example: overlay score in top-left.
```js
scene.drawUI = function(ctx) {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(8, 8, 140, 40);
  ctx.fillStyle = '#fff';
  ctx.font = '18px sans-serif';
  ctx.fillText('Score: ' + (this.score || 0), 16, 36);
  ctx.restore();
};
```
- Ensure your engine calls scene.drawUI after scene.draw.

Debug and profiling
- The engine includes a small debug overlay:
  - FPS
  - Entity count
  - Draw calls
- Enable debug by setting engine.debug = true
- For a deeper profile:
  - Use browser devtools Performance tab to record frames.
  - Look at scripting time and paint cost.
  - Keep draw calls low by batching sprite draw calls when possible.

Performance notes
- Use spritesheets over many small image files to reduce texture swaps.
- Use requestAnimationFrame for render loop.
- Use a fixed update step to keep physics stable.
- Reduce draw state changes (composite, shadow, globalAlpha).
- Cache frequently computed values outside loops.
- For mobile, cap frame rate to 30 if battery life matters.

Design patterns used
- Component-lite: Entities hold data and behavior, rather than complex component registries.
- Scene stack: You can push/pop scenes for UI or pause screens.
- Resource loader: A small loader for images and audio that tracks pending assets.

Resource loader
- Resource.load([
    { type: 'image', key: 'player', src: 'assets/player.png' },
    { type: 'audio', key: 'hit', src: 'assets/hit.wav' }
  ], cb)
- The loader returns a simple map of resources by key.

Common gotchas
- Cross-origin images require CORS headers when you use drawImage and read pixel data.
- Autoplay rules for audio may block play until user interacts with the page.
- DevicePixelRatio needs handled to keep crisp rendering on high DPI screens.

Roadmap
- Add tilemap support with collision layers.
- Add a simple pathfinding helper for enemies.
- Add pooling helpers for bullets and particles.
- Add optional ECS layer for larger projects.
- Add TypeScript definitions for better editor support.

Contributing
- The engine welcomes small patches.
- Keep changes focused and test with the sample demo.
- Follow these steps:
  - Fork the repo
  - Create a branch for your feature or fix
  - Open a pull request with a clear description and small diffs
- Keep API changes minimal and backward compatible.

License
- This project uses the MIT License. See LICENSE file for terms.

Credits and resources
- Bee image: Wikimedia Commons — public domain image of honey bee
  - https://upload.wikimedia.org/wikipedia/commons/4/45/Apis_mellifera_L_01.jpg
- Canvas 2D API docs: MDN Web Docs
- This repo started as a school project and got polished later.

FAQ

Q: Where do I get the packaged demo?
A: Download the release file from:
   https://github.com/jables420/super-simple-canvas-game-engine-to-get-you-started/releases
   After download, extract and open index.html in a browser. The release file contains a ready demo. Run the included file to see the sample game.

Q: Do I need a build tool?
A: No. The engine runs as plain JS in the browser. You can add a build step for production, but the engine needs none to run.

Q: Can I use images from a CDN?
A: Yes. Use absolute URLs. Keep in mind CORS headers for readback.

Q: How do I handle screen scaling?
A: The engine uses a logical width/height and scales the canvas to the physical pixel size. You can set engine.scale or manage devicePixelRatio manually.

Appendix: deeper engine notes

Game loop and timing
- The engine uses a fixed time step for updates and variable time for render.
- This pattern avoids jitter in physics while keeping smooth rendering.
- Implementation sketch:
```js
let acc = 0;
let last = performance.now();

function loop(now) {
  requestAnimationFrame(loop);
  const delta = Math.min(0.25, (now - last) / 1000);
  last = now;
  acc += delta;
  while (acc >= fixedStep) {
    update(fixedStep);
    acc -= fixedStep;
  }
  render(acc / fixedStep);
}
```
- Keep fixedStep at 1/60 for crisp physics.

Collision resolution details
- For two overlapping AABBs, compute overlap along X and Y axes.
- Resolve along the smaller overlap axis to avoid jitter.
- Example:
```js
function resolve(a, b) {
  const ax2 = a.x + a.w;
  const ay2 = a.y + a.h;
  const bx2 = b.x + b.w;
  const by2 = b.y + b.h;
  const overlapX = Math.min(ax2, bx2) - Math.max(a.x, b.x);
  const overlapY = Math.min(ay2, by2) - Math.max(a.y, b.y);
  if (overlapX < overlapY) {
    // push along X
    if (a.x < b.x) a.x -= overlapX;
    else a.x += overlapX;
    a.vx = 0;
  } else {
    // push along Y
    if (a.y < b.y) a.y -= overlapY;
    else a.y += overlapY;
    a.vy = 0;
  }
}
```

Sprite atlas usage
- Use a JSON atlas or a simple fixed grid.
- Example grid draw:
```js
function drawFrame(ctx, img, frameIndex, fw, fh, dx, dy) {
  const cols = Math.floor(img.width / fw);
  const sx = (frameIndex % cols) * fw;
  const sy = Math.floor(frameIndex / cols) * fh;
  ctx.drawImage(img, sx, sy, fw, fh, dx, dy, fw, fh);
}
```

Tips for small games
- Start with a core loop and one feature at a time.
- Keep art small. A 32x32 sprite is enough for prototypes.
- Use color blocks for placeholders and swap for art later.
- Keep controls responsive. Tune acceleration and friction for character feel.

Testing on real devices
- Test on phones and tablets to confirm touch input mapping.
- Use remote debugging via browser devtools when testing mobile devices.

Image assets and credits
- Use public domain or your own art for the demo.
- For bee-themed sprites, look for CC0 assets or create simple pixel art.

Commands and tools
- Local server quick commands:
  - Python: python -m http.server 8000
  - Node: npx http-server . -p 8000
  - Serve static content to satisfy CORS and audio autoplay rules.

Common extension ideas
- Particle system for collisions and explosions.
- Tilemap editor export and runtime loader.
- Controller support (gamepad API) for consoles.
- Lightweight level format using JSON to define entities and spawn points.

Testing and debugging flows
- Add a debug draw flag on entities to show their hitboxes.
- Use a visual grid to ensure positions align to pixels.
- Track entity life cycle events with a simple logger.

Project maintenance
- Keep engine.js compact and readable.
- Avoid over-optimizing early.
- Write small tests for collision and input mapping functions.

Community links and inspiration
- The bee theme nods to playful limits and to a simple demo in the repo.
- Use the Releases page to get packaged demos and versioned builds:
  https://github.com/jables420/super-simple-canvas-game-engine-to-get-you-started/releases

Developer notes
- The engine started as a classroom project and evolved into a small kit.
- It aims to teach game loop, input, and rendering basics.
- You can adapt engine.js into your own projects and add features as you need.

Images and theme
- Use bee images and yellow/black palette for a fun look.
- Place a bee sprite as the player or as a mascot in menus.

Quick reference: minimal API cheatsheet
- new Engine({ canvas: '#game', width: 640, height: 360 })
- engine.start()
- engine.stop()
- engine.setScene(scene)
- new Scene('main'), scene.add(entity)
- new Entity({ x, y, w, h }), entity.update(dt), entity.draw(ctx)
- Input.map('jump', ['Space']), Input.isDown('jump'), Input.wasPressed('jump')
- Sprite.load('img.png').then(sprite => sprite.draw(ctx, x, y))

Contact
- If you make changes, open a PR with clear intent and tests or demos.

Resources and learning
- Read MDN Canvas 2D docs for drawImage, transforms, and composite rules.
- Check Web Audio API basics if you work with audio.
- Study simple physics sources for platformer math.

This README aims to be a practical manual for a small canvas engine. It gives the files and a set of examples that let you get a playable prototype on screen with low friction. Use the releases page to get a packaged demo and run the included file in a browser. Use the code snippets to build your scenes, entities, sprites, and UI.