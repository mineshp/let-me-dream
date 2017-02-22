function toggleSideNav() {
    // Get current classList
    let bodyClass = document.querySelector("body").classList;
    // invert class to a new variable
    let newClass = bodyClass.contains('nav-md') ? 'nav-sm' : 'nav-md';
    // apply new class
    document.querySelector("body").className = newClass;
}

function applyEventListeners() {
    document.getElementById('menu_toggle').addEventListener('click', toggleSideNav);
}

document.addEventListener("DOMContentLoaded", applyEventListeners, false);