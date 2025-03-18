document.addEventListener("DOMContentLoaded", () => {
    const messageContextMenu = document.getElementById("context-menu");
    const chatContextMenu = document.getElementById("chat-context-menu");
  
    let selectedItem = null;
    let longPressTimer = null;
  
    const showContextMenu = (menu, x, y) => {
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
      navigator.clipboard.writeText(text).then(() => {
        console.info("Текст скопирован в буфер обмена:", text);
      });
    };
  
    const deleteMessage = (id) => {
      console.info(`Удаление элемента с ID ${id}`);
    };
  });