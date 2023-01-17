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

window.onload = (event) => {

    const desiredModules = ['wires', 'keypad', 'button', 'simonSays', 'whosOnFirst', 'memory'];
    Bomb = new bomb(desiredModules);

    
    initialiseTimer();

    timer.initialiseTimeRemaining();
    outputHTML();
    timer.start(0);
};
