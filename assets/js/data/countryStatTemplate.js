var usersItemTemplate = (item) => {
  return `<tr class="list-item">
            <td><div class="item"><img src="${item.countryImg}" alt="">${item.country}</div></td>
            <td><div class="progress"><span style="width: ${item.progress}%" class="progress-bar"></span></div></td>
          </tr>`;
};