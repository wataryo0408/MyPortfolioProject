'use strict'
{
    const WAGE = 1050;
    const days = document.getElementById("days");
    const inputWindow = document.getElementById("inputWindow");



    for(var i = 0; i < 31; i++){
        days.appendChild(document.createElement("div"));
    }
    
    for(var i = 0; i < 31; i++){
        
        days.children[i].appendChild(document.createElement("p"));
        days.children[i].children[0].textContent = `${(i +1)}`;
        
        days.children[i].appendChild(document.createElement("p"));
        // days.children[i].children[1].textContent = "--:--~--:--";

        days.children[i].appendChild(document.createElement("p"));
        // days.children[i].children[2].textContent = 0;
        
    }
    
    for(var i = 0; i < 31; i++){
        days.children[i].addEventListener('click',(e)=>{
            if(document.getElementById("result").classList.contains("hidden") === false){
                document.getElementById("result").classList.add("hidden");
            }
            inputWindow.children[0].textContent = `4月${e.target.children[0].textContent}日の予定`;
            document.getElementsByClassName.style.transform = `translateY(${e.offsetY}px)`
            inputWindow.classList.remove("hidden");
            
            document.getElementById("ok").addEventListener("click",()=>{
                const sh = inputWindow.children[1].value;
                const sm = inputWindow.children[2].value;
                const fh = inputWindow.children[3].value;
                const fm = inputWindow.children[4].value;
                e.target.children[1].textContent = `${sh}:${sm}~${fh}:${fm}`;
                e.target.children[2].textContent = WAGE*(fh - sh + (fm - sm) / 60);
                // 3-1 + 4-2 /60
                // wageTotal = wageTotal + WAGE*(fh - sh + (fm - sm) / 60);
                // document.getElementById("wt").textContent = wageTotal;
                inputWindow.classList.add("hidden");
            });
            document.getElementById("back").addEventListener("click",()=>{
                inputWindow.classList.add("hidden");
            });
        });
    }
    document.getElementById("cal").addEventListener('click',()=>{
        var wageTotal = 0;
        
        for(var i = 0; i < 31; i++){
            wageTotal = wageTotal + Number(days.children[i].children[2].textContent);
        }
        document.getElementById("wt").textContent = "¥" + wageTotal;
        if(inputWindow.classList.contains("hidden") === false){
            inputWindow.classList.add("hidden");
        }
        document.getElementById("result").classList.remove("hidden");
    });

  
    for(var i = 0; i < 25; i++){
        document.getElementById("listH").appendChild(document.createElement("option"));
        document.getElementById("listH").children[i].textContent = i;
    }
    for(var i = 0; i < 4; i++){
        document.getElementById("listM").appendChild(document.createElement("option"));
        document.getElementById("listM").children[i].textContent = i * 15;
    }



}
