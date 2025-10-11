export default () => {
  document.addEventListener("nav", () => {
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
    
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", (e) => {
        e.stopPropagation()
        navLinks.classList.toggle("open")
        hamburger.classList.toggle("active")
      })
      
      // Close menu when clicking a link
      navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open")
          hamburger.classList.remove("active")
        })
      })
      
      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        const target = e.target as Node
        if (!hamburger.contains(target) && !navLinks.contains(target)) {
          navLinks.classList.remove("open")
          hamburger.classList.remove("active")
        }
      })
    }
  })
}

