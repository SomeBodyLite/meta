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
      let burger = document.querySelector(".burger");
      let mobileNav = document.querySelector(".mobile-nav");
      burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        mobileNav.classList.toggle("active");
        document.body.classList.toggle("ov-h");
      });

      const currentUrl = window.location.pathname;
      const sidebarItems = mobileNav.querySelectorAll(".sidebar-item");

      sidebarItems.forEach((item) => {
        const itemHref = new URL(
          item.getAttribute("href"),
          window.location.origin
        ).pathname;

        if (currentUrl === itemHref) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });
}

const sidebar = document.getElementById("sidebar");
if (sidebar) {
  fetch("./components/sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      sidebar.innerHTML = data;

      const currentUrl = window.location.pathname;

      const sidebarItems = sidebar.querySelectorAll(".sidebar-item");

      sidebarItems.forEach((item) => {
        const itemHref = new URL(
          item.getAttribute("href"),
          window.location.origin
        ).pathname;

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

    if (button) {
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
    }
  });
});

// MODALS
document.addEventListener("DOMContentLoaded", function () {
  var modalButtons = document.querySelectorAll(
      ".js-open-modal, .edit-btn, .stats-btn, .delete-btn, .edit-preset, .delete-preset"
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
        document.getElementById("promo-playthrough").checked =
          promoPlaythrough === "true";
      }

      if (this.classList.contains("delete-btn")) {
        const dataValue = this.getAttribute("data-value");
        document.getElementById("data-delete-value").textContent = dataValue;
      }
      if (this.classList.contains("edit-preset")) {
        const dataName = this.getAttribute("data-name");
        document.getElementById("preset-name").value = dataName;
        const dataValue = this.getAttribute("data-value");
        document.getElementById("preset-text").textContent = dataValue;
      }
      if (this.classList.contains("delete-preset")) {
        const dataName = this.getAttribute("data-name");
        document.getElementById("preset-name-2").textContent = dataName;
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
function showNotification(title, message, type = "success", timeout = 5000) {
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
      item.innerHTML = option.label; // Используем innerHTML вместо textContent
      item.setAttribute("data-value", option.value);
      item.setAttribute("data-placeholder", option.placeholderText || "");
      this.selectItems.appendChild(item);

      item.addEventListener("click", () => {
        this.setSelected(item.innerHTML, item.getAttribute("data-value")); // Используем innerHTML
        this.updateInput(
          item.textContent, // Здесь оставляем textContent, если нужно передавать только текст
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
    this.selectSelected.innerHTML = label;
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
const Designs = [
  { label: "Общая", value: "all" },
  { label: "meta.ru", value: "domainRu" },
  { label: "meta.pro", value: "domainPro" },
  { label: "meta.com", value: "domainCom" },
];
const Values = [
  { label: "%", value: "percent" },
  { label: "USD", value: "usd" },
];
const selectVerifStatus = [
  {
    label: "<span class='verify-item state-1'>Ожидание депозита</span>",
    value: "1",
  },
  { label: "<span class='verify-item state-2'>Ожидание</span>", value: "2" },
  {
    label: "<span class='verify-item state-3'>Не верифицирован</span>",
    value: "3",
  },
  {
    label: "<span class='verify-item state-4'>Верифицирован</span>",
    value: "4",
  },
];
const selectTokens = [
  {
    label: "<img src='./assets/images/coins/binance.svg'>Binance",
    value: "binance",
  },
  {
    label: "<img src='./assets/images/coins/bitcoin.svg'>Bitcoin",
    value: "bitcoin",
  },
  { label: "<img src='./assets/images/coins/ton.svg'>TON", value: "ton" },
  { label: "<img src='./assets/images/coins/tron.svg'>Tron", value: "tron" },
  {
    label: "<img src='./assets/images/coins/ethereum.svg'>Ethereum",
    value: "eth",
  },
  {
    label: "<img src='./assets/images/coins/ripple.svg'>Ripple",
    value: "ripple",
  },
  {
    label: "<img src='./assets/images/coins/solana.svg'>Solana",
    value: "solana",
  },
  {
    label: "<img src='./assets/images/coins/paypal.svg'>Paypal",
    value: "paypal",
  },
  { label: "<img src='./assets/images/coins/swift.svg'>Swift", value: "swift" },
  {
    label: "<img src='./assets/images/coins/bank-card.svg'>Bank card",
    value: "bank-card",
  },
];
const selectStatus = [
  { label: "<span class='status failed'>Неуспех</span>", value: "binance" },
  { label: "<span class='status success'>Успех</span>", value: "binance" },
  { label: "<span class='status pending'>Ожидание</span>", value: "binance" },
];

updateSelect("selectMain", Main);
updateSelect("selectUsers", Users);
updateSelect("selectDepositsStats", DepositsStats);
updateSelect("selectDeposits", Deposits);
updateSelect("selectStatistics", Statistics);
updateSelect("selectDomainDesign", Designs);
updateSelect("selectValue", Values);
updateSelect("selectValue2", Values);
updateSelect("selectVerifStatus", selectVerifStatus);
updateSelect("selectTokens", selectTokens);
updateSelect("selectStatus", selectStatus);

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
        window.initAutoResizeTextareas();
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
function initCounter(counterId, min, max) {
  const counter = document.getElementById(counterId);
  if (!counter) return;

  const input = counter.querySelector(".counter-input");
  const decrementBtn = counter.querySelector(".counter-btn.left");
  const incrementBtn = counter.querySelector(".counter-btn.right");

  decrementBtn.addEventListener("click", () => {
    console.log('decrementBtn');
    let value = parseInt(input.value, 10);
    if (value > min) input.value = value - 1;
  });

  incrementBtn.addEventListener("click", () => {
    console.log('incrementBtn');
    let value = parseInt(input.value, 10);
    if (value < max) input.value = value + 1;
  });
}

// Инициализация с разными параметрами
initCounter("counter1", 1, 5);
initCounter("counter2", 0, 100);

// END COUNTER

// multiselect
let countries = [];
const selectedCountries = new Set();
const input = document.getElementById("country-input");
const dropdown = document.getElementById("dropdown");
const selectedContainer = document.getElementById("selected-container");

// Проверяем, существует ли элемент input на странице
if (input) {
  fetch("./assets/js/json/countries.json")
    .then((response) => response.json())
    .then((data) => {
      countries = data;
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    dropdown.innerHTML = "";

    if (!query) {
      dropdown.classList.remove("visible");
      return;
    }

    const filtered = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      filtered.forEach((country) => {
        const option = document.createElement("div");
        option.classList.add("dropdown-item");
        option.innerHTML = `<img src="/assets/flags/4x3/${country.code}.svg" alt="${country.name}" class="flag"> ${country.name} (${country.code})`;
        option.addEventListener("click", () => selectCountry(country));
        dropdown.appendChild(option);
      });
    } else {
      const noResults = document.createElement("div");
      noResults.classList.add("no-results");
      noResults.textContent = "Совпадений нет";
      dropdown.appendChild(noResults);
    }

    dropdown.classList.add("visible");
  });

  function selectCountry(country) {
    if (selectedCountries.has(country.code)) return;
    selectedCountries.add(country.code);
    renderSelectedCountries();
    input.value = "";
    dropdown.classList.remove("visible");
  }

  function renderSelectedCountries() {
    selectedContainer.innerHTML = "";
    selectedCountries.forEach((code) => {
      const country = countries.find((c) => c.code === code);
      const countryTag = document.createElement("div");
      countryTag.classList.add("selected-item");
      countryTag.innerHTML = `<img src="/assets/flags/4x3/${country.code}.svg" alt="${country.name}" class="flag"> ${country.code} <span class="remove">&times;</span>`;
      countryTag
        .querySelector(".remove")
        .addEventListener("click", () => removeCountry(country));
      selectedContainer.appendChild(countryTag);
    });
  }

  function removeCountry(country) {
    selectedCountries.delete(country.code);
    renderSelectedCountries();
  }
}
// END multiselect

// ADJUST HEIGHT TEXTAREA
window.initAutoResizeTextareas = function () {
  // function adjustHeight(textarea) {
  //   textarea.style.height = "auto";
  //   requestAnimationFrame(() => {
  //     textarea.style.height = textarea.scrollHeight + 8 + "px";
  //   });
  // }
  function adjustHeight(textarea) {
    textarea.style.height = "5px";
    textarea.style.height = textarea.scrollHeight + 4 + "px";
  }

  document
    .querySelectorAll("textarea.form-group__input")
    .forEach((textarea) => {
      adjustHeight(textarea);
      textarea.addEventListener("input", function () {
        adjustHeight(textarea);
      });
    });
};

// Вызов функции после загрузки DOM
document.addEventListener("DOMContentLoaded", window.initAutoResizeTextareas);
// END ADJUST HEIGHT TEXTAREA

// SORT DRAG
document.addEventListener("DOMContentLoaded", function () {
  const tasksListElement = document.querySelector(".drag__list");

  const sortable = new Sortable(tasksListElement, {
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    onEnd: function (evt) {
      updatePositions();
    },
  });

  function updatePositions() {
    const items = tasksListElement.querySelectorAll(".drag__item");
    items.forEach((item, index) => {
      item.setAttribute("data-position", index + 1);
      console.log(
        `Элемент ${item.textContent.trim()} теперь на позиции ${index + 1}`
      );
    });
  }
});
// END SORT DRAG

const presetBlocks = document.querySelectorAll(".preset-block");
presetBlocks.forEach((block) => {
  const value = block.querySelector("#item-value").textContent.trim();
  const name = block.querySelector("#item-name").textContent;
  block.querySelector(".edit-preset").setAttribute("data-value", value);
  block.querySelector(".edit-preset").setAttribute("data-name", name);
  block.querySelector(".delete-preset").setAttribute("data-name", name);
});

