const bombConfig = {

    defaultTime: 150,
    time: undefined,
    modules: ['wires', 'keypad', 'button', 'simonSays', 'whosOnFirst', 'memory', 'morseCode'],

    serialNumberVowels: ["A", "E", "I", "U"],
    serialNumberConsonants: ["B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Z"],
    serialNumberLength: 6,

    commonIndicators: ["SND","CLR","CAR","IND","FRQ","SIG"],

    wireColours: ['red', 'white', 'blue', 'yellow', 'black'],

    buttonColours: ['blue', 'red', 'white', 'yellow', 'black'],
    buttonTexts: ['Abort', 'Detonate', 'Hold', 'Press'],
    stripColours: ['blue', 'red', 'white', 'yellow'],

    simonSaysButtons: ['Blue', 'Yellow', 'Red', 'Green'],
    simonSaysDefaultColours: {
        'Blue': 'darkblue',
        'Yellow': '#afb500',
        'Red': 'darkred',
        'Green': 'darkgreen'
    },

    whosOnFirstStep1Words: {
    "YES": 3, 
    "FIRST": 2, 
    "DISPLAY": 6, 
    "OKAY": 2, 
    "SAYS": 6, 
    "NOTHING": 3, 
    "⠀": 5,
    "BLANK": 4, 
    "NO": 6, 
    "LED": 3, 
    "LEAD": 6, 
    "READ": 4, 
    "RED": 4, 
    "REED": 5, 
    "LEED": 5, 
    "HOLD ON": 6, 
    "YOU": 4, 
    "YOU ARE": 6, 
    "YOUR": 4, 
    "YOU'RE": 4, 
    "UR": 1, 
    "THERE": 6, 
    "THEY'RE": 5, 
    "THEIR": 4, 
    "THEY ARE": 3, 
    "SEE": 6, 
    "C": 2, 
    "CEE": 6

    },
    
    whosOnFirstStep2Words: {
        "READY": ["YES", "OKAY", "WHAT", "MIDDLE", "LEFT", "PRESS", "RIGHT", "BLANK", "READY", "NO", "FIRST", "UHHH", "NOTHING", "WAIT"],
        "FIRST": ["LEFT", "OKAY", "YES", "MIDDLE", "NO", "RIGHT", "NOTHING", "UHHH", "WAIT", "READY", "BLANK", "WHAT", "PRESS", "FIRST"],
        "NO": ["BLANK", "UHHH", "WAIT", "FIRST", "WHAT", "READY", "RIGHT", "YES", "NOTHING", "LEFT", "PRESS", "OKAY", "NO", "MIDDLE"],
        "BLANK": ["WAIT", "RIGHT", "OKAY", "MIDDLE", "BLANK", "PRESS", "READY", "NOTHING", "NO", "WHAT", "LEFT", "UHHH", "YES", "FIRST"],
        "NOTHING": ["UHHH", "RIGHT", "OKAY", "MIDDLE", "YES", "BLANK", "NO", "PRESS", "LEFT", "WHAT", "WAIT", "FIRST", "NOTHING", "READY"],
        "YES": ["OKAY", "RIGHT", "UHHH", "MIDDLE", "FIRST", "WHAT", "PRESS", "READY", "NOTHING", "YES", "LEFT", "BLANK", "NO", "WAIT"],
        "WHAT": ["UHHH", "WHAT", "LEFT", "NOTHING", "READY", "BLANK", "MIDDLE", "NO", "OKAY", "FIRST", "WAIT", "YES", "PRESS", "RIGHT"],
        "UHHH": ["READY", "NOTHING", "LEFT", "WHAT", "OKAY", "YES", "RIGHT", "NO", "PRESS", "BLANK", "UHHH", "MIDDLE", "WAIT", "FIRST"],
        "LEFT": ["RIGHT", "LEFT", "FIRST", "NO", "MIDDLE", "YES", "BLANK", "WHAT", "UHHH", "WAIT", "PRESS", "READY", "OKAY", "NOTHING"],
        "RIGHT": ["YES", "NOTHING", "READY", "PRESS", "NO", "WAIT", "WHAT", "RIGHT", "MIDDLE", "LEFT", "UHHH", "BLANK", "OKAY", "FIRST"],
        "MIDDLE": ["BLANK", "READY", "OKAY", "WHAT", "NOTHING", "PRESS", "NO", "WAIT", "LEFT", "MIDDLE", "RIGHT", "FIRST", "UHHH", "YES"],
        "OKAY": ["MIDDLE", "NO", "FIRST", "YES", "UHHH", "NOTHING", "WAIT", "OKAY", "LEFT", "READY", "BLANK", "PRESS", "WHAT", "RIGHT"],
        "WAIT": ["UHHH", "NO", "BLANK", "OKAY", "YES", "LEFT", "FIRST", "PRESS", "WHAT", "WAIT", "NOTHING", "READY", "RIGHT", "MIDDLE"],
        "PRESS": ["RIGHT", "MIDDLE", "YES", "READY", "PRESS", "OKAY", "NOTHING", "UHHH", "BLANK", "LEFT", "FIRST", "WHAT", "NO", "WAIT"],
        "YOU": ["SURE", "YOU ARE", "YOUR", "YOU'RE", "NEXT", "UH HUH", "UR", "HOLD", "WHAT?", "YOU", "UH UH", "LIKE", "DONE", "U"],
        "YOU ARE": ["YOUR", "NEXT", "LIKE", "UH HUH", "WHAT?", "DONE", "UH UH", "HOLD", "YOU", "U", "YOU'RE", "SURE", "UR", "YOU ARE"],
        "YOUR": ["UH UH", "YOU ARE", "UH HUH", "YOUR", "NEXT", "UR", "SURE", "U", "YOU'RE", "YOU", "WHAT?", "HOLD", "LIKE", "DONE"],
        "YOU'RE": ["YOU", "YOU'RE", "UR", "NEXT", "UH UH", "YOU ARE", "U", "YOUR", "WHAT?", "UH HUH", "SURE", "DONE", "LIKE", "HOLD"],
        "UR": ["DONE", "U", "UR", "UH HUH", "WHAT?", "SURE", "YOUR", "HOLD", "YOU'RE", "LIKE", "NEXT", "UH UH", "YOU ARE", "YOU"],
        "U": ["UH HUH", "SURE", "NEXT", "WHAT?", "YOU'RE", "UR", "UH UH", "DONE", "U", "YOU", "LIKE", "HOLD", "YOU ARE", "YOUR"],
        "UH HUH": ["UH HUH", "YOUR", "YOU ARE", "YOU", "DONE", "HOLD", "UH UH", "NEXT", "SURE", "LIKE", "YOU'RE", "UR", "U", "WHAT?"],
        "UH UH": ["UR", "U", "YOU ARE", "YOU'RE", "NEXT", "UH UH", "DONE", "YOU", "UH HUH", "LIKE", "YOUR", "SURE", "HOLD", "WHAT?"],
        "WHAT?": ["YOU", "HOLD", "YOU'RE", "YOUR", "U", "DONE", "UH UH", "LIKE", "YOU ARE", "UH HUH", "UR", "NEXT", "WHAT?", "SURE"],
        "DONE": ["SURE", "UH HUH", "NEXT", "WHAT?", "YOUR", "UR", "YOU'RE", "HOLD", "LIKE", "YOU", "U", "YOU ARE", "UH UH", "DONE"],
        "NEXT": ["WHAT?", "UH HUH", "UH UH", "YOUR", "HOLD", "SURE", "NEXT", "LIKE", "DONE", "YOU ARE", "UR", "YOU'RE", "U", "YOU"],
        "HOLD": ["YOU ARE", "U", "DONE", "UH UH", "YOU", "UR", "SURE", "WHAT?", "YOU'RE", "NEXT", "HOLD", "UH HUH", "YOUR", "LIKE"],
        "SURE": ["YOU ARE", "DONE", "LIKE", "YOU'RE", "YOU", "HOLD", "UH HUH", "UR", "SURE", "U", "WHAT?", "NEXT", "YOUR", "UH UH"],
        "LIKE": ["YOU'RE", "NEXT", "U", "UR", "HOLD", "DONE", "UH UH", "WHAT?", "UH HUH", "YOU", "LIKE", "SURE", "YOU ARE", "YOUR"]
    },
    
    memoryButtonPressActions: {

        /*
        stage: {
            display(){action}
        }
        */

        1:{
            1(buttonOrder){return buttonOrder[1]},
            2(buttonOrder){return buttonOrder[1]},
            3(buttonOrder){return buttonOrder[2]},
            4(buttonOrder){return buttonOrder[3]},
        },

        2:{
            1(){return 4},
            2(buttonOrder, buttonPressOrder){return buttonPressOrder[0]},
            3(buttonOrder, buttonPressOrder){return buttonOrder[0]},
            4(buttonOrder, buttonPressOrder){return buttonPressOrder[0]}
        },

        3: {
            1(buttonOrder, buttonPressOrder){return buttonPressOrder[1]},
            2(buttonOrder, buttonPressOrder){return buttonPressOrder[0]}, 
            3(buttonOrder, buttonPressOrder){return buttonOrder[2]},
            4(){return 4}
        },

        4: {
            1(buttonOrder, buttonPressOrder){return buttonPressOrder[0]},
            2(buttonOrder, buttonPressOrder){return buttonOrder[0]},
            3(buttonOrder, buttonPressOrder){return buttonPressOrder[1]},
            4(buttonOrder, buttonPressOrder){return buttonPressOrder[1]}
        },

        5: {
            1(buttonOrder, buttonPressOrder){return buttonPressOrder[0]},
            2(buttonOrder, buttonPressOrder){return buttonPressOrder[1]},
            3(buttonOrder, buttonPressOrder){return buttonPressOrder[3]},
            4(buttonOrder, buttonPressOrder){return buttonPressOrder[2]}
        },


    },

    morseCodeWordSelected: undefined,
    morseCodeWords: {

        'shell': {
            code: Array.from('... .... . .-.. .-..'),
            responseFrequency: '3.505'
        },

        'halls': {
            code: Array.from('.... .- .-.. .-.. ...'),
            responseFrequency: '3.515'
        },

        'slick': {
            code: Array.from('... .-.. .. -.-. -.-'),
            responseFrequency: '3.522'
        },

        'trick': {
            code: Array.from('- .-. .. -.-. -.-'),
            responseFrequency: '3.532'
        },

        'boxes': {
            code: Array.from('-... --- -..- . ...'),
            responseFrequency: '3.535'
        },

        'leaks': {
            code: Array.from('.-.. . .- -.- ...'),
            responseFrequency: '3.542'
        },

        'strobe': {
            code: Array.from('... - .-. --- -... .'),
            responseFrequency: '3.545'
        },

        'bistro': {
            code: Array.from('-... .. ... - .-. ---'),
            responseFrequency: '3.552'
        },

        'flick': {
            code: Array.from('..-. .-.. .. -.-. -.-'),
            responseFrequency: '3.555'
        },

        'bombs': {
            code: Array.from('-... --- -- -... ...'),
            responseFrequency: '3.565'
        },

        'break': {
            code: Array.from('-... .-. . .- -.-'),
            responseFrequency: '3.572'
        },

        'brick': {
            code: Array.from('-... .-. .. -.-. -.-'),
            responseFrequency: '3.575'
        },

        'steak': {
            code: Array.from('... - . .- -.-'),
            responseFrequency: '3.582'
        },

        'sting': {
            code: Array.from('... - .. -. --.'),
            responseFrequency: '3.592'
        },

        'vector': {
            code: Array.from('...- . -.-. - --- .-.'),
            responseFrequency: '3.595'
        },

        'beats': {
            code: Array.from('-... . .- - ...'),
            responseFrequency: '3.600'
        }
    }

}