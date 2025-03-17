document.addEventListener("DOMContentLoaded", function () {
  const presetsContainer = document.querySelector(".presets-container");
  const inputField = document.querySelector("#chatInput");
  const deleteButtons = document.querySelectorAll(".form-group__button.delete");

  if (presetsContainer && inputField) {
    presetsContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("item")) {
        const text = event.target.textContent.trim();

        inputField.value = text;

        // Добавляет текст к уже существующему
        // inputField.value += " " + text;

        inputField.focus();
      }
    });
  }

  deleteButtons.forEach((button) =>
    button.addEventListener("click", function () {
      inputField.value = "";
    })
  );
});
