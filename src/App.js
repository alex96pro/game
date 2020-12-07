import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
    
    const [letters, setLetters] = useState([
        {character:"P", moveX:0, moveY:0},
        {character:"O", moveX:60, moveY:0},
        {character:"S", moveX:120, moveY:0},
        {character:"A", moveX:180, moveY:0},
        {character:"O", moveX:240, moveY:0}]);

    const [device, setDevice] = useState({seconds:0, letterWidth:0, letterHeight:0});
    const [gameStarted, setGameStarted] = useState(false);
    const [sequence, setSequence] = useState([]);
    const [handle, setHandle] = useState();
    
    useEffect(() => {
        let media = window.matchMedia('(max-width:450px)');
        if(media.matches){
            setDevice({seconds:3, letterWidth:20, letterHeight:30}); //3 seconds = 2s + 1s for animation
        }else{
            setDevice({seconds:5, letterWidth:60, letterHeight:70}); //5 seconds = 4s + 1s for animation
        }
    }, []);
    
    const disableButton = (buttonId) => {
        document.getElementById(`button-${buttonId}`).style.pointerEvents = "none";
        document.getElementById(`button-${buttonId}`).style.backgroundColor = "gray";
    };

    const enableButtons = () => {
        letters.forEach((letter, index) =>{
            document.getElementById(`button-${index}`).style.pointerEvents = "auto";
            document.getElementById(`button-${index}`).style.backgroundColor = "rgb(106, 194, 223)";
        });
    };

    const startGame = (over = false) => {
        clearInterval(handle);
        if(!over){
            setGameStarted(true);
            setSequence([]);
            let newLetters = letters.map((letter) => ({...letter}));
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let newX = [], newY = [];
            for(let i = 0; i < newLetters.length; i++){
                newX[i] = Math.floor(Math.random()*screenWidth*0.8); //left
                newY[i] = Math.floor(Math.random()*screenHeight*0.8); //top
            }
            for(let k = 0; k < newLetters.length; k++){ // REKURSIVE
                for(let i = 0; i < newLetters.length; i++){ // i = Letter which random position needs to be checked with other letters
                    for(let j = i - 1; j >= 0; j--){ // j = All letters that are positioned without overlaping
                        if(Math.abs(newX[i]-newX[j]) < device.letterWidth && Math.abs(newY[i]-newY[j]) < device.letterHeight){
                            newX[i] += device.letterWidth * 2;
                        }
                    }
                }
            }
            for(let i = 0; i < letters.length; i++){
                newLetters[i].moveX = newX[i];
                newLetters[i].moveY = newY[i];
            }
            setLetters(newLetters);
            enableButtons();
            let newHandle = setInterval(autoplay, device.seconds * 1000);
            setHandle(newHandle);
        }
        
    };

    const autoplay = () => {
        setGameStarted(true);
        setSequence([]);
        let newLetters = letters.map((letter)=>({...letter}));
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        let newX = [], newY = [];
        for(let i = 0; i < newLetters.length; i++){
            newX[i] = Math.floor(Math.random()*screenWidth*0.8); //left
            newY[i] = Math.floor(Math.random()*screenHeight*0.8); //top
        }
        for(let k = 0; k < newLetters.length; k++){ // REKURSIVE
            for(let i = 0; i < newLetters.length; i++){ // i = Letter which random position needs to be checked with other letters
                for(let j = i - 1; j >= 0; j--){ // j = All letters that are positioned without overlaping
                    if(Math.abs(newX[i]-newX[j]) < device.letterWidth && Math.abs(newY[i]-newY[j]) < device.letterHeight){
                        newX[i] += device.letterWidth * 2;
                    }
                }
            }
        }
        for(let i = 0; i < letters.length; i++){
            newLetters[i].moveX = newX[i];
            newLetters[i].moveY = newY[i];
        }
        setLetters(newLetters);
        enableButtons();
    };
    
    const checkLetter = (letter, buttonId) => {
        if(gameStarted){
            switch(letter){
                case 'P':
                    if(sequence.length === 0){
                        setSequence([...sequence, "P"]);
                        disableButton(buttonId);
                    }else{
                        startGame();
                    }
                    break;
                case 'O':
                    if(sequence.length === 1){
                        setSequence([...sequence, "O"]);
                        disableButton(buttonId);
                    }else if(sequence.length === 4){ // game completed
                        alert("Bravo!");
                        setGameStarted(false);
                        startGame(true);
                        let newArray = letters.map((letter) => ({...letter}));
                        newArray.forEach((item,index)=>{item.moveY = 0; item.moveX = index*device.letterWidth});
                        setLetters(newArray);
                        enableButtons();
                    }else{
                        startGame();
                    }
                    break;
                case 'S':
                    if(sequence.length === 2){
                        setSequence([...sequence, "S"]);
                        disableButton(buttonId);
                    }else{
                        startGame();
                    }
                    break;
                case 'A':
                    if(sequence.length === 3){
                        setSequence([...sequence, "A"]);
                        disableButton(buttonId);
                    }else{
                        startGame();
                    }
                    break;
                default:
                    break;
            }
        }
     };
    return (
        <div className="App">
            <div className="letter" style={{left:letters[0].moveX, top:letters[0].moveY}}>
                <button onClick={() => checkLetter(letters[0].character, 0)} className="letter-button" id="button-0">
                    {letters[0].character}
                </button>
            </div>
            <div className="letter" style={{left:letters[1].moveX, top:letters[1].moveY}}>
                <button onClick={() => checkLetter(letters[1].character, 1)} className="letter-button" id="button-1">
                    {letters[1].character}
                </button>
            </div>
            <div className="letter" style={{left:letters[2].moveX, top:letters[2].moveY}}>
                <button onClick={() => checkLetter(letters[2].character, 2)} className="letter-button" id="button-2">
                    {letters[2].character}
                </button>
            </div>
            <div className="letter" style={{left:letters[3].moveX, top:letters[3].moveY}}>
                <button onClick={() => checkLetter(letters[3].character, 3)} className="letter-button" id="button-3">
                    {letters[3].character}
                </button>
            </div>
            <div className="letter" style={{left:letters[4].moveX, top:letters[4].moveY}}>
                <button onClick={() => checkLetter(letters[4].character, 4)} className="letter-button" id="button-4">
                    {letters[4].character}
                </button>
            </div>
            {!gameStarted && 
            <div className="start-button">
                <button onClick={() => startGame(false)}>START</button>
            </div>}
        </div>
    );
}