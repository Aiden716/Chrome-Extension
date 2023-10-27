/*------Declarations----------*/
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn= document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) // trae los valores que se setearon en un principio 

/*------LocalStorge----------*/
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage // guarda los valores del localstorge en una variable
    render(myLeads) // muestra en pantalla la variable 
}
/*-----Render Function-----------*/
function render(leads) {
    let listItems = " "
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
/*-----Save Tab -----------*/
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){// usa chrome como api
        myLeads.push(tabs[0].url) 
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
});
/*------Delete Function----------*/
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear() // borra los seteos que hubo en localstorage
    myLeads = []
    render(myLeads)
})
/*------Set myLeads Array----------*/
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value) // inserta el valor del input en la variable
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
