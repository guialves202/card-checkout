export function generateCardNumber(cardNumbersThatAlreadyExists: { number: string }[]) {
  const cardNumberPart1 = Math.floor(1000 + Math.random() * 9000)
  const cardNumberPart2 = Math.floor(1000 + Math.random() * 9000)
  const cardNumberPart3 = Math.floor(1000 + Math.random() * 9000)
  const cardNumberPart4 = Math.floor(1000 + Math.random() * 9000)
  const newCardNumber = `${cardNumberPart1} ${cardNumberPart2} ${cardNumberPart3} ${cardNumberPart4}`

  cardNumbersThatAlreadyExists.forEach(cardNumberObj => {
    if (cardNumberObj.number == newCardNumber) {
      generateCardNumber(cardNumbersThatAlreadyExists)
    }
  })

  return newCardNumber
}

export function generateCardSecurityCode() {
  return (Math.floor(100 + Math.random() * 900)).toString()
}
