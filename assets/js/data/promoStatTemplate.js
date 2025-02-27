var usersItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item">${item.promo}</div></td>
            <td><div class="progress"><span style="width: ${item.progress}%" class="progress-bar"></span></div></td>
          </tr>`;
};