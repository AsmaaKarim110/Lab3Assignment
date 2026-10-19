// ---------- DATA ----------
// The same three images are used in both stories.
const images = {
  puppy: {
    url: "https://picsum.photos/id/237/800/600",
    alt: "A black puppy sitting on a road"
  },
  pug: {
    url: "https://picsum.photos/id/1025/800/600",
    alt: "A pug wrapped in a blanket"
  },
  deer: {
    url: "https://picsum.photos/id/1003/800/600",
    alt: "A deer standing in a field"
  }
};

// Each story uses a different ORDER and different captions.
const stories = {
  A: {
    title: "Story A: Finding Home",
    slides: [
      { image: images.puppy, stage: "Beginning",
        caption: "A lost puppy sits alone on an empty road, waiting for someone to come along." },
      { image: images.deer, stage: "Middle",
        caption: "Wandering into a field, the puppy meets a deer who seems to point the way toward town." },
      { image: images.pug, stage: "End",
        caption: "Wrapped in a warm blanket, the puppy is finally safe at home." }
    ]
  },
  B: {
    title: "Story B: Running Away",
    slides: [
      { image: images.pug, stage: "Beginning",
        caption: "A comfortable pug has everything it needs, but it still dreams of something wilder." },
      { image: images.puppy, stage: "Middle",
        caption: "One day it slips out the door and ends up on a lonely road, no longer sure it made the right choice." },
      { image: images.deer, stage: "End",
        caption: "In the open field, a deer watches it quietly. The pug learns that freedom is peaceful, but it can't belong here." }
    ]
  }
};

// ---------- STATE ----------
let currentStory = "A";
let currentIndex = 0;

// ---------- DOM ELEMENTS ----------
const photo = document.getElementById("photo");
const stageLabel = document.getElementById("stage");
const caption = document.getElementById("caption");
const storyTitle = document.getElementById("storyTitle");
const dotsContainer = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");

// ---------- FUNCTIONS ----------
function showSlide() {
  const slide = stories[currentStory].slides[currentIndex];

  // fade out, swap content, fade back in
  photo.classList.add("fade");
  setTimeout(() => {
    photo.src = slide.image.url;
    photo.alt = slide.image.alt;
    stageLabel.textContent = slide.stage;
    caption.textContent = slide.caption;
    photo.classList.remove("fade");
  }, 250);

  storyTitle.textContent = stories[currentStory].title;
  updateDots();
}

function buildDots() {
  dotsContainer.innerHTML = "";
  stories[currentStory].slides.forEach((slide, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  showSlide();
}

function nextSlide() {
  const total = stories[currentStory].slides.length;
  currentIndex = (currentIndex + 1) % total;
  showSlide();
}

function prevSlide() {
  const total = stories[currentStory].slides.length;
  currentIndex = (currentIndex - 1 + total) % total;
  showSlide();
}

function switchStory(storyKey) {
  currentStory = storyKey;
  currentIndex = 0;
  btnA.classList.toggle("active", storyKey === "A");
  btnB.classList.toggle("active", storyKey === "B");
  buildDots();
  showSlide();
}

// ---------- EVENT LISTENERS ----------
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
photo.addEventListener("click", nextSlide);
btnA.addEventListener("click", () => switchStory("A"));
btnB.addEventListener("click", () => switchStory("B"));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

// ---------- START ----------
switchStory("A");