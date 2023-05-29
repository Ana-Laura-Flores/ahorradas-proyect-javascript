// Getting elements from DOM
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Visibility elments
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")
const cleanContainer = (selector) => $(selector).innerHTML = ""
// Random id generator
const randomId = () => self.crypto.randomUUID()

// local storage
const getData = (key) => JSON.parse(localStorage.getItem(key))
const setData = (key, array) => localStorage.setItem(key, JSON.stringify(array))

// categories default
const categoriesDefault = [
    {
        id: randomId(),
        categoriesName: "Comida"
    },
    {
        id: randomId(),
        categoriesName: "Servicios"
    },
    {
        id: randomId(),
        categoriesName: "Salidas"
    },
    {
        id: randomId(),
        categoriesName: "Educación"
    },
    {
        id: randomId(),
        categoriesName: "Transporte"
    },
    {
        id: randomId(),
        categoriesName: "Trabajo"
    },
]

const allOperations = getData("operations") || []
const allCategories = getData("categories") || categoriesDefault
//operations function

const saveOperation = (operationId) => {
    const categoriesId = $("#categories-name").options[$("#categories-name").selectedIndex].getAttribute("data-id")
    const dayConstructor = new Date($("#date").value)
    const day = dayConstructor.getDate()
    const month = dayConstructor.getMonth() +1
    const year = dayConstructor.getFullYear()
    console.log(day)
    const constructorDate = (day + `-` + month + `-` + year)
    return {
        id: operationId ? operationId : randomId(),
        description: $("#description-data").value,
        amount: $("#amount-data").value,
        type: $("#type-operation").value,
        category: categoriesId,
        date: $("#date").value
    }
} //(year + `-` + `0`+month + `-` + day)
const saveCategories = () =>{
    return {
        id: randomId (),
        categoriesName: $("#categorie-name").value
    }
}
const addData = (data) => {
    const currentData = getData(data)
    const newData = saveOperation()
    currentData.push(newData)
    setData(data, currentData)
}
const addDataCategories = () => {
    const currentData = getData("categories")
    const newData = saveCategories()
    currentData.push(newData)
    setData("categories", currentData)
}
// const addOperation = () => {
//     const currentOperation = getData("operations")
//     const newOperation = saveOperation()
//     currentOperation.push(newOperation)
//     setData("operations", currentOperation)
// }
const confirmAddOperation = () => {
    $("#confirm-add-operation").innerHTML = "tu operacion fue guardada con exito"
}
// let timeOutId;
// const messageConfirm = () =>{
//     timeOutId = setTimeout(confirmAddOperation, 1000);
// }
// const deleteMessageConfirm = ()=> {
//     clearTimeout(timeOutId, 1000)
// }
// messageConfirm()
// deleteMessageConfirm()

const renderOperation = (operations) => {
    cleanContainer("#table-operation")
    if(operations.length) {
       for (const { id, description, category, date, type, amount} of operations){
           const categoryColor = type === "ganancias" ? "text-green-600" : "text-red-600"
           const categorySign = type === "ganancias" ? "+" : "-"
           const categorySelected = getData("categories").find(categor => categor.id === category)
            hideElement("#none-operation")
            $("#table-operation").innerHTML += `
            <tr class="w-full md:flex md:justify-between  md:border md:border-slate-300 md:p-3 md:align-left ">
            <td class="px-2 md:w-1/4 ">${description}</td>
                                    <td class="px-2 flex justify-end md:w-1/5 md:justify-start "><span class="rounded-md bg-[#EEAECD] text-xs font-bold text-center text-[#D22779] px-2 p-1">${categorySelected.categoriesName}</span></td>
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
            `
        }
    }
    else {
        hideElement("#container-table-operation")
    }
}

//render categories 
const renderCategoriesOptions = (categorys) => {
    cleanContainer("#categories-name")
    for (const { categoriesName, id } of categorys){
        $("#categories-name").innerHTML += `
        <option value="${id}" data-id="${id}">${categoriesName}</option>
        `
        $("#filter-category").innerHTML += `
        <option value="${id}"data-id="${id}">${categoriesName}</option>
        `
    }
}

