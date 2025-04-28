//initialize supabase
const{createClient} = window.supabase;
const supabaseURL  = "https://weqsojkxxgxhdljikuaa.supabase.co";
const supabaseAnonKey  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcXNvamt4eGd4aGRsamlrdWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNTMsImV4cCI6MjAzOTY0NzM1M30.08k0uw8gcUH-VYFHSbQEVlUbXDqTltxmh7COtAEJfIA";

supabase = createClient(supabaseURL, supabaseAnonKey);
//update display user data
let session = null;

async function getSession(){
    session = await supabase.auth.getSession();
    return session;
}

//call the async function
getSession().then(session =>{
    console.log(session);
}).catch(error =>{console.log('Error fetching session: ', error);
});

async function getUserProfile(){
    const {data: userProfile, error} = await supabase.from('table1').select();

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
const logout_btn =document.getElementById('logout_btn');
logout_btn.addEventListener('click', async() => {
    window.location.href="logout.html";
})

const update_btn=document.getElementById('update_btn');
update_btn.addEventListener('click',async () => {
    const userProfile = await getUserProfile(session);

    if (userProfile){
        const firstName = userProfile.firstname;
        const lastName =userProfile.lastname;
        const city = userProfile.city;

        const { error } =
            await supabase.from('table1').update({
                firstname: document.getElementById("change-first-name").value,
                lastname: document.getElementById("change-last-name").value,
                city: document.getElementById("change-city").value,
            }).eq('id', userProfile[0].id);


        if (error){
            console.log("data.js: Error updating data: ",error.message);
            document.getElementById("error-msg").textContent = "data.js: Error updating data: "+error.message;

            console.log("data.js: MAJOR ERROR\nFailed to save data, attempting to revert data to a previous version to avoid corruption...");

            const {error2} =
                await supabase.from('table1').update({
                    firstname: firstName,
                    lastname: lastName,
                    city: city
                }).eq('id',userUUID);
            if (error2){
                console.log("data.js: MAJOR ERROR\nFailed to revert data to a previous version to avoid data corruption.");
            }
        } else {
            window.location.href ='account.html';
        }
    } else {
        console.log('data.js: Custom error: userProfile not found');
        document.getElementById("error-msg").textContent = "data.js: Custom error: userProfile not found";
    }
});