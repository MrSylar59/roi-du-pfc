let possibleMove = [[1,0,0], [0,1,0], [0,0,1]];

let playerMove = "Pierre";
let lastPlayerMove = "Pierre";
let AIMove = "Feuille";

let playerScore = 0;
let AIScore = 0;

let brain;

function moveToStr(move){
    switch(JSON.stringify(move)){
        case "[1,0,0]": return "Pierre";
        case "[0,1,0]": return "Feuille";
        case "[0,0,1]": return "Ciseaux";
        default: return "Pierre";
    }
}

function strToMove(str){
    switch(str){
        case "Pierre": return [1,0,0];
        case "Feuille": return [0,1,0];
        case "Ciseaux": return [0,0,1];
        default: return [1,0,0];
    }
}

function returnWiner(player, ai){
    if (ai == player)
        return "Personne";
    else if (ai == "Pierre" && player == "Feuille")
        return "Player";
    else if (ai == "Pierre" && player == "Ciseaux")
        return "AI";
    else if (ai == "Feuille" && player == "Pierre")
        return "AI";
    else if (ai == "Feuille" && player == "Ciseaux")
        return "Player";
    else if (ai == "Ciseaux" && player == "Pierre")
        return "Player";
    else if (ai == "Ciseaux" && player == "Feuille")
        return "AI";
    return "Personne";
}

function win(move){
    switch(move){
        case "Pierre": return [0,1,0];
        case "Feuille": return [0,0,1];
        case "Ciseaux": return [1,0,0];
        default: return [1,0,0];
    }
}

function getIAMove(arr){
    let iMax = 0;
    let max = arr[iMax];

    for (let i = iMax+1; i < arr.length; i++){
        if (arr[i] > max){
            max = arr[i];
            iMax = i;
        }
    }

    let output = [0,0,0];
    output[iMax] = 1;

    //console.log(output);

    return output;
}

function setup(){
    brain = new NeuralNetwork(3, 5, 3);
    createCanvas(800,400);

    for (let i = 0; i < 10000; i++){
        lastPlayerMove = playerMove;
        playerMove = moveToStr(random(possibleMove));

        let winner = returnWiner(playerMove, AIMove);

        if (winner != "AI"){
            brain.train(strToMove(lastPlayerMove), win(playerMove));
        }
    }
}

function keyPressed(){

    if (keyCode == 97 || keyCode == 98 || keyCode == 99){
        let output = brain.predict(strToMove(playerMove));
        AIMove = moveToStr(getIAMove(output));
    
        lastPlayerMove = playerMove;
    }

    switch(keyCode){
        case 97: playerMove = "Pierre"; break;
        case 98: playerMove = "Feuille"; break;
        case 99: playerMove = "Ciseaux"; break;
    }

    if (keyCode == 97 || keyCode == 98 || keyCode == 99){
        let winner = returnWiner(playerMove, AIMove);

        if (winner != "AI"){
            brain.train(strToMove(lastPlayerMove), win(playerMove));
        }

        if (winner == "AI")
            AIScore++;
        if (winner == "Player")
            playerScore++;
    }
}

function draw(){
    background(0, 150, 0);

    strokeWeight(4);
    stroke(0);
    line(width/2, 0, width/2, height);

    noStroke();
    fill(255);
    textAlign(CENTER);

    textSize(32);
    text("Joueur: "+playerScore, 200, 100);
    text("AI: "+AIScore, 600, 100);

    textSize(64);
    text(playerMove, 200, 300);
    text(AIMove, 600, 300)
}