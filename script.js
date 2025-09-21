const stage = document.getElementById('stage');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const emptyMsg = document.getElementById('emptyMsg');
const loveMessage = document.getElementById('loveMessage');
const music = document.getElementById('bgMusic');

let typingInterval; // Para controlar el mensaje y evitar distorsión

function random(min,max){ return Math.random()*(max-min)+min; }

function makeFlower(xPct=null, yPct=null, size=1){
  const f = document.createElement('div');
  f.className = 'flower';
  if(size < 0.8) f.classList.add('small');
  const left = xPct === null ? random(5,92) : xPct;
  const top = yPct === null ? random(6,86) : yPct;
  f.style.left = left + '%';
  f.style.top = top + '%';

  // --- Crear tallo ---
  const stem = document.createElement('div');
  stem.className = 'stem';
  f.appendChild(stem);

  // --- Crear pétalos ---
  for(let i=1; i<=6; i++){
    const p = document.createElement('div');
    p.className = `petal p${i}`;
    f.appendChild(p);
  }

  // --- Crear centro ---
  const c = document.createElement('div');
  c.className = 'center';
  f.appendChild(c);

  // --- Click para eliminar ---
  f.addEventListener('click', e=>{
    e.stopPropagation();
    f.remove();
    checkEmpty();
  });

  // --- Doble click para duplicar ---
  f.addEventListener('dblclick', e=>{
    e.stopPropagation();
    const nx = Math.min(95, Math.max(3, parseFloat(f.style.left) + random(-12,12)));
    const ny = Math.min(90, Math.max(5, parseFloat(f.style.top) + random(-12,12)));
    const newF = makeFlower(nx, ny, Math.random()>0.6 ? 0.75 : 1);
    stage.appendChild(newF);
    checkEmpty();
  });

  const dur = random(5,9);
  f.style.animationDuration = dur + 's';
  return f;
}

function addRandomFlower(){
  const size = Math.random()>0.6 ? 1 : 0.75;
  const flower = makeFlower(null,null,size);
  stage.appendChild(flower);
  checkEmpty();
  return flower;
}

addBtn.addEventListener('click', ()=>{
  addRandomFlower();
  playMusic();
  showLoveMessage("Que nunca falten flores amarillas en tu vida  💛");
});

clearBtn.addEventListener('click', ()=>{
  Array.from(stage.querySelectorAll('.flower')).forEach(f=>f.remove());
  checkEmpty();
});

stage.addEventListener('click', e=>{
  if(e.target !== stage) return;
  const rect = stage.getBoundingClientRect();
  const xPct = ((e.clientX - rect.left)/rect.width)*100;
  const yPct = ((e.clientY - rect.top)/rect.height)*100;
  const size = Math.random()>0.6 ? 1 : 0.75;
  const flower = makeFlower(xPct, yPct, size);
  stage.appendChild(flower);
  checkEmpty();
});

function checkEmpty(){
  const any = stage.querySelector('.flower');
  emptyMsg.style.display = any ? 'none' : 'flex';
}

/* Mensaje con efecto máquina de escribir */
function showLoveMessage(text){
  loveMessage.textContent = "";
  if(typingInterval) clearInterval(typingInterval); // Limpiar intervalo anterior
  let i = 0;
  typingInterval = setInterval(()=>{
    loveMessage.textContent += text[i];
    i++;
    if(i >= text.length) clearInterval(typingInterval);
  },100);
}

/* Música */
function playMusic(){
  if(music.paused){
    music.play().catch(err => console.log("Autoplay bloqueado hasta clic:", err));
  }
}

/* Inicial: algunas flores */
for(let i=0; i<5; i++) addRandomFlower();

function addFallingPetal(){
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    petal.style.left = Math.random()*100 + '%';
    petal.style.animationDuration = (4 + Math.random()*4) + 's';
    document.body.appendChild(petal);
    setTimeout(()=>petal.remove(), 8000);
  }
  
  setInterval(addFallingPetal, 500); // Cada 0.5 segundos cae un pétalo

  const rainbowText = document.getElementById('rainbowText');

function getRandomColor() {
  // Genera un color aleatorio
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Cambiar color cada 500ms (medio segundo)
setInterval(() => {
  rainbowText.style.color = getRandomColor();
}, 500);