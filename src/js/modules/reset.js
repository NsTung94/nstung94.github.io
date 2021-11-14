export default function reset() {
  document.querySelectorAll(".js-reset-selector").forEach(function (item) {
 
      item.addEventListener("click", function () {
        document
          .querySelectorAll(
            ".js-selector-checkbox input[type=checkbox]:checked"
          )
          .forEach(
            function(checkBox) {
              (checkBox.checked = false)
            } 
              
          );
      });
  });
}
