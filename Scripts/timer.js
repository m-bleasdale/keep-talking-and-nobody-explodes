var timer = {

    countDown: undefined,

    timeRemaining: undefined,

    initialiseTimeRemaining(){

        this.timeRemaining = bombConfig.time;

    },

    start(strikeNumber){

        const intervalDelay = 1000 - (250 * strikeNumber);

        this.countDown = setInterval(() => {
            if(this.timeRemaining == 0){
                clearInterval(this.countDownID);
                this.finished();
                return;
            }

            this.timeRemaining -= 1;
    
            document.getElementById('time').innerHTML = this.formattedTime();
            
        }, intervalDelay);
    },

    formattedTime(){

        const mins = Math.floor(this.timeRemaining / 60);
        let seconds = String(this.timeRemaining - mins * 60);

        if(seconds.length == 1) seconds = `0${seconds}`;

        return `${mins}:${seconds}`;

    },

    end(){
        clearInterval(this.countDown);
    },
    
    finished(){
        
    }

};
