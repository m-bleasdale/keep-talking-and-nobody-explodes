var playerActions = {

    wire:{

        cut(correctWire, wireID){

            document.getElementById(wireID).setAttribute("class", "cutWire");
        
            if(correctWire == true){
                gameActions.rightAction('wire');
            }
            else{
                gameActions.wrongAction();
            }
        
        }

    },

    keypad:{

        buttons: [],

        lockInput(buttons){
            buttons.forEach(button => {
                document.getElementById(`keypadButton${button}`).removeAttribute('onclick');
                this.buttons = [];
            });
        },

        resetButtonList(buttons){
            buttons.forEach(button => {
                document.getElementById(`keypadButton${button}`).setAttribute("class", "keypadButton");
                this.buttons = [];
            });

        },

        buttonPressed(symbol){

            function correctOrder(buttons){
        
                const sortedButtons = buttons;

                if(JSON.stringify(buttons) === JSON.stringify(sortedButtons.sort(function(a, b){return a - b}))){
                    return true;
                }
                else{
                    return false;
                }
            }

            if(!this.buttons.includes(symbol)){
                this.buttons.push(symbol);
                document.getElementById(`keypadButton${symbol}`).setAttribute("class", "pressedKeypadButton");
            } 
        
            if(this.buttons.length == 4){

                if(correctOrder(this.buttons) == true){
                    this.lockInput(this.buttons);
                    gameActions.rightAction('keypad');
                }
                else{
                    window.setTimeout(() => this.resetButtonList(this.buttons), 2000);
                    gameActions.wrongAction();
                }

            }
        },

    },

    button:{

        timeDown: undefined,
        timeToRelease: undefined,

        timeGet(){
            const dateDown = new Date();
            return dateDown.getTime();
        },

        down(timeToRelease){

            console.log('down');

            this.timeToRelease = timeToRelease;

            if(this.timeToRelease == 'tap'){
                this.timeDown = this.timeGet();
            }

        },

        up(){

            console.log('up');

            if(this.timeToRelease == 'tap'){

                timeDifferenceMilliSec = this.timeGet() - this.timeDown;
                if(timeDifferenceMilliSec < 500){
                    gameActions.rightAction('button');
                    this.lockInput()
                }
                else gameActions.wrongAction();

            }
            else{
                
                const timerCharacters = timer.formattedTime().split('');

                timerCorrect = false;

                timerCharacters.forEach(character => {
                    if(character == this.timeToRelease){
                        gameActions.rightAction('button');
                        timerCorrect = true;
                        this.lockInput();
                    }
                });

                if(timerCorrect == true) return;

                gameActions.wrongAction();

            }

        },

        lockInput(){
            document.getElementById('buttonContainer').removeAttribute('onmousedown');
            document.getElementById('buttonContainer').removeAttribute('onmouseup');
        }

    },

    simonSays:{

        buttons: document.getElementsByClassName('simonSaysButton'),

        buttonOrder: [],
        desiredButtonOrder: [],
        
        playersTurn: false,
        NumberOfButtonsPressed: 0,

        start(){

            this.stage(1);
            document.getElementById('simonSaysStart').removeAttribute('onclick')

        },

        stage(NumberOfButtonsToAdd){

            this.playersTurn = false;

            function resetButton(buttonColour){
                document.getElementById(`simonSays${buttonColour}`).setAttribute('style', `background-color:${bombConfig.simonSaysDefaultColours[buttonColour]}`);
            }

            function getCorrespondingColour(newButton){

                if(Bomb.containsVowel){
                    if(gameActions.strikes == 0){

                        switch(newButton){
                            case 'Red':
                                return 'Blue';
                            case 'Blue':
                                return 'Red';
                            case 'Green':
                                return 'Yellow';
                            case 'Yellow':
                                return 'Green';
                        }

                    }
                    else if(gameActions.strikes == 1){

                        switch(newButton){
                            case 'Red':
                                return 'Yellow';
                            case 'Blue':
                                return 'Green';
                            case 'Green':
                                return 'Blue';
                            case 'Yellow':
                                return 'Red';
                        }

                    }
                    else if(gameActions.strikes == 2){

                        switch(newButton){
                            case 'Red':
                                return 'Green';
                            case 'Blue':
                                return 'Red';
                            case 'Green':
                                return 'Yellow';
                            case 'Yellow':
                                return 'Blue';
                        }

                    }
                }
                else{

                    if(gameActions.strikes == 0){

                        switch(newButton){
                            case 'Red':
                                return 'Blue';
                            case 'Blue':
                                return 'Yellow';
                            case 'Green':
                                return 'Green';
                            case 'Yellow':
                                return 'Red';
                        }

                    }
                    else if(gameActions.strikes == 1){

                        switch(newButton){
                            case 'Red':
                                return 'Red';
                            case 'Blue':
                                return 'Blue';
                            case 'Green':
                                return 'Yellow';
                            case 'Yellow':
                                return 'Green';
                        }

                    }
                    else if(gameActions.strikes == 2){

                        switch(newButton){
                            case 'Red':
                                return 'Yellow';
                            case 'Blue':
                                return 'Green';
                            case 'Green':
                                return 'Blue';
                            case 'Yellow':
                                return 'Red';
                        }

                    }
                }

            }

            if(this.buttonOrder.length < 4){

                let newButton;

                for(let i = 0; i < NumberOfButtonsToAdd; i++){

                    while(this.buttonOrder.includes(newButton) || !newButton){
                        newButton = bombConfig.simonSaysButtons[Math.floor(Math.random() * bombConfig.simonSaysButtons.length)];
                    }
        
                    this.buttonOrder.push(newButton);
                    this.desiredButtonOrder.push(getCorrespondingColour(newButton));

                }
                
            }

            let intervalCount = 0;
            
            const buttonLoop = setInterval(() => {
                
                const button = this.buttonOrder[intervalCount]

                document.getElementById(`simonSays${button}`).setAttribute('style', `background-color:${button}`);
                setTimeout(resetButton, 1000, button);

                intervalCount += 1;

                if(intervalCount == this.buttonOrder.length){
                    clearInterval(buttonLoop);
                    this.playersTurn = true;
                }

            }, 1000);
            
        },

        lockInput(){

            for(let button of this.buttons){
                button.removeAttribute('onclick');
            }

        },

        click(buttonPressed){
            
            if(!this.playersTurn){
                return;
            }

            if(this.desiredButtonOrder[this.NumberOfButtonsPressed] == buttonPressed){
                this.NumberOfButtonsPressed += 1;

                if(this.NumberOfButtonsPressed == this.desiredButtonOrder.length){

                    if(this.desiredButtonOrder.length == 4){

                        gameActions.rightAction('simonSays');
                        this.lockInput();

                    }
                    else{

                        this.stage(1);
                        this.NumberOfButtonsPressed = 0;

                    }
                }
            }
            else{
                
                this.NumberOfButtonsPressed = 0;

                const NumberOfButtonsToAdd = this.buttonOrder.length;

                this.buttonOrder = [];
                this.desiredButtonOrder = [];

                this.stage(NumberOfButtonsToAdd);
                gameActions.wrongAction();

            }


        }

    },

    whosOnFirst:{

        click(correctButton){
            
            function lockInput(){
                
                for(button of document.getElementsByClassName('WOFButton')){
                    button.removeAttribute('onclick');
                }

            }

            if(correctButton == 'true'){
                gameActions.rightAction('whosOnFirst');
                lockInput();
            }
            else{
                gameActions.wrongAction();
            }

        }

    },

    memory:{

        stage: 1,

        click(buttonPressForEachStage, displayOrder){

            function lockInput(){
                for(button of document.getElementsByClassName(memoryButton)){
                    button.removeAttribute('onclick');
                }
            }

            if(buttonPressForEachStage[this.stage - 1] == true){
                if(this.stage == 5){
                    gameActions.rightAction('memory');
                    lockInput();
                    return;
                }

                this.stage += 1;
                console.log(displayOrder);
                console.log(this.stage);
                document.getElementById('memoryDisplay').innerHTML = displayOrder[this.stage - 1];
                document.getElementById('memoryStageCount').innerHTML = `Stage: <span>${this.stage}</span>`;
            }
            else{
                gameActions.wrongAction();
            }

        }

    }

}
