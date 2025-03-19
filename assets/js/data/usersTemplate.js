const usersItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item"><a class="text-white" href="./user-edit.html">${item.login}</a></div></td>
            <td><div class="item justify-center">${item.balance}</div></td>
            <td><div class="item"><span class="flag-icon flag-icon-${item.countryImg}"></span>${item.country}</div></td>
            <td><div class="item">${item.domen}</div></td>
            <td><div class="item justify-center">${item.date}</div></td>
            <td>
              <div class="item actions">
                <a href="./user-edit.html#${item.login}" class="action-btn" title="Редактировать"><svg class="icon hover"><use xlink:href="./assets/images/icons.svg#edit"></use></svg></a>
                <button class="action-btn delete-btn" data-id="${item.login}" title="Удалить"><svg class="icon hover"><use xlink:href="./assets/images/icons.svg#delete"></use></svg></button>
              </div>
            </td>
          </tr>`;
};
