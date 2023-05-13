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