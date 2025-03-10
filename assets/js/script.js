const timeoutDuration = 2000;
// sda









const header = document.getElementById("header");
if (header) {
  fetch("./components/header.html")
    .then((response) => response.text())
    .then((data) => {
      header.innerHTML = data;

      const notifyContainer = document.createElement("div");
      notifyContainer.classList.add("notify-container");

      const notifyContent = document.createElement("div");
      notifyContent.classList.add("notify-content");

      notifyContainer.appendChild(notifyContent);
      document.body.appendChild(notifyContainer);
      if (document.querySelector(".notify-container")) {
        document
          .querySelector(".notify-container")
          .addEventListener("click", closeAllNotifications);
      }
    });
}
// const header = document.getElementById("header");
// if (header) {
//   fetch("./components/header.html")
//     .then((response) => response.text())
//     .then((data) => {
//       header.innerHTML = data;

//       const script = document.createElement("script");
//       script.src = "./static/scripts/themeSwitch.js";
//       document.body.appendChild(script);

//       const mobileBtn = document.getElementById("mobileMenuBtn");

//       mobileBtn.addEventListener("click", () => {
//         const mobileMenuContainer = document.getElementById(
//           "mobileMenuContainer"
//         );
//         document.body.classList.toggle("overflow-y-hidden");
//         mobileMenuContainer.classList.toggle("hidden");
//       });
//     });
// }

const sidebar = document.getElementById("sidebar");
if (sidebar) {
  fetch("./components/sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      sidebar.innerHTML = data;

      const currentUrl = window.location.pathname;
      console.log("currentUrl: ", currentUrl);

      const sidebarItems = sidebar.querySelectorAll(".sidebar-item");

      sidebarItems.forEach((item) => {
        // const itemHref = item.getAttribute("href");
        const itemHref = new URL(
          item.getAttribute("href"),
          window.location.origin
        ).pathname;
        console.log("itemHref: ", itemHref);

        if (currentUrl === itemHref) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".form-group").forEach((group) => {
    const input = group.querySelector(".form-group__input");
    const button = group.querySelector(".form-group__button");

    if (group.classList.contains("password")) {
      input.type = "password";
    }
    if (group.classList.contains("copy")) {
      input.setAttribute("readonly", true);
    }

    button.addEventListener("click", function (event) {
      event.preventDefault();

      if (group.classList.contains("password")) {
        group.classList.toggle("show");
        input.type = input.type === "password" ? "text" : "password";
      }

      if (group.classList.contains("copy")) {
        input.select();
        copyToClipboard(input.value);
      }
    });
  });
});

// MODALS
document.addEventListener("DOMContentLoaded", function () {
  var modalButtons = document.querySelectorAll(
      ".js-open-modal, .edit-btn, .stats-btn, .delete-btn"
    ),
    overlay = document.querySelector(".js-overlay-modal"),
    closeButtons = document.querySelectorAll(".js-modal-close");

  modalButtons.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      var modalId = this.getAttribute("data-modal"),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );

      modalElem.classList.add("active");
      overlay.classList.add("active");

      if (this.classList.contains("stats-btn")) {
        const promoCode = this.getAttribute("data-promo");
        const activations = this.getAttribute("data-activations");
        const deposits = this.getAttribute("data-deposits");
        const conversion = this.getAttribute("data-conversion");
        const registrations = JSON.parse(
          this.getAttribute("data-registrations")
        );

        document.getElementById("stats-promo-code").textContent = promoCode;
        document.getElementById("stats-activations").textContent = activations;
        document.getElementById("stats-deposits").textContent = deposits;
        document.getElementById("stats-conversion").textContent = conversion;

        const registrationsContainer = document.getElementById(
          "stats-registrations"
        );
        registrationsContainer.innerHTML = "";

        registrations.forEach((reg) => {
          const registrationItem = `
            <div class="item">
              <div class="cover">
                <div class="progress" style="width: ${reg.progress}%"></div>
                <div class="cover-item">
                  <span class="flag-icon flag-icon-big flag-icon-${reg.countryImg}"></span>
                  ${reg.country}
                </div>
                <span class="cover-item">${reg.registrations}</span>
              </div>
              <div class="value">${reg.deposits}</div>
            </div>
          `;
          registrationsContainer.insertAdjacentHTML(
            "beforeend",
            registrationItem
          );
        });
      }

      if (this.classList.contains("edit-btn")) {
        const promoCode = this.getAttribute("data-promo");
        const promoValue = this.getAttribute("data-value");
        const promoPlaythrough = this.getAttribute("data-playthrough");

        document.getElementById("promo-code").textContent = promoCode;
        document.getElementById("promo-value").value = promoValue;
        document.getElementById("promo-playthrough").checked = promoPlaythrough === "true";
      }

      if (this.classList.contains("delete-btn")) {
        console.log("sdasd");
      }
    });
  });

  closeButtons.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var parentModal = this.closest(".modal");
      parentModal.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  document.body.addEventListener("keyup", function (e) {
    if (e.keyCode === 27) {
      document.querySelector(".modal.active").classList.remove("active");
      document.querySelector(".overlay").classList.remove("active");
    }
  });

  overlay.addEventListener("click", function () {
    document.querySelector(".modal.active").classList.remove("active");
    this.classList.remove("active");
  });
});

