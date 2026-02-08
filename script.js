const notes_list = document.getElementById("notes-list")
const editor = document.getElementById("editor")
const navbar1 = document.getElementById("navbar1")
const navbar2 = document.getElementById("navbar2")
const navbar3 = document.getElementById("navbar3")
const input = document.getElementById("input")
const inputWrapper = document.querySelector(".input-wrapper");
const note_title = document.getElementById("untitle")
const emptyState = document.getElementById("emptyState");
var count = 0;
function syncCountWithStorage() {
    let maxKey = -1;

    for (let i = 0; i < localStorage.length; i++) {
        const key = parseInt(localStorage.key(i), 10);
        if (!isNaN(key)) {
            maxKey = Math.max(maxKey, key);
        }
    }

    count = maxKey + 1;
}
let current_key =null;
function loadNotesFromStorage() {
    notes_list.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let noteData;
        try {
            noteData = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            continue;
        }

        const new_list_wrapper = document.createElement("div");
        new_list_wrapper.classList.add("flex-list");

        const new_div = document.createElement("div");
        new_div.classList.add("listui");
        new_div.dataset.key = key;

        // Content Wrapper
        const content = document.createElement("div");
        content.classList.add("note-content");

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("note-title");
        titleDiv.textContent = noteData.title || "Untitled";

        const descDiv = document.createElement("div");
        descDiv.classList.add("note-desc");
        descDiv.textContent = noteData.text;

        content.appendChild(titleDiv);
        content.appendChild(descDiv);
        new_div.appendChild(content);

        // Time Div
        const new_time_div = document.createElement("div");
        new_time_div.classList.add("note-time"); 
        new_time_div.textContent = noteData.time || "Saved earlier";
        new_div.appendChild(new_time_div);

        // Button Wrapper
        const new_wrapper_div = document.createElement("div");
        new_wrapper_div.classList.add("button-wrapper");

        const edit_button = document.createElement("button");
        edit_button.classList.add("edit-buttonui");
        edit_button.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'

        const delete_button = document.createElement("button");
        delete_button.classList.add("delete-buttonui");
        delete_button.innerHTML ='<i class="fa-solid fa-trash"></i>'

        new_wrapper_div.appendChild(edit_button);
        new_wrapper_div.appendChild(delete_button);
        new_div.appendChild(new_wrapper_div);

        new_list_wrapper.appendChild(new_div);
        notes_list.appendChild(new_list_wrapper);
    }

    attach_edit_listener();
    attach_delete_listener();
    toggleEmptyState();
}


function toggleEmptyState() {
    if (notes_list.children.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
}
function show_notes_list(){    
    editor.style.animation = "slideDown 0.25s ease-in forwards";
    setTimeout(()=>{
        editor.style.display="none";
    },250)
    
    notes_list.style.animation = "none";
    notes_list.style.transform = "none";

    notes_list.style.display = "flex";
}
function show_editor(){
    editor.style.display="block"; 
    notes_list.style.animation = "slideRight 0.25s ease-in forwards";

    setTimeout(() => {
        notes_list.style.display="none"
    }, 250);
    editor.style.animation = "slideUp 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards";

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
        const data = JSON.parse(localStorage.getItem(current_key));

        input.value = data.text;
        note_title.value = data.title;

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
            current_div_wrapper.remove();
            toggleEmptyState();
        })
    })
    
toggleEmptyState();
}
function savechanges() {
    const updatedNote = {
        title: note_title.value.trim() || "Untitled",
        text: input.value,
        time: "Edited just now"
    };
    localStorage.setItem(current_key, JSON.stringify(updatedNote));
    
    const edited_div = document.querySelector(`.listui[data-key="${current_key}"]`);

    if (edited_div) {
        const titleDiv = edited_div.querySelector(".note-title");
        const descDiv = edited_div.querySelector(".note-desc");

        titleDiv.textContent = updatedNote.title;
        descDiv.textContent = updatedNote.text;
    }
    
    navbar1.style.display = "flex";
    navbar2.style.display = "none";
    navbar3.style.display = "none";
    show_notes_list();
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
        show_notes_list();
        navbar2.style.display = "none";
        navbar3.style.display ="none"
        navbar1.style.display="flex";
        return 
    }



//get current time 
    const now  = new Date();
    const hours = String(now.getHours()).padStart(2, "0");;
    const minutes = String(now.getMinutes()).padStart(2, "0");
    let time_string  = "Created At: "+ hours + ":" + minutes;


    const notekey = count;
    const noteData = {
    title: title,
    text: text,
    time: time_string
    };

    localStorage.setItem(notekey, JSON.stringify(noteData));
    count++; 



//add list wrapper div 
    const new_list_wrapper =document.createElement("div")
    
    new_list_wrapper.classList.add("flex-list")
    notes_list.appendChild(new_list_wrapper)
//add new div
    const new_div=document.createElement("div")
    new_div.classList.add("listui")
  
    new_list_wrapper.appendChild(new_div)
    new_div.dataset.key = notekey
// add title div
    const content = document.createElement("div");
    content.classList.add("note-content");
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("note-title");
    titleDiv.textContent = title;
//add description div
    const descDiv = document.createElement("div");
    descDiv.classList.add("note-desc");
    descDiv.textContent = text;


    content.appendChild(titleDiv);
    content.appendChild(descDiv);
    new_div.appendChild(content);




// add time div
    const new_time_div =  document.createElement("div")
    new_time_div.textContent = time_string
    new_time_div.classList.add("note-time");
    new_div.appendChild(new_time_div)
//add new button wrapper div 
    const new_wrapper_div= document.createElement("div")
    new_wrapper_div.classList.add("button-wrapper");
    new_div.appendChild(new_wrapper_div)
// add edit button
    const edit_button =document.createElement("button")
    edit_button.classList.add("edit-buttonui")
    edit_button.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
//add delete button
    const delete_button =document.createElement("button")
    delete_button.classList.add("delete-buttonui")

    delete_button.innerHTML ='<i class="fa-solid fa-trash"></i>'

    new_wrapper_div.appendChild(edit_button)
    new_wrapper_div.appendChild(delete_button)







    navbar1.style.display="flex";
    navbar2.style.display = "none";
    navbar3.style.display="none"
    input.value="";
    note_title.value=""
    attach_edit_listener();
    attach_delete_listener()
    show_notes_list();
    toggleEmptyState();

}
toggleEmptyState();
syncCountWithStorage();
loadNotesFromStorage();