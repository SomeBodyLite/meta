document.addEventListener('DOMContentLoaded', function() {
  const chatsContainer = document.querySelector('.chats-container');
  const supportMain = document.querySelector('.support-main');
  const presetsBlock = document.querySelector('.presets-block');

  const toggleActiveClass = (element, className, action) => {
      element.classList[action](className);
  };

  chatsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('chat-item')) {
          toggleActiveClass(supportMain, 'active', 'add');
      }
  });

  const actionHandlers = {
      '.action-chats': () => {
        toggleActiveClass(supportMain, 'active', 'remove');
        toggleActiveClass(presetsBlock, 'active', 'remove');
      },
      '.action-presets': () => toggleActiveClass(presetsBlock, 'active', 'add'),
      '.action-close-presets': () => toggleActiveClass(presetsBlock, 'active', 'remove'),
  };

  Object.entries(actionHandlers).forEach(([selector, handler]) => {
      const element = document.querySelector(selector);
      if (element) {
          element.addEventListener('click', handler);
      }
  });
});