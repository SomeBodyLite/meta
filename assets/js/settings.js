document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".settings-tab");
  const containers = document.querySelectorAll(".settings-container");

  function activateTab(tabName) {
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === tabName);
    });

    containers.forEach(container => {
      container.classList.toggle("active", container.dataset.tab === tabName);
    });

    history.replaceState(null, null, `#${tabName}`);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tab);
    });
  });

  function checkHash() {
    const hash = window.location.hash.substring(1);
    const validTabs = [...tabs].map(tab => tab.dataset.tab);
    const tabToActivate = validTabs.includes(hash) ? hash : "general";
    activateTab(tabToActivate);
  }

  window.addEventListener("hashchange", checkHash);
  checkHash();
});