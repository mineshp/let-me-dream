function toggleSideNav() {
    // Get current classList
    let bodyClass = document.querySelector("body").classList;
    // invert class to a new variable
    let newClass = bodyClass.contains('nav-md') ? 'nav-sm' : 'nav-md';
    // apply new class
    console.log("NC", newClass);
    document.querySelector("body").className = newClass;
}

function applyEventListeners() {
    document.getElementById('menu_toggle').addEventListener('click', toggleSideNav);
}

document.addEventListener("DOMContentLoaded", applyEventListeners, false);