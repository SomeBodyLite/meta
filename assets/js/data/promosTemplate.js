const usersItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item">${item.promo}</div></td>
            <td><div class="item">${item.value}</div></td>
            <td><div class="item">${item.deposits}</div></td>
            <td><div class="item">${item.activations}</div></td>
            <td>
              <div class="item actions">
                <button class="action-btn stats-btn" data-id="${item.promo}" title="Статистика">
                  <svg class="icon hover"><use xlink:href="./assets/images/icons.svg#chart"></use></svg>
                </button>
                <button class="action-btn edit-btn" data-modal="edit-promo" data-promo="${item.promo}" data-value="${item.value}" data-playthrough="${item.playthrough}" title="Редактировать">
                  <svg class="icon hover"><use xlink:href="./assets/images/icons.svg#edit"></use></svg>
                </button>
                <button class="action-btn delete-btn" data-id="${item.promo}" title="Удалить">
                  <svg class="icon hover"><use xlink:href="./assets/images/icons.svg#delete"></use></svg>
                </button>
              </div>
            </td>
          </tr>`;
};
