export default () => {
  console.log("[Navigation] Script loaded")
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  console.log("[Navigation] Elements found:", { hamburger: !!hamburger, navLinks: !!navLinks })
  
  if (hamburger && navLinks) {
    console.log("[Navigation] Adding click listener")
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation()
      navLinks.classList.toggle("open")
      hamburger.classList.toggle("active")
      console.log("[Navigation] Menu toggled, open:", navLinks.classList.contains("open"))
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
}

