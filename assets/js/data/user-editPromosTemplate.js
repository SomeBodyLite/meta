const promoItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item">${item.promo}</div></td>
            <td><div class="item justify-center">${item.value}</div></td>
            <td><div class="item justify-center">${item.wagering}</div></td>
            <td><div class="item justify-center">${item.activationDate}</div></td>
          </tr>`;
};