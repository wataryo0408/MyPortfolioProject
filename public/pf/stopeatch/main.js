'use strict'

{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    let startTime;
    let timeoutId;
    let elapsedTime = 0;

    function countUp(){
        const d = new Date(Date.now() - startTime + elapsedTime);
        const m = String(d.getMinutes()).padStart(2,'0');
        const s = String(d.getSeconds()).padStart(2,'0');
        const ms = String(d.getMilliseconds()).padStart(3,'0');
        timer.textContent = `${m}:${s}.${ms}`;

        timeoutId = setTimeout(() =>{
            countUp();

        },10)
    }

    function setBtnStateStart(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');
    }
    function setBtnStateRunning(){
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');
    }
    function setBtnStateStoped(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    setBtnStateStart();

    start.addEventListener('click',() =>{
        if(start.classList.contains('inactive') == true){
            return;
        }
        setBtnStateRunning();
        startTime = Date.now();
        countUp();
    })

    stop.addEventListener('click',() =>{
        if(stop.classList.contains('inactive') == true){
            return;
        }
        setBtnStateStoped();
        clearTimeout(timeoutId);
        elapsedTime += Date.now() - startTime;
    })

    reset.addEventListener('click',() =>{
        if(reset.classList.contains('inactive') == true){
            return;
        }
        setBtnStateStart();
        timer.textContent = '00:00.000'
        startTime = Date.now();
        elapsedTime = 0;
    })
    
}