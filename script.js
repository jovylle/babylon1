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

  // Add interactivity to the book
  book.actionManager = new BABYLON.ActionManager(scene);
  book.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (evt) {
    alert("JavaScript Expert");
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
