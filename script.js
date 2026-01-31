const notes_list = document.getElementById("notes-list")
const editor = document.getElementById("editor")
const navbar1 = document.getElementById("navbar1")
const navbar2 = document.getElementById("navbar2")
const input = document.getElementById("input")
const inputWrapper = document.querySelector(".input-wrapper");
var count = 0;



function  show_editor(){
    navbar1.style.display="none";
    navbar2.style.display = "flex"
    editor.style.display="block"; 

}

function save(){
    
    const text = input.value.trim()
    if (text ==""){
        return 
    }
    // else if(localStorage.getItem(count)==null){
    //     localStorage.setItem(count,text)
    // count++; 
    // const new_div=document.createElement("div")
    // new_div.classList.add("listui")
    // new_div.textContent = text 
    // notes_list.appendChild(new_div)
    // }
    // else if(localStorage.getItem(count)!==null){
    //     if(text !==localStorage.getItem(count) ){
    //         localStorage.setItem(count,text)
    //     }
    // }
    localStorage.setItem(count,text)
    count++; 
//add list wrapper div 
    const new_list_wrapper =document.createElement("div")
    new_list_wrapper.id = "new_list_wrapper"
    new_list_wrapper.classList.add("flex-list")
    notes_list.appendChild(new_list_wrapper)
//add new div
    const new_div=document.createElement("div")
    new_div.classList.add("listui")
    new_list_wrapper.appendChild(new_div)
// add title div
    const new_text_div=document.createElement("div")
    new_text_div.textContent = text
    new_text_div.id = "new_text_div" 
    new_div.appendChild(new_text_div)
//add new button wrapper div 
    const new_wrapper_div= document.createElement("div")
    new_wrapper_div.id= "div-button-wrapper"
    new_div.appendChild(new_wrapper_div)
// add edit button
    const edit_button =document.createElement("button")
    edit_button.classList.add("buttonui")
//add delete button
    const delete_button =document.createElement("button")
    delete_button.classList.add("buttonui")
    delete_button.id = "delete_button"

    new_wrapper_div.appendChild(edit_button)
    new_wrapper_div.appendChild(delete_button)







    navbar1.style.display="flex";
    navbar2.style.display = "none"
    input.value=" ";
    editor.style.display="none"
    


    

}
