const withdrawItemTemplate = (item) => {
  const shortHash = item.hash.length > 11 ? item.hash.substring(0, 11) + "..." : item.hash;

  return `<tr class="list-item">
            <td><div class="item"><img src="${item.coinImg}" alt="">${item.coin}<span class="network">${item.network}</span></div></td>
            <td><div class="item">${item.value}</div></td>
            <td><div class="item">${shortHash}</div></td>
            <td><div class="item ${item.statusClass}">${item.status}</div></td>
            <td><div class="item">${item.date}</div></td>
            <td>
              <div class="item actions">
                <button class="action-btn edit-btn" data-modal="edit-withdraw" data-id="${item.id}" data-coin="${item.coin}" data-status="${item.status}" data-value="${item.value}" data-hash="${item.hash}" data-date="${item.date}" title="Редактировать">
                  <svg class="icon hover"><use xlink:href="./assets/images/icons.svg#edit"></use></svg>
                </button>
                <button class="action-btn copy-btn" data-value="${item.hash}" title="Копировать">
                  <svg class="icon hover stroke-hover"><use xlink:href="./assets/images/icons.svg#copy"></use></svg>
                </button>
                <button class="action-btn delete-btn" data-value="${item.id}" data-modal="delete-withdraw" title="Удалить">
                  <svg class="icon hover"><use xlink:href="./assets/images/icons.svg#delete"></use></svg>
                </button>
              </div>
            </td>
          </tr>`;
};