// END MODALS

// NOTIFY
function showNotification(title, message, type = 'success', timeout = 5000) {
  const container = document.querySelector(".notify-container");
  const content = container.querySelector(".notify-content");

  const notifyItem = document.createElement("div");
  notifyItem.classList.add("notify-item");
  notifyItem.innerHTML = `
      <div class="notify-item-content">
        <div class="notify-header">
            <svg class="icon">
                <use xlink:href="./assets/images/icons.svg#${type}-icon"></use>
            </svg>
            <h3 class="notify-header_text">${title}</h3>
        </div>
        ${
          message
            ? `<div class="notify-body">
            <p class="notify-body-text">${message}</p>
        </div>`
            : ""
        }
        <button class="notify-close">
            <svg class="icon">
                <use xlink:href="./assets/images/icons.svg#close"></use>
            </svg>
        </button>
      </div>
  `;

  content.appendChild(notifyItem);
  container.classList.add("active");

  notifyItem
    .querySelector(".notify-close")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      closeNotification(notifyItem, "closing");
    });

  if (timeout) {
    setTimeout(() => closeNotification(notifyItem, "closing"), timeout);
  }
}

function closeNotification(notifyItem, className) {
  notifyItem.classList.add(className);
  setTimeout(() => {
    notifyItem.remove();
    checkNotifications();
  }, 300);
}

function closeAllNotifications() {
  document
    .querySelectorAll(".notify-item")
    .forEach((notifyItem) => closeNotification(notifyItem, "closing-alt"));
  checkNotifications();
}

function checkNotifications() {
  const container = document.querySelector(".notify-container");
  if (!document.querySelector(".notify-item")) {
    container.classList.remove("active");
  }
}

if (document.querySelector(".notify-container")) {
  document
    .querySelector(".notify-container")
    .addEventListener("click", closeAllNotifications);
}

// NOTIFY END

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Скопировано в буфер обмена:", text);
      showNotification("Скопировано", "", "success", 800);
    })
    .catch((err) => {
      console.error("Ошибка при копировании:", err);
      showNotification("Ошибка", err, "error");
    });
}

// CUSTOM SELECT
class CustomSelect {
  constructor(container) {
    this.container = container;
    this.selectSelected = container.querySelector(".select-selected");
    this.selectItems = container.querySelector(".select-items");
    this.init();
    this.initInput();
  }

  init() {
    this.selectSelected.addEventListener("click", () => {
      this.container.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
      if (!this.container.contains(event.target)) {
        this.container.classList.remove("open");
      }
    });
  }

  initInput() {
    const input = document.querySelector(
      `input[data-pair="${this.container.id}"]`
    );
    if (input) {
      this.input = input;
      this.updateInput(
        this.selectSelected.textContent,
        this.selectSelected.getAttribute("data-value")
      );
    }
  }

  updateOptions(options) {
    this.selectItems.innerHTML = "";

    options.forEach((option, index) => {
      const item = document.createElement("button");
      item.classList.add("select-item");
      item.textContent = option.label;
      item.setAttribute("data-value", option.value);
      item.setAttribute("data-placeholder", option.placeholderText || "");
      this.selectItems.appendChild(item);

      item.addEventListener("click", () => {
        this.setSelected(item.textContent, item.getAttribute("data-value"));
        this.updateInput(
          item.textContent,
          item.getAttribute("data-value"),
          item.getAttribute("data-placeholder")
        );
      });
    });

    if (options.length > 0) {
      this.setSelected(options[0].label, options[0].value);
      this.updateInput(
        options[0].label,
        options[0].value,
        options[0].placeholderText || ""
      );
    }
  }

  setSelected(label, value) {
    this.selectSelected.textContent = label;
    this.selectSelected.setAttribute("data-value", value);
    this.container.classList.remove("open");
  }

  updateInput(label, value, placeholderText) {
    if (this.input) {
      this.input.placeholder = placeholderText;
      this.input.setAttribute("data-search", value);
    }
  }
}

const selectInstances = {};

