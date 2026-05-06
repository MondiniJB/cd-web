const albums = [
    { name: 'HELL', color: '#ff3300' },
    { name: 'FKA', color: '#00f2ff' },
    { name: 'BURIAL', color: '#00ff66' },
    { name: 'HELLO', color: '#ff00ff' },
    { name: 'TRIAL', color: '#ffff00' },
    { name: 'Xavier', color: '#ffffff' }
];

let currentIndex = 2;
const stack = document.getElementById('cdStack');
const dotContainer = document.getElementById('navDots');
const nameInput = document.getElementById('nameInput');

function init() {
    albums.forEach((album, i) => {
        // Crear el disco
        const cd = document.createElement('div');
        cd.className = 'cd';
        cd.id = `cd-${i}`;
        cd.innerHTML = `<span class="cd-label" style="color: ${album.color}">${album.name}</span>`;
        stack.appendChild(cd);

        // Crear el punto de navegación
        const dot = document.createElement('div');
        dot.className = i === currentIndex ? 'dot active' : 'dot';
        dotContainer.appendChild(dot);
    });
    updateStack();
}

function updateStack() {
    const cds = document.querySelectorAll('.cd');
    const dots = document.querySelectorAll('.dot');
    
    // Sincronizar input con el disco actual
    nameInput.value = albums[currentIndex].name;

    cds.forEach((cd, i) => {
        const offset = i - currentIndex;
        
        // Efecto Coverflow a lo ancho
        const translateX = offset * 280; 
        const translateZ = -Math.abs(offset) * 200;
        const rotateY = offset * -35;
        const opacity = Math.abs(offset) > 2 ? 0 : 1;

        cd.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        cd.style.opacity = opacity;
        cd.style.zIndex = 100 - Math.abs(offset);
        
        dots[i].className = i === currentIndex ? 'dot active' : 'dot';
    });
}

function move(dir) {
    if (currentIndex + dir >= 0 && currentIndex + dir < albums.length) {
        currentIndex += dir;
        updateStack();
    }
}

// Cambiar texto en tiempo real
nameInput.addEventListener('input', (e) => {
    const val = e.target.value.toUpperCase();
    albums[currentIndex].name = val;
    document.getElementById(`cd-${currentIndex}`).querySelector('.cd-label').innerText = val;
});

// Color Picker
const colorBtn = document.getElementById('colorBtn');
const picker = document.getElementById('colorPicker');

colorBtn.onclick = () => picker.click();
picker.oninput = (e) => {
    const color = e.target.value;
    colorBtn.style.background = color;
    albums[currentIndex].color = color;
    document.getElementById(`cd-${currentIndex}`).querySelector('.cd-label').style.color = color;
};

init();
