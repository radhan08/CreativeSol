const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
});


const revealElements = document.querySelectorAll('.work-card, .project-card, .testimonial, footer, .hero div');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.85;
  revealElements.forEach(el => { if(el.getBoundingClientRect().top < trigger) el.classList.add('show'); });
});

const words = ["Experiences", "Designs", "Solutions", "Brands"];
let i=0,j=0,currentWord='',isDeleting=false;
const typeEl=document.querySelector('.typewriter-text');
function type(){ 
  if(i>=words.length)i=0;
  currentWord=words[i];
  if(isDeleting){ typeEl.textContent=currentWord.substring(0,j--); if(j<0){isDeleting=false;i++;j=0;} } 
  else{ typeEl.textContent=currentWord.substring(0,j++); if(j>currentWord.length){isDeleting=true;j=currentWord.length;} }
  setTimeout(type,isDeleting?100:200);
}
type();

const canvas=document.getElementById('particle-canvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particles=[];
const particleCount=120;
for(let k=0;k<particleCount;k++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,r:Math.random()*2+1});
}
function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const projectCards = document.querySelectorAll('.project-card');
  for(let i=0;i<particleCount;i++){
    const p=particles[i]; p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width)p.vx*=-1; 
    if(p.y<0||p.y>canvas.height)p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); 
    ctx.fillStyle="rgba(255,255,255,0.7)"; ctx.fill();
    for(let j=i+1;j<particleCount;j++){
      const q=particles[j]; const dx=p.x-q.x; const dy=p.y-q.y; const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle="rgba(255,255,255,"+(1-dist/120)*0.5+")"; ctx.lineWidth=1; ctx.stroke();}
    }
    projectCards.forEach(card=>{
      const rect=card.getBoundingClientRect();
      const cx=rect.left+rect.width/2 + window.scrollX; 
      const cy=rect.top+rect.height/2 + window.scrollY;
      const dx=p.x-cx; const dy=p.y-cy; 
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<150){
        let alpha = (1-dist/150)*0.1;
        if(card.matches(':hover')) alpha = (1-dist/150)*0.3;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(cx,cy); ctx.strokeStyle=`rgba(255,111,97,${alpha})`; ctx.lineWidth=card.matches(':hover') ? 1.2 : 0.7; ctx.stroke();
      }
    });
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();
window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });