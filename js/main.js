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
        price: $("#price-data").value,
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
       for (const { id, description, category, date, price} of operations){
            hideElement("#none-operation")
            $("#table-operation").innerHTML += `
            <tr class="w-full md:flex md:justify-between  md:align-left ">
            <td class="px-2 md:w-1/3 ">${description}</td>
                                    <td class="px-2 flex justify-end md:w-1/4 md:justify-start "><span class="rounded-md bg-[#EEAECD] text-xs font-bold text-center text-[#D22779] px-2 p-1">${category}</span></td>
                                    <td class="px-2 text-right  md:flex md: justify-end hidden md:w-1/6">${date}</td>
                                    <td class="px-2  hidden md:flex md:w-1/6 justify-end  text-right font-bold text-green-600">${price}</td>
                                    <td class="flex px-2 hidden md:flex md:w-1/5 justify-end">
                                        <a href="http://"><i class="fa-solid flex fa-pencil text-sm text-gray-600 mx-2"></i></a>
                                        <a href="http://"><i class="fa-solid flex fa-trash text-sm text-gray-600 mx-2 "></i></a>
                                    </td>
                                    </tr>
                                    <tr class="operation-mobile">
                                    <td class="px-2 text-left text-2xl  my-5 md:hidden font-bold text-green-600">${price}</td>
                                    <td class="flex px-2 md:hidden  my-5 justify-end">
                                    <a href="http://"><i class="fa-solid flex fa-pencil text-sm 	 text-gray-600 mx-2"></i></a>
                                    <a href="http://"><i class="fa-solid flex fa-trash text-sm text-gray-600 mx-2 "></i></a>
                                    </td>
                                </tr>
            `
        }
    }
}
