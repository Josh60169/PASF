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

async function fetchProfile(){
    const sessions = await supabase.auth.getSession();
    const userProfile = (await getUserProfile(sessions))[0];
    if (userProfile){
        console.log('User profile: ', userProfile);
        document.getElementById("change-first-name").value=userProfile.firstname;
        document.getElementById("change-last-name").value=userProfile.lastname;
        document.getElementById("change-city").value=userProfile.city;
        document.getElementById("email").textContent=userProfile.email;
    }
}

fetchProfile().catch((error) => {
    console.log('Error: ',error);
})
const update_btn=document.getElementById('update_btn');
update_btn.addEventListener('click',async () => {
    const userProfile = await getUserProfile(sessions);
    console.log(userProfile);
    if (userProfile){
        const userUUID = userProfile[0].id;

        const { error } =
            await supabase.from('table1').update({
                firstname: document.getElementById("change-first-name").value,
                lastname: document.getElementById("change-last-name").value,
                city: document.getElementById("change-city").value,
            }).eq('id', userUUID);

        if (error){
            console.log("update.js: Error updating data: ",error.message);
            document.getElementById("error-msg").textContent = "update.js: Error updating data: "+error.message;
            // Anthony: add a preventative measure; if we fail to update/save, we need to revert to a previous version to avoid data corruption
        } else {
            window.location.href ='account.html';
        }
    } else {
        console.log('data.js: Custom error: userProfile not found');
        document.getElementById("error-msg").textContent = "data.js: Custom error: userProfile not found";
    }
});