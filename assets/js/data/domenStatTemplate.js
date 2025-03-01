const domainItemTemplate = (item) => {
  return `<tr class="list-item" data-type="domain" data-title="${item.domen}" data-registrations="${item.registrations}" data-registrationsWidth="${item.registrationsWidth}" data-depositsWidth="${item.depositsWidth}" data-deposits="${item.deposits}">
            <td><div class="item">${item.domen}</div></td>
            <td><div class="progress"><span style="width: ${item.progress}%" class="progress-bar"></span></div></td>
          </tr>`;
};