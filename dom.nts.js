/**@param {string} id
 * @return HTMLElement*/
const getElementById = function(id) {
  if (!id) return null;
  if (id.startsWith('#') && id.length > 1) {
    id = id.slice(1);
  }
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`NTS: Element with ID ${id} not found!`);
  }
  return element;
};

/**@param {HTMLElement} parentElement
 * @param {HTMLElement} childElement
 * @return boolean*/
const appendChildTo = function(parentElement, childElement) {
  if (parentElement) {
    parentElement.appendChild(childElement);
    return true;
  } else {
    console.warn(`NTS: Parent element is ${parentElement}`);
  };
};

/**@param {string} id
 * @param {HTMLElement} childElement
 * @return boolean*/
const appendChildToById = function(id, childElement) {
  return appendChildTo(getElementById(id), childElement);
};

/**
 * @param {string[]} optionDataList
 * @param {string} id
 * @param {function(string):void} onSelect
 * @return {HTMLSelectElement}
 * */
const createSelectElement = function(optionDataList, id, onSelect) {
  const selectElement = document.createElement('select');
  if (id) {
    selectElement.id = id;
  }
  let stringBuilder = '';
  for (let i=0; i<optionDataList.length; i++) {
    stringBuilder += `<option value="${i}">${optionDataList[i]}</option>`;
  }
  selectElement.innerHTML = stringBuilder;
  if (onSelect) {
    selectElement.onchange = function() {
      onSelect(selectElement.value);
    };
  }
  return selectElement;
};

/**
 * @param {HTMLSelectElement} selectElement
 * @param {string[]} optionDataList
 * @return {void}
 * */
const updateSelectElement = function(selectElement, optionDataList) {
  let stringBuilder = '';
  for (let i=0; i<optionDataList.length; i++) {
    stringBuilder += `<option value="${i}">${optionDataList[i]}</option>`;
  }
  selectElement.innerHTML = stringBuilder;
};

function _ngFor(list, mapperFun) {
  let sb = '';
  if (list) {
    for (const item of list) {
      sb += mapperFun(item);
    }
  }
  return sb;
}

/**@param {string[]} headerNameList
 * @param {any[][]} dataMatrix
 * @param {string|null} [id]
 * @param {{
 *  tableClassName:string,
 *  tableHeaderClassName:string,
 *  tableHeaderCellClassName:string,
 *  tableBodyRowClassName:string,
 *  tableBodyCellClassName:string,
 * }} [option]
 * @return HTMLTableElement*/
const createTableElement = function(headerNameList, dataMatrix, id, option) {
  const tableElement = document.createElement('table');
  tableElement.innerHTML = `
    ${_createTableHeaderStr(headerNameList, option)}
    ${_createTableBodyStr(dataMatrix, option)}
  `;
  if (id) {
    tableElement.id = id;
  }
  if (option&&option.tableClassName) {
    tableElement.className = option.tableClassName;
  }
  return tableElement;
};
const _createTableHeaderStr = function(headerNameList, option) {
  return `<thead>
    <tr class="${option&&option['tableHeaderClassName']||''}">
      ${_ngFor(headerNameList,headerName=>
      `<th class="${option&&option['tableHeaderCellClassName']||''}">${headerName}</th>`)}
    </tr>
  </thead>`;
};
const _createTableBodyStr = function(dataMatrix, option) {
  return `<tbody>
    ${_ngFor(dataMatrix,rowData=>
    `<tr class="${option&&option['tableBodyRowClassName']||''}">
      ${_ngFor(rowData,cellData=>
      `<td class="${option&&option['tableBodyCellClassName']||''}">
        ${cellData}
      </td>`)}
    </tr>`)}
  </tbody>`;
};
/**@param {HTMLTableElement} tableElement
 * @param {any[][]} dataMatrix
 * @return HTMLTableElement*/
const updateTableElement = function(tableElement, dataMatrix) {
  tableElement.innerHTML = `
    ${_createTableHeaderStr(headerNameList, option)}
    ${_createTableBodyStr(dataMatrix, option)}
  `;
  return tableElement;
};

// Export.
module && (module.exports = {
  getElementById,
  appendChildTo,
  appendChildToById,
  createSelectElement,
  updateSelectElement,
  createTableElement,
});
