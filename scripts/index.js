var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// ========================================
// HAMBURGER MENU TOGGLE
// ========================================

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// BONUS : Ferme le menu quand on clique sur un lien
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#myLinks a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            var menu = document.getElementById("myLinks");
            if (menu.style.display === "block") {
                menu.style.display = "none";
            }
        });
    });
});