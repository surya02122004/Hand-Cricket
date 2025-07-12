let sixaud = new Audio("sixaud.mp3");
let tossaud = new Audio("tossaud.mp3");
let fouraud = new Audio("fouraud.mp3");
let hitaud = new Audio("hit.mp3");
let outaud = new Audio("outaud.mp3");
let startingtheme = new Audio("startingtheme.mp3");

// Declare all DOM element variables globally
let b1, heads, tails, tossbtn, res, hd, td, resultwon, resultlost;
let wonn, bat, ball, lostt, b11;
let sb, plasc, comsc, tab1, r11, r12, infooo;
let btn100, s1, s2, s3, s4, s6;
let outu, i1, i2, i3, i4, i6;
let jkkk, celebrations, btnreset, reset;

// Ensure all DOM elements are loaded and assigned to variables before adding listeners
window.addEventListener("DOMContentLoaded", () => {
    // Assign DOM elements to variables
    b1 = document.getElementById('b1');
    heads = document.getElementById('heads');
    tails = document.getElementById('tails');
    tossbtn = document.getElementById('tossbtn');
    res = document.getElementById('res');
    hd = document.getElementById('hd');
    td = document.getElementById('td');
    resultwon = document.getElementById('resultwon');
    resultlost = document.getElementById('resultlost');
    wonn = document.getElementById('wonn');
    bat = document.getElementById('bat');
    ball = document.getElementById('ball');
    lostt = document.getElementById('lostt');
    b11 = document.getElementById('b11');
    sb = document.getElementById('sb');
    plasc = document.getElementById('plasc');
    comsc = document.getElementById('comsc');
    tab1 = document.getElementById('tab1');
    r11 = document.getElementById('r11');
    r12 = document.getElementById('r12');
    infooo = document.getElementById('infooo');
    btn100 = document.getElementById('btn100');
    s1 = document.getElementById('s1');
    s2 = document.getElementById('s2');
    s3 = document.getElementById('s3');
    s4 = document.getElementById('s4');
    s6 = document.getElementById('s6');
    outu = document.getElementById('outu');
    i1 = document.getElementById('i1');
    i2 = document.getElementById('i2');
    i3 = document.getElementById('i3');
    i4 = document.getElementById('i4');
    i6 = document.getElementById('i6');
    jkkk = document.getElementById('jkkk');
    celebrations = document.getElementById('celebrations');
    btnreset = document.getElementById('btnreset');
    reset = document.getElementById('reset');


    const audio = document.getElementById("bg-music");
    audio.volume = 0.5; // Adjust volume (0.0 to 1.0)

    document.body.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        }
    });

    // Event listener for the START button
    b1.addEventListener('click', () => {
        tossaud.play();
        document.querySelectorAll('.startmenu')[0].style.display = 'flex';
    });

    let k = 0; // Variable to store user's toss choice (1 for Heads, 2 for Tails)

    // Event listeners for Heads and Tails radio buttons
    heads.addEventListener('click', () => {
        k = 1;
    });
    tails.addEventListener('click', () => {
        k = 2;
    });

    // Event listener for the Toss Coin button
    tossbtn.addEventListener('click', () => {
        // Hide start menu and start button
        document.querySelectorAll('.startmenu')[0].style.display = 'none';
        b1.style.display = 'none';
        res.style.display = 'flex'; // Display the toss result section

        let i = Math.random(); // Random number for toss result
        
        // Determine toss winner and display appropriate image/message
        if (i < 0.5) { // Heads
            hd.style.display = 'flex'; // Show heads image
            if (k == 1) { // User chose Heads
                resultwon.innerText = "YOU WON THE TOSS!";
                win(); // Call win function
            } else { // User chose Tails
                resultwon.innerText = "YOU LOST THE TOSS!";
                loss(); // Call loss function
            }
        } else { // Tails
            td.style.display = 'flex'; // Show tails image
            if (k == 2) { // User chose Tails
                resultwon.innerText = "YOU WON THE TOSS!";
                win(); // Call win function
            } else { // User chose Heads
                resultwon.innerText = "YOU LOST THE TOSS!";
                loss(); // Call loss function
            }
        }
    });
    
    // Reloads the page to restart the game
    reset.addEventListener('click', () => {
        location.reload();
    });
}); // End of DOMContentLoaded

let order = 0; // Game order: 1 if player bats first, 2 if player bowls first

// Function when player wins the toss
function win() {
    wonn.style.display = 'flex'; // Show bat/bowl choice
    // Event listener for choosing to Bat
    bat.addEventListener('click', () => {
        lostt.style.display = 'none'; // Hide potential "You Lost" message
        order = 1; // Player bats first
        gaming(); // Start the game
    });
    // Event listener for choosing to Bowl
    ball.addEventListener('click', () => {
        lostt.style.display = 'none'; // Hide potential "You Lost" message
        order = 2; // Player bowls first
        gaming(); // Start the game
    });
}

