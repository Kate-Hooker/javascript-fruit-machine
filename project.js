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

const depositAmount = deposit()
console.log('Youre balance is ' + depositAmount)
