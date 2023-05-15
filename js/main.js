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
const saveOperation = () => {
    return {
        id: randomId(),
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
const renderOperation = (operations) => {

    cleanContainer("#table-operation")
    if(operations.length){
       for (const { id, description, category, date, type, amount} of operations){
            hideElement("#none-operation")
            $("#table-operation").innerHTML += `
            <tr class="w-full md:flex md:justify-between  md:border md:border-slate-300 md:p-3 md:align-left ">
            <td class="px-2 md:w-1/3 ">${description}</td>
                                    <td class="px-2 flex justify-end md:w-1/4 md:justify-start "><span class="rounded-md bg-[#EEAECD] text-xs font-bold text-center text-[#D22779] px-2 p-1">${category}</span></td>
                                    <td class="px-2 text-right  md:flex md: justify-end hidden md:w-1/6">${date}</td>
                                    <td id= "price" class="px-2 text-green-600 hidden md:flex md:w-1/6 justify-end  text-right font-bold ">$ ${amount} </td> 
                                    <td class="flex px-2 hidden md:flex md:w-1/5 justify-end">
                                        <button ><i class="fa-solid flex fa-pencil text-sm text-gray-600 mx-2"></i></button>
                                        <button onclick="showElement('#modal-open'), deleteModalOperation('${id}')"><i class="fa-solid flex fa-trash text-sm text-gray-600 mx-2 "></i></button>
                                    </td>
                                    </tr>
                                    <tr class="operation-mobile">
                                    <td class="px-2 text-left text-2xl  my-5 md:hidden font-bold text-green-600">$ ${amount}</td>
                                    <td class="flex px-2 md:hidden  my-5 justify-end">
                                    <button><i class="fa-solid flex fa-pencil text-sm 	 text-gray-600 mx-2"></i></button>
                                    <button onclick="showElement('#modal-open'), deleteModalOperation('${id}')"><i class="fa-solid flex fa-trash text-sm text-gray-600 mx-2 "></i></button>
                                    </td>
                                </tr>
            `
        }
    }
}

// const filters = () => {
//     const filterType = $("#type-operation").value
//     const filterOfType = allOperations.filter(operation => {
//         if (filterType === "todos"){
//         return operation
//         }
//         return filterType === operation.type
//     })
//     const filterCategory = $("#categories").value
//     const filterOfCategory = filterOfType.filter(operation =>{
//         if (filterCategory === "todos"){
//             return operation
//         }
//         return filterCategory === operation.categories
//     })
//     return filterOfCategory
// }

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


// Events - - Initialize
const initializeApp = () => {
    setData("operations", allOperations)
    setData("categories", allCategories)
    renderOperation(allOperations)
    
    
    
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
        showElement("#container-new-operation")
        hideElement("#container-balance")
        
    })
    // open new opertation
    $("#btn-new-operation").addEventListener("click", () => {
        showElement("#container-new-operation")
        hideElement("#container-balance")
    })
    //add operation
    $("#btn-add-operation").addEventListener("click", (e) => {
        e.preventDefault()
        // if (validateForm()) {
            addOperation()
        // }
    })
   
}

window.addEventListener("load", initializeApp)