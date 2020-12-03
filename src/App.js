import React from 'react';
import './App.css';
import { useState } from 'react';

export default function App() {

    const [letters, setLetters] = useState([
        {character:"P", moveX:0, moveY:0},
        {character:"O", moveX:0, moveY:0},
        {character:"S", moveX:0, moveY:0},
        {character:"A", moveX:0, moveY:0},
        {character:"O", moveX:0, moveY:0}]);

    const [gameStarted, setGameStarted] = useState(false);
    const [sequence, setSequence] = useState([]);
    const [handle, setHandle] = useState();

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

    const startGame = () => {
        clearInterval(handle);
        setGameStarted(true);
        setSequence([]);
        let newLetters = letters.filter((letter)=>letter);
        let sign;
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        let newX = [], newY = [];
        for(let i = 0; i < newLetters.length; i++){
            sign=Math.round(Math.random());
            newX[i] = sign? Math.floor(Math.random()*screenHeight/2):Math.floor(-Math.random()*screenHeight/2);
            sign=Math.round(Math.random());
            newY[i] = sign? Math.floor(Math.random()*screenHeight/2):Math.floor(-Math.random()*screenHeight/2);
        }
        // console.log(newX);
        // console.log(newY);
        for(let i = 0; i < newLetters.length; i++){
            for(let j = 1; j < newLetters.length - 1; j++){
                let positionsI = document.getElementById(`button-${i}`).getBoundingClientRect();
                let positionsJ = document.getElementById(`button-${j}`).getBoundingClientRect();
                let differenceX = Math.abs(positionsI.left - positionsJ.left);
                let differenceY = Math.abs(positionsI.top - positionsJ.top);
                console.log(positionsI.left);
                console.log(positionsJ.left);
                console.log(positionsI.top);
                console.log(positionsJ.top);
                if(differenceX < 60){
                    console.log("KONFLIKT PO X");
                    newX[i] += differenceX;
                }
                if(differenceY < 60){
                    console.log("KONFLIKT PO Y");
                    newY[i] += differenceY;
                }
            }
        }
        // console.log(newX);
        // console.log(newY);
        for(let i = 0; i < letters.length; i++){
            newLetters[i].moveX = newX[i];
            newLetters[i].moveY = newY[i];
        }
        
        setLetters(newLetters);
        // let newHandle = setInterval(autoplay, 1000);
        // setHandle(newHandle);
        enableButtons();
    };
    
    const autoplay = () => {
        setGameStarted(true);
        setSequence([]);
        let newLetters = letters.filter((letter)=>letter);
        let sign;
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        let newX = [], newY = [];
        for(let i = 0; i < newLetters.length; i++){
            sign=Math.round(Math.random());
            newX[i] = sign? Math.floor(Math.random()*screenHeight/2):Math.floor(-Math.random()*screenHeight/2);
            sign=Math.round(Math.random());
            newY[i] = sign? Math.floor(Math.random()*screenHeight/2):Math.floor(-Math.random()*screenHeight/2);
        }
        for(let i = 0; i < newLetters.length; i++){
            for(let j = 1; j < newLetters.length; j++){
                let differenceX = Math.abs(newX[i]-newX[j]);
                let differenceY = Math.abs(newY[i]-newY[j]);
                if(differenceX < 60){
                    newX[i] += differenceX;
                }
                if(differenceY < 60){
                    newY[i] += differenceY;
                }
            }
        }
        for(let i = 0; i < letters.length; i++){
            newLetters[i].moveX = newX[i];
            newLetters[i].moveY = newY[i];
        }
        
        setLetters(newLetters);
        enableButtons();
    }
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
                    }else if(sequence.length === 4){
                        alert("Bravo!");
                        setGameStarted(false);
                        clearInterval(handle);
                        let newArray = letters.filter((letter) => letter);
                        for(let i = 0; i < newArray.length; i++){
                            newArray[i].top = 0;
                            newArray[i].right =0;
                            newArray[i].bottom = 0;
                            newArray[i].left =0;
                        }
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
        <div className="letters-container">
            <div className="letter" style={{transform:`translate(${letters[0].moveX}px,${letters[0].moveY}px)`}}>
                <button onClick={() => checkLetter(letters[0].character, 0)} className="letter-button" id="button-0">
                    {letters[0].character}
                </button>
            </div>
            <div className="letter" style={{transform:`translate(${letters[1].moveX}px,${letters[1].moveY}px)`}}>
                <button onClick={() => checkLetter(letters[1].character, 1)} className="letter-button" id="button-1">
                    {letters[1].character}
                </button>
            </div>
            <div className="letter" style={{transform:`translate(${letters[2].moveX}px,${letters[2].moveY}px)`}}>
                <button onClick={() => checkLetter(letters[2].character, 2)} className="letter-button" id="button-2">
                    {letters[2].character}
                </button>
            </div>
            <div className="letter" style={{transform:`translate(${letters[3].moveX}px,${letters[3].moveY}px)`}}>
                <button onClick={() => checkLetter(letters[3].character, 3)} className="letter-button" id="button-3">
                    {letters[3].character}
                </button>
            </div>
            <div className="letter" style={{transform:`translate(${letters[4].moveX}px,${letters[4].moveY}px)`}}>
                <button onClick={() => checkLetter(letters[4].character, 4)} className="letter-button" id="button-4">
                    {letters[4].character}
                </button>
            </div>
        </div>
        {!gameStarted && 
        <div className="start-menu">
            <button onClick={startGame}>START</button>
        </div>
        
        }
    </div>
    );
}
