const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunLight = new THREE.PointLight(0xffffff, 2);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFDB813 });
const sun = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), sunMaterial);
scene.add(sun);

const planetsConfig = [
  { name: "Mercury", radius: 5, size: 0.25, color: 0xb0b0b0 },
  { name: "Venus", radius: 7.2, size: 0.45, color: 0xffc04d },
  { name: "Earth", radius: 9.5, size: 0.48, color: 0x3f87ff },
  { name: "Mars", radius: 12, size: 0.38, color: 0xdb4c3f },
  { name: "Jupiter", radius: 15.5, size: 1.2, color: 0xd8b48f },
  { name: "Saturn", radius: 18.5, size: 1.0, color: 0xf0e68c },
  { name: "Uranus", radius: 21.5, size: 0.8, color: 0x48d1cc },
  { name: "Neptune", radius: 24.5, size: 0.78, color: 0x4169e1 }
];

const planets = [];
const panel = document.getElementById("control-panel");

planetsConfig.forEach((planet, i) => {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(planet.size, 30, 30),
    new THREE.MeshStandardMaterial({ color: planet.color })
  );
  sphere.position.x = planet.radius;
  scene.add(sphere);

  const label = document.createElement("label");
  label.textContent = planet.name;
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0.001;
  slider.max = 0.05;
  slider.step = 0.001;
  slider.value = (0.01 + i * 0.003).toFixed(3);
  panel.appendChild(label);
  panel.appendChild(slider);

  planets.push({ mesh: sphere, angle: 0, radius: planet.radius, speedControl: slider });
});

camera.position.z = 50;

function updateScene() {
  requestAnimationFrame(updateScene);
  planets.forEach((p) => {
    const speed = parseFloat(p.speedControl.value);
    p.angle += speed;
    p.mesh.position.x = p.radius * Math.cos(p.angle);
    p.mesh.position.z = p.radius * Math.sin(p.angle);
  });
  renderer.render(scene, camera);
}

updateScene();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
