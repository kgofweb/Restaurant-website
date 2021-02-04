// DOM element
const header = document.getElementById('header');
const nav = document.querySelector('.nav');
const toggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLink = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const themeButton = document.getElementById('theme-button');
const scroll = document.getElementById('scroll-top');
const main = document.querySelector('.main');

// Event listner
toggle.addEventListener('click', showMenu);
navLink.forEach(nL => nL.addEventListener('click', linkAction));
themeButton.addEventListener('click', changeTheme);

window.addEventListener('scroll', scrollActive);
window.addEventListener('scroll', changeBgHeader);
window.addEventListener('scroll', scrollTop);

// ---------- Show menu mobile ---------- //
function showMenu() {
   // Toggle mode
   // navMenu.classList.toggle('show');

   // Add and remove
   if(navMenu.classList.contains('show')) {
      // See menu
      navMenu.classList.remove('show');
      // Change toggle
      toggle.innerHTML = '<i class="bx bx-menu-alt-right"></i>';
   } else {
      navMenu.classList.add('show');
      toggle.innerHTML = '<i class="bx bx-dots-horizontal-rounded"></i>';
   }

   // Blur effect
   if(navMenu.classList.contains('show')) {
      main.style.filter = 'blur(2px)';
   } else {
      main.style.filter = 'none';
   }
}

// ---------- Remove menu mobile ---------- //
function linkAction() {
   navMenu.classList.remove('show');

   // Blur effect
   if(navMenu.classList.contains('show')) {
      main.style.filter = 'blur(2px)';
   } else {
      main.style.filter = 'none';
   }
}

// ---------- Change bg Header ---------- //
function changeBgHeader() {
   if(this.scrollY > 200) {
      header.classList.add('scroll-header');
   } else {
      header.classList.remove('scroll-header');
   }
}

// ---------- Scroll section and active link ---------- //
function scrollActive() {
   // Get the number of pixels on the scroll
   const scroll = window.pageYOffset;

   sections.forEach(current => {
      // Get section Height
      const sectionHeight = current.offsetHeight;
      // Get section Top
      const sectionTop = current.offsetTop - 50;
      // Get section id
      sectionId = current.getAttribute('id');

      if(scroll > sectionTop && scroll <= sectionTop + sectionHeight) {
         document.querySelector(`.nav-menu a[href*='${sectionId}']`).classList.add('active');
         toggle.innerHTML = '<i class="bx bx-menu-alt-right"></i>';
      } else {
         document.querySelector(`.nav-menu a[href*='${sectionId}']`).classList.remove('active');
      }
   });
}

// ---------- Dark/Light theme ---------- //
const darkTheme = 'dark-theme';
const iconTheme = 'bxs-sun';

// If user select
const selectTheme = localStorage.getItem('selected-theme');
const selectIcon = localStorage.getItem('selected-icon');

// Get current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';

const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-sun' : 'bxs-sun';

// If user choose previously topic
if(selectTheme) {
   // Validation fulfilled
   document.body.classList[selectTheme === 'dark' ? 'add' : 'remove'](darkTheme);
   themeButton.classList[selectIcon === 'bx-sun' ? 'add' : 'remove'](iconTheme);
}

// Enable/desactive theme with button
function changeTheme() {
   // Add or remove dark/icon theme
   document.body.classList.toggle(darkTheme);
   // Change icon
   themeButton.classList.toggle(iconTheme);
   // Save current theme and icon in the Storage
   localStorage.setItem('selected-theme', getCurrentTheme());
   localStorage.setItem('selected-icon', getCurrentIcon());
}

// ---------- Show Scroll Top ---------- //
function scrollTop() {
   // Scroll > 500px
   if(this.scrollY >= 600) {
      scroll.classList.add('show-scroll')
   } else {
      scroll.classList.remove('show-scroll');
   }
}

// ---------- Animation with scroll reveal ---------- //
const sr = ScrollReveal({
   origin: 'top',
   distance: '40px',
   duration: 2000,
   reset: true
});

sr.reveal(`.home-data, .home-img,
   .about-data, .about-img,
   .service-content, .menu-content,
   .app-data, .app-img,
   .contact-data, .contact-button,
   .footer-content`, {
   interval: 500
});
