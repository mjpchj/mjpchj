let grid;
let cols = 4;
let rows = 4;
let resolution = 150;
let initial = 2;

function make2DArray(cols, rows) { //creates 2D array
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function reset() {

  for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {

        grid[i][j] = null;

      }
  }

}

function fillArray() { //starter

      reset();

      let a = floor(random(cols));
    	let b = floor(random(cols));

      grid[a][b] = initial;

      let c = floor(random(cols));
    	let d = floor(random(cols));

      grid[c][d] = initial;

}

function newInitial() { //starts off with two of initial value

	let a = floor(random(cols));
	let b = floor(random(cols));

  while(grid[a][b] != null || grid[a][b] == 0) {

    a = floor(random(cols));
    b = floor(random(cols));

  }

  grid[a][b] = initial;

}

function drawGrid () {

	for (let i = 0; i < cols; i++) {
    	for (let j = 0; j < rows; j++) {
     		let x = (i * resolution) + (windowWidth / 2) - (resolution * (cols / 2));
     		let y = (j * resolution) + (windowHeight / 2) - (resolution * (rows / 2));

        	fill(150);
        	stroke(175);
        	strokeWeight(5)
        	rect(x, y, resolution - 1, resolution - 1);
    }
  } //draws grid

}

function drawValues() {

	for (let i = 0; i < cols; i++) {
    	for (let j = 0; j < rows; j++) {

    	let x = (i * resolution) + (windowWidth / 2) - (resolution * (cols / 2));
     	let y = (j * resolution) + (windowHeight / 2) - (resolution * (rows / 2));


     	fill(0);
     	stroke(0);
     	strokeWeight(0);
     	textSize(50);
     	textAlign(CENTER, CENTER);

     	if(grid[i][j] == null || grid[i][j] == 0){

        text("", x, y, resolution + 15, resolution)

    } else {

      text(grid[i][j], x, y, resolution + 15, resolution)

    }

   		}
   	}	 //draws values from array

}

function keyPressed() {

	let xMove;
	let yMove;

  if (keyCode === DOWN_ARROW) {
    	xMove = 0;
    	yMove = 1;
	}

	if (keyCode === UP_ARROW) {
    	xMove = 0;
    	yMove = -1;
	}

	if (keyCode === RIGHT_ARROW) {
    	xMove = 1;
    	yMove = 0;
	}

	if (keyCode === LEFT_ARROW) {
    	xMove = -1;
    	yMove = 0;

	}

	move(xMove, yMove);

  fail();

	newInitial();
}

function move(xMove, yMove) {

  if (xMove != 0 && yMove == 0) { //if move horizontal

    for(let k = 0; k < 6; k++) {

      for (let j = 0; j < cols; j++) { //cycle through each row

        if (xMove == 1) { //RIGHT

          for(let i = cols - 2; i > -1; i--) { // cycle through each cell in the row, ignoring the furthest right cell

            if (grid[i + xMove][j] == null || grid[i + xMove][j] == 0) { //if next cell in direction of move is blank

              grid[i + xMove][j] = grid[i][j]; // set next cell as current cell
              grid[i][j] = null; //set current cell as blank

            }

            if (grid[i][j] == grid[i + xMove][j]) { //if next cell in direction of move is same as current cell

              grid[i + xMove][j] = initial * grid[i][j];
              grid[i][j] = null;

            }

          }

        }

        if (xMove == -1) { //LEFT

          for(let i = 1; i < cols; i++) { // cycle through each cell in the row, ignoring the first cell

            if (grid[i + xMove][j] == null || grid[i + xMove][j] == 0) { //if next cell in direction of move is blank

              grid[i + xMove][j] = grid[i][j]; // set next cell as current cell
              grid[i][j] = null; //set current cell as blank

            }

            if (grid[i][j] == grid[i + xMove][j]) { //if next cell in direction of move is same as current cell

              grid[i + xMove][j] = initial * grid[i][j];
              grid[i][j] = null;

            }

          }

        }

      }

    }

  }//end of horizontal

  if (xMove == 0 && yMove != 0) { //if move vertical

    for(let k = 0; k < 6; k++) {

      for (let i = 0; i < rows; i++) { //cycle through each column

        if (yMove == 1) { //DOWN

          for(let j = rows - 2; j > -1; j--) { //cycle through each column ignoring the furthest down cell

            if(grid[i][j + yMove] == null || grid[i][j + yMove] == 0) { //if cell in direction of move is blank

              grid[i][j + yMove] = grid[i][j]; //set next cell to current cell value
              grid[i][j] = null;

            }

            if(grid[i][j + yMove] == grid[i][j]) { //if cell in direction of move if same as current cell

              grid[i][j + yMove] = initial * grid[i][j]; //next cell equal current cell x inital base value
              grid[i][j] = null;

            }

          }

        }

        if (yMove == -1) { //UP

          for(let j = 1; j < rows; j++) { //cycle through each cell starting at the top ignoring the first cell

            if(grid[i][j + yMove] == null || grid[i][j + yMove] == 0 ){ //if next cell in direction of move is blank

              grid[i][j + yMove] = grid[i][j]; //set next cell to current cell value
              grid[i][j] = null;

            }

            if(grid[i][j + yMove] == grid[i][j]) {

              grid[i][j + yMove] = initial * grid[i][j]; //next cell equal current cell x inital base value
              grid[i][j] = null;

            }

          }

        }

      }

    }

  } //end of vertical move

} //end of move()

function fail() {

  let failCount = 0;

  for (let i = 0; i < cols; i++) {
    	for (let j = 0; j < rows; j++) {

        if(grid[i][j] != null || grid[i][j] == 0) {

          failCount += 1;

        }

      }

  }

  if(failCount == (cols * rows)) {

    reset();

  }

}

function setup() {

  	createCanvas(windowWidth, windowHeight);

 	  grid = make2DArray(cols, rows);

    fillArray(); // puts in two initial starters and fills arry with null
}

function draw() {

  	background(130, 130, 230);

  	drawGrid();

  	drawValues();

}
