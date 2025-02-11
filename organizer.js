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

const addBtnClicked = () => {
    let form = document.getElementById("add-form");
    if (form.style.display === 'none')
        form.style.display = 'inline';
    else
        form.style.display = 'none';
};

const removeBtnClicked = () => {
    let form = document.getElementById("remove-form");
    if (form.style.display === 'none')
        form.style.display = 'inline';
    else
        form.style.display = 'none';
};

document.getElementById("add-form").addEventListener('submit', (event) => {
    event.preventDefault();


});

document.getElementById("remove-form").addEventListener('submit', (event) => {
    event.preventDefault();


});