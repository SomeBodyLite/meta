const depItemTemplate = (item) => {
  const shortHash = item.hash.length > 11 ? item.hash.substring(0, 11) + "..." : item.hash;

  return `<tr class="list-item">
            <td><div class="item"><img src="${item.coinImg}" alt="">${item.coin}<span class="network">${item.network}</span></div></td>
            <td><div class="item justify-center">${item.value}</div></td>
            <td><div class="item">${shortHash}</div></td>
            <td><div class="item justify-center">${item.date}</div></td>
            <td>
              <div class="item actions">
                <button class="action-btn copy-btn" data-value="${item.hash}" title="Копировать">
                  <svg class="icon hover stroke-hover"><use xlink:href="./assets/images/icons.svg#copy"></use></svg>
                </button>
                <a href="${item.source}" class="action-btn" data-id="${item.login}" title="Открыть">
                  <img src="${item.sourceImg}" alt="">
                </a>
              </div>
            </td>
          </tr>`;
};