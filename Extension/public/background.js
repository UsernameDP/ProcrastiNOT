let enabled = false;
let manualInputs = [];
let generalInputs = [];

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(
    ["enabled", "manualInputs", "generalInputs"],
    function (result) {
      enabled = result.enabled !== undefined ? result.enabled : false;
      manualInputs =
        result.manualInputs !== undefined ? result.manualInputs : [];
      generalInputs =
        result.generalInputs !== undefined ? result.generalInputs : [];
    }
  );
});
