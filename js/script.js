var scrollToTopBtn = document.getElementById("scrollToTopBtn")

var rootElement = document.documentElement
function handleScroll() {
  // Do something on scroll
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
  if ((rootElement.scrollTop / scrollTotal ) > 0.30 ) {
    // Show button
    scrollToTopBtn.classList.add("showBtn")
  } else {
    // Hide button
    scrollToTopBtn.classList.remove("showBtn")
  }
}
document.addEventListener("scroll", handleScroll)

// Botão Voltar ao Topo
function backTop(){
  var html = document.documentElement;
  html.scrollTop = 0;
}

// check for saved 'lightMode' in localStorage
let lightMode = localStorage.getItem('lightMode'); 

const lightModeToggle = document.querySelector('#switch');

const enableLightMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('light-mode');
  document.body.classList.remove('default-theme');
  // 2. Update lightMode in localStorage
  localStorage.setItem('lightMode', 'enabled');
}

const disableLightMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('light-mode');
  document.body.classList.add('default-theme');
  // 2. Update lightMode in localStorage 
  localStorage.setItem('lightMode', null);
}
 
// If the user already visited and enabled lightMode
// start things off with it on
if (lightMode === 'enabled') {
  enableLightMode();
}

// When someone clicks the button
lightModeToggle.addEventListener('click', () => {
  // get their lightMode setting
  lightMode = localStorage.getItem('lightMode'); 
  
  // if it not current enabled, enable it
  if (lightMode !== 'enabled') {
    enableLightMode();
  // if it has been enabled, turn it off  
  } else {  
    disableLightMode(); 
  }
});

// Animação Scroll
const debounce = function(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
  const windowTop = window.pageYOffset + ((window.innerHeight * 2) / 3);
  target.forEach(function(element) {
    if((windowTop) > element.offsetTop) {
      element.classList.add(animationClass);
    } else {
      element.classList.remove(animationClass);
    }
  })
}

animeScroll();

if(target.length) {
  window.addEventListener('scroll', debounce(function() {
    animeScroll();
  }, 50));
}

// Efeito fade
const pin = document.querySelectorAll('[data-opacity]');
const fadeClass = 'fade-opacity';

function fadeUp() {
  const windowTop = window.onscroll + document.documentElement.scrollTop > 75;
  pin.forEach(function(element) {
    if((windowTop) > element.offsetTop) {
      element.classList.add(fadeClass);
    } else {
      element.classList.remove(fadeClass);
    }
  })
}

fadeUp();

if(pin.length) {
  window.addEventListener('scroll', debounce(function() {
    fadeUp();
  }, 50));
}