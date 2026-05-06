const albums = [
    { top: 'ASK ME', bottom: 'Hell', color: '#ff3300' },
    { top: 'DKD', bottom: 'FKA', color: '#00f2ff' },
    { top: 'Xavier', bottom: 'Burial', color: '#00ff66' },
    { top: 'HELLO', bottom: 'World', color: '#ff00ff' },
    { top: 'TRIAL', bottom: 'Mode', color: '#ffff00' }
];

let currentIndex = 2;
const stack = document.getElementById('cdStack');
const dotContainer = document.getElementById('navDots');
const topInput = document.getElementById('topTextInput');
const bottomInput = document.getElementById('bottomTextInput');

function init() {
    albums.forEach((album, i) => {
        const cd = document.createElement('div');
        cd.className = 'cd';
        cd.id = `cd-${i}`;
        cd.innerHTML = `
            <div class="text-top" style="color: ${album.color}">${album.top}</div>
            <div class="text-bottom" style="color: ${album.color}">${album.bottom}</div>
        `;
        stack.appendChild(cd);

        const dot = document.createElement('div');
        dot.className = i === currentIndex ? 'dot active' : 'dot';
        dotContainer.appendChild(dot);
    });
    updateStack();
}

function updateStack() {
    const cds = document.querySelectorAll('.cd');
    const dots = document.querySelectorAll('.dot');
    
    // Sincronizar inputs con el CD actual
    topInput.value = albums[currentIndex].top;
    bottomInput.value = albums[currentIndex].bottom;

    cds.forEach((cd, i) => {
        const offset = i - currentIndex;
        const translateX = offset * 280; 
        const translateZ = -Math.abs(offset) * 250;
        const rotateY = offset * -35;

        cd.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        cd.style.opacity = Math.abs(offset) > 2 ? 0 : 1;
        cd.style.zIndex = 100 - Math.abs(offset);
        dots[i].className = i === currentIndex ? 'dot active' : 'dot';
    });
}

function move(dir) {
    currentIndex = Math.max(0, Math.min(albums.length - 1, currentIndex + dir));
    updateStack();
}

// Eventos de edición en tiempo real
topInput.addEventListener('input', (e) => {
    albums[currentIndex].top = e.target.value;
    const currentCD = document.getElementById(`cd-${currentIndex}`);
    currentCD.querySelector('.text-top').innerText = e.target.value;
});

bottomInput.addEventListener('input', (e) => {
    albums[currentIndex].bottom = e.target.value;
    const currentCD = document.getElementById(`cd-${currentIndex}`);
    currentCD.querySelector('.text-bottom').innerText = e.target.value;
});

// Selector de Color
const colorBtn = document.getElementById('colorBtn');
const picker = document.getElementById('colorPicker');

colorBtn.onclick = () => picker.click();
picker.oninput = (e) => {
    const newColor = e.target.value;
    colorBtn.style.background = newColor;
    albums[currentIndex].color = newColor;
    
    const currentCD = document.getElementById(`cd-${currentIndex}`);
    currentCD.querySelector('.text-top').style.color = newColor;
    currentCD.querySelector('.text-bottom').style.color = newColor;
};

init();
