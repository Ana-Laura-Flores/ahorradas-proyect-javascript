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
        categories: "Comida"
    },
    {
        id: randomId(),
        categories: "Servicios"
    },
    {
        id: randomId(),
        categories: "Salidas"
    },
    {
        id: randomId(),
        categories: "Educación"
    },
    {
        id: randomId(),
        categories: "Transporte"
    },
    {
        id: randomId(),
        categories: "Trabajo"
    },
]

const allOperations = getData("operations") || []
const allCategories = getData("categories") || categoriesDefault
//operations function

const saveOperation = (operationId) => {
    return {
        id: operationId ? operationId : randomId(),
        description: $("#description-data").value,
        amount: $("#amount-data").value,
        type: $("#type-operation").value,
        category: $("#categories").value,
        date: $("#date").value,
    }
}
const addOperation = () => {
    const currentOperation = getData("operations")
    const newOperation = saveOperation()
    currentOperation.push(newOperation)
    setData("operations", currentOperation)
}
const confirmAddOperation = () => {
    $("#confirm-add-operation").innerHTML = "tu operacion fue guardada con exito"
}

const renderOperation = (operations) => {
    cleanContainer("#table-operation")
    if(operations.length) {
       for (const { id, description, category, date, type, amount} of operations){
           const categoryColor = type === "ganancia" ? "text-green-600" : "text-red-600"
           const categorySign = type === "ganancia" ? "+" : "-"
            hideElement("#none-operation")
            $("#table-operation").innerHTML += `
            <tr class="w-full md:flex md:justify-between  md:border md:border-slate-300 md:p-3 md:align-left ">
            <td class="px-2 md:w-1/4 ">${description}</td>
                                    <td class="px-2 flex justify-end md:w-1/5 md:justify-start "><span class="rounded-md bg-[#EEAECD] text-xs font-bold text-center text-[#D22779] px-2 p-1">${category}</span></td>
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

// modal confirm delete operation
const deleteModalOperation = (id) => {
    $("#btn-delete-operation").setAttribute("data-id", id)
    $("#btn-close-modal-operation").addEventListener("click", () => {
        hideElement("#modal-open")
    })
    $("#btn-delete-operation").addEventListener("click", () => {
        const operationId = $("#btn-delete-operation").getAttribute("data-id")
        deleteOperation(operationId)
        window.location.reload()
    })

}
const deleteOperation = (id) => {
    const currentOperation = getData("operations").filter(operation => operation.id !== id )
    setData("operations", currentOperation)
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
    $("#categories").value = currentOperation.category
    $("#date").value = currentOperation.date
}

const total = (operations, categorie) => {
   const totalAmount = getData(operations).filter(operation => operation.type === categorie)
    
            let acc = 0
             for (const {amount} of totalAmount){
                acc += parseInt(amount)
               }
               return acc
    }
 

// const totalGastos = () => {
//     const gastos = getData("operations").filter(operation => operation.type === "gasto")
//     let acc = 0
//     for (const { amount } of gastos){
//         acc += parseInt(amount)
//     }
//     return acc
// }

const totalBalance = () => total("operations", "ganancia") - total("operations", "gasto")



const renderBalance = () =>{
    $("#ganancia-total").innerHTML += `+$ ${total("operations", "ganancia")}` 
    $("#gasto-total").innerHTML += `-$ ${total("operations", "gasto")}`
    $("#balance-total").innerHTML += `$ ${totalBalance()}`
    
}

// Events - - Initialize
const initializeApp = () => {
    setData("operations", allOperations)
    setData("categories", allCategories)
    renderOperation(allOperations)
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
    // open new opertation
    // $("#btn-new-operation").addEventListener("click", () => {
    //     showElement("#container-new-operation")
    //     hideElement("#container-balance")
    // })
    //add operation
    $("#btn-add-operation").addEventListener("click", (e) => {
        e.preventDefault()
        // if (validateForm()) {
            addOperation()
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
   
}

window.addEventListener("load", initializeApp)