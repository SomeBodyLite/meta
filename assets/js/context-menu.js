document.addEventListener("DOMContentLoaded", () => {
  const messageContextMenu = document.getElementById("context-menu");
  const chatContextMenu = document.getElementById("chat-context-menu");

  let selectedItem = null;
  let longPressTimer = null;

  const showContextMenu = (menu, x, y) => {
    // Временно делаем меню видимым для вычисления размеров
    menu.style.display = "block";
    menu.style.visibility = "hidden";

    // Получаем размеры экрана
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Получаем размеры меню
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;

    // Скрываем меню обратно
    menu.style.display = "none";
    menu.style.visibility = "visible";

    // Проверяем, выходит ли меню за правую границу экрана
    if (x + menuWidth > screenWidth) {
        x = screenWidth - menuWidth - 10; // Добавляем небольшой отступ от края
    }

    // Проверяем, выходит ли меню за нижнюю границу экрана
    if (y + menuHeight > screenHeight) {
        y = screenHeight - menuHeight - 10; // Добавляем небольшой отступ от края
    }

    // Проверяем, выходит ли меню за левую границу экрана
    if (x < 0) {
        x = 10; // Добавляем небольшой отступ от края
    }

    // Проверяем, выходит ли меню за верхнюю границу экрана
    if (y < 0) {
        y = 10; // Добавляем небольшой отступ от края
    }

    // Устанавливаем позицию меню и делаем его видимым
    menu.style.top = `${y}px`;
    menu.style.left = `${x}px`;
    menu.style.display = "block";
};

  const hideContextMenus = () => {
      messageContextMenu.style.display = "none";
      chatContextMenu.style.display = "none";
  };

  const handleLongPress = (event) => {
      const touch = event.touches[0];
      const messageItem = document.elementFromPoint(touch.clientX, touch.clientY).closest(".chat-item");
      const isMessage = messageItem && messageItem.closest(".chat-container");
      const isChat = messageItem && messageItem.closest(".chats-container");

      if (isMessage) {
          event.preventDefault();
          selectedItem = messageItem;
          showContextMenu(messageContextMenu, touch.clientX, touch.clientY);
      } else if (isChat) {
          event.preventDefault();
          selectedItem = messageItem;
          showContextMenu(chatContextMenu, touch.clientX, touch.clientY);
      } else {
          hideContextMenus();
      }
  };

  document.addEventListener("contextmenu", (event) => {
      const messageItem = event.target.closest(".chat-item");
      const isMessage = messageItem && messageItem.closest(".chat-container");
      const isChat = messageItem && messageItem.closest(".chats-container");

      if (isMessage) {
          event.preventDefault();
          selectedItem = messageItem;
          showContextMenu(messageContextMenu, event.pageX, event.pageY);
      } else if (isChat) {
          event.preventDefault();
          selectedItem = messageItem;
          showContextMenu(chatContextMenu, event.pageX, event.pageY);
      } else {
          hideContextMenus();
      }
  });

  document.addEventListener("touchstart", (event) => {
      const messageItem = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY).closest(".chat-item");
      if (messageItem) {
          longPressTimer = setTimeout(() => {
              handleLongPress(event);
          }, 500);
      }
  });

  document.addEventListener("touchend", () => {
      clearTimeout(longPressTimer);
  });

  messageContextMenu.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON" && selectedItem) {
          const action = event.target.dataset.action;
          const messageId = selectedItem.dataset.id;
          let messageText = "";
          selectedItem.childNodes.forEach((node) => {
              if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
                  messageText += node.textContent;
              }
          });
          messageText = messageText.trim();

          if (action === "copy") {
              copyToClipboard(messageText);
          } else if (action === "edit") {
              console.info(`Редактирование элемента с ID ${messageId}`);
          } else if (action === "delete") {
              deleteMessage(messageId);
          }
          hideContextMenus();
      }
  });

  chatContextMenu.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON" && selectedItem) {
          const action = event.target.dataset.action;
          if (action === "pin") {
              console.info(`Закрепление чата с ID ${selectedItem.dataset.id || "не указан"}`);
          }
          hideContextMenus();
      }
  });

  document.addEventListener("click", (event) => {
      if (!messageContextMenu.contains(event.target) && !chatContextMenu.contains(event.target)) {
          hideContextMenus();
      }
  });

  document.addEventListener("touchstart", (event) => {
      if (!messageContextMenu.contains(event.target) && !chatContextMenu.contains(event.target)) {
          hideContextMenus();
      }
  });

  const copyToClipboard = (text) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999); 

    try {
        const successful = document.execCommand("copy");
        if (successful) {
            showNotification("Скопировано", "", "success", 800);
        } else {
            console.error("Не удалось скопировать текст");
        }
    } catch (err) {
      showNotification("Ошибка", err, "error");
    }

    document.body.removeChild(tempInput);
};

  const deleteMessage = (id) => {
      console.info(`Удаление элемента с ID ${id}`);
  };
});