document.addEventListener("DOMContentLoaded", () => {
  const selectContainers = document.querySelectorAll(".custom-select");

  selectContainers.forEach((container) => {
    const id = container.id;
    const select = new CustomSelect(container);
    selectInstances[id] = select;
  });

  const Main = [
    { label: "Месяц", value: "month", placeholderText: "Введите месяц" },
    { label: "День", value: "day", placeholderText: "Введите день" },
    { label: "Неделя", value: "week", placeholderText: "Введите неделю" },
    { label: "Все время", value: "all", placeholderText: "Введите период" },
  ];

  const Users = [
    {
      label: "Почте",
      value: "mails",
      placeholderText: "Введите почту пользователя",
    },
    {
      label: "Домену",
      value: "domain",
      placeholderText: "Введите домен пользователя",
    },
    { label: "Промокоду", value: "promo", placeholderText: "Введите промокод" },
    { label: "Стране", value: "country", placeholderText: "Введите страну" },
    { label: "Кошельку", value: "wallet", placeholderText: "Введите кошелек" },
  ];

  const DepositsStats = [
    { label: "Месяц", value: "month", placeholderText: "Введите месяц" },
    { label: "День", value: "day", placeholderText: "Введите день" },
    { label: "Неделя", value: "week", placeholderText: "Введите неделю" },
    { label: "Все время", value: "all", placeholderText: "Введите период" },
  ];

  const Deposits = [
    { label: "Почте", value: "mails", placeholderText: "Введите почту" },
    { label: "Домену", value: "domain", placeholderText: "Введите домен" },
    { label: "Промокоду", value: "promo", placeholderText: "Введите промокод" },
    { label: "Стране", value: "country", placeholderText: "Введите страну" },
    { label: "Кошельку", value: "wallet", placeholderText: "Введите кошелек" },
  ];

  const Statistics = [
    { label: "Общая", value: "all" },
    { label: "meta.ru", value: "domainRu" },
    { label: "meta.pro", value: "domainPro" },
    { label: "meta.com", value: "domainCom" },
  ];

  updateSelect("selectMain", Main);
  updateSelect("selectUsers", Users);
  updateSelect("selectDepositsStats", DepositsStats);
  updateSelect("selectDeposits", Deposits);
  updateSelect("selectStatistics", Statistics);
});

function updateSelect(id, options) {
  if (selectInstances[id]) {
    selectInstances[id].updateOptions(options);
  }
}
// CUSTOM SELECT END

/** Siblings amount on left/right side of selected page, defaults to 1 */
const siblings = 1;
/** Amount of elements visible on left/right edges, defaults to 1  */
const boundaries = 2;

const DOTS = "...";
let currentPage = 1;

