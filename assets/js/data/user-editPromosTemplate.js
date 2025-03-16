const promoItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item">${item.promo}</div></td>
            <td><div class="item">${item.value}</div></td>
            <td><div class="item">${item.wagering}</div></td>
            <td><div class="item">${item.activationDate}</div></td>
          </tr>`;
};