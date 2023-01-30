class bomb {
    constructor(desiredModules){

        const serialNumber = getSerialNumber();

        this.modules = desiredModules;
        this.serialNumber = serialNumber;
        this.indicator = indicator();
        this.batteryCount = Math.floor(Math.random() * 4);//0 - 3

        this.containsVowel = containsVowel();

        function indicator(){
            const indicator = bombConfig.commonIndicators[Math.floor(Math.random() * 6)];

            return indicator;
        }

        function getSerialNumber(){
            
            function randomNumber(){
                return Math.floor(Math.random() * 10);
            }

            let serialNumber = '';

            for(let count = 0; count < (bombConfig.serialNumberLength - 1); count++){

                const numberOrLetter = ['number', 'letter'][Math.round(Math.random())];

                if(numberOrLetter == 'number'){

                    serialNumber += randomNumber();

                }
                else{

                    const vowelOrConsonant = ['vowel', 'consonant', 'consonant'][Math.round(Math.random() * 2)];
                    let randomLetter;

                    if(vowelOrConsonant == 'vowel'){
                        randomLetter = bombConfig.serialNumberVowels[Math.floor(Math.random() * bombConfig.serialNumberVowels.length)];

                    }
                    else{
                        randomLetter = bombConfig.serialNumberConsonants[Math.floor(Math.random() * bombConfig.serialNumberConsonants.length)];
                    }

                    serialNumber += randomLetter

                }

            }

            serialNumber += randomNumber();

            return serialNumber;

        }

        function containsVowel(){
        
            const serialNumberSubstrings = serialNumber.split('');

            let containsVowel = false;
            bombConfig.serialNumberVowels.forEach(letter => {

                if(serialNumberSubstrings.includes(letter)){
                    containsVowel = true;
                }

            });

            return containsVowel;

        }
    }

    build(){

        var assembleComponent = { 

            serialNumber: this.serialNumber,
            indicator: this.indicator,
            batteryCount: this.batteryCount,

            wires(){

                const serialNumber = this.serialNumber;

                const wireColours = bombConfig.wireColours;
                const wireNumber = Math.floor(Math.random() * 4) + 3; //num between 3 - 6
            
                let wireOrder = [];
                let amountsOfWireColours = {
                    'red': 0,
                    'white': 0,
                    'blue': 0,
                    'yellow': 0,
                    'black': 0
                };
            
                while(wireOrder.length < wireNumber){
                    wireOrder.push(wireColours[Math.floor(Math.random() * (wireColours.length))]);
                }
            
                wireOrder.forEach(wire => {
                    amountsOfWireColours[wire] += 1;
                });
            
                function buildWireSlot(){
            
                    function targetWire(){
            
                        function lastNumberEven(){
                            if(Number(String(serialNumber).slice(-1)) % 2 == 0){
                                return true;
                            }
                            else{
                                return false;
                            }
                        }
                    
                        if(wireNumber == 3){
                            if(amountsOfWireColours['red'] == 0){
                                return 2;
                            }
                            else if(wireOrder[wireNumber - 1] == 'white'){
                                return wireNumber;
                            }
                            else if(amountsOfWireColours['blue'] > 1){
                                return wireOrder.lastIndexOf('blue') + 1;
                            }
                            else{
                                return wireNumber;
                            }
                        }
                        else if(wireNumber == 4){
                            if(amountsOfWireColours['red'] > 1 && lastNumberEven() == false){
                                return wireOrder.lastIndexOf('red') + 1;
                            }
                            else if(wireOrder[wireNumber - 1] == 'yellow' && amountsOfWireColours['red'] == 0){
                                return 1;
                            }
                            else if(amountsOfWireColours['blue'] == 1){
                                return 1;
                            }
                            else if(amountsOfWireColours['yellow'] > 1){
                                return wireNumber;
                            }
                            else{
                                return 2;
                            }
                        }
                        else if(wireNumber == 5){
                            if(wireOrder[wireNumber - 1] == 'black' && lastNumberEven() == false){
                                return 4;
                            }
                            else if(amountsOfWireColours['red'] == 1 && amountsOfWireColours['yellow'] > 1){
                                return 1;
                            }
                            else if(amountsOfWireColours['black'] == 0){
                                return 2;
                            }
                            else{
                                return 1;
                            }
                        }
                        else if(wireNumber == 6){
                            if(amountsOfWireColours['yellow'] == 0 && lastNumberEven() == false){
                                return 3;
                            }
                            else if(amountsOfWireColours['yellow'] == 1 && amountsOfWireColours['white'] > 1){
                                return 4;
                            }
                            else if(amountsOfWireColours['red'] == 0){
                                return wireNumber;
                            }
                            else{
                                return 4;
                            }
                        }
                
                    }

                    let wireSlot = ``;
                    let count = 0;
            
                    wireOrder.forEach(wire => {
                        
                        count += 1;
            
                        if(targetWire() == count){
                            wireSlot = `${wireSlot} <div class="wire" id="wire${count}" style="background-color:${wire}" onclick="playerActions.wire.cut(true, 'wire${count}');"></div>`;
                        }
                        else{
                            wireSlot = `${wireSlot} <div class="wire" id="wire${count}" style="background-color:${wire}" onclick="playerActions.wire.cut(false, 'wire${count}');"></div>`;
                        }
                        
            
                    });
            
                    return `<div id="wireSlot">
                            <span class="light" id="off"></span>
                            <div id="wireContainer">${wireSlot}</div>
                        </div>`;
            
                }
                
                return buildWireSlot();
            
            
            },

            button(){

                function determineOptionSelected(avaliableOptions){
                    return avaliableOptions[Math.floor(Math.random() * avaliableOptions.length)];
                }

                const buttonColour = determineOptionSelected(bombConfig.buttonColours);
                const buttonText = determineOptionSelected(bombConfig.buttonTexts);
                const stripColour = determineOptionSelected(bombConfig.stripColours);

                const batteryCount = this.batteryCount;
                const indicator = this.indicator;

                function buildButton(){

                    function targetAction(){

                        function holdButton(){
                            if(stripColour === 'blue'){
                                return 4;
                            }
                            else if(stripColour === 'yellow'){
                                return 5;
                            }
                            else{
                                return 1;
                            }
                        }
    
                        if(batteryCount > 1 && buttonText === 'Detonate'){
                            return 'tap';
                        }
                        else if(batteryCount > 2 && indicator === 'FRK'){
                            return 'tap';
                        }
                        else if(buttonColour === 'red' && buttonText === 'Hold'){
                            return 'tap';
                        }
                        else{
                            return holdButton();
                        }
    
                    }

                    const buttonSlot = 
                        `
                        <div id="buttonSlot">
                            <span class="light" id="off"></span>
                            <div id="buttonContainer" style="background-color:${buttonColour}" onmousedown="playerActions.button.down('${targetAction()}')" onmouseup="playerActions.button.up()">
                                <p id="buttonText">${buttonText}</p>
                            </div>
                            <div id="stripContainer" style="background-color:${stripColour}"></div>
                        </div>
                        `;

                    return buttonSlot;

                }

                return buildButton();

            },
            
            keypad(){
            
                const keypadColumn = Math.floor(Math.random() * 6) + 1;//1 - 6 
            
                let symbols = [];
            
                while (symbols.length < 4){
            
                    const randSymbol = Math.floor(Math.random() * 7) + 1;//1 - 7
                    if(!symbols.includes(randSymbol)) symbols.push(randSymbol);
                    
                }
            
                function buildKeypadSlot(){
            
                    const keyPadSlot = 
                        `
                        <div id="keypadSlot">
                            <span class="light" id="off"></span>
                            <div id="keypadContainer">
                                <div id="keys">
                                <img src="KeypadSymbols/Column${keypadColumn}/symbol${symbols[0]}.png" class="keypadButton" id="keypadButton${symbols[0]}" onclick="playerActions.keypad.buttonPressed(${symbols[0]})">
                                <img src="KeypadSymbols/Column${keypadColumn}/symbol${symbols[1]}.png" class="keypadButton" id="keypadButton${symbols[1]}" onclick="playerActions.keypad.buttonPressed(${symbols[1]})">
                                <img src="KeypadSymbols/Column${keypadColumn}/symbol${symbols[2]}.png" class="keypadButton" id="keypadButton${symbols[2]}" onclick="playerActions.keypad.buttonPressed(${symbols[2]})">
                                <img src="KeypadSymbols/Column${keypadColumn}/symbol${symbols[3]}.png" class="keypadButton" id="keypadButton${symbols[3]}" onclick="playerActions.keypad.buttonPressed(${symbols[3]})">
                                </div>
                            </div>
                        </div>
                        `;
            
                    return keyPadSlot;
                }
            
                return buildKeypadSlot();
            
            },

            simonSays(){

                return `
                <div id="simonSaysSlot">
                    <span class="light" id="off"></span>
                    <p id="simonSaysStart" onclick="playerActions.simonSays.start()">Start</p>
                    <div id="simonSaysContainer">
                        <div id="simonSaysButtons">
                            <div id="simonSaysBlue" class="simonSaysButton" onclick="playerActions.simonSays.click('Blue')" style="background-color: ${bombConfig.simonSaysDefaultColours['Blue']}"></div>
                            <div id="simonSaysYellow" class="simonSaysButton" onclick="playerActions.simonSays.click('Yellow')" style="background-color: ${bombConfig.simonSaysDefaultColours['Yellow']}"></div>
                            <div id="simonSaysRed" class="simonSaysButton" onclick="playerActions.simonSays.click('Red')" style="background-color: ${bombConfig.simonSaysDefaultColours['Red']}"></div>
                            <div id="simonSaysGreen" class="simonSaysButton" onclick="playerActions.simonSays.click('Green')" style="background-color: ${bombConfig.simonSaysDefaultColours['Green']}"></div>
                        </div>
                    </div>
                </div>
                `;

            },

            whosOnFirst(){

                function getStep1Display(){
                    const keys = Object.keys(bombConfig.whosOnFirstStep1Words);
                    return keys[Math.floor(Math.random() * keys.length)];
                }

                function getRandomStep2Word(){
                    const keys = Object.keys(bombConfig.whosOnFirstStep2Words);
                    return keys[Math.floor(Math.random() * keys.length)];
                }

                const step1Display = getStep1Display();
                const step2Word = getRandomStep2Word();

                //4 random words from all options + 1 random word from step2Word's list
                function createButtonTexts(){

                    function getWordFromSecondList(){
                        const wordList = bombConfig.whosOnFirstStep2Words[step2Word];
                        return wordList[Math.floor(Math.random() * wordList.length)];
                    }

                    let buttonWords = [];
                    let numberOfWords = 0;

                    while(numberOfWords < 4){ 

                        const randomButton = getRandomStep2Word();

                        if(!buttonWords.includes(randomButton) && randomButton != step2Word){
                            buttonWords.push(randomButton);
                            numberOfWords += 1;
                        }

                    }

                    while(true){
                        const finalButton = getWordFromSecondList();
                        if(!buttonWords.includes(finalButton) && finalButton != step2Word){
                            buttonWords.splice(Math.floor(Math.random() * buttonWords.length), 0, finalButton);
                            break;
                        }
                    }
                    

                    const targetIndex = bombConfig.whosOnFirstStep1Words[step1Display] - 1;
                    buttonWords.splice(targetIndex, 0, step2Word);

                    return buttonWords;

                }

                const buttonTexts = createButtonTexts();

                const targetButtons = bombConfig.whosOnFirstStep2Words[step2Word].filter(value => buttonTexts.includes(value));

                let finalHTML = 
                `<div id="whosOnFirstSlot">
                    <span class="light" id="off"></span>
                    <div id="WOFContainer">
                        <div id="WOFElementsContainer">
                            <p id="WOFDisplay">${step1Display}</p>
                            <div id="WOFButtonContainer">`;

                buttonTexts.forEach(button => {

                    let correctButton;

                    if(button == targetButtons[0]){
                        correctButton = true;
                    }
                    else{
                        correctButton = false;
                    }

                    finalHTML += `<div class="WOFButton" onclick="playerActions.whosOnFirst.click('${correctButton}')">${button}</div>`;

                });

                return finalHTML + "</div></div></div></div>";

            },

            memory(){
                
                let displayOrder = [];

                for(let i = 0; i < 5; i++){
                    displayOrder.push(Math.floor(Math.random() * 4) + 1);
                }

                let buttonOrder = [];
                let buttonCount = 0;
                while(buttonCount < 4){
                    const button = Math.floor(Math.random() * 4) + 1;
                    if(!buttonOrder.includes(button)){
                        buttonOrder.push(button);
                        buttonCount += 1;
                    }
                }


                let buttonPressOrder = [];
                displayOrder.forEach((display, stage) => {

                    buttonPressOrder.push(bombConfig.memoryButtonPressActions[stage + 1][display](buttonOrder, buttonPressOrder));

                });

                let finalHTML = 
                `<div id="memorySlot">
                    <span class="light" id="off"></span>
                    <div id="memoryContainer">
                        <div id="memoryElementsContainer">
                            <p id="memoryStageCount">Stage: <span>1</span></p>
                            <p id="memoryDisplay">${displayOrder[0]}</p>
                            <div id="memoryButtonContainer">`;

                buttonOrder.forEach(button => {

                    let buttonPressForEachStage = [];

                    for(let stage = 0; stage < 5; stage++){
                        if(button == buttonPressOrder[stage]){
                            buttonPressForEachStage.push(true);
                        }
                        else{
                            buttonPressForEachStage.push(false);
                        }
                    }

                    finalHTML += `<div class="memoryButton" onclick="playerActions.memory.click([${buttonPressForEachStage}], [${displayOrder}])">${button}</div>`;

                });

                return finalHTML + `</div></div></div></div>`;

            },

            morseCode(){

                function randomKey(){
                    const keys = Object.keys(bombConfig.morseCodeWords);
                    return keys[Math.floor(Math.random() * keys.length)];
                }

                const randomWord = bombConfig.morseCodeWords[randomKey()];
                bombConfig.morseCodeWordSelected = randomWord;

                return `
                <div id="morseCodeSlot">
                    <span class="light" id="off"></span>
                    <div id="morseCodeContainer">
                        <div id="morseOutput"></div>
                        <div id="controlContainer">
                            <div id="frequencyContainer">
                                <div id="frequencyDown" onclick="playerActions.morseCode.frequency.decrease()"></div>
                                <div id="frequencyOutput">3.505</div>
                                <div id="frequencyUp" onclick="playerActions.morseCode.frequency.increase()"></div>
                            </div>
                            <div id="frequencySubmit" onclick="playerActions.morseCode.send()">SEND</div>
                        </div>
                    </div>
                </div>
                `

            }

        };

        let finalHTML = [];

        this.modules.forEach(module => {
            finalHTML.push(assembleComponent[module]());
        });

        return finalHTML;

    }

}