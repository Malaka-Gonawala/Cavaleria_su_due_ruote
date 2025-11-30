let btnOpenNav = document.querySelector("#OpenNav");
let nav = document.querySelector("#Nav");
let navOpened = false;

function toggleNav() {
    nav.classList.toggle("open");
    btnOpenNav.classList.toggle("active");
    navOpened = nav.classList.contains("open");
    fixTitle();
}
btnOpenNav.addEventListener("click", toggleNav);

window.addEventListener("click", function (e) {
    if (nav.classList.contains("open")) {
        if (!nav.contains(e.target) && !btnOpenNav.contains(e.target)) {
            nav.classList.remove("open");
            btnOpenNav.classList.remove("active");
            navOpened = false;
            fixTitle();
        }
    }
});

// --------------------------------------------

let title = document.querySelector("#Title-Container");
let scrollTimeout;

const fixTitle = () => {
    if (window.scrollY < 50) {
        clearTimeout(scrollTimeout);
        title.classList.remove("start-scroll");
        title.style.opacity = 1;
        return;
    }
    title.classList.add("start-scroll");
    title.style.opacity = 1;

    clearTimeout(scrollTimeout);

    if (navOpened === false) {
        scrollTimeout = setTimeout(() => {
            title.style.opacity = 0;
        }, 1000);
    }
};

window.addEventListener("scroll", fixTitle);
