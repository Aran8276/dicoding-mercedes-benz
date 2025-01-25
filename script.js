//@ts-check

let isMoving = false;
const modelMenuPreview = document.getElementById("modelMenuPreview");
const modelMenu = document.getElementById("modelMenu");
const modelOpen = document.getElementById("modelOpen");
const intro = document.getElementById("intro");
const introLogo = document.getElementById("introLogo");

const pageList = [
  { id: "home-page", element: document.getElementById("home-page") },
  { id: "c-class-page", element: document.getElementById("c-class-page") },
  { id: "e-class-page", element: document.getElementById("e-class-page") },
  { id: "s-class-page", element: document.getElementById("s-class-page") },
  { id: "gls-class-page", element: document.getElementById("gls-class-page") },
];

// document.getElementById("c-class-model")?.classList.toggle("animate-drive")

const playIntro = () => {
  intro?.classList.toggle("intro", false);
  introLogo?.classList.toggle("intro-logo", false);

  setTimeout(() => {
    intro?.classList.toggle("intro", true);
    introLogo?.classList.toggle("intro-logo", true);
  }, 0);
};

const carPreviewList = [
  "c-class-cover",
  "e-class-cover",
  "s-class-cover",
  "gls-class-cover",
];

const hidePages = () => {
  pageList.map((item) => {
    item.element?.classList.add("hidden");
  });
};

const switchPage = (pageId, clickedCar) => {
  window.scrollTo(0, 0);
  hidePages();
  pageList.map((item) => {
    item.id == pageId && item.element?.classList.remove("hidden");
  });

  carPreviewList.map((item) => {
    document.getElementById(item).style.animation = "model-menu-preview-out 1s";
    document.getElementById(item).style.animationFillMode = "forwards";
  });

  setTimeout(() => {
    document.addEventListener(
      "mousemove",
      () => {
        carPreviewList.map((item) => {
          document.getElementById(item).style = "";
        });
      },
      { once: true }
    );
  }, 1000);

  if (pageId == "home-page") {
    playIntro();
    return;
  }

  if (pageId != "home-page") {
    handleModelMenu();
    document.getElementById(clickedCar)?.classList.toggle("animate-drive");
    setTimeout(() => {
      document.getElementById(clickedCar)?.classList.toggle("animate-drive");
    }, 2000);

    return;
  }
};

function animateCars() {
  document.getElementById("c-class-model")?.classList.toggle("c-class-model");
  document.getElementById("e-class-model")?.classList.toggle("e-class-model");
  document.getElementById("s-class-model")?.classList.toggle("s-class-model");
  document
    .getElementById("gls-class-model")
    ?.classList.toggle("gls-class-model");
}

function handleModelMenu() {
  modelMenu?.classList.toggle("model-box-animate-presence");
  animateCars();
}

const sections = document.querySelectorAll(".section-container");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle(
        "animate-section-container-presence",
        entry.isIntersecting
      );
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.6,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
  switchPage("home-page");

  if (modelOpen) {
    modelOpen.checked = false;
  }

  const slides = document.querySelectorAll(".slide");
  const previewContainers = document.querySelectorAll(
    ".thumb-preview-container"
  );

  // liat isinya apa nti disini
  //   console.log(previewContainers);

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.left = `${(i - index) * 100}%`;
    });
  }

  const handleNext = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    previewContainers.forEach((item) => {
      item.classList.remove("animate-presence");
      setTimeout(() => {
        item.classList.add("animate-presence");
      }, 400);
    });
  };

  setInterval(() => {
    handleNext();
  }, 4000);

  document.getElementById("nextBtn")?.addEventListener("click", handleNext);

  document.getElementById("prevBtn")?.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);

  previewContainers.forEach((item) => {
    item.classList.remove("animate-presence");
    setTimeout(() => {
      item.classList.add("animate-presence");
    }, 400);
  });
});
