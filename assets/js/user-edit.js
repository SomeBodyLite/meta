document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.transactions-btn');
  const contents = document.querySelectorAll('.transactions-content');

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const targetContent = this.getAttribute('data-content');

          contents.forEach(content => {
              content.style.display = 'none';
          });

          const activeContent = document.querySelector(`.transactions-content[data-content="${targetContent}"]`);
          if (activeContent) {
              activeContent.style.display = 'block';
          }

          buttons.forEach(btn => {
              btn.classList.remove('active');
          });
          this.classList.add('active');
      });
  });

  if (contents.length > 0) {
      contents[0].style.display = 'block';
      buttons[0].classList.add('active');
  }
});