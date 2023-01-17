var gameActions = {

    strikes: 0,

    wrongAction(){
    
        this.strikes += 1;

        document.getElementById("strikes").innerHTML += 'X ';

        timer.end();
        timer.start(this.strikes);

        if(this.strikes === 3){
            this.fail();
        }
    
    },
    
    rightAction(moduleName){
    
        console.log(`${moduleName}Slot`);

        document.getElementById(`${moduleName}Slot`).getElementsByClassName('light')[0].id = 'on';
        console.log(moduleName + ' correct');
    
    },

    fail(){
        
        window.location.replace("index.html?fail=true");

    }

}
