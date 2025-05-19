document.getElementById("FEC_updateBtn").addEventListener('click',async () => {
    //grab data from text boxs
    const Acurve= document.getElementById("A_curve").value;
    const Bcurve= document.getElementById("B_curve").value;
    const Ccurve= document.getElementById("C_curve").value;
    const Dcurve= document.getElementById("D_curve").value;
    const gradePercent = document.getElementById("grade_percent").value/100;
    let currentGrade;

    //change current grade from letter to percent
    if(document.getElementById("current_grade").value=="a"||document.getElementById("current_grade").value=="A"){
        currentGrade=Acurve;
    }else if(document.getElementById("current_grade").value=="b"||document.getElementById("current_grade").value=="B"){
        currentGrade=Bcurve;
    }else if(document.getElementById("current_grade").value=="c"||document.getElementById("current_grade").value=="C"){
            currentGrade=Ccurve;
    }else if(document.getElementById("current_grade").value=="d"||document.getElementById("current_grade").value=="D"){
            currentGrade=Dcurve;
    }else{
        currentGrade=document.getElementById("current_grade").value;
    }

    let willIsNotTaken=true
    //calculate A grade
    let grade=Math.round((Acurve-currentGrade*(1-gradePercent))/gradePercent * 100) / 100;
    if(grade<=105&&grade>=0){
        document.getElementById("A").textContent=" You need at least "+grade+"% on the Final to get a A.";
    }else if(currentGrade>Acurve && grade<0&&willIsNotTaken){
        document.getElementById("A").textContent="You will get at least a A as your final grade";
        willIsNotTaken=false
    }else
        document.getElementById("A").textContent="You can not get a A as your final grade";

    //calculate B grade
    grade=Math.round((Bcurve-currentGrade*(1-gradePercent))/gradePercent * 100) / 100;
    if(grade<=100&&grade>=0){
        document.getElementById("B").textContent=" You need at least "+grade+"% on the Final to get a B.";

    }else if(currentGrade>Bcurve && grade<0&&willIsNotTaken){
        document.getElementById("B").textContent="You will get at least a B as your final grade";
        willIsNotTaken=false
    }else
        document.getElementById("B").textContent="You can not get a B as your final grade";

    //calculate C grade
    grade=Math.round((Ccurve-currentGrade*(1-gradePercent))/gradePercent * 100) / 100;
    if(grade<=100&&grade>=0){
        document.getElementById("C").textContent=" You need at least "+grade+"% on the Final to get a C.";
    }else if(currentGrade>Ccurve && grade<0&&willIsNotTaken){
        document.getElementById("C").textContent="You will get at least a C as your final grade";
        willIsNotTaken=false
    }else
        document.getElementById("C").textContent="You can not get a C as your final grade";

    //calculate D grade
    grade=Math.round((Dcurve-currentGrade*(1-gradePercent))/gradePercent * 100) / 100;
    if(grade<=100&&grade>=0){
        document.getElementById("D").textContent=" You need at least "+grade+"% on the Final to get a D.";
    }else if(currentGrade>Dcurve && grade<0&&willIsNotTaken){
        document.getElementById("D").textContent="You will get at least a D as your final grade";
        willIsNotTaken=false
    }else
        document.getElementById("D").textContent="You can not get a D as your final grade";

});