function renderList(
  items,
  { itemsPerPage, containerSelector, tepmlateFn, callbackShow = () => {} }
) {
  const container = document.querySelector(`${containerSelector}.list-wrapper`);
  const list = container.querySelector(`.list-container`);

  for (let i = 0; i < items.length; i++) {
    renderItem(list, items[i]);
  }

  const listItems = Array.from(list.querySelectorAll(".list-item"));

  if (!listItems.length) return;

  showPage();
  createPageButtons();
  updateActiveButtonStates(container);
  addActionButtonListeners();

  function renderItem(container, item) {
    container.insertAdjacentHTML("beforeend", tepmlateFn(item));
  }

  function addActionButtonListeners() {
    const editButtons = container.querySelectorAll(".edit-btn");
    const deleteButtons = container.querySelectorAll(".delete-btn");
    const copyButtons = container.querySelectorAll(".copy-btn");

    // editButtons.forEach((button) => {
    //   button.addEventListener("click", (event) => {
    //     const buttonElement = event.target.closest(".edit-btn");
    //     const itemId = buttonElement.getAttribute("data-id");
    //     console.log(`Редактировать элемент с ID: ${itemId}`);
    //     //  логика для редактирования
    //   });
    // });

    // deleteButtons.forEach((button) => {
    //   button.addEventListener("click", (event) => {
    //     const buttonElement = event.target.closest(".delete-btn");
    //     const itemId = buttonElement.getAttribute("data-id");
    //     console.log(`Удалить элемент с ID: ${itemId}`);
    //     //  логика для удаления
    //   });
    // });

    copyButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const fullHash = event.target
          .closest(".copy-btn")
          .getAttribute("data-value");
        copyToClipboard(fullHash);
      });
    });
  }

  function showPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (listItems.length === 0) return;

    listItems.forEach((item, index) => {
      item.classList.toggle("hidden", index < startIndex || index >= endIndex);
      list.classList.add("anim-1");
      setTimeout(() => list.classList.remove("anim-1"), 300);
    });
  }

  function createPageButtons() {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    if (totalPages <= 1) return;

    const parent = container.parentElement;
    const pagination = parent.nextElementSibling;

    if (pagination && pagination.classList.contains("list-pagination")) {
      pagination.replaceChildren();
    }

    // пуш элемент для отображения текста
    const infoText = document.createElement("div");
    infoText.classList.add("pagination-info");
    pagination.appendChild(infoText);

    function updateListPagination(arr, container, items) {
      arr.forEach((item) => {
        const pageButton = document.createElement("button");
        pageButton.classList.add("pagination-btn");
        pageButton.textContent = item;
        pageButton.setAttribute("data-page", item);

        if (item !== DOTS) {
          pageButton.addEventListener("click", () => {
            currentPage = item;
            showPage(currentPage, items);
            createPageButtons(items);
            updateActiveButtonStates();
            callbackShow();
            updateInfoText();
          });
        }

        container.appendChild(pageButton);
      });
    }

    // Функция для обновления текста
    function updateInfoText() {
      const startIndex = (currentPage - 1) * itemsPerPage + 1;
      const endIndex = Math.min(startIndex + itemsPerPage - 1, items.length);
      infoText.textContent = `Показано ${startIndex}-${endIndex} из ${items.length}`;
    }

    const _total = Math.max(Math.trunc(totalPages), 0);
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

    const leftSiblingIndex = Math.max(currentPage - siblings, boundaries);
    const rightSiblingIndex = Math.min(
      currentPage + siblings,
      totalPages - boundaries
    );

    if (totalPageNumbers >= _total) {
      updateListPagination(range(1, _total), pagination, items);
      updateInfoText();
      return;
    }

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots =
      rightSiblingIndex < totalPages - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      updateListPagination(
        [
          ...range(1, leftItemCount),
          DOTS,
          ...range(_total - (boundaries - 1), _total),
        ],
        pagination,
        items
      );
      updateInfoText();
      return;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      updateListPagination(
        [
          ...range(1, boundaries),
          DOTS,
          ...range(_total - rightItemCount, _total),
        ],
        pagination,
        items
      );
      updateInfoText();
      return;
    }

    updateListPagination(
      [
        ...range(1, boundaries),
        DOTS,
        ...range(leftSiblingIndex, rightSiblingIndex),
        DOTS,
        ...range(_total - boundaries + 1, _total),
      ],
      pagination,
      items
    );
    updateInfoText();
  }

  function updateActiveButtonStates() {
    const pageButtons = document.querySelectorAll(".pagination-btn");
    pageButtons.forEach((button) => {
      const btnPage = button.getAttribute("data-page");

      if (+btnPage === currentPage) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  callbackShow();
}

// statistics tabs
function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".stats-pagination .btn");
  const pages = document.querySelectorAll("[data-list-page]");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetPage = this.getAttribute("data-select-page");

      pages.forEach((page) => {
        page.classList.remove("active");
      });

      const activePage = document.querySelector(
        `[data-list-page="${targetPage}"]`
      );
      if (activePage) {
        activePage.classList.add("active");
      }

      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");
    });
  });

  if (pages.length > 0) {
    pages[0].classList.add("active");
  }
});
// END statistics tabs

// CHAT SCRIPT
function updateChatStyles(containerSelector = ".chat-container") {
  document.querySelectorAll(containerSelector).forEach((container) => {
    const chatItems = container.querySelectorAll(".chat-item");

    let prevType = null;
    let group = [];

    function applyClasses(group) {
      if (group.length === 0) return;

      group.forEach((item) => {
        item.classList.remove(
          "chat-first",
          "chat-middle",
          "chat-last",
          "chat-single"
        );
      });

      if (group.length === 1) {
        group[0].classList.add("chat-single");
      } else {
        group[0].classList.add("chat-first");
        for (let i = 1; i < group.length - 1; i++) {
          group[i].classList.add("chat-middle");
        }
        group[group.length - 1].classList.add("chat-last");
      }
    }

    chatItems.forEach((item) => {
      const currentType = item.classList.contains("user") ? "user" : "other";

      if (currentType !== prevType) {
        applyClasses(group);
        group = [];
      }

      group.push(item);
      prevType = currentType;
    });

    applyClasses(group);
  });
}

// вызов при загрузке страницы
document.addEventListener("DOMContentLoaded", () => updateChatStyles());

// ВЫЗЫВАЙМ ФУНКЦИЮ ПРИ ДОБАВЛЕНИИ СООБЩЕНИЯ
updateChatStyles();
// END CHAT SCRIPT

// COUNTER
function initCounter(counterId, min = 1, max = 10) {
  const counter = document.getElementById(counterId);
  if (!counter) return;

  const input = counter.querySelector(".counter-input");
  const decrementBtn = counter.querySelector(".counter-btn.left");
  const incrementBtn = counter.querySelector(".counter-btn.right");

  decrementBtn.addEventListener("click", () => {
    let value = parseInt(input.value, 10);
    if (value > min) input.value = value - 1;
  });

  incrementBtn.addEventListener("click", () => {
    let value = parseInt(input.value, 10);
    if (value < max) input.value = value + 1;
  });
}

// Инициализация с разными параметрами
// initCounter("counter1", 1, 5);
// initCounter("counter2", 0, 100);

// END COUNTER