// render table categories
const renderCategoriesTable = (categorys) => {
    cleanContainer("#categories-list")
    for (const { categoriesName, id } of categorys) {
        $("#categories-list").innerHTML += `
        <tr class="w-full flex justify-between p-3 align-left ">
            <td class="px-2 flex justify-end md:w-1/5 md:justify-start ">
                <span class="rounded-md bg-[#EEAECD] text-xs font-bold text-center text-[#D22779] px-2 p-1">${categoriesName}
                </span>
            </td>
            <td class="flex">
                <button onclick="editFormCategories('${id}') " ><i class="fa-solid flex fa-pencil text-sm text-gray-600 mx-2"></i></button>
                <button onclick="showElement('#modal-open'), deleteModalCategorie('${id}')"><i class="fa-solid flex fa-trash text-sm text-gray-600 mx-2 "></i></button>
            </td>
        </tr>
        `
    }
}

// modal confirm delete operation
 const deleteModalOperation = (id) => {
     $("#btn-delete-operation").setAttribute("data-id", id)
     $("#btn-close-modal-operation").addEventListener("click", () => {
         hideElement("#modal-open")
     })
     $("#btn-delete-operation").addEventListener("click", () => {
         const operationId = $("#btn-delete-operation").getAttribute("data-id")
         deleteData(operationId, "operations")
         renderOperation(getData("operations"))
         cleanContainer("#ganancia-total")
         cleanContainer("#gasto-total")
         cleanContainer("#balance-total")
         renderBalance()
        render()
 
     })
 }
 
const deleteModalCategorie = (id) => {
    showElement("#btn-delete-category")
    hideElement("#btn-delete-operation")
    $("#btn-delete-category").setAttribute("data-id", id)
    $("#btn-close-modal-operation").addEventListener("click", () => {
        hideElement("#modal-open")
    })
    $("#btn-delete-category").addEventListener("click", () => {
        const operationId = $("#btn-delete-category").getAttribute("data-id")
        deleteData(operationId, "categories")
        renderCategoriesOptions(getData("categories"))
        renderCategoriesTable(getData("categories"))
        renderOperation(getData("operations"))
        hideElement("#modal-open")
        
    })

}
 const deleteOperation = (id) => {
     const currentOperation = getData("operations").filter(operation => operation.id !== id )
     setData("operations", currentOperation)
 }
const deleteData = (id, type) => {
    const currentData = getData(type).filter(operation => operation.id !== id )
    setData(type, currentData)
}

const editOperation = () => {
    const operationId = $("#btn-edit-operation").getAttribute("data-id")
    const editedOperation = getData("operations").map(operation => {
        if(operation.id === operationId){
            return saveOperation(operation.id)
        }
        return operation
    })
    setData("operations", editedOperation)
}
    

const editFormOperation = (id) => {
    hideElement("#btn-add-operation")
    showElement("#btn-edit-operation")
    $("#title-operation").innerHTML = "Editar Operación"
    const currentOperation = getData("operations").find(operation => operation.id === id)
    $("#btn-edit-operation").setAttribute("data-id", id)
    $("#description-data").value = currentOperation.description
    $("#amount-data").value = currentOperation.amount
    $("#type-operation").value = currentOperation.type
    $("#categories-name").value = currentOperation.category
    $("#date").value = currentOperation.date
    
}
const editCategorie = () => {
    const categoriesId = $("#edit-category").getAttribute("data-id")
    const editedCategories = getData("categories").map(category => {
        if(category.id === categoriesId){
            return saveCategories(category.id)
        }
        return category
    })
    setData("categories", editedCategories)
    
}
const editFormCategories = (id) => {
    showElement("#title-edit-category")
    hideElement("#title-category")
    showElement("#container-btn-edit-category")
    hideElement(".container-btn-newcategory")
    hideElement("#categories-list")
    const editedCategories = getData("categories").find(category => category.id === id)
    $("#edit-category").setAttribute("data-id", id)
    $("#categorie-name").value = editedCategories.categoriesName
 
}

const total = (operations, type) => {
   const totalAmount = getData(operations).filter(operation => operation.type === type)
    
            let acc = 0
             for (const {amount} of totalAmount){
                acc += parseInt(amount)
               }
               return acc
    }
const totalBalance = () => total("operations", "ganancias") - total("operations", "gastos")



const constructorDate = () => {
    
    actualDay =  new Date();
    //Año
    year = actualDay.getFullYear();
    //Mes
    month = actualDay.getMonth()+1;
    //Día
    day = actualDay.getDate();
    
     $("#date").setAttribute("value", (year + `-` + `0`+month + `-` + day))
    $("#date").setAttribute("max", (year + `-` + `0`+month + `-` + day) )
}
const months = [0,1,2,3,4,5,6,7,8,9,10,11]
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
   11: "diciembre"
 }
