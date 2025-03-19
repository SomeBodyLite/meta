const buttons = document.querySelectorAll('.btn[data-tooltip]');

buttons.forEach(button => {
  const tooltipId = button.getAttribute('data-tooltip'); 
  const tooltip = document.getElementById(tooltipId); 

  let timeoutId;
  let timer = 0;

  const isMobile = () => window.innerWidth <= 768; 

  const showTooltip = (event) => {
    let x = event.clientX || event.touches[0].clientX;
    let y = event.clientY || event.touches[0].clientY;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    
    if (isMobile()) {
      x = x - tooltipWidth - 10; 
    } else {
      x = x + 10; 
    }

    
    if (x < 10) {
      x = 10; 
    } else if (x + tooltipWidth > screenWidth) {
      x = screenWidth - tooltipWidth - 10; 
    }

    if (y + tooltipHeight + 10 > screenHeight) {
      y = screenHeight - tooltipHeight - 10; 
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y + 10}px`;

    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
  };

  button.addEventListener('mousemove', (event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      showTooltip(event);
    }, timer); 
  });

  button.addEventListener('mouseleave', () => {
    clearTimeout(timeoutId); 
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
  });

  button.addEventListener('touchstart', (event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      showTooltip(event);
    }, timer);
  });

  button.addEventListener('touchend', () => {
    clearTimeout(timeoutId); 
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
  });
});