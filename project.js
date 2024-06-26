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

// remember to treat this as an object and the values are keys repping how many times each value shows on a roll
const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
}

// object defining how much each letters worth
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
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

//randomise the slot machine
const spin = () => {
  //put all the symbols in an array
  const symbols = []
  // loop through everthing and put it in the array
  // in this object the keys are the symbols and the values are the count

  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // this loops through every symbol and count, now we can put it in the array
    for (let i = 0; i < count; i++) {
      // this loops through every count and pushes it to the end of the array
      symbols.push(symbol)
    }
  }

  const reels = []

  // to make a spin iterate through each reel on the fruit machine and randomise a symbol for each nested reel
  for (let i = 0; i < COLS; i++) {
    reels.push([])
    // copies the available symbols available to each array in reels
    const reelSymbols = [...symbols]
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length)
      //math.floor rounds down to the nearest integer
      const selectedSymbol = reelSymbols[randomIndex]
      // next push into array with the reels array nested in it and make sure the selected symbol cant be repeated
      reels[i].push(selectedSymbol)
      reelSymbols.splice(randomIndex, 1)
    }
  }
  return reels
}

// transpose the reels - right now the array generates 2 collumns, i need these sorted into rows so I can check for a win
const transpose = (reels) => {
  const rows = []

  // going to write a new loop to take all the symbols from collumn index 0 and push them into the rows array
  for (let i = 0; i < ROWS; i++) {
    rows.push([])
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i])
    }
  }
  return rows
}

// print the 3 rows of symbols so user can see what they bet on
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = 'A'
    for (const [i, symbol] of rows.entries()) {
      // += concatenates a string
      rowString += symbol
      if (i != rows.length - 1) {
        rowString += ' | '
      }
    }
    console.log(rowString)
  }
}

// calculate a win and add winnings to balance
const getWinnings = (rows, bet, lines) => {
  let winnings = 0

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row]
    let allSame = true

    //loop compares nominated to symbol to all the other symbols in the line, if it ever doesnt match the loop breaks
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false
        break
      }
    }
  }
}

let balance = deposit()
const numberOfLines = getNumberOfLines()
const bet = getBet(balance, numberOfLines)
const reels = spin()
const rows = transpose(reels)
printRows(rows)

//console.log(
//'Youre balance is ' + depositAmount + ' and you bet on ' + numberOfLines
// + ' lines. TOTAL BET TODAY IS ' +
// numberOfLines * bet
//)
console.log('Your columns are: ' + reels)
console.log('Your rows are: ' + rows)
