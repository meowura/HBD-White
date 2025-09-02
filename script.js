// ===================
// Typing effect
// ===================
const typingText = document.getElementById("typingText");
const messages = ["สุขสันต์วันเกิดนะไวท์ 🎂"];
let msgIndex = 0, charIndex = 0;

function typeEffect() {
  if (charIndex < messages[msgIndex].length) {
    typingText.textContent += messages[msgIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => {
      typingText.textContent = "";
      charIndex = 0;
      msgIndex = (msgIndex + 1) % messages.length;
      typeEffect();
    }, 2000);
  }
}
typeEffect();

// ===================
// Slideshow auto generate
// ===================
const slideshow = document.getElementById("slideshow");
const dotsContainer = document.getElementById("dots");

// โหลดรูปอัตโนมัติ (แก้เลขได้ตามจำนวนรูป)
const totalImages = 20; // ใส่จำนวนจริง เช่น 120
for (let i = 1; i <= totalImages; i++) {
  const slide = document.createElement("div");
  slide.className = "slide fade";
  slide.innerHTML = `
    <img src="white/white (${i}).jpg" alt="รูปที่ ${i}">
    <div class="caption">รูปที่ ${i}</div>
  `;
  slideshow.appendChild(slide);

  const dot = document.createElement("span");
  dot.className = "dot";
  dot.addEventListener("click", () => showSlides(i));
  dotsContainer.appendChild(dot);
}

let slideIndex = 1;
showSlides(slideIndex);

document.getElementById("prev").addEventListener("click", () => showSlides(slideIndex -= 1));
document.getElementById("next").addEventListener("click", () => showSlides(slideIndex += 1));

function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// ===================
// Background Music (Random)
// ===================

// รายชื่อไฟล์เพลง (ใส่ mp3 ของเซฟเอง)
const songs = [
  "music/song1.mp3",
  "music/song2.mp3",
  "music/song3.mp3",
  "music/song4.mp3",
  "music/song5.mp3",
  "music/song6.mp3",
  "music/song7.mp3",
  "music/song8.mp3"
];

const bgMusic = document.getElementById("bgMusic");
const toggleMusicBtn = document.getElementById("toggleMusic");

// ฟังก์ชันสุ่มเพลง
function getRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length);
  return songs[randomIndex];
}

// เล่นเพลงสุ่ม
function playRandomSong() {
  bgMusic.src = getRandomSong();
  bgMusic.play();
}

// ปุ่ม toggle เล่น/หยุด
toggleMusicBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    playRandomSong();
    toggleMusicBtn.textContent = "⏸ หยุดเพลง";
  } else {
    bgMusic.pause();
    toggleMusicBtn.textContent = "🔊 เล่นเพลง";
  }
});

// เมื่อเพลงจบ ให้สุ่มเพลงใหม่เล่นต่อ
bgMusic.addEventListener("ended", playRandomSong);
// เริ่มเล่นเพลงเมื่อโหลดหน้า
//window.addEventListener("load", playRandomSong);//

// ===================
// Effect คอนเฟ็ตติ + หัวใจ (ง่ายๆ)
// ===================
const canvas = document.getElementById("effectCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
function Particle(x, y, color, shape) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.shape = shape;
  this.size = Math.random() * 8 + 2;
  this.speedY = Math.random() * 2 + 1;
}
Particle.prototype.update = function () {
  this.y += this.speedY;
  if (this.y > canvas.height) {
    this.y = 0;
    this.x = Math.random() * canvas.width;
  }
};
Particle.prototype.draw = function () {
  ctx.fillStyle = this.color;
  if (this.shape === "heart") {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - 3, this.y - 3, this.x - 5, this.y + 4, this.x, this.y + 6);
    ctx.bezierCurveTo(this.x + 5, this.y + 4, this.x + 3, this.y - 3, this.x, this.y);
    ctx.fill();
  } else {
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
};

function initParticles() {
  for (let i = 0; i < 100; i++) {
    const shape = Math.random() > 0.5 ? "heart" : "confetti";
    const color = shape === "heart" ? "#ff3385" : "#ffcc00";
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, color, shape));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
