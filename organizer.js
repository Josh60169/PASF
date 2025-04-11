//initialize supabase
const{createClient} = window.supabase;
const supabaseURL  = "https://weqsojkxxgxhdljikuaa.supabase.co";
const supabaseAnonKey  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcXNvamt4eGd4aGRsamlrdWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNTMsImV4cCI6MjAzOTY0NzM1M30.08k0uw8gcUH-VYFHSbQEVlUbXDqTltxmh7COtAEJfIA";
// variables for organizer
let tasks = [];
let idAssigner = 1;
supabase = createClient(supabaseURL, supabaseAnonKey);
//fetch amd display user data
const profileDataDiv = document.getElementById("profile-data");
let sessions = null;
async function getSession(){
    sessions = await supabase.auth.getSession();
    return sessions;
}
//call the async function
getSession().then(sessions =>{
    console.log(sessions);
}).catch(error =>{console.log('Error fetching session: ', error);
});
async function getUserProfile(){
    const {data: userProfile, error} = await supabase.from('table1').select();//'*').eq('id',session.user.id).single();
    if(error){
        console.log('Error fetching user data: ',error);
        return null;
    }
    return userProfile;
}
async function fetchProfile(){
    const sessions = await supabase.auth.getSession();
    const userProfile = (await getUserProfile(sessions))[0];
    if (userProfile) {
        console.log('User profile: ', userProfile);
        //fetch user data and save to the tasks array
        if (userProfile.task != null) {
            tasks = (userProfile.task);
            idAssigner = (userProfile.task.length + 1);
            console.log(idAssigner);
        }
        updateDisplay();
    }
}
fetchProfile().catch((error) => {
    console.log('Error: ',error);
})
// opens and closes the form if the buttons are clicked
const addBtnClicked = () => {
    document.getElementById("sort-form").style.display= 'none';
    document.getElementById("remove-form").style.display= 'none';
    document.getElementById('error-msg').style.display= 'none';
    let form = document.getElementById("add-form");
    if (form.style.display === 'none')
        form.style.display = 'inline';
    else
        form.style.display = 'none';
};
// opens and closes the form if the buttons are clicked
const removeBtnClicked = () => {
    document.getElementById("add-form").style.display= 'none';
    document.getElementById("sort-form").style.display= 'none';
    document.getElementById('error-msg').style.display= 'none';
    let form = document.getElementById("remove-form");
    if (form.style.display === 'none')
        form.style.display = 'inline';
    else
        form.style.display = 'none';
};
const sortBtnClicked = () => {
    document.getElementById("add-form").style.display= 'none';
    document.getElementById("remove-form").style.display= 'none';
    document.getElementById('error-msg').style.display= 'none';
    let form = document.getElementById("sort-form");
    if (form.style.display === 'none')
        form.style.display = 'inline';
    else
        form.style.display = 'none';
};
let taskImportance = document.getElementById('org-importance-slider').value;
taskImportance.addEventListener('input', function (){

})
document.getElementById("add-form").addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('add-form').style.display = 'none';
    // Add the info of the task to the array and assigns ID (priority) number
    let taskName = document.getElementById('org-name-txtbox').value;
    let taskImportance = document.getElementById('org-importance-slider').value;
    let dueMonth = parseInt(document.getElementById('org-date-month').value);
    let dueDay = parseInt(document.getElementById('org-date-day').value);
    if(dueMonth>0&&dueMonth<12&&dueDay>0&&dueDay<31){
        tasks.push([taskName, taskImportance, dueMonth, dueDay, idAssigner]);
        idAssigner++;
    }else {
        console.log("Error: Invalid Date");
        document.getElementById('error-msg').textContent="Error: Invalid Date";
        document.getElementById('error-msg').style.display = 'block';
    }
    updateSupabaseArrays();
    // re-render the display
    updateDisplay();
});
document.getElementById("remove-form").addEventListener('submit', (event) => {
    event.preventDefault();
    let idToRemove = document.getElementById("org-remove-txtbox").value;
    removeTask(idToRemove);
    document.getElementById("remove-form").style.display = 'none';
    updateDisplay();
});


const updateDisplay = () => {
    let assignmentsDisplay = document.getElementById('assignments-list');
    let priorityDisplay = document.getElementById('priority-list');
    // clears display
    assignmentsDisplay.innerHTML = '';
    priorityDisplay.innerHTML = '';
    // re-renders assignment list
    for (let i = 0; i < tasks.length; i++) {
        let newAssignment = document.createElement('li');
        newAssignment.innerText = `${tasks[i][0]}   \nDue Date: ${tasks[i][2]}/${tasks[i][3]}`;
        assignmentsDisplay.appendChild(newAssignment);
    }
    // re-renders priority list
    for (let j = 0; j < tasks.length; j++) {
        let newId = document.createElement('li');
        newId.innerText = `index:${tasks[j][4]} \npriority:${tasks[j][1]} \n`;
        priorityDisplay.appendChild(newId);
    }
};
const removeTask = (id) => {
    tasks.splice(id - 1, 1);
    for (let i = 0; i < tasks.length; i++) {
        tasks[i][4] = i + 1;
        //console.log('hi')
        console.log(tasks[i][4]);
    }
    idAssigner--
    updateSupabaseArrays();
};

const updateSupabaseArrays = async () => {
    const userProfile = await getUserProfile(sessions);
    console.log(userProfile);
    if (userProfile) {
        const userUUID = userProfile[0].id;
        const {error} =
            await supabase.from('table1').update({
                task: tasks,
            }).eq('id', userUUID);
        if (error) {
            console.log("orginizer.js: Error updating data: ", error.message);
        }
    } else {
        console.log('orginizer.js: Custom error: userProfile not found');
    }
}
function arrSort(arr, index) {
    //index 1=priority 2=month 3=day
    if (index === 2 || index === 3)
        arr = arr.sort((b, a) => b[index] - a[index]);
    else 
        arr = arr.sort((a, b) => b[index] - a[index]);

    for (let i = 0; i < tasks.length; i++) {
        tasks[i][4] = i + 1;
    }
    return arr;
}
document.getElementById("sortByPriority").addEventListener('click', (event) => {
    tasks = arrSort(arrSort(arrSort(tasks, 3), 2), 1);
    updateSupabaseArrays();
    updateDisplay();
})
document.getElementById("sortByDueDate").addEventListener('click', (event) => {
    tasks = arrSort( arrSort( arrSort(tasks, 1), 3), 2);
    updateSupabaseArrays();
    updateDisplay();
})