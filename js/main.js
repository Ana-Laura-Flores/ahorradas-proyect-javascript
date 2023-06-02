// Getting elements from DOM
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Visibility elments
const showElement = (selector) => $(selector).classList.remove("hidden");
const hideElement = (selector) => $(selector).classList.add("hidden");
const cleanContainer = (selector) => ($(selector).innerHTML = "");
// Random id generator
const randomId = () => self.crypto.randomUUID();

// local storage
const getData = (key) => JSON.parse(localStorage.getItem(key));
const setData = (key, array) => localStorage.setItem(key, JSON.stringify(array));

// categories default
const categoriesDefault = [
  {
    id: randomId(),
    categoryName: "Comida",
  },
  {
    id: randomId(),
    categoryName: "Servicios",
  },
  {
    id: randomId(),
    categoryName: "Salidas",
  },
  {
    id: randomId(),
    categoryName: "Educación",
  },
  {
    id: randomId(),
    categoryName: "Transporte",
  },
  {
    id: randomId(),
    categoryName: "Trabajo",
  },
];

const allOperations = getData("operations") || [];
const allCategories = getData("categories") || categoriesDefault;

//auxiliar functions
const confirmAddOperation = () => {
    $("#confirm-add-operation").innerHTML = "tu operacion fue guardada con exito";
};
// per function delete categoriy
  const newData = getData("operations")
  const findOperation = (categorySelected) => newData.filter((operationId) => categorySelected !== operationId.category)
 
// constructor date
const constructorDate = () => {
    actualDay = new Date();
    //Año
    year = actualDay.getFullYear();
    //Mes
    month = actualDay.getMonth() + 1;
    //Día
    day = actualDay.getDate();
  
    $("#date").setAttribute("value", year + `-` + `0` + month + `-` + `0` + day);
    $("#date").setAttribute("max", year + `-` + `0` + month + `-` + `0` + day);
    $("#filter-date").setAttribute(
      "value",
      year + `-` + `0` + month + `-` + `0` + day
    );
    $("#filter-date").setAttribute(
      "max",
      year + `-` + `0` + month + `-` + `0` + day
    );
  };
  // auxiliar varibles date
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const objMes = {
    0: "enero",
    1: "febrero",
    2: "marzo",
    3: "abril",
    4: "mayo",
    5: "junio",
    6: "julio",
    7: "agosto",
    8: "septiembre",
    9: "octubre",
    10: "noviembre",
    11: "diciembre",
  };
