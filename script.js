// Slide Data Array (Dynamic Content source)
const slidesData = [
    {
        id: "slide-1",
        title: "AI Project Demo",
        description: "State-of-the-art neural networks powering next-generation predictive algorithms and deep learning modules.",
        image: "assets/images/ai_project_demo_1775837092433.png",
        ctaText: "View Project",
        ctaLink: "#!"
    },
    {
        id: "slide-2",
        title: "Web Dev Services",
        description: "High-performance, elegant, and secure web applications built from the ground up for modern enterprises.",
        image: "assets/images/web_dev_services_1775837109704.png",
        ctaText: "Learn More",
        ctaLink: "#!"
    },
    {
        id: "slide-3",
        title: "Mobile App Design",
        description: "Intuitive, glassmorphism-inspired mobile interfaces that natively elevate human-computer interaction.",
        image: "assets/images/mobile_app_design_1775837168710.png",
        ctaText: "See Case Study",
        ctaLink: "#!"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Elements ---
    const sliderContainer = document.getElementById("slider-container");
    const indicatorContainer = document.getElementById("slider-indicators");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const navbar = document.querySelector(".navbar");

    let currentSlide = 0;
    const slideDuration = 5000; // 5 seconds
    let autoPlayInterval;

    // --- Initialization ---
    function initSlider() {
        // Generate Slides and Indicators Dynamically
        slidesData.forEach((slide, index) => {
            // Create Slide Wrapper
            const slideEl = document.createElement("div");
            slideEl.classList.add("slide");
            if (index === 0) slideEl.classList.add("active");
            slideEl.setAttribute("role", "tabpanel");
            slideEl.setAttribute("aria-hidden", index !== 0);
            slideEl.setAttribute("id", `panel-${index}`);

            // HTML Content
            slideEl.innerHTML = `
                <img src="${slide.image}" alt="${slide.title} Background" class="slide-bg">
                <div class="slide-overlay">
                    <div class="slide-content">
                        <h1 class="slide-title">${slide.title}</h1>
                        <p class="slide-desc">${slide.description}</p>
                        <a href="${slide.ctaLink}" class="slide-btn">${slide.ctaText}</a>
                    </div>
                </div>
            `;
            sliderContainer.appendChild(slideEl);

            // Create Indicator Dot
            const dot = document.createElement("button");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.setAttribute("role", "tab");
            dot.setAttribute("aria-selected", index === 0);
            dot.setAttribute("aria-controls", `panel-${index}`);
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
            
            dot.addEventListener("click", () => {
                goToSlide(index);
                resetAutoPlay();
            });
            indicatorContainer.appendChild(dot);
        });

        startAutoPlay();
    }

    // --- Slider Logic ---
    function goToSlide(index) {
        const slides = document.querySelectorAll(".slide");
        const dots = document.querySelectorAll(".dot");

        // Remove active class from current
        slides[currentSlide].classList.remove("active");
        slides[currentSlide].setAttribute("aria-hidden", "true");
        dots[currentSlide].classList.remove("active");
        dots[currentSlide].setAttribute("aria-selected", "false");

        // Update index (with wrap around)
        currentSlide = (index + slidesData.length) % slidesData.length;

        // Add active class to new
        slides[currentSlide].classList.add("active");
        slides[currentSlide].setAttribute("aria-hidden", "false");
        dots[currentSlide].classList.add("active");
        dots[currentSlide].setAttribute("aria-selected", "true");
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // --- Autoplay Logic ---
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, slideDuration);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // --- Event Listeners ---
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoPlay();
    });

    // Keyboard navigation
    sliderContainer.parentElement.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            nextSlide();
            resetAutoPlay();
        } else if (e.key === "ArrowLeft") {
            prevSlide();
            resetAutoPlay();
        }
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Bootstrap everything
    initSlider();
});