// Function when player loses the toss
async function loss() {
    let lo = Math.random(); // Computer's choice
    lostt.style.display = 'flex'; // Show opponent's choice message
    if (lo < 0.8) { // Computer chooses to Bowl (player bats)
        lostt.innerText = "OPPONENT CHOSE TO BOWL!";
        await sleep(2000); // Short delay
        lostt.style.display = 'none';
        order = 1; // Player bats first
        gaming(); // Start the game
    } else { // Computer chooses to Bat (player bowls)
        lostt.innerText = "OPPONENT CHOSE TO BAT!";
        await sleep(2000); // Short delay
        lostt.style.display = 'none';
        order = 2; // Player bowls first
        gaming(); // Start the game
    }
}

let playerscore = 0;
let computerscore = 0;

// Function to start the main game
async function gaming() {
    b11.style.display = 'flex'; // Show "START GAME" button
    b11.addEventListener('click', async () => {
        // Hide toss results and initial game start button
        res.style.display = 'none';
        b11.style.display = 'none';
        wonn.style.display = 'none';
        lostt.style.display = 'none';

        sb.style.display = 'flex'; // Show scoreboard
        plasc.innerText = "PLAYER RUNS:0";
        comsc.innerText = "COMPUTER RUNS:0";
        playerscore = 0; // Reset scores for a new game
        computerscore = 0;

        // Determine batting/bowling order and start innings
        if (order == 1) { // Player bats first
            infooo.innerText = "YOU ARE BATTING FIRST";
            await batting();
            infooo.innerText = "YOU ARE BOWLING NOW";
            await bowling();
        } else { // Player bowls first
            infooo.innerText = "YOU ARE BOWLING FIRST";
            await bowling();
            infooo.innerText = "YOU ARE BATTING NOW";
            await batting();
        }

        // After both innings are complete, check final status
        btn100.style.display = 'none';
        tab1.style.display = 'none';
        checkstatus(order, playerscore, computerscore);
    });
}

// Function for the bowling innings (computer is batting)
async function bowling() {
    document.getElementById('tab1').style.display = 'flex';
    r11.innerText = "YOU BOWL";
    r12.innerText = "COMPUTER BAT";
    infooo.innerText = "YOU ARE BOWLING";
    btn100.style.display = 'flex'; // Show run selection buttons

    let current_computer_runs = 0;
    for (let i = 1; i <= 6; i++) { // Simulate 6 balls
        let cmprun = cmprandomruns(); // Computer's random run choice
        let player_choice = await waitForUserInput(); // Player's choice (run or out)

        r21.innerText = player_choice;
        r22.innerText = cmprun;

        if (player_choice === cmprun) { // OUT!
            await imgent(0); // Show "OUT" image
            computerscore = current_computer_runs; // Finalize computer's score
            return; // Innings over
        } else {
            current_computer_runs += cmprun; // Add computer's runs
            computerscore = current_computer_runs; // Update global computer score
            await imgent(cmprun); // Show run image
            console.log("Computer Runs:", current_computer_runs);
            comsc.innerText = "COMPUTER RUNS:" + current_computer_runs;

            // If player batted first (order 1), check if computer has surpassed target
            if (order === 1) {
                // If computer's current runs are greater than player's target score
                if (await checkForEarlyWin(current_computer_runs, playerscore, false)) { // false because computer is batting
                    return; // Game over, computer won
                }
            }
        }
    }
    return; // Innings over (all 6 balls played)
}

// Function for the batting innings (player is batting)
async function batting() {
    document.getElementById('tab1').style.display = 'flex';
    r11.innerText = "YOU BAT";
    r12.innerText = "COMPUTER BOWL";
    infooo.innerText = "YOU ARE BATTING";
    btn100.style.display = 'flex'; // Show run selection buttons

    let current_player_runs = 0;
    for (let i = 1; i <= 6; i++) { // Simulate 6 balls
        let cmprun = cmprandomruns(); // Computer's random bowl choice
        let player_choice = await waitForUserInput(); // Player's run choice

        r21.innerText = player_choice;
        r22.innerText = cmprun;

        if (player_choice === cmprun) { // OUT!
            await imgent(0); // Show "OUT" image
            await sleep(2000); // Give time to see "OUT" image
            playerscore = current_player_runs; // Finalize player's score
            return; // Innings over
        } else {
            current_player_runs += player_choice; // Add player's runs
            playerscore = current_player_runs; // Update global player score
            await imgent(player_choice); // Show run image
            console.log("Player Runs:", current_player_runs);
            plasc.innerText = "PLAYER RUNS:" + current_player_runs;

            // If player bowled first (order 2), check if player has surpassed target
            if (order === 2) {
                // If player's current runs are greater than computer's target score
                if (await checkForEarlyWin(current_player_runs, computerscore, true)) { // true because player is batting
                    return; // Game over, player won
                }
            }
        }
    }
    return; // Innings over (all 6 balls played)
}

