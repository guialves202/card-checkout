export function generateAccountNumber(accountNumbersThatAlreadyExists: { accountNumber: string }[]) {
  const newAccountNumber = Math.floor(100000 + Math.random() * 900000)
  accountNumbersThatAlreadyExists.forEach(accountNumberObj => {
    if (accountNumberObj.accountNumber == newAccountNumber.toString()) {
      generateAccountNumber(accountNumbersThatAlreadyExists)
    }
  })
  return newAccountNumber.toString()
}
