import { openMenu } from './modules/menu.js';
import { wish } from './modules/wish.js';
import {dropdown} from './modules/dropdown.js';

openMenu('.js-open-menu');
wish('.js-heart-button');
dropdown('.js-dropdown-menu');

// lazy image using Intersection Observer to check viewport
document.addEventListener("DOMContentLoaded", function () {
    var lazyObjects = [].slice.call(document.querySelectorAll(".lazy-observer"));
  
    if ("IntersectionObserver" in window) {
      let lazyObjectObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              let lazyObject = entry.target;
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
  });

