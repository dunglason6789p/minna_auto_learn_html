/**
 * @param {string} id
 * @param {string[]} optionDataList
 * @param {function(string):void} onchange
 * @return {HTMLSelectElement}
 * */
const createSelectElement = function(id, optionDataList, onchange) {
  const selectElement = document.createElement('select');
  selectElement.id = id;
  let stringBuilder = '';
  for (let i=0; i<optionDataList.length; i++) {
    stringBuilder += `<option value="${i}">${optionDataList[i]}</option>`
  }
  selectElement.innerHTML = stringBuilder;
  if (onchange) {
    selectElement.onchange = function() {
      onchange(selectElement.value);
    }
  }
  return selectElement;
}

/**
 * @param {HTMLSelectElement} selectElement
 * @param {string[]} optionDataList
 * @return {void}
 * */
const updateSelectElement = function(selectElement, optionDataList) {
  let stringBuilder = '';
  for (let i=0; i<optionDataList.length; i++) {
    stringBuilder += `<option value="${i}">${optionDataList[i]}</option>`
  }
  selectElement.innerHTML = stringBuilder;
}

// Export.
module && (module.exports = {createSelectElement});