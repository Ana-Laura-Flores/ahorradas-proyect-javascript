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
         window.location.reload()
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
// const editedCategories = () => {
//     $("categories-name").innerHTML = `${categorie.categoriesName}`
// }
const total = (operations, type) => {
   const totalAmount = getData(operations).filter(operation => operation.type === type)
    
            let acc = 0
             for (const {amount} of totalAmount){
                acc += parseInt(amount)
               }
               return acc
    }
const totalBalance = () => total("operations", "ganancias") - total("operations", "gastos")

const totalForCategories = () => {
   
}
    
     console.log(totalForCategories())
//month

// const reportMonth = () => {
//     const gananciasMes = {}
//     const currentOperation = getData("operations")
//     let mes = ""
//     let acc = 0
//     for (let i = 0; i < currentOperation.length; i++){
//         //const month = new Date(currentOperation[i].date.getMonth())
//         //const year = new Date(currentOperation[i].date)
//         //const dateFormat = new Date(currentOperation[i].date.getMonth())+1 + `/${year}`
//         //console.log(currentOperation[i].date.getMonth())
//         if(currentOperation[i].type === "ganancia"){
            
//         }
//     }
// }
// const objMes = {
//     0: enero,
//     1: febrero,
//     2: marzo,
//     3: abril,
//     4: mayo,
//     5: junio,
//     6: julio,
//     7: agosto,
//     8: septiembre,
//     9: octubre,
//     10: noviembre,
//     11: diciembre
// }
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
const arrayMes = [new Date(2023,03).getMonth() + `/${new Date(2023,03).getFullYear()}`]
console.log(arrayMes)
/*const reportMonth = () => {
    const gananciasMes = {}
    const currentOperation = getData("operations")
    
    let mes = []
    let acc = 0
    
        currentOperation.filter(operation => {
            const month = new Date(operation.date).getMonth()
            const year = new Date(operation.date).getFullYear()
            const dateFormat = new Date(operation.date).getMonth()+1 + `/${year}`
            if(operation.type === "ganancia"){
                for (let i = 1; i < month.lenght; i ++){
                        console.log(month[i])
                    if (month[i] === month[i]){
                       console.log(month[i])
                            acc += parseInt(operation.amount)
                    }
                        
                    
                } 
                console.log(acc)
                // acc = parseInt(amount)
                // mes = dateFormat
                // month[gananciasMes] = acc
            }
            
            //.log(gananciasMes[dateFormat] = acc)
        })  
        return mes    //const { date, type, amount } = operation
   
}
console.log(reportMonth())
*/
 
        // if (new Date(date).getMonth() === month && year && type === "ganancia"){
        //     acc += parseInt(amount)
        //     gananciasMes[date] = acc
        //     //me da la fecha formada por mes y año
        //     //console.log(new Date(date).getMonth()+1 + `/${year}`)
        //     //console.log(year)
            
        //     if (month >1){
        //         accMes += parseInt(amount)
        //         console.log(parseInt(amount))
        //         gananciasMes[date] = accMes
        //     }
        //     return new Date(date).getMonth()+1 + `/${year}`
            
        // }
      
    
    // currentOperation.filter(({ date, amount, type}) => {
    //   if (type === "ganancia"){
    //     let acc = 0
    //     const month = new Date(date).getMonth()
    //     acc += parseInt(amount)
    //       gananciasMes[month] = acc
    //         //console.log(month.toLocaleString('default', { month: 'long' }))
            
    //      }
        
    // })

const renderBalance = () =>{
    $("#ganancia-total").innerHTML += `+$ ${total("operations", "ganancias")}` 
    $("#gasto-total").innerHTML += `-$ ${total("operations", "gastos")}`
    $("#balance-total").innerHTML += `$ ${totalBalance()}`
}

// functions reports
// const totalNameCategory = (operationType) => {
//     const categoriesTotal = {}
//     const totalOfCategory = getData("operations")
//     const nameCategory = getData("categories")
//     if(totalOfCategory.length > 1){
//         hideElement("#none-reports")
//         showElement("#container-reports")
//         acc = 0
//         const { id, categoriesName } = nameCategory
//         for (const { category, amount } of totalOfCategory){
//             if (category === id){
//                 acc += parseInt(amount)
//             }
//             return acc
//         }
//         return categoriesTotal
//     }
// }
// console.log(totalNameCategory("ganancia"))
 const totalCategory = (operationType) => {
    const categoriesTotal = {}
    const totalOfCategory = getData("operations")
    const nameCategory = getData("categories")
    if(totalOfCategory.length > 1){
        hideElement("#none-reports")
        showElement("#container-reports")
        for (const {categoriesName, id} of nameCategory){
            let acc = 0
            totalOfCategory.filter(({ category, amount, type }) => {
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
    renderBalance()
    renderHigherBalance()
    renderHigherSpending()
    renderhigher()
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


// reports month
//const reportMonth = () =>
/*
const loMejorDelMes = (mes, anio, propiedad) => {
    const ventasTotales = local.ventas;
    for (let i = 1; i < ventasTotales.length; i++) {
      if (
        ventasTotales[i].fecha.getMonth() === mes &&
        ventasTotales[i].fecha.getFullYear() === anio
      ) {
        if (
          precioMaquina(ventasTotales[0].componentes) >
          precioMaquina(ventasTotales[i].componentes)
        ) {
          return `lo mejor del mes: ${ventasTotales[i][propiedad]}`;
        }
      }
    }
    return "Este mes y año no hubo ventas";
  };
  */

  // filters
  const filterTotal = () => {
      
  }
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
})



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
        renderOperation(allOperations)
        hideElement("#modal-new-operation")
        
        window.location.reload()
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