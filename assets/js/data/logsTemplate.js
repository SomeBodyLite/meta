const usersItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item"><a class="text-white" href="./user-edit.html">${item.login}</a></div></td>
            <td><div class="item">${item.action}</div></td>
            <td><div class="item">${item.ip}</div></td>
            <td><div class="item">${item.time}</div></td>
          </tr>`;
};
