export default () => {
  const menuButton = document.getElementById("mobile-menu-button")
  const navMenu = document.getElementById("nav-menu")
  const overlay = document.getElementById("nav-menu-overlay")
  
  if (!menuButton || !navMenu || !overlay) {
    return
  }
  
  menuButton.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const isOpen = navMenu.classList.contains("open")
    navMenu.classList.toggle("open", !isOpen)
    overlay.classList.toggle("open", !isOpen)
  })
  
  overlay.addEventListener("click", () => {
    navMenu.classList.remove("open")
    overlay.classList.remove("open")
  })
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open")
      overlay.classList.remove("open")
    }
  })
  
  const menuLinks = navMenu.querySelectorAll("a")
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open")
      overlay.classList.remove("open")
    })
  })
}
