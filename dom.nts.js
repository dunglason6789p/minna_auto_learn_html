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

/**@param {function(void):string} classNameSuppliers*/
function _ngClass(...classNameSuppliers) {
  let sb = '';
  for (const classNameSupplier of classNameSuppliers) {
    let classNameResult = null;
    try {
      classNameResult = classNameSupplier();
    } catch (e) {/*ignore*/}
    if (classNameResult) {
      if (sb) {sb += ' '}
      sb += classNameResult;
    }
  }
  return `class=${sb}`;
}

/**@typedef TableElementOption
 * @type {object}
 * @property {string} [tableId]
 * @property {string} [tableClassName]
 * @property {string} [tableHeaderClassName]
 * @property {string} [tableHeaderCellClassName]
 * @property {string} [tableBodyRowClassName]
 * @property {string} [tableBodyCellClassName]
 * */

/**@param {string[]} headerNameList
 * @param {any[][]} dataMatrix
 * @param {TableElementOption} [option]
 * @return HTMLTableElement*/
const createTableElement = function(headerNameList, dataMatrix, option) {
  const tableElement = document.createElement('table');
  tableElement.innerHTML = `
    ${_createTableHeaderStr(headerNameList, option)}
    ${_createTableBodyStr(dataMatrix, option)}
  `;
  if (option&&option.tableId) {
    tableElement.id = option.tableId;
  }
  if (option&&option.tableClassName) {
    tableElement.className = option.tableClassName;
  }
  return tableElement;
};
/**@param {string[]} headerNameList
 * @param {TableElementOption} option
 * */
const _createTableHeaderStr = function(headerNameList, option) {
  return `<thead>
    <tr class="${option&&option['tableHeaderClassName']||''}">
      ${_ngFor(headerNameList,headerName=>
      `<th class="${option&&option['tableHeaderCellClassName']||''}">${headerName}</th>`)}
    </tr>
  </thead>`;
};
/**@param {any[][]} dataMatrix
 * @param {TableElementOption} option
 * */
const _createTableBodyStr = function(dataMatrix, option) {
  return `<tbody>
    ${_ngFor(dataMatrix,rowData=>
    `<tr ${_ngClass(()=>option.tableBodyRowClassName)}>
      ${_ngFor(rowData,cellData=>
      `<td ${_ngClass(()=>option.tableBodyCellClassName)}>
        ${cellData}
      </td>`)}
    </tr>`)}
  </tbody>`;
};
/**@param {HTMLTableElement} tableElement
 * @param {any[][]} dataMatrix
 * @return HTMLTableElement*/
const updateTableElement = function(tableElement, dataMatrix) {
  const tbody = tableElement.querySelector('tbody');
  if (tbody) {
    tbody.outerHTML = _createTableBodyStr(dataMatrix);
  }
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
