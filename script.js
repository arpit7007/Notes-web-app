const notes_list = document.getElementById("notes-list")
const editor = document.getElementById("editor")
const navbar1 = document.getElementById("navbar1")
const navbar2 = document.getElementById("navbar2")
const navbar3 = document.getElementById("navbar3")
const input = document.getElementById("input")
const inputWrapper = document.querySelector(".input-wrapper");
const note_title = document.getElementById("untitle")
var count = 0;
let current_key =null;


function show_notes_list(){    editor.style.animation ="slidedown 2s ease-out forwards"
    setTimeout(()=>{
        editor.style.display="none";
    },2000)
    notes_list.style.display="block";
    notes_list.style.animation ="slideleft 2s ease-out forwards"
}
function show_editor(){
    editor.style.display="block"; 
    notes_list.style.animation = "slideright 2s ease-out forwards"
    setTimeout(() => {
        notes_list.style.display="none"
    }, 2000);
    editor.style.animation ="slideUp 2s ease-out forwards"
}
function attach_edit_listener(){
    const edit_buttons= document.querySelectorAll(".edit-buttonui")

edit_buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        navbar1.style.display="none";
        navbar2.style.display = "none";
        navbar3.style.display ="flex"
        const current_edit_div  = btn.closest(".listui")
        current_key = current_edit_div.dataset.key
        input.value = localStorage.getItem(current_key)
        show_editor()
    })
})
}
function attach_delete_listener(){
    const delete_buttons = document.querySelectorAll(".delete-buttonui")
    delete_buttons.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const current_delete_div = btn.closest(".listui")
            current_key = current_delete_div.dataset.key
            localStorage.removeItem(current_key)
            const current_div_wrapper = current_delete_div.closest(".flex-list")
            current_div_wrapper.style.display ="none"
        })
    })
}
function savechanges(){
    localStorage.setItem(current_key,input.value)
    navbar1.style.display="flex";
    navbar2.style.display = "none";
    navbar3.style.display ="none";

    show_notes_list()

}





function  create_note(){
    navbar1.style.display="none";
    navbar2.style.display = "flex";
    navbar3.style.display ="none"
    
    show_editor()
    

}

function save(){
    let title = note_title.value.trim()
    let text = input.value.trim()
    if(title === "" && text !==""){
        title="Untitled"
    }
    
    if (title === "" && text ===""){
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
    const notekey = count;
    localStorage.setItem(notekey,text)
    count++; 


//get current time 
    const now  = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    let time_string  = hours+ ":" + minutes;
//add list wrapper div 
    const new_list_wrapper =document.createElement("div")
    new_list_wrapper.id = "new_list_wrapper"
    new_list_wrapper.classList.add("flex-list")
    notes_list.appendChild(new_list_wrapper)
//add new div
    const new_div=document.createElement("div")
    new_div.classList.add("listui")
    new_div.id = "new_div"
    new_list_wrapper.appendChild(new_div)
    new_div.dataset.key = notekey
// add title div
    const new_text_div=document.createElement("div")
    new_text_div.textContent = title
    new_text_div.id = "new_text_div" 
    new_div.appendChild(new_text_div)
//add description div
    const new_description_div=document.createElement("div")
    new_description_div.textContent = text
    new_description_div.id = "new_description_div"
    new_div.appendChild(new_description_div)
// add time div
    const new_time_div =  document.createElement("div")
    new_time_div.textContent = time_string
    new_time_div.id = "new_time_div"
    new_text_div.appendChild(new_time_div)
//add new button wrapper div 
    const new_wrapper_div= document.createElement("div")
    new_wrapper_div.id= "div-button-wrapper"
    new_div.appendChild(new_wrapper_div)
// add edit button
    const edit_button =document.createElement("button")
    edit_button.classList.add("edit-buttonui")
    edit_button.innerHTML = "✏️"
//add delete button
    const delete_button =document.createElement("button")
    delete_button.classList.add("delete-buttonui")
    delete_button.id = "delete_button"
    delete_button.innerHTML ="🗑️"

    new_wrapper_div.appendChild(edit_button)
    new_wrapper_div.appendChild(delete_button)







    navbar1.style.display="flex";
    navbar2.style.display = "none";
    navbar3.style.display="none"
    input.value="";
    attach_edit_listener();
    attach_delete_listener()
    show_notes_list();

}

