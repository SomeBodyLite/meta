const userItemTemplate = (item) => {
  return `<tr class="list-item" data-type="user" data-title="${item.user}" data-country="${item.country}" data-country-img="${item.countryImg}" data-deposit="${item.deposit}" data-depositWidth="${item.depositWidth}">
            <td><div class="item"><object><a class="text-white" href="./user-edit.html">${item.user}</a></object></div></td>
            <td><div class="progress"><span style="width: ${item.progress}%" class="progress-bar"></span></div></td>
          </tr>`;
};