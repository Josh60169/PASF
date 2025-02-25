//initialize supabase
const{createClient} = window.supabase;
const supabaseURL  = "https://weqsojkxxgxhdljikuaa.supabase.co";
const supabaseAnonKey  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcXNvamt4eGd4aGRsamlrdWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNTMsImV4cCI6MjAzOTY0NzM1M30.08k0uw8gcUH-VYFHSbQEVlUbXDqTltxmh7COtAEJfIA";

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

// variables for organizer
const tasks = [];
let idAssigner = 1;

// opens and closes the form if the buttons are clicked
const addBtnClicked = () => {
    let form = document.getElementById("add-form");
    if (form.style.display === 'none')
        form.style.display = 'inline';
    else
        form.style.display = 'none';
};

// opens and closes the form if the buttons are clicked
const removeBtnClicked = () => {
    let form = document.getElementById("remove-form");
    if (form.style.display === 'none')
        form.style.display = 'inline';
    else
        form.style.display = 'none';
};

document.getElementById("add-form").addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('add-form').style.display = 'none';

    // Add the info of the task to the array and assigns ID (priority) number
    let taskName = document.getElementById('org-name-txtbox').value;
    let taskImportance = document.getElementById('org-importance-slider').value;
    let dueMonth = parseInt(document.getElementById('org-date-month').value);
    let dueDay = parseInt(document.getElementById('org-date-day').value);

    tasks.push([taskName, taskImportance, dueMonth, dueDay, idAssigner]);
    idAssigner++;

    // re-render the display
    updateDisplay();
});

document.getElementById("remove-form").addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('add-form').style.display = 'none';

    let idToRemove = document.getElementById("org-remove-txtbox").value;
    removeTask(idToRemove);
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
        newAssignment.innerText = `${tasks[i][0]}   Due Date: ${tasks[i][2]}/${tasks[i][3]}`;
        assignmentsDisplay.appendChild(newAssignment);
    }

    // re-renders priority list
    for (let j = 0; j < tasks.length; j++) {
        let newId = document.createElement('li');
        newId.innerText = `Id: ${tasks[j][4]}`;
        priorityDisplay.appendChild(newId);
    }
};

const removeTask = (id) => {
    tasks.splice(id - 1, 1);
    for (let i = 0; i < tasks.length; i++) {
        tasks[i][4] = i + 1;
        console.log('hi')
        console.log(tasks[i][4]);
    }
    idAssigner--;
};