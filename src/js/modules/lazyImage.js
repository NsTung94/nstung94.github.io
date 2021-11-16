export default function lazyImage() {
    var lazyObjects = [].slice.call(document.querySelectorAll(".lazy-observer"));

    if ("IntersectionObserver" in window) {
        let lazyObjectObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let lazyObject = entry.target;
                        console.log("lazyObject.dataset.src", lazyObject.dataset.src);
                        lazyObject.src = lazyObject.dataset.src;
                        lazyObject.style.zIndex = "1";
                        lazyObject.classList.remove("lazy-observer");
                        lazyObject.parentElement.classList.remove("placeholder");
                        lazyObjectObserver.unobserve(lazyObject);
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: "500px",
            }
        );

        lazyObjects.forEach(function (lazyObject) {
            lazyObjectObserver.observe(lazyObject);
        });
    }
};