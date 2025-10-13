export default () => {
  const init = () => {
    const menuButton = document.getElementById("mobile-menu-button")
    const navMenu = document.getElementById("nav-menu")
    const overlay = document.getElementById("nav-menu-overlay")
    
    if (!menuButton || !navMenu || !overlay) {
      console.warn("[Navigation] Required elements not found")
      return
    }
    
    // Toggle menu when clicking the button
    menuButton.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      
      const isOpen = navMenu.classList.contains("open")
      
      if (isOpen) {
        navMenu.classList.remove("open")
        menuButton.classList.remove("active")
        overlay.classList.remove("open")
      } else {
        navMenu.classList.add("open")
        menuButton.classList.add("active")
        overlay.classList.add("open")
      }
    })
    
    // Close menu when clicking overlay
    overlay.addEventListener("click", () => {
      navMenu.classList.remove("open")
      menuButton.classList.remove("active")
      overlay.classList.remove("open")
    })
    
    // Close menu when pressing escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open")
        menuButton.classList.remove("active")
        overlay.classList.remove("open")
      }
    })
    
    // Close menu when clicking menu items
    const menuLinks = navMenu.querySelectorAll("a")
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open")
        menuButton.classList.remove("active")
        overlay.classList.remove("open")
      })
    })
  }
  
  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
}
