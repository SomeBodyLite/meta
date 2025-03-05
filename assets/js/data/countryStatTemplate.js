const countryItemTemplate = (item) => {
  return `<tr class="list-item" data-type="country" data-title="${item.country}" data-country-img="${item.countryImg}" data-registrations="${item.registrations}" data-registrationsWidth="${item.registrationsWidth}" data-deposits="${item.deposits}" data-depositsWidth="${item.depositsWidth}" data-conversion="${item.conversion}" data-conversionWidth="${item.conversionWidth}">
            <td><div class="item"><span class="flag-icon flag-icon-${item.countryImg}"></span>${item.country}</div></td>
            <td><div class="progress"><span style="width: ${item.progress}%" class="progress-bar"></span></div></td>
          </tr>`;
};