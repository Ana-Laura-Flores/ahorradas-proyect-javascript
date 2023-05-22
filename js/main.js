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
    return {
        id: operationId ? operationId : randomId(),
        description: $("#description-data").value,
        amount: $("#amount-data").value,
        type: $("#type-operation").value,
        category: categoriesId,
        date: $("#date").value,
    }
}
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
           const categoryColor = type === "ganancia" ? "text-green-600" : "text-red-600"
           const categorySign = type === "ganancia" ? "+" : "-"
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
    $("#btn-delete-operation").setAttribute("data-id", id)
    $("#btn-close-modal-operation").addEventListener("click", () => {
        hideElement("#modal-open")
    })
    $("#btn-delete-operation").addEventListener("click", () => {
        const operationId = $("#btn-delete-operation").getAttribute("data-id")
        deleteData(operationId, "categories")
        
    })

}
// const deleteOperation = (id) => {
//     const currentOperation = getData("operations").filter(operation => operation.id !== id )
//     setData("operations", currentOperation)
// }
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
    console.log(currentOperation)
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
    console.log(editedCategories)
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
    console.log(editedCategories)
    
}
// const editedCategories = () => {
//     $("categories-name").innerHTML = `${categorie.categoriesName}`
// }
const total = (operations, categorie) => {
   const totalAmount = getData(operations).filter(operation => operation.type === categorie)
    
            let acc = 0
             for (const {amount} of totalAmount){
                acc += parseInt(amount)
               }
               return acc
    }
const totalBalance = () => total("operations", "ganancia") - total("operations", "gasto")



const renderBalance = () =>{
    $("#ganancia-total").innerHTML += `+$ ${total("operations", "ganancia")}` 
    $("#gasto-total").innerHTML += `-$ ${total("operations", "gasto")}`
    $("#balance-total").innerHTML += `$ ${totalBalance()}`
    
}

// functions reports

// Events - - Initialize
const initializeApp = () => {
    setData("operations", allOperations)
    setData("categories", allCategories)
    renderOperation(allOperations)
    renderCategoriesOptions(allCategories)
    renderCategoriesTable(allCategories)
    total("operations", "ganancia")
    total("operations", "gasto")
    totalBalance()
    renderBalance()
  
        
    
// events nav-bar
for (const btn of $$(".btn-balance")){
    btn.addEventListener("click", (e)=>{
        e.preventDefault()
        showElement("#container-balance")
        hideElement("#container-category")
        hideElement("#container-report")
        })
}
   
for (const btn of $$(".btn-categories")){
    btn.addEventListener("click", (e)=>{
        e.preventDefault()
        showElement("#container-category")
        hideElement("#container-balance")
        hideElement("#container-report")
        })
}
for (const btn of $$(".btn-reports")){
    btn.addEventListener("click", (e)=>{
        e.preventDefault()
        showElement("#container-report")
        hideElement("#container-balance")
        hideElement("#container-category")
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
               
    })
    
    $("#btn-add-operation").addEventListener("click", (e) => {
        e.preventDefault()
        // if (validateForm()) {
            addData("operations")
            confirmAddOperation()
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
        
    })

    $("#edit-category").addEventListener("click", (e) => {
        e.preventDefault()
        editCategorie("categories")
        const currentCategories = getData("categories")
        renderCategoriesOptions(currentCategories)
        renderCategoriesTable(currentCategories)
        $("#categorie-name").value = " "
       
    })
    $("#cancel-edit-category").addEventListener("click", () => {
        showElement("#title-category")
        hideElement("#title-edit-category")
        showElement(".container-btn-newcategory")
        hideElement("#container-btn-edit-category")
        showElement("#categories-list")
        const currentCategories = getData("categories")
        renderCategoriesOptions(currentCategories)
        renderCategoriesTable(currentCategories)
        $("#categorie-name").value = " "
    })

    
    // $("#btn-edit-pencil").addEventListener("click", (e) => {
    //     e.preventDefault()
    //     const categoriesId = $("#btn-edit-pencil").getAttribute("data-id")
    //     editCategories()
    //     // renderCategoriesTable(allCategories)
    //     // renderCategoriesOptions(allCategories)
       
    //})
    // $("#btn-delete-trash").addEventListener("click", () => {
    //     const operationId = getData("categories").filter(category => category.id !== id )
    //     setData("categories", operationId)
    //     deleteData(operationId, "categories")
    //     renderCategoriesTable("categories")
    // }) 
    //const deleteOperation = (id) => {
        //     const currentOperation = getData("operations").filter(operation => operation.id !== id )
        //     setData("operations", currentOperation)
        // const currentCategories = getData("categories")
        // renderCategoriesTable(currentCategories)
        // renderCategoriesOptions(currentCategories)
       
    
    // $("#filter-category").addEventListener("input", (e) =>{
    //     const categoriesId = e.target.value
    //     const currentOperation = getData("operations")
    //     if(!categoriesId){
    //         renderOperation(currentOperation)
    //     } else {
    //         const filteredOperations = currentOperation.filter(operation => operation.categoriesName === categoriesId)
    //         renderOperation(filteredOperations)
    //     }
    // })
}

window.addEventListener("load", initializeApp)