let higherAmountMonth = 0
const reportPerMonthHigher = (operationType) => {
    const currentOperations = getData("operations")   
    const incomePerMonth = {}
    for (const month of months) {
        const filteredByMonth = currentOperations.filter(operation => {
            const date = new Date(operation.date)
            return date.getMonth() === month && operation.type === operationType
        })
        let acc = 0
        for (const op of filteredByMonth) {
            acc += parseInt(op.amount)
        }
        incomePerMonth[month] = acc
    }
    let higherMonth = ""
    for (const key in incomePerMonth) {
        if (incomePerMonth[key] > higherAmountMonth) {
            higherAmountMonth= incomePerMonth[key],
            higherMonth= key
        }
    }
    for (const mes in objMes){
        mes === higherMonth
        return objMes[higherMonth]
    }
}
const renderMonthHigher = () => {
    $("#higher-month").innerHTML = `${reportPerMonthHigher("ganancias")}`
    $("#higher-month-amount").innerHTML += `${higherAmountMonth}`  
}
// reportes mayor gasto

let spentAmountMonth = 0
const reportPerMonthSpent = (operationType) => {
    const currentOperations = getData("operations")   
    const incomePerMonth = {}
    for (const month of months) {
        const filteredByMonth = currentOperations.filter(operation => {
            const date = new Date(operation.date)
            return date.getMonth() === month && operation.type === operationType
        })
        let acc = 0
        for (const op of filteredByMonth) {
            acc += parseInt(op.amount)
        }
        incomePerMonth[month] = acc
    }
    let higherMonth = ""
    for (const key in incomePerMonth) {
        if (incomePerMonth[key] > spentAmountMonth) {
            spentAmountMonth= incomePerMonth[key],
            higherMonth= key
        }
    }
    for (const mes in objMes){
        mes === higherMonth
        return objMes[higherMonth]
    }
}
const renderMonthSpent = () => {
    $("#spent-month").innerHTML = `${reportPerMonthSpent("gastos")}`
    $("#spent-month-amount").innerHTML += `${spentAmountMonth}`
}

// report of categories

//const categorySelected = getData("categories").find(categor => categor.id === category)

const reportTotalCategories = (operationType) => {
    const categoriesTotal = {}
    const totalOfCategory = getData("operations")
    const nameCategory = getData("categories")
    if(!totalOfCategory){
        showElement("#none-reports")

    }else{
        hideElement("#none-reports")
        showElement("#container-reports")
        for (const {categoriesName, id} of nameCategory){
            let acc = 0
            const categories = totalOfCategory.map(({ category, amount, type }) => {
                if(category === id & type === operationType){
                    acc += parseInt(amount)
                }
                categoriesTotal[categoriesName] = acc
                     //console.log(categoriesTotal[categoriesName])
                 //console.log(Object.keys(categoriesTotal))
            })
        }
         return categoriesTotal
         }
    }
    //console.log((categoriesTotal[categoriesName] = acc))  
console.log(reportTotalCategories("ganancias"))
console.log(reportTotalCategories("gastos"))
// render total for categories 
const renderReportTotalCategories = () => {
    const categoriesGanancias = reportTotalCategories("ganancias")
    const categoriesGastos = reportTotalCategories("gastos")
    for (const report in categoriesGanancias){
        $(".report-cat-total").innerHTML += `
        <tr class="" id="report-of-cate">
        <td class="px-2">${report}</td>
        <td class="px-2 text-right  cat-tot text-green-600">$ ${categoriesGanancias[report]}</td>`
    }
        for (const reportGan in categoriesGastos){
        $(".report-cat-total").innerHTML +=`
        <td class="px-2 text-right  text-red-600">$ ${categoriesGastos[reportGan]}</td>
        <td class="px-2 text-right font-bold text-gray-600"></td>
        </tr>`
    } 
}
console.log(renderReportTotalCategories())

const renderBalance = () =>{
    $("#ganancia-total").innerHTML += `+$ ${total("operations", "ganancias")}` 
    $("#gasto-total").innerHTML += `-$ ${total("operations", "gastos")}`
    $("#balance-total").innerHTML += `$ ${totalBalance()}`
}

 const totalCategory = (operationType) => {
    const categoriesTotal = {}
    const totalOfCategory = getData("operations")
    const nameCategory = getData("categories")
    if(totalOfCategory.length > 1){
        hideElement("#none-reports")
        showElement("#container-reports")
        for (const {categoriesName, id} of nameCategory){
            let acc = 0
            totalOfCategory.map(({ category, amount, type }) => {
                if(category === id & type === operationType){
                    acc += parseInt(amount)
                }
            categoriesTotal[categoriesName] = acc
            })
         }
        let higher = " "
        let totalAmount = 0
        for (const key in categoriesTotal){
            if (categoriesTotal[key] > totalAmount){
                return {
                    totalAmount: categoriesTotal[key],
                    higher: key
                }
            }
        }
    }
    else {
        showElement("#none-reports")
        hideElement("#container-reports")
    }
  
}

