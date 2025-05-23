document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle functionality
    const themeButton = document.getElementById("theme-button")
    const themeIcon = themeButton.querySelector("i")
  
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
    // Set initial theme
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark-theme")
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    }
  
    // Toggle theme when button is clicked
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
  
      // Update icon
      if (document.body.classList.contains("dark-theme")) {
        themeIcon.classList.remove("fa-moon")
        themeIcon.classList.add("fa-sun")
        localStorage.setItem("theme", "dark")
      } else {
        themeIcon.classList.remove("fa-sun")
        themeIcon.classList.add("fa-moon")
        localStorage.setItem("theme", "light")
      }
    })
  
    // Tab navigation functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Show corresponding content
        const tabId = this.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })
  
    // Typewriter effect
    const typewriterElement = document.getElementById("typewriter")
    const phrases = [
      "Full Stack Developer",
      "Python Enthusiast",
      "Open Source Contributor",
      "Web Developer",
      "Problem Solver",
    ]
  
    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100
  
    function typeWriter() {
      const currentPhrase = phrases[phraseIndex]
  
      if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50 // Faster when deleting
      } else {
        // Typing text
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100 // Normal speed when typing
      }
  
      // If word is complete
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end of typing
        isDeleting = true
        typingSpeed = 1500 // Wait before deleting
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase after deleting
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        typingSpeed = 500 // Pause before typing new phrase
      }
  
      setTimeout(typeWriter, typingSpeed)
    }
  
    // Start the typewriter effect
    setTimeout(typeWriter, 1000)
  
    // Add subtle animations for elements when they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".timeline-item, .project-card, .achievement-item")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2
  
        if (elementPosition < screenPosition) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll(".timeline-item, .project-card, .achievement-item")
    elementsToAnimate.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  
    // Run animation on load and scroll
    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
  })
  