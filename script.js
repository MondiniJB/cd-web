const albums = [
    { name: 'HELL', color: '#ff3300', img: null },
    { name: 'FKA', color: '#00f2ff', img: null },
    { name: 'BURIAL', color: '#00ff66', img: null },
    { name: 'HELLO', color: '#ff00ff', img: null },
    { name: 'TRIAL', color: '#ffff00', img: null }
];

let currentIndex = 2;
const stack = document.getElementById('cdStack');
const dotContainer = document.getElementById('navDots');
const nameInput = document.getElementById('nameInput');
const colorBtn = document.getElementById('colorBtn');
const picker = document.getElementById('colorPicker');

function init() {
    albums.forEach((album, i) => {
        const cd = document.createElement('div');
        cd.className = 'cd';
        cd.id = `cd-${i}`;
        cd.innerHTML = `<span class="cd-label" style="color: ${album.color}">${album.name}</span>`;
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
    nameInput.value = albums[currentIndex].name;
    colorBtn.style.background = albums[currentIndex].color;

    cds.forEach((cd, i) => {
        const offset = i - currentIndex;
        const translateX = offset * 280; 
        const translateZ = -Math.abs(offset) * 200;
        const rotateY = offset * -35;
        cd.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        cd.style.opacity = Math.abs(offset) > 2 ? 0 : 1;
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

nameInput.addEventListener('input', (e) => {
    const val = e.target.value.toUpperCase();
    albums[currentIndex].name = val;
    document.getElementById(`cd-${currentIndex}`).querySelector('.cd-label').innerText = val;
});

colorBtn.onclick = () => picker.click();
picker.oninput = (e) => {
    const color = e.target.value;
    colorBtn.style.background = color;
    albums[currentIndex].color = color;
    document.getElementById(`cd-${currentIndex}`).querySelector('.cd-label').style.color = color;
};

document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const url = event.target.result;
            albums[currentIndex].img = url;
            const currentCD = document.getElementById(`cd-${currentIndex}`);
            let bg = currentCD.querySelector('.cd-bg-image') || document.createElement('img');
            bg.className = 'cd-bg-image';
            bg.src = url;
            currentCD.prepend(bg);
        };
        reader.readAsDataURL(file);
    }
});

function exportCD() {
    const album = albums[currentIndex];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const s = 1000; 
    canvas.width = s; canvas.height = s;

    // Fondo
    ctx.beginPath();
    ctx.arc(s/2, s/2, s/2, 0, Math.PI*2);
    ctx.fillStyle = '#181818';
    ctx.fill();

    const drawAll = () => {
        // Agujero central
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(s/2, s/2, s * 0.185, 0, Math.PI*2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // Texto en la parte inferior
        ctx.font = 'bold 90px "Permanent Marker"';
        ctx.fillStyle = album.color;
        ctx.textAlign = 'center';
        
        ctx.save();
        ctx.translate(s/2, s * 0.82); // Posicionado abajo
        ctx.rotate(-5 * Math.PI / 180);
        ctx.fillText(album.name, 0, 0);
        ctx.restore();

        const link = document.createElement('a');
        link.download = `CD_${album.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    if (album.img) {
        const img = new Image();
        img.src = album.img;
        img.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(s/2, s/2, s/2, 0, Math.PI*2);
            ctx.clip();
            ctx.globalAlpha = 0.8;
            ctx.drawImage(img, 0, 0, s, s);
            ctx.restore();
            drawAll();
        };
    } else {
        drawAll();
    }
}

init();
