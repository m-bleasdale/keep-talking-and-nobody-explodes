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

    },

    play: {

        morseCode(){

            const orginalSequence = bombConfig.morseCodeWordSelected.code;

            function setDark(){
                document.getElementById('morseOutput').setAttribute('style', 'background-color:gray');
            }

            function outputMorse(codeSequence){
                document.getElementById('morseOutput').setAttribute('style', 'background-color:white');
                const currentSymbol = codeSequence.shift();
                let delay;
                if(currentSymbol == '.'){
                    delay = 500;
                }
                else if(currentSymbol == '-'){
                    delay = 1000;
                }
                else if(currentSymbol == ' '){
                    setDark();
                    delay = 2000;
                }
                
                if(codeSequence.length > 0){
                    setTimeout(setDark, delay);
                    setTimeout(outputMorse, delay + 500, codeSequence);
                }
                else{
                    setDark();
                    setTimeout(outputMorse, 4000, JSON.parse(JSON.stringify(orginalSequence)));
                }

            }

            outputMorse(JSON.parse(JSON.stringify(orginalSequence)));

        }

    }

}
