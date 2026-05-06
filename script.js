const albums = [
    { name: 'Hell', color: '#ff3300' },
    { name: 'FKA', color: '#00f2ff' },
    { name: 'Burial', color: '#00ff66' },
    { name: 'Hello', color: '#ff00ff' },
    { name: 'Trial', color: '#ffff00' }
];

let currentIndex = 2;
const stack = document.getElementById('cdStack');
const dotContainer = document.getElementById('navDots');

function init() {
    albums.forEach((album, i) => {
        // Crear CD
        const cd = document.createElement('div');
        cd.className = 'cd';
        cd.id = `cd-${i}`;
        cd.innerHTML = `<span class="cd-label" style="color: ${album.color}">${album.name}</span>`;
        stack.appendChild(cd);

        // Crear Dot
        const dot = document.createElement('div');
        dot.className = i === currentIndex ? 'dot active' : 'dot';
        dotContainer.appendChild(dot);
    });
    updateStack();
}

function updateStack() {
    const cds = document.querySelectorAll('.cd');
    const dots = document.querySelectorAll('.dot');
    
    document.getElementById('currentTitle').innerText = albums[currentIndex].name;

    cds.forEach((cd, i) => {
        const offset = i - currentIndex;
        
        // Lógica de acumulación a lo ancho
        const translateX = offset * 250; 
        const translateZ = -Math.abs(offset) * 200;
        const rotateY = offset * -25;
        const opacity = Math.abs(offset) > 2 ? 0 : 1;

        cd.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        cd.style.opacity = opacity;
        cd.style.zIndex = 100 - Math.abs(offset);
        
        dots[i].className = i === currentIndex ? 'dot active' : 'dot';
    });
}

function move(dir) {
    currentIndex = Math.max(0, Math.min(albums.length - 1, currentIndex + dir));
    updateStack();
}

// Color Picker Funcional
const colorBtn = document.getElementById('colorBtn');
const picker = document.getElementById('colorPicker');

colorBtn.onclick = () => picker.click();
picker.oninput = (e) => {
    colorBtn.style.background = e.target.value;
    const labels = document.querySelectorAll('.cd-label');
    labels[currentIndex].style.color = e.target.value;
};

init();
