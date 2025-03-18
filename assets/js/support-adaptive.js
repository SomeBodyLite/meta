document.addEventListener('DOMContentLoaded', function() {
  // Находим контейнер с чатами
  const chatsContainer = document.querySelector('.chats-container');
  console.log('chatsContainer: ', chatsContainer);

  // Находим элемент, которому нужно добавить класс active
  const supportMain = document.querySelector('.support-main');

  // Добавляем обработчик события клика на контейнер с чатами
  chatsContainer.addEventListener('click', function(event) {
      // Проверяем, был ли клик на элементе с классом chat-item
      if (event.target.classList.contains('chat-item')) {
          // Добавляем класс active к элементу support-main
          supportMain.classList.add('active');
      }
  });
  
  // Находим кнопку, которая отвечает за скрытие чата
  const actionChats = document.querySelector('.action-chats');
  
  // Добавляем обработчик события клика на кнопку action-chats
  actionChats.addEventListener('click', function(event) {
      // Убираем класс active у элемента support-main
      supportMain.classList.remove('active');
  });

  
  // Находим кнопку, которая отвечает за скрытие пресетов
  const actionPresets = document.querySelector('.action-presets');
  
  // Добавляем обработчик события клика на кнопку action-presets
  actionPresets.addEventListener('click', function(event) {
      // Добавляем класс active к элементу params-block
      document.querySelector('.presets-block').classList.add('active');
  });
  
  // Находим кнопку, которая отвечает за скрытие пресетов
  const actionClosePresets = document.querySelector('.action-close-presets');
  
  // Добавляем обработчик события клика на кнопку action-close-presets
  actionClosePresets.addEventListener('click', function(event) {
      // Убираем класс active у элемента presets-block
      document.querySelector('.presets-block').classList.remove('active');
  });
  
});