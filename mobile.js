let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.currentX = 0;
    this.currentY = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.init();
  }

  init() {
    this.paper.addEventListener("touchstart", (e) => {
      this.holdingPaper = true;
      this.paper.style.zIndex = highestZ++;
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    this.paper.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      let touchX = e.touches[0].clientX;
      let touchY = e.touches[0].clientY;
      
      let dx = touchX - this.prevTouchX;
      let dy = touchY - this.prevTouchY;
      
      this.currentX += dx;
      this.currentY += dy;
      
      this.prevTouchX = touchX;
      this.prevTouchY = touchY;

      this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    });

    this.paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });
  }
}

document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));
