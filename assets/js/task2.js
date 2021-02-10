"use strict";
/*   Задания уровня 2. Дописать проект "Слайдер карусель", сделать стили,
      добавить функционал на предыдущий слайд (конструкция 3 элемента).  
 */

class Slide {
  constructor(src, description) {
    this._src = src;
    this._description = description;
  }
  get src() {
    return this._src;
  }
  get description() {
    return this._description;
  }
}

class Carousel {
  constructor(slides, currentIndex = 0) {
    this._slides = slides;
    this._currentIndex = currentIndex;
  }
  get currentIndex() {
    return this._currentIndex;
  }
  set currentIndex(value) {
    if (typeof value !== "number") throw new TypeError();
    if (
      !Number.isSafeInteger(value) ||
      value < 0 ||
      value >= this._slides.length
    )
      throw new RangeError();
    this._currentIndex = value;
  }
  get currentSlide() {
    return this._slides[this._currentIndex];
  }
  get nextSlide() {
    return this._slides[this.nextIndex];
  }
  get prevSlide() {
    return this._slides[this.prevIndex];
  }

  get nextIndex() {
    return (this._currentIndex + 1) % this._slides.length;
  }
  get prevIndex() {
    return (this._currentIndex - 1 + this._slides.length) % this._slides.length;
  }
}

const carousel = new Carousel([
  new Slide("../Task14/assets/img/Chrysanthemum.jpg", "Flower"),
  new Slide("../Task14/assets/img/Desert.jpg", "Desert"),
  new Slide("../Task14/assets/img/Hydrangeas.jpg", "Flower"),
  new Slide("../Task14/assets/img/Jellyfish.jpg", "Animal"),
  new Slide("../Task14/assets/img/Koala.jpg", "Animal"),
  new Slide("../Task14/assets/img/Lighthouse.jpg", "Building"),
  new Slide("../Task14/assets/img/Penguins.jpg", "Animal"),
  new Slide("../Task14/assets/img/Tulips.jpg", "Flower"),
]);

const [prevButtonElem, nextButtonElem] = document.querySelectorAll(".btn");

const sliderClick = (direction = "next") => (e) => {
  carousel.currentIndex =
    carousel[direction == "next" ? "nextIndex" : "prevIndex"];
  updateSlide(direction);
};

prevButtonElem.addEventListener("click", sliderClick("prev"));
nextButtonElem.addEventListener("click", sliderClick("next"));

updateSlide();

function updateSlide(direction) {
  const prevImg = document.querySelector(".prevImage");
  const currentImg = document.querySelector(".currentImage");
  const nextImg = document.querySelector(".nextImage");

  const currentSlide = carousel.currentSlide;
  prevImg.setAttribute("src", carousel.prevSlide.src);
  currentImg.setAttribute("src", currentSlide.src);
  nextImg.setAttribute("src", carousel.nextSlide.src);
}
