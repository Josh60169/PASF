//initialize supabase
const{createClient} = window.supabase;
const supabaseURL  = "https://weqsojkxxgxhdljikuaa.supabase.co";
const supabaseAnonKey  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcXNvamt4eGd4aGRsamlrdWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNTMsImV4cCI6MjAzOTY0NzM1M30.08k0uw8gcUH-VYFHSbQEVlUbXDqTltxmh7COtAEJfIA";

supabase = createClient(supabaseURL, supabaseAnonKey);

//Login
const loginBtn = document.getElementById("loginBtn");
loginBtn?.addEventListener("click", async () =>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //const {error, session} = await supabase.auth.signInWithPassword(email, password); //this line is missing the curly bracket that is why it did not work
    const { error } = await supabase.auth.signInWithPassword({email: email, password: password});
    document.getElementById("email").textContent = "Email: "+email;
    if(error){
        document.getElementById("error-msg").textContent = error.message;
    }else {
        window.location.href ='mainMenu.html';
    }
});

//Signup
const signupBtn = document.getElementById("signup_btn");
signupBtn?.addEventListener("click", async () =>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const city = document.getElementById("city").value;
    if(firstName && lastName && city){
        const{error: signupError} = await supabase.auth.signUp({email, password});
        if(signupError){
            document.getElementById("error-msg").textContent = signupError.message;
        } else {
            const{error: insertError} = await supabase.from('table1').insert([{
                firstname: firstName, lastname: lastName, city: city, email: email
            }]);


            if(insertError){
                document.getElementById("error-msg").textContent = insertError.message;
            }else{
                window.location.href = 'index.html';
            }
        }
    }else
        document.getElementById("error-msg").textContent = "ERROR: Missing Info, please make sure first name, last name, and city are all filled in.";

})