//operations function
// operations save/ add / edit
const saveOperation = (operationId) => {
  const categoriesId =
    $("#categories-name").options[
      $("#categories-name").selectedIndex
    ].getAttribute("data-id");
  return {
    id: operationId ? operationId : randomId(),
    description: $("#description-data").value,
    amount: $("#amount-data").value,
    type: $("#type-operation").value,
    category: categoriesId,
    date: $("#date").value,
  };
}; 
const saveCategories = () => {
  return {
    id: randomId(),
    categoryName: $("#category-name").value,
  };
};
const addData = (data) => {
  const currentData = getData(data);
  const newData = saveOperation();
  currentData.push(newData);
  setData(data, currentData);
};
const addDataCategories = () => {
  const currentData = getData("categories");
  const newData = saveCategories();
  currentData.push(newData);
  setData("categories", currentData);
};
const renderOperation = (operations) => {
  cleanContainer("#table-operation");
  if (operations.length >= 1) {
    for (const { id, description, category, date, type,  amount } of operations) {
      const categoryColor = type === "ganancias" ? "text-green-600" : "text-red-600";
      const categorySign = type === "ganancias" ? "+" : "-";
      const categorySelected = getData("categories").find((categor) => categor.id === category);
      hideElement("#none-operation");
      $("#table-operation").innerHTML += `
            <tr class="w-full md:flex md:justify-between  md:border md:border-slate-300 md:p-3 md:align-left ">
            <td class="px-2 md:w-1/4 ">${description}</td>
                                    <td class="px-2 flex justify-end md:w-1/5 md:justify-start "><span class="rounded-md bg-[#EEAECD] text-xs font-bold text-center text-[#D22779] px-2 p-1">${categorySelected.categoryName}</span></td>
                                    <td class="px-2 text-right text-sm md:flex md: justify-end hidden md:w-1/5">${date}</td>
                                    <td id= "price" class="px-2  hidden md:flex md:w-1/5 justify-end  text-right ${categoryColor} font-bold ">$ ${categorySign} ${amount} </td> 
                                    <td class="flex px-2 hidden md:flex md:w-1/6 justify-end">
                                        <button onclick="showElement('#modal-new-operation'), editFormOperation('${id}')"><i class="fa-solid flex fa-pencil text-sm text-gray-600 mx-2"></i></button>
                                        <button onclick="showElement('#modal-open'), deleteModalOperation('${id}')"><i class="fa-solid flex fa-trash text-sm text-gray-600 mx-2 "></i></button>
                                    </td>
                                    </tr>
                                    <tr class="operation-mobile">
                                    <td class="px-2 text-left text-2xl  my-5 md:hidden font-bold ${categoryColor}">$ ${categorySign} ${amount}</td>
                                    <td class="flex px-2 md:hidden  my-5 justify-end">
                                    <button onclick="showElement('#modal-new-operation'), editFormOperation('${id}')"><i class="fa-solid flex fa-pencil text-sm 	 text-gray-600 mx-2"></i></button>
                                    <button onclick="showElement('#modal-open'), deleteModalOperation('${id}')"><i class="fa-solid flex fa-trash text-sm text-gray-600 mx-2 "></i></button>
                                    </td>
                                </tr>
            `;
    }
  } else {
    hideElement("#container-table-operation");
  }
};

const deleteOperation = (id) => {
  const currentOperation = getData("operations").filter(
    (operation) => operation.id !== id);
  setData("operations", currentOperation);
};
const deleteData = (id, type) => {
  const currentData = getData(type).filter((operation) => operation.id !== id);
  setData(type, currentData);
};

const editOperation = () => {
  const operationId = $("#btn-edit-operation").getAttribute("data-id");
  const editedOperation = getData("operations").map((operation) => {
    if (operation.id === operationId) {
      return saveOperation(operation.id);
    }
    return operation;
  });
  setData("operations", editedOperation);
};
// modal confirm delete operation
const deleteModalOperation = (id) => {
    $("#btn-delete-operation").setAttribute("data-id", id);
    $("#btn-close-modal-operation").addEventListener("click", () => {
      hideElement("#modal-open");
      hideElement(".modal-content-category")
      showElement(".modal-content")
    });
    $("#btn-delete-operation").addEventListener("click", () => {
      const operationId = $("#btn-delete-operation").getAttribute("data-id");
      deleteData(operationId, "operations");
      renderOperation(getData("operations"));
      cleanContainer("#ganancia-total");
      cleanContainer("#gasto-total");
      cleanContainer("#balance-total");
      renderBalance(allOperations);
      render();
      hideElement("#modal-open");
    });
  };
  
  const deleteModalCategorie = (id) => {
    showElement("#btn-delete-category");
    hideElement("#btn-delete-operation");
    showElement(".modal-content-category")
    hideElement(".modal-content")
    $("#btn-delete-category").setAttribute("data-id", id);
    $("#btn-close-modal-operation").addEventListener("click", () => {
      
    });
    $("#btn-delete-category").addEventListener("click", () => {
      hideElement("#modal-open");
      const operationId = $("#btn-delete-category").getAttribute("data-id");
      deleteData(operationId, "categories");
      const test = (findOperation(operationId))
      setData("operations", test)
      renderCategoriesOptions(getData("categories"));
      renderCategoriesTable(getData("categories"));
      renderOperation(getData("operations"));
      renderBalance(test)
      
    });
  };
