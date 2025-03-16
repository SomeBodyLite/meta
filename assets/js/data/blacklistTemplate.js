const blacklistItemTemplate = (item) => {

  return `<tr class="list-item">
            <td><div class="item"><a class="text-white" href="./user-edit.html">${item.login}</a></div></td>
            <td><div class="item">${item.date}</div></td>
            <td>
              <div class="item actions">
                <button class="action-btn copy-btn" data-value="${item.login}" title="Копировать">
                  <svg class="icon hover stroke-hover"><use xlink:href="./assets/images/icons.svg#copy"></use></svg>
                </button>
                <button class="action-btn delete-btn" data-value="${item.login}" title="Удалить">
                  <svg class="icon hover stroke-hover"><use xlink:href="./assets/images/icons.svg#delete"></use></svg>
                </button>
              </div>
            </td>
          </tr>`;
};