const totalCategoryBalance = () => {
    const categoriesTotal = {}
    const totalOfCategory = getData("operations")
    const nameCategory = getData("categories")
    if(totalOfCategory.length > 1){
        hideElement("#none-reports")
        showElement("#container-reports")
        for (const {categoriesName, id} of nameCategory){
            let accganancia = 0
            let accGasto = 0
            let balance = 0
            totalOfCategory.filter(({ category, amount, type }) => {
                if(category === id & type === "ganancias"){
                    accganancia += parseInt(amount)
                }
                if(category === id & type === "gastos"){
                    accGasto += parseInt(amount)
                }
            balance = accganancia - accGasto
            categoriesTotal[categoriesName] = balance
            })
            
        }
        
        let higher = " "
        let totalAmount = 0
        for (const key in categoriesTotal){
            if (categoriesTotal[key] > totalAmount){
                return {
                    totalAmount: categoriesTotal[key],
                    higher: key
                }
            }
        }
    }
    else {
        showElement("#none-reports")
        hideElement("#container-reports")
    }
  
}       

//render reports //
const render = () => {
    
    renderHigherBalance()
    renderHigherSpending()
    renderhigher()
    renderMonthHigher()
    renderMonthSpent()
}
const renderhigher = () => {
    const operations = getData("operations")
    if (operations.length > 1){
        $("#higher-cat").innerHTML = `${totalCategory("ganancias").higher}`
        $("#higher-amount").innerHTML += `${totalCategory("ganancias").totalAmount}`
    }
    
}
const renderHigherSpending = () => {
    const operations = getData("operations")
    if (operations.length > 1){
        $("#higher-spending").innerHTML = `${totalCategory("gastos").higher}`
        $("#amount-spending").innerHTML += `${totalCategory("gastos").totalAmount}`
    }
}
const renderHigherBalance = () => {
    const operations = getData("operations")
    if (operations.length > 1){
        $("#higher-balance").innerHTML = `${totalCategoryBalance().higher}`
        $("#amount-balance-higher").innerHTML += `${totalCategoryBalance().totalAmount}`
    }
}



  // filters
  const filterTotal = () => {
    $("#filter-category").addEventListener("input", (e) =>{
        const categoriesId = e.target.value
        const currentOperation = getData("operations")
        if(!categoriesId){
           renderOperation(currentOperation)
       } else {
            const filteredOperations = currentOperation.filter(operation => operation.category === categoriesId)
           renderOperation(filteredOperations)
           
           
        }
    })
    $("#filter-type").addEventListener("input", (e) =>{
        const typeId = e.target.value
        const currentOperation = getData("operations")
        if(typeId === "Todos"){
            renderOperation(currentOperation)
        } else {
            const filteredOperations = currentOperation.filter(operation => operation.type === typeId.toLowerCase())
           renderOperation(filteredOperations)
        }
    })
    $("#filter-date").addEventListener("input", (e) =>{
        const typeId = e.target.value
        const currentOperation = getData("operations")
        const filteredOperations = currentOperation.filter(operation => new Date(operation.date) > new Date(typeId))
        renderOperation(filteredOperations)
    
    })
    
    $("#filter-order").addEventListener("input", (e) =>{
        const typeId = e.target.value
        const currentOperation = getData("operations")
        if(typeId === "A/Z"){
            const orderAZ = currentOperation.toSorted((a,b) => {
                if (a.description < b.description) return -1
                if (a.description > b.description) return 1
                return 0
            })
            renderOperation(orderAZ)
    }
        if(typeId === "Z/A"){
            const orderZA = currentOperation.toSorted((a,b) => {
                if (a.description > b.description) return -1
                if (a.description < b.description) return 1
                return 0
            })
            renderOperation(orderZA)
        }
        if(typeId === "mayor_monto"){
            const orderMayorMonto = currentOperation.toSorted((a,b) => b.amount - a.amount)
            renderOperation(orderMayorMonto)
        }
        if(typeId === "menor_monto"){
            const orderMenorMonto = currentOperation.toSorted((a,b) => a.amount - b.amount)
            renderOperation(orderMenorMonto)
        }
        if(typeId === "menos_reciente"){
            const orderMenorFecha = currentOperation.toSorted((a,b) => new Date(a.date) - new Date(b.date))
            renderOperation(orderMenorFecha)
        }
        if(typeId === "mas_reciente"){
            const orderMayorFecha = currentOperation.toSorted((a,b) => new Date(b.date) - new Date(a.date))
            renderOperation(orderMayorFecha)
        }
        
    })
   
    cleanContainer("#ganancia-total")
    cleanContainer("#gasto-total")
    cleanContainer("#balance-total")
    renderBalance()
  }




