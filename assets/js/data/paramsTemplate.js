const usersItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item">${item.variable}</div></td>
            <td><div class="item">${item.value}</div></td>
          </tr>`;
};