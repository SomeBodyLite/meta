const usersItemTemplate = (item) => {
  const shortHash = item.hash.length > 11 ? item.hash.substring(0, 11) + "..." : item.hash;

  return `<tr class="list-item">
            <td><div class="item">${item.login}</div></td>
            <td><div class="item"><img src="${item.coinImg}" alt="">${item.coin}</div></td>
            <td><div class="item">${item.value}</div></td>
            <td><div class="item">${item.domen}</div></td>
            <td><div class="item">${shortHash}</div></td>
            <td><div class="item">${item.date}</div></td>
            <td>
              <div class="item actions">
                <button class="action-btn copy-btn" data-hash="${item.hash}" title="Копировать">
                  <svg class="icon hover stroke-hover"><use xlink:href="./assets/images/icons.svg#copy"></use></svg>
                </button>
                <a href="${item.source}" class="action-btn" data-id="${item.login}" title="Открыть">
                  <img src="${item.sourceImg}" alt="">
                </a>
              </div>
            </td>
          </tr>`;
};