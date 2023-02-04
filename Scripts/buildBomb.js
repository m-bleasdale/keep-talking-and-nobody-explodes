let Bomb;

function outputHTML(){

    document.getElementById('serialNumber').innerHTML += Bomb.serialNumber;
    document.getElementById('indicator').innerHTML += Bomb.indicator;

    for(let batteryCount = 0; batteryCount < Bomb.batteryCount; batteryCount++){
        document.getElementById('batteries').innerHTML += '<div class="battery"><div>+</div></div>';
    }

    count = 0;
    Bomb.build().forEach(module => {
        count += 1;
        document.getElementById(`slot${count}`).innerHTML += module;
    });

}

function initialiseTimer(){
    const urlParams = new URLSearchParams(window.location.search);

    const time = parseInt(urlParams.get('time'));

    if(time){

        if(Math.sign(time) === 1){

            console.log('yo');
            bombConfig.time = time;

        }

    }
    else{
        bombConfig.time = bombConfig.defaultTime;
    }

    const mins = Math.floor(bombConfig.time / 60);
    let seconds = String(bombConfig.time - mins * 60);

    if(seconds.length == 1) seconds = `0${seconds}`;

    document.getElementById('time').innerHTML = `${mins}:${seconds}`;
}

function selectModules(){

    let modules = [];
    let count = 0;
    while(count < 6){
        const module = bombConfig.modules[Math.floor(Math.random() * bombConfig.modules.length)];
        if(!modules.includes(module)){
            modules.push(module);
            count += 1;
        }
    }

    return modules;

}

window.onload = (event) => {

    const desiredModules = selectModules();
    Bomb = new bomb(desiredModules);

    
    initialiseTimer();

    timer.initialiseTimeRemaining();
    outputHTML();
    timer.start(0);
    gameActions.play.morseCode();

};
