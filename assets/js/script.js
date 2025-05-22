const toggleStickyBar = () => {
    window.scrollY > 0 ? document.body.classList.add("sticky-bar-visible") : document.body.classList.remove("sticky-bar-visible");
};
 
toggleStickyBar();
document.addEventListener("scroll", () => {
    toggleStickyBar();
});