const promoItemTemplate = (item) => {
  return `<tr class="list-item" data-type="promo" data-title="${item.promo}" data-activations="${item.activations}" data-activationsWidth="${item.activationsWidth}" data-depositsWidth="${item.depositsWidth}" data-deposits="${item.deposits}">
            <td><div class="item">${item.promo}</div></td>
            <td><div class="progress"><span style="width: ${item.progress}%" class="progress-bar"></span></div></td>
          </tr>`;
};