const buttons = document.querySelectorAll('.btn[data-tooltip]');

buttons.forEach(button => {
  const tooltipId = button.getAttribute('data-tooltip'); 
  const tooltip = document.getElementById(tooltipId); 

  let timeoutId;
  let timer = 0;

  button.addEventListener('mousemove', (event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
      tooltip.style.left = `${event.clientX + 10}px`; 
      tooltip.style.top = `${event.clientY + 10}px`;
    }, timer); 
  });

  button.addEventListener('mouseleave', () => {
    clearTimeout(timeoutId); 
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
  });
});