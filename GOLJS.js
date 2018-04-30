const x = 225;
const y = 100;
const live = "#000000";
const dead = "#AAAAAA";

var slider = document.getElementById("delay")
var delay = 50; // Delay between generations in milliseconds


var board = new Array(y);

for (let k = 0; k < y; k++) {
  board[k] = new Array(x).fill(0);
}

var secondBoard = new Array(y);
for (let k = 0; k < y; k++) {
  secondBoard[k] = new Array(x).fill(0);
}

var changes = new Array(y);
for (let k = 0; k < y; k++) {
  changes[k] = new Array(x).fill(-1);
}


var canvas = document.getElementById("Board");
var context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var blockWidth = Math.floor(width / x);
var blockHeight = Math.floor(height / y);

function drawLine(yposition, changes, liveColour, deadColour) {
    let xposition = 0;
    
    for (let i =0; i < x; i++){
        if(changes[i] === 1){
            context.fillStyle = liveColour;
			//context.clearRect(xposition, yposition, blockWidth, blockHeight);
			context.fillRect(xposition, yposition, blockWidth, blockHeight);
        }
        else if (changes[i] === -1){
            context.fillStyle = deadColour;
			//context.clearRect(xposition, yposition, blockWidth, blockHeight);
			context.fillRect(xposition, yposition, blockWidth, blockHeight);
        }
        xposition = xposition + blockWidth;
    }
}

function draw(){
	for(let i =0; i < y; i++){
		drawLine(i*blockHeight, changes[i], live, dead);
	}
}

function checkPosition(yPos, xPos){

	let numAdj =0;
	numAdj = board[xPos][yPos + 1] + board[xPos + 1][yPos] + board[xPos + 1][yPos + 1];
	
	if (xPos > 0){
		if(yPos > 0){
			numAdj += board[xPos - 1][yPos - 1];
		}
		numAdj += board[xPos - 1][yPos] + board[xPos - 1][yPos + 1];
	}
	
	if(yPos > 0){
		numAdj += board[xPos][yPos - 1] + board[xPos + 1][yPos - 1];
	}
	
	if(numAdj === 2){
		changes[xPos][yPos] = 0;
		return board[xPos][yPos];
	}
	if(numAdj === 3){
		changes[xPos][yPos] = 1;
		return 1;
	}
	else{
		changes[xPos][yPos] = -1;
		return 0;
	}
}

function processStep(){
	for(let i=0; i < x - 1; i++){
		for(let j=0; j < y-1; j++){
			secondBoard[j][i] = checkPosition(i, j);
		}
	}
	let temp = board;
	board = secondBoard;
	secondBoard = temp;
	draw();
	return true
}

//Beginning of the main program

draw();

board[1][5] = 1;
board[1][6] = 1;
board[2][5] = 1;
board[2][6] = 1;
board[11][5] = 1;
board[11][6] = 1;
board[11][7] = 1;
board[12][4] = 1;
board[12][8] = 1;
board[13][3] = 1;
board[13][9] = 1;
board[14][3] = 1;
board[14][9] = 1;
board[15][6] = 1;
board[16][4] = 1;
board[16][8] = 1;
board[17][5] = 1;
board[17][6] = 1;
board[17][7] = 1;
board[18][6] = 1;
board[21][3] = 1;
board[21][4] = 1;
board[21][5] = 1;
board[22][3] = 1;
board[22][4] = 1;
board[22][5] = 1;
board[23][2] = 1;
board[23][6] = 1;
board[25][1] = 1;
board[25][2] = 1;
board[25][6] = 1;
board[25][7] = 1;
board[35][3] = 1;
board[35][4] = 1;
board[36][3] = 1;
board[36][4] = 1;

//console.log(changes);
draw();

slider.oninput = function(){
	delay = this.value;
}

function loop() {
  processStep();
  window.setTimeout(loop, delay);
}

loop();
