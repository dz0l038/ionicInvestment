export const priceM2 = (price: number, surface: number) => {
    return (price / surface)
}

export const monthLoanPrice = (loanAmount: number, interest: number, assuranceInterest: number, periodInYears: number) => {
    const r = interest / 100;
    const monthlyAmount = (loanAmount * r / 12) / (1 - Math.pow(1 + r / 12, -12 * periodInYears))
    const assurance = loanAmount * assuranceInterest / 100 / 12;
    return monthlyAmount + assurance
}

export const profitability = (price: number, rent: number, vacancy: number) => {
    return ((rent * (12 - vacancy)) / price * 100)
}

export const cashflow = (monthLoanPrice: number, rent: number, vacancy: number) => {
    return (rent - monthLoanPrice - rent * vacancy / 12)
}

export const loanAmount = (price: number, notaryFees: number, renovation: number, contribution: number) => {
    const total = (1 + notaryFees / 100) * price + renovation - contribution;
    return Math.max(total, 0)
}

export const totalPrice = (price: number, notaryFees: number, renovation: number) => {
    const total = (1 + notaryFees / 100) * price + renovation;
    return total
}