const editFormOperation = (id) => {
  hideElement("#btn-add-operation");
  showElement("#btn-edit-operation");
  $("#title-operation").innerHTML = "Editar Operación";
  const currentOperation = getData("operations").find((operation) => operation.id === id);
  $("#btn-edit-operation").setAttribute("data-id", id);
  $("#description-data").value = currentOperation.description;
  $("#amount-data").value = currentOperation.amount;
  $("#type-operation").value = currentOperation.type;
  $("#categories-name").value = currentOperation.category;
  $("#date").value = currentOperation.date;
};
const editCategory = () => {
  const categoriesId = $("#edit-category").getAttribute("data-id");
  const editedCategories = getData("categories").map((category) => {
    if (category.id === categoriesId) {
      category.categoryName = $("#category-name").value;
    }
    return category;
  });
  setData("categories", editedCategories);
};

const editFormCategories = (id) => {
  showElement("#title-edit-category");
  hideElement("#title-category");
  showElement("#container-btn-edit-category");
  hideElement(".container-btn-newcategory");
  hideElement("#categories-list");
  const editedCategories = getData("categories").find(
    (category) => category.id === id
  );
  $("#edit-category").setAttribute("data-id", id);
  $("#category-name").value = editedCategories.categoryName;
};
//balances
const total = (operationsData) => {
  let accSpent = 0;
    let accHigher = 0;
  if(operationsData === []){
    accSpent = 0;
    accHigher = 0;
  } else {
    operationsData.filter((operation) => {
      if (operation.type === "ganancias") {
        accHigher += parseInt(operation.amount);
      }
      if (operation.type === "gastos") {
        accSpent += parseInt(operation.amount);
      }
      
    });
  }
  return {
    higher: accHigher,
    spent: accSpent,
    balance: accHigher - accSpent,
  };
};

const totalBalance = (operationsData) => total(operationsData).balance;

// function higher gain
let higherAmountMonth = 0;
const reportPerMonthHigher = (operationType) => {
  const currentOperations = getData("operations");
  const incomePerMonth = {};
  if (!currentOperations) {
    showElement("#none-reports");
    hideElement("#container-reports");
  } else {
    hideElement("#none-reports");
    showElement("#container-reports");
    for (const month of months) {
      const filteredByMonth = currentOperations.filter((operation) => {
        const date = new Date(operation.date);
        return date.getMonth() === month && operation.type === operationType;
      });
      let acc = 0;
      for (const op of filteredByMonth) {
        acc += parseInt(op.amount);
      }
      incomePerMonth[month] = acc;
    }
    let higherMonth = "";
    for (const key in incomePerMonth) {
      if (incomePerMonth[key] > higherAmountMonth) {
        (higherAmountMonth = incomePerMonth[key]), (higherMonth = key);
      }
    }
    for (const mes in objMes) {
      mes === higherMonth;
      return objMes[higherMonth];
    }
  }
};

// reports higher spending

let spentAmountMonth = 0;
const reportPerMonthSpent = (operationType) => {
  const currentOperations = getData("operations");
  const incomePerMonth = {};
  if (!currentOperations) {
    showElement("#none-reports");
    hideElement("#container-reports");
  } else {
    hideElement("#none-reports");
    showElement("#container-reports");
    for (const month of months) {
      const filteredByMonth = currentOperations.filter((operation) => {
        const date = new Date(operation.date);
        return date.getMonth() === month && operation.type === operationType;
      });
      let acc = 0;
      for (const op of filteredByMonth) {
        acc += parseInt(op.amount);
      }
      incomePerMonth[month] = acc;
    }
    let higherMonth = "";
    for (const key in incomePerMonth) {
      if (incomePerMonth[key] > spentAmountMonth) {
        (spentAmountMonth = incomePerMonth[key]), (higherMonth = key);
      }
    }
    for (const mes in objMes) {
      mes === higherMonth;
      return objMes[higherMonth];
    }
  }
};

// report of categories
const reportTotalCategories = () => {
  const totalOfOperations = getData("operations");
  const nameCategory = getData("categories");
  if (!totalOfOperations) {
    showElement("#none-reports");
    hideElement("#container-reports");
  } else {
    hideElement("#none-reports");
    showElement("#container-reports");
    const categoriesTotal = [];
    for (const { categoryName, id } of nameCategory) {
      let accGanancia = 0;
      let accGasto = 0;
      for (const { category, amount, type } of totalOfOperations) {
        if (category === id) {
          if (type === "ganancias") {
            accGanancia += parseInt(amount);
          } else {
            accGasto += parseInt(amount);
          }
        }
      }
      categoriesTotal.push({
        nameCategory: categoryName,
        gastoTotal: accGasto,
        gananciaTotal: accGanancia,
      });
    }
    return categoriesTotal;
  }
};
// reports of total months
const reportTotalMonths = () => {
  const totalOfOperations = getData("operations");
  if (!totalOfOperations) {
    showElement("#none-reports");
    hideElement("#container-reports");
  } else {
    hideElement("#none-reports");
    showElement("#container-reports");
    const totalPerMonth = [];
    for (const month of months) {
      let accGanancia = 0;
      let accGasto = 0;
      let mes = "";
      for (const { amount, type, date } of totalOfOperations) {
        const monthOperation = new Date(date).getMonth();
        const yearOperation = new Date(date).getFullYear();
        const dateFormat = monthOperation + 1 + `-` + yearOperation;
        const dateMonth = new Date(date);
        if (dateMonth.getMonth() === month) {
          if (type === "ganancias") {
            accGanancia += parseInt(amount);
            mes = dateFormat;
          } else {
            accGasto += parseInt(amount);
            mes = dateFormat;
          }
        }
      }
      totalPerMonth.push({
        date: mes,
        gastoTotal: accGasto,
        gananciaTotal: accGanancia,
      });
    }
    return totalPerMonth;
  }
};
// function totals
const totalCategory = (operationType) => {
  const totalOfCategory = getData("operations");
  const nameCategory = getData("categories");
  const categoriesTotal = {};
  if (totalOfCategory.length > 0) {
    hideElement("#none-reports");
    showElement("#container-reports");
    for (const { categoryName, id } of nameCategory) {
      let acc = 0;
      totalOfCategory.map(({ category, amount, type }) => {
        if ((category === id) & (type === operationType)) {
          acc += parseInt(amount);
        }
        categoriesTotal[categoryName] = acc;
      });
    }
    let higher = " ";
    let totalAmount = 0;
    for (const key in categoriesTotal) {
      if (categoriesTotal[key] > totalAmount) {
        return {
          totalAmount: categoriesTotal[key],
          higher: key,
        };
      }
    }
  } else {
    showElement("#none-reports");
    hideElement("#container-reports");
  }
};
// function balance
const totalCategoryBalance = () => {
  const categoriesTotal = {};
  const totalOfCategory = getData("operations");
  const nameCategory = getData("categories");
  if (totalOfCategory.length > 0) {
    hideElement("#none-reports");
    showElement("#container-reports");
    for (const { categoryName, id } of nameCategory) {
      let accganancia = 0;
      let accGasto = 0;
      let balance = 0;
      totalOfCategory.filter(({ category, amount, type }) => {
        if ((category === id) & (type === "ganancias")) {
         accganancia += parseInt(amount);
        }
        if ((category === id) & (type === "gastos")) {
          accGasto += parseInt(amount);
        }
        balance = accganancia - accGasto;
        categoriesTotal[categoryName] = balance;
      });
    }
    let higher = " ";
    let totalAmount = 0;
    for (const key in categoriesTotal) {
      if (categoriesTotal[key] > totalAmount) {
        return {
          totalAmount: categoriesTotal[key],
          higher: key,
        };
      }
    } 
  } else {
    showElement("#none-reports");
    hideElement("#container-reports");
  }
};

//render reports //
const render = () => {
   if (getData("operations").length <= 0) {
    showElement("#none-reports");
    hideElement(".reports-container");
  } else {
    hideElement("#none-reports");
    renderMonthHigher("ganancias");
    renderMonthSpent("gastos");
    renderReportTotalCategories();
    renderReportTotalMonths();
    renderBalance(allOperations);
  }
};
// render balance
const renderBalance = (operationsData) => {
  $("#ganancia-total").innerHTML = `+$ ${total(operationsData).higher}`;
  $("#gasto-total").innerHTML = `-$ ${total(operationsData).spent}`;
  $("#balance-total").innerHTML = `$ ${totalBalance(operationsData)}`;
};
const renderhigher = () => {
  const operations = getData("operations");
  if (operations.length >= 1) {
    $("#higher-cat").innerHTML = `${totalCategory("ganancias").higher}`;
    $("#higher-amount").innerHTML = `$ ${totalCategory("ganancias").totalAmount}`;
  } else {
    $("#higher-cat").innerHTML = "sin Datos";
    $("#amount-amount").innerHTML = `$ 0`;
}
};
const renderHigherSpending = () => {
  const operations = getData("operations");
  if (operations.length >= 1) {
    $("#higher-spending").innerHTML = `${totalCategory("gastos").higher}`;
    $("#amount-spending").innerHTML = `- $${totalCategory("gastos").totalAmount}`;
  }  else {
    $("#higher-spending").innerHTML = "sin Datos";
    $("#amount-spending").innerHTML = `$ 0`;
}
};
const renderHigherBalance = () => {
  const operations = getData("operations");
  const operationsType = operations.filter(({type}) => type === "ganancias")
    if(operationsType.length >= 1){
    $("#higher-balance").innerHTML = `${totalCategoryBalance().higher}`;
    $("#amount-balance-higher").innerHTML = `$${totalCategoryBalance().totalAmount}`;
  } else {
    $("#higher-balance").innerHTML = "sin Datos";
  $("#amount-balance-higher").innerHTML = `$ 0`;
}
 
};
const renderMonthSpent = () => {
    $("#spent-month").innerHTML = `${reportPerMonthSpent("gastos")}`;
    $("#spent-month-amount").innerHTML = `-$ ${spentAmountMonth}`;
  };
  const renderMonthHigher = () => {
    $("#higher-month").innerHTML = `${reportPerMonthHigher("ganancias")}`;
    $("#higher-month-amount").innerHTML = `$ ${higherAmountMonth}`;
  };
//render categories
const renderCategoriesOptions = (categorys) => {
    cleanContainer("#categories-name");
    for (const { categoryName, id } of categorys) {
      $("#categories-name").innerHTML += `
          <option value="${id}" data-id="${id}">${categoryName}</option>
          `;
      $("#filter-category").innerHTML += `
          <option value="${id}"data-id="${id}">${categoryName}</option>
          `;
    }
  };
  
  // render table categories
const renderCategoriesTable = (categorys) => {
    cleanContainer("#categories-list");
    for (const { categoryName, id } of categorys) {
      $("#categories-list").innerHTML += `
          <tr class="w-full flex justify-between p-3 align-left ">
              <td class="px-2 flex justify-end md:w-1/5 md:justify-start ">
                  <span class="rounded-md bg-[#EEAECD] text-xs font-bold text-center text-[#D22779] px-2 p-1">${categoryName}
                  </span>
              </td>
              <td class="flex">
                  <button onclick="editFormCategories('${id}') " ><i class="fa-solid flex fa-pencil text-sm text-gray-600 mx-2"></i></button>
                  <button onclick="showElement('#modal-open'), deleteModalCategorie('${id}')"><i class="fa-solid flex fa-trash text-sm text-gray-600 mx-2 "></i></button>
              </td>
          </tr>
          `;
    }
  };
