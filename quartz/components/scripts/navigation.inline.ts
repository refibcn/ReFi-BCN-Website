export default () => {
  // Wait for DOM to be fully ready
  const init = () => {
    const hamburger = document.querySelector(".hamburger") as HTMLElement
    const navLinks = document.querySelector(".nav-links") as HTMLElement
    
    if (!hamburger || !navLinks) {
      console.warn("[Navigation] Elements not found")
      return
    }
    
    console.log("[Navigation] Initializing menu")
    
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      const isOpen = navLinks.classList.contains("open")
      
      if (isOpen) {
        navLinks.classList.remove("open")
        hamburger.classList.remove("active")
      } else {
        navLinks.classList.add("open")
        hamburger.classList.add("active")
      }
      
      console.log("[Navigation] Menu is now:", isOpen ? "closed" : "open")
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
    
    console.log("[Navigation] Menu initialized successfully")
  }
  
  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
}

