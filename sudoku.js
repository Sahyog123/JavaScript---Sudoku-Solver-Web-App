document.addEventListener('DOMContentLoaded', function() {
    var inputField = document.getElementsByClassName("cell");

    inputField.addEventListener('input', function(event) {
        var inputValue = event.target.value;
        // Remove any non-numeric characters
        inputValue = inputValue.replace(/\D/g, '');
        // Limit input to a single digit
        if (inputValue.length > 1) {
            inputValue = inputValue.slice(0, 1);
        } 
        
        // Update the input value
        event.target.value = inputValue;
    });
});



var grid_values;


// Function to populate random numbers in Sudoku board cells
function populateRandomNumbers() {
    var cells = document.querySelectorAll("#Sudoku_board .cell input");
    var numbers = [1,2,3,4,5,6,7,8,9];//Array.from({ length: 9 }, (_, i) => i + 1); // Array of numbers 1 to 9
    shuffleArray(numbers); // Shuffle the array to randomize the numbers

    // Create a 9x9 grid to store the numbers
    var grid = [];
    for (var i = 0; i < 9; i++) {
        grid.push([]);
        for (var j = 0; j < 9; j++) {
            grid[i].push(null);
        }
    }


    // Populate the grid using backtracking
    if (!populateGrid(grid, 0, 0, numbers)) {
        console.log("Unable to populate grid with unique numbers.");
        return;
    }

    // Assign values to cells based on the populated grid
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            cells[row * 9 + col].value = grid[row][col];
        }
    }

    grid_values = grid;

    var count = 0;
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            var random = Math.floor(Math.random() * (2 - 0) + 0);
            if(random === 1 && count < 64)
            {
                cells[row * 9 + col].value = "";
                count++;
            }
            else
            {
                cells[row * 9 + col].readOnly = grid[row][col];
            }
        }
    }

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            
        }
    }




}

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Function to populate the grid using backtracking
function populateGrid(grid, row, col, numbers) {
    if (row == 9) {
        return true; // Successfully populated the entire grid
    }

    // var nextRow = (col == 8) ? row + 1 : row;
    var nextRow = row + Math.floor((col + 1) / 9);
    var nextCol = (col + 1) % 9;

    // If the cell is already populated, move to the next cell
    if (grid[row][col] != null) {
        return populateGrid(grid, nextRow, nextCol, numbers);
    }

    // Shuffle the numbers for each cell to randomize the placement
    shuffleArray(numbers);

    // Try each number in the shuffled array
    for (var i = 0; i < numbers.length; i++) {
        var num = numbers[i];

        // Check if the number is valid in the current position
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;

            // Recursive call to populate the next cell
            if (populateGrid(grid, nextRow, nextCol, numbers)) {
                return true;
            }

            // If the recursive call fails, backtrack
            grid[row][col] = null;
        }
    }

    return false; // Unable to populate the grid
}

// Function to check if a number is valid in the current position
function isValid(grid, row, col, num) {
    // Check row and column
    for (var i = 0; i < 9; i++) {
        if (grid[row][i] == num || grid[i][col] == num) {
            return false;
        }
    }

    // Check 3x3 grid
    var startRow = Math.floor(row / 3) * 3;
    var startCol = Math.floor(col / 3) * 3;
    for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] == num) {
                return false;
            }
        }
    }

    return true; // Number is valid in the current position
}


function Reset()
{
    var cells = document.querySelectorAll("#Sudoku_board .cell input");
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            cells[row * 9 + col].value = "";
        }
    }

}


function Solve()
{
    var cells = document.querySelectorAll("#Sudoku_board .cell input");
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            cells[row * 9 + col].value = grid_values[row][col];
        }
    }
}