// render total for categories
const renderReportTotalCategories = () => {
  cleanContainer(".report-cat-total");
  const categoriesGanancias = reportTotalCategories();
  for (const report of categoriesGanancias) {
    $(".report-cat-total").innerHTML += `
        <tr class="" id="report-of-cate">
        <td class="px-2">${report.nameCategory}</td>
        <td class="px-2 text-right  cat-tot text-green-600">$ ${
          report.gananciaTotal
        }</td>        
        <td class="px-2 text-right  text-red-600">$ ${report.gastoTotal}</td>
        <td class="px-2 text-right font-bold text-gray-600">$ ${
          report.gananciaTotal - report.gastoTotal
        }</td>
        </tr>`;
  }
};

//render total for months
const renderReportTotalMonths = () => {
  const reportsPerMonths = reportTotalMonths();
  for (const report of reportsPerMonths) {
    if (report.gananciaTotal > 0 || report.gastoTotal > 0) {
      $(".report-months-total").innerHTML += `
            <tr class="text-sm md:text-lg" >
            <td class="px-2">${report.date}</td>
            <td class="px-2 text-right  cat-tot text-green-600">$ ${report.gananciaTotal}</td>        
            <td class="px-2 text-right  text-red-600">$ ${report.gastoTotal}</td>
            <td class="px-2 text-right font-bold text-gray-600">$ ${report.gananciaTotal - report.gastoTotal}</td>
            </tr>`;
    }
  }
};


// filters
const filterTotal = () => {
  const currentOperation = getData("operations");
  const typeId = $("#filter-type").value;
  const filteredOperationType = currentOperation.filter((operation) => {
    if (typeId === "Todos") {
      return operation;
    } else {
      return operation.type === typeId.toLowerCase();
    }
});

  const categoriesId = $("#filter-category").value;
  const filteredOperationsCat = filteredOperationType.filter((operation) => {
    if (categoriesId === "Todas") {
      return operation;
    }
    return operation.category === categoriesId;
  });

  $("#filter-date").setAttribute("value", $("#filter-date").value);
  const dateId = new Date($("#filter-date").value);
  const filteredOperationDate = filteredOperationsCat.filter((operation) => {
    if (new Date(operation.date) >= dateId) {
      return operation;
    }
    if (!dateId) {
      return filteredOperationsCat;
    }
  });
  const orderId = $("#filter-order").value;
  const filteredOrder = filteredOperationDate.toSorted((a, b) => {
    if (orderId === "A/Z") {
      if (a.description < b.description) return -1;
      if (a.description > b.description) return 1;
      return 0;
    }
    if (orderId === "Z/A") {
      if (a.description > b.description) return -1;
      if (a.description < b.description) return 1;
      return 0;
    }
    if (orderId === "mayor_monto") {
      return b.amount - a.amount;
    }
    if (orderId === "menor_monto") {
      return a.amount - b.amount;
    }
    if (orderId === "menos_reciente") {
      return new Date(a.date) - new Date(b.date);
    }
    if (orderId === "mas_reciente") {
      return new Date(b.date) - new Date(a.date);
    }
    return filteredOperationDate;
  });

  return filteredOrder;
};

$("#filter-category").addEventListener("input", () => {
  const filtered = filterTotal();
  if (!filtered.length) {
    showElement("#none-operation");
    hideElement("#container-table-operation");
    hideElement(".balance");
  } else {
    renderOperation(filtered);
    renderBalance(filtered);
    showElement("#container-table-operation");
    showElement(".balance");
  }
});
$("#filter-type").addEventListener("input", () => {
  const filtered = filterTotal();
  renderOperation(filtered);
  renderBalance(filtered);
});
$("#filter-date").addEventListener("input", () => {
  const filtered = filterTotal();
  renderOperation(filtered);
  renderBalance(filtered);
});
$("#filter-order").addEventListener("input", () => {
  const filtered = filterTotal();
  renderOperation(filtered);
  renderBalance(filtered);
});