// Events - - Initialize
const initializeApp = () => {
    setData("operations", allOperations)
    setData("categories", allCategories)
    renderOperation(allOperations)
    renderCategoriesOptions(allCategories)
    renderCategoriesTable(allCategories)
    total("operations", "ganancias")
    total("operations", "gastos")
    totalBalance()
    constructorDate()
    render()
    filterTotal()
 
// events nav-bar
for (const btn of $$(".btn-balance")){
    btn.addEventListener("click", (e)=>{
        e.preventDefault()
        showElement("#container-balance")
        hideElement("#container-category")
        hideElement("#container-report")
        hideElement("#dropdown")
        hideElement("#btn-menu-close")
        showElement("#btn-menu")
        })
}
   
for (const btn of $$(".btn-categories")){
    btn.addEventListener("click", (e)=>{
        e.preventDefault()
        showElement("#container-category")
        hideElement("#container-balance")
        hideElement("#container-report")
        hideElement("#dropdown")
        hideElement("#btn-menu-close")
        showElement("#btn-menu")
        })
}
for (const btn of $$(".btn-reports")){
    btn.addEventListener("click", (e)=>{
        e.preventDefault()
        showElement("#container-report")
        hideElement("#container-balance")
        hideElement("#container-category")
        hideElement("#dropdown")
        hideElement("#btn-menu-close")
        showElement("#btn-menu")
        })
}
    $("#btn-menu").addEventListener("click", (e) => {
        e.preventDefault()
        showElement("#dropdown") 
        showElement("#btn-menu-close")
        hideElement("#btn-menu")
    })
    $("#btn-menu-close").addEventListener("click", (e) => {
        e.preventDefault()
        showElement("#btn-menu")
        hideElement("#dropdown")
        hideElement("#btn-menu-close")
    })
    $("#btn-new-operation").addEventListener("click", (e) =>{
        e.preventDefault()
        showElement("#modal-new-operation")
        constructorDate()
    })
    
    $("#btn-add-operation").addEventListener("click", (e) => {
        e.preventDefault()
        // if (validateForm()) {
            addData("operations")
            confirmAddOperation()
            //constructorDate()
            
        // }
    })
    $("#btn-edit-operation").addEventListener("click", (e) => {
        e.preventDefault()
        editOperation()
        
        renderOperation(getData("operations"))
         cleanContainer("#ganancia-total")
         cleanContainer("#gasto-total")
         cleanContainer("#balance-total")
         renderBalance()
        hideElement("#modal-new-operation")
    })
    $("#add-categorie").addEventListener("click", (e) => {
        e.preventDefault()
        // if (validateForm()) {
        addDataCategories("categories")
        const currentCategories = getData("categories")
        renderCategoriesOptions(currentCategories)
        renderCategoriesTable(currentCategories)
        showElement("#text-confirm-add-category")
    })

    $("#edit-category").addEventListener("click", (e) => {
        e.preventDefault()
        editCategorie("categories")
        const currentCategories = getData("categories")
        renderCategoriesOptions(currentCategories)
        renderCategoriesTable(currentCategories)
        showElement("#text-confirm-edit")
        renderOperation(getData("operations"))
       
    })
    $("#cancel-edit-category").addEventListener("click", () => {
        showElement("#title-category")
        hideElement("#title-edit-category")
        showElement(".container-btn-newcategory")
        hideElement("#container-btn-edit-category")
        hideElement("#text-confirm-edit")
        showElement("#categories-list")
        const currentCategories = getData("categories")
        renderCategoriesOptions(currentCategories)
        renderCategoriesTable(currentCategories)
        
        
       
    })

}

window.addEventListener("load", initializeApp)