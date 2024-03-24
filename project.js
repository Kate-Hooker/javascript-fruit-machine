// 1. Take users deposit
// 2. How many lines do they want to bet on
// 3. How big are they betting
// 4. Randomise slot machine
// 5. Check for win
// 6. Add winnings
// 7. Play again

// 1. Take users deposit - ask user to enter a number
// run node project.js to use terminal like a python terminal

const prompt = require('prompt-sync')()

//DEFINING THE SLOT MACHINE - global variables so can mess with them later
const ROWS = 3
const COLS = 3

// remember to treat this as an object and the values are keys
const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
}

const deposit = () => {
  while (true) {
    const depositAmount = prompt('Enter a deposit amount: ')
    //this works by converting number strings to numbers - if it gets words or letters you get NaN
    const numberDepositAmount = parseFloat(depositAmount)

    // this confirm thats if that input in NaN or less than zero it loops back and asks for a real number
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log('Whole dollar bets only! Try again. ')
    } else {
      return numberDepositAmount
    }
  }
}

// 2. Figure out how many lines they want to bet on
const getNumberOfLines = () => {
  const lines = prompt(
    'How many lines would you like to bet one? Must be between 1 and 3: '
  )
  //this works by converting number strings to numbers - if it gets words or letters you get NaN
  const numberOfLines = parseFloat(lines)

  // this confirm thats if that input in NaN, smaller than 1 or bigger than 3 it loops back and asks for a real number
  if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
    console.log('Please enter 1, 2 or 3! Try again. ')
  } else {
    return numberOfLines
  }
}

// 3. get bet - set balance so its not a constant, collect user input amount, calculte total bet based on lines, check if enough was bet

// when bet place check to make sure funds are available
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt('Enter your the amount you want to bet per line: ')
    const numberBet = parseFloat(bet)
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log('Invalid bet, try again.')
    } else {
      return numberBet
    }
  }
}

let balance = deposit()
const numberOfLines = getNumberOfLines()
const bet = getBet(balance, numberOfLines)
console.log(
  'Youre balance is ' + depositAmount + ' and you bet on ' + numberOfLines
  // + ' lines. TOTAL BET TODAY IS ' +
  // numberOfLines * bet
)
