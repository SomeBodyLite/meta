const usersItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item">${item.promo}</div></td>
            <td><div class="item justify-center">${item.value}</div></td>
            <td><div class="item justify-center">${item.deposits}</div></td>
            <td><div class="item justify-center">${item.activations}</div></td>
            <td>
              <div class="item actions">
                <button class="action-btn stats-btn" data-modal="stats-promo" data-promo="${item.promo}" data-activations="${item.activations}" data-deposits="${item.deposits}" data-conversion="${item.conversion}" data-registrations='${JSON.stringify(item.registrations)}' title="Статистика">
                  <svg class="icon hover"><use xlink:href="./assets/images/icons.svg#chart"></use></svg>
                </button>
                <button class="action-btn edit-btn" data-modal="edit-promo" data-promo="${item.promo}" data-value="${item.value}" data-playthrough="${item.playthrough}" title="Редактировать">
                  <svg class="icon hover"><use xlink:href="./assets/images/icons.svg#edit"></use></svg>
                </button>
                <button class="action-btn delete-btn" data-modal="delete-modal" data-value="${item.promo}" title="Удалить">
                  <svg class="icon hover"><use xlink:href="./assets/images/icons.svg#delete"></use></svg>
                </button>
              </div>
            </td>
          </tr>`;
};