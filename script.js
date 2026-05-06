let scene, camera, renderer, disc, pointLight;

function init() {
    // 1. Escena y Cámara
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // 2. Creación del CD (Cilindro muy plano)
    const geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.05, 64);
    
    // Material con brillo metálico
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
    });

    disc = new THREE.Mesh(geometry, material);
    disc.rotation.x = Math.PI / 2.5; // Inclinación inicial como en el video
    scene.add(disc);

    // 3. Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0x00ffcc, 2, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotación constante del disco
    if (disc) {
        disc.rotation.y += 0.01;
    }
    
    renderer.render(scene, camera);
}

// 4. Interacción con el Color Picker
const colorBtn = document.getElementById('colorBtn');
const colorPicker = document.getElementById('colorPicker');

colorBtn.addEventListener('click', () => colorPicker.click());

colorPicker.addEventListener('input', (e) => {
    const newColor = e.target.value;
    colorBtn.style.background = newColor;
    
    // Cambiar la luz de la escena 3D según el selector
    pointLight.color.set(newColor);
});

// Manejo de Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