// Function to check final game status after both innings are complete
async function checkstatus(ord, p_final_score, c_final_score) {
    await sleep(2000); // Short delay before showing final result
    btn100.style.display = 'none'; // Hide game buttons
    tab1.style.display = 'none'; // Hide score table
    sb.style.display = 'none'; // Hide scoreboard

    const jkkk_element = document.getElementById("jkkk");
    jkkk_element.style.display = "flex"; // Show the container for celebrations and reset button
    celebrations.style.display = "flex"; // Show the celebrations message

    if (p_final_score === c_final_score) {
        celebrations.innerText = "MATCH DRAW!";
    } else if (p_final_score > c_final_score) {
        celebrations.innerText = "PLAYER WON THE MATCH!";
    } else {
        celebrations.innerText = "COMPUTER WON THE MATCH!";
    }

    await sleep(5000); // Display result message for 5 seconds
    
    celebrations.style.display = "none"; // Hide celebrations message
    btnreset.style.display = 'flex'; // Show the reset button
}

// Function to check for win condition during an innings (if target is surpassed)
// Returns true if game is over, false otherwise
async function checkForEarlyWin(current_batter_score, target_score, isPlayerBatting) {
    if (current_batter_score > target_score) {
        btn100.style.display = 'none';
        tab1.style.display = 'none';
        sb.style.display = 'none';

        const jkkk_element = document.getElementById("jkkk");
        jkkk_element.style.display = "flex"; // Make container visible (flex for centering)
        celebrations.style.display = "flex"; // Make celebrations visible
        
        if (isPlayerBatting) {
            celebrations.innerText = "PLAYER WON THE MATCH!";
        } else {
            celebrations.innerText = "COMPUTER WON THE MATCH!";
        }
        
        btnreset.style.display = 'flex'; // Show reset button
        await sleep(3000); // Display message for 3 seconds
        return true; // Game is over
    }
    return false; // Game continues
}

// Waits for player to click a run button
function waitForUserInput() {
    return new Promise(resolve => {
        // Get fresh references to the buttons each time this function is called
        // This is crucial since we are not cloning anymore.
        const buttons = [
            { element: document.getElementById('s1'), value: 1 },
            { element: document.getElementById('s2'), value: 2 },
            { element: document.getElementById('s3'), value: 3 },
            { element: document.getElementById('s4'), value: 4 },
            { element: document.getElementById('s6'), value: 6 }
        ];

        buttons.forEach(buttonObj => {
            const button = buttonObj.element;
            if (button) {
                // Use a named function for the event listener so we can remove it later if needed,
                // although { once: true } largely handles this for single-use promises.
                const clickHandler = function() {
                    // This listener will only fire once due to { once: true }
                    resolve(buttonObj.value);
                };
                // Add event listener with { once: true } to automatically remove it after first click
                button.addEventListener('click', clickHandler, { once: true });
            } else {
                console.error(`Button with ID ${buttonObj.value} not found.`);
            }
        });
    });
}

// Generates a random run for the computer
function cmprandomruns() {
    let qi = Math.random() * 6;
    if (qi <= 1) { return 1; }
    else if (qi <= 2) { return 2; }
    else if (qi <= 3) { return 3; }
    else if (qi <= 4) { return 4; }
    else { return 6; }
}

// Handles displaying the run/out images and playing sounds
async function imgent(in1) {
    let selectedImage;
    let displayTime = 2500; // Default display time for images

    // Hide all game elements before showing image
    btn100.style.display = 'none';
    tab1.style.display = 'none';

    switch (in1) {
        case 0:
            selectedImage = outu;
            displayTime = 3000;
            outaud.play();
            break;
        case 1:
            selectedImage = i1;
            hitaud.play();
            break;
        case 2:
            selectedImage = i2;
            hitaud.play();
            break;
        case 3:
            selectedImage = i3;
            hitaud.play();
            break;
        case 4:
            selectedImage = i4;
            fouraud.play();
            displayTime = 4000;
            break;
        case 6:
            selectedImage = i6;
            sixaud.play();
            displayTime = 6000;
            break;
        default:
            console.error("Unknown run value:", in1);
            selectedImage = i1; // Fallback to 1 run image
            hitaud.play();
            break;
    }
    
    // Show the selected image
    selectedImage.style.display = 'flex';
    await sleep(displayTime); // Wait for the image to display
    selectedImage.style.display = 'none'; // Hide the image

    // Re-display game elements after image
    btn100.style.display = 'flex';
    tab1.style.display = 'flex';
}

// Simple sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