// Events - - Initialize
const initializeApp = () => {
  setData("operations", allOperations);
  setData("categories", allCategories);
  renderOperation(allOperations);
  renderCategoriesOptions(allCategories);
  renderCategoriesTable(allCategories);
  totalBalance(allOperations);
  renderBalance(allOperations);
  constructorDate();
  filterTotal();
  render();

  // events nav-bar
  for (const btn of $$(".btn-balance")) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showElement("#container-balance");
      hideElement("#container-category");
      hideElement("#container-report");
      hideElement("#dropdown");
      hideElement("#btn-menu-close");
      showElement("#btn-menu");
    });
  }

  for (const btn of $$(".btn-categories")) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showElement("#container-category");
      hideElement("#container-balance");
      hideElement("#container-report");
      hideElement("#dropdown");
      hideElement("#btn-menu-close");
      showElement("#btn-menu");
    });
  }
  for (const btn of $$(".btn-reports")) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showElement("#container-report");
      hideElement("#container-balance");
      hideElement("#container-category");
      hideElement("#dropdown");
      hideElement("#btn-menu-close");
      showElement("#btn-menu");
    });
  }
  $("#btn-menu").addEventListener("click", (e) => {
    e.preventDefault();
    showElement("#dropdown");
    showElement("#btn-menu-close");
    hideElement("#btn-menu");
  });
  $("#btn-menu-close").addEventListener("click", (e) => {
    e.preventDefault();
    showElement("#btn-menu");
    hideElement("#dropdown");
    hideElement("#btn-menu-close");
  });
  // events btn
  $("#btn-new-operation").addEventListener("click", (e) => {
    e.preventDefault();
    showElement("#modal-new-operation");
    constructorDate();
  });

  $("#btn-add-operation").addEventListener("click", (e) => {
    e.preventDefault();
    addData("operations");
    confirmAddOperation();
    setTimeout(() => {
      hideElement("#confirm-add-operation");
    }, 1500);
  });
  $("#btn-edit-operation").addEventListener("click", (e) => {
    e.preventDefault();
    editOperation();
    renderOperation(getData("operations"));
    cleanContainer("#ganancia-total");
    cleanContainer("#gasto-total");
    cleanContainer("#balance-total");
    renderBalance(allOperations);
    hideElement("#modal-new-operation");
  });
  $("#add-category").addEventListener("click", (e) => {
    e.preventDefault();
    // if (validateForm()) {
    addDataCategories("categories");
    const currentCategories = getData("categories");
    renderCategoriesOptions(currentCategories);
    renderCategoriesTable(currentCategories);
    showElement("#text-confirm-add-category");
    setTimeout(() => {
        hideElement("#text-confirm-add-category");
      }, 1500);
  });

  $("#edit-category").addEventListener("click", (e) => {
    e.preventDefault();
    editCategory();
    const currentCategories = getData("categories");
    renderCategoriesOptions(currentCategories);
    renderCategoriesTable(currentCategories);
    showElement("#text-confirm-edit");
    setTimeout(() => {
        hideElement("#text-confirm-edit");
      }, 1500);
    renderOperation(getData("operations"));
  });
  $("#cancel-edit-category").addEventListener("click", () => {
    showElement("#title-category");
    hideElement("#title-edit-category");
    showElement(".container-btn-newcategory");
    hideElement("#container-btn-edit-category");
    hideElement("#text-confirm-edit");
    showElement("#categories-list");
    const currentCategories = getData("categories");
    renderCategoriesOptions(currentCategories);
    renderCategoriesTable(currentCategories);
  });
  $("#hidden-filters").addEventListener("click", () => {
    hideElement(".container-filters-type");
    hideElement("#hidden-filters");
    showElement("#show-filters");
  });
  $("#show-filters").addEventListener("click", () => {
    showElement(".container-filters-type");
    showElement("#hidden-filters");
    hideElement("#show-filters");
  });
};

window.addEventListener("load", initializeApp);
