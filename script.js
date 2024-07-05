// Get the canvas element
const canvas = document.getElementById("renderCanvas");

// Generate the Babylon.js 3D engine
const engine = new BABYLON.Engine(canvas, true);

// Create the scene
const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // Add a camera to the scene and attach it to the canvas
  const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  // Add a light to the scene
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  // Add ambient sound
  const ambientSound = new BABYLON.Sound("ambientSound", "https://www.babylonjs-playground.com/sounds/forest-ambient.wav", scene, null, { loop: true, autoplay: true });

  // Add background music
  const backgroundMusic = new BABYLON.Sound("backgroundMusic", "https://www.babylonjs-playground.com/sounds/song.mp3", scene, null, { loop: true, autoplay: true });

  // Add a basic box to the scene
  const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
  box.position.y = 1;

  // Add bookshelf
  const bookshelf = BABYLON.MeshBuilder.CreateBox("bookshelf", { height: 4, width: 1, depth: 0.3 }, scene);
  bookshelf.position = new BABYLON.Vector3(1, 2, 0);

  // Add book
  const book = BABYLON.MeshBuilder.CreateBox("book", { height: 1, width: 0.5, depth: 0.3 }, scene);
  book.position = new BABYLON.Vector3(1, 2.5, 0.2);
  book.material = new BABYLON.StandardMaterial("bookMat", scene);
  book.material.diffuseColor = new BABYLON.Color3(0.5, 0.2, 0.2);

  // Create particle system
  const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
  particleSystem.particleTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/flare.png", scene);
  particleSystem.emitter = book; // Emitting particles from the book
  particleSystem.minEmitBox = new BABYLON.Vector3(-0.1, 0, -0.1); // Minimum emit box
  particleSystem.maxEmitBox = new BABYLON.Vector3(0.1, 0, 0.1); // Maximum emit box

  // Particle properties
  particleSystem.color1 = new BABYLON.Color4(1, 0, 0, 1);
  particleSystem.color2 = new BABYLON.Color4(1, 1, 0, 1);
  particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.5;
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;

  // Start particle system when hovering over the book
  book.actionManager = new BABYLON.ActionManager(scene);
  book.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (evt) {
    particleSystem.start();
  }));

  // Stop particle system when no longer hovering over the book
  book.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (evt) {
    particleSystem.stop();
  }));

  // Add table
  const table = BABYLON.MeshBuilder.CreateBox("table", { height: 0.5, width: 2, depth: 1 }, scene);
  table.position = new BABYLON.Vector3(-1, 0.25, 0);

  // Add interactivity to the table
  table.actionManager = new BABYLON.ActionManager(scene);
  table.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (evt) {
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const resumeText = new BABYLON.GUI.TextBlock();
    resumeText.text = "Jovylle Bermudez\nWeb Developer\nExperience: 7 years";
    resumeText.color = "white";
    resumeText.fontSize = 24;
    advancedTexture.addControl(resumeText);
  }));

  return scene;
};

// Call the createScene function
const scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(() => {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
  engine.resize();
});
