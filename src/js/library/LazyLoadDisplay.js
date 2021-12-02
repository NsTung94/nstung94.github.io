class LazyFunction {
  constructor(){
    this.lazyImage();
    this.lazyFilterBar();
    
  }
  lazyImage() {
    let lazyObjects = [].slice.call(
        document.querySelectorAll(".lazy-observer")
      );
    if ("IntersectionObserver" in window) {
      let lazyObjectObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              let lazyObject = entry.target;
              // lazyObject.src = lazyObject.dataset.src;
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
  }
  lazyFilterBar() {
    let bar = document.querySelector(".filter");
    let header = document.getElementById("header");
    let footer = document.getElementById("footer");
   
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bar.classList.add("hide-on-mobile");
        } else {
          bar.classList.remove("hide-on-mobile");
        }
      });
    });

    observer.observe(header);
    observer.observe(footer);
  }
  reachLoadMore() {
    let destination = document.querySelector(".loadMore");
  
    let observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start += 3;
            end += 3;
            loadProducts();
          }
        });
      },
      {
        threshold: 1,
      }
    );
  
    observer.observe(destination);
  }
}

export default new LazyFunction();
