import { cashflow, loanAmount, monthLoanPrice, priceM2, profitability, totalPrice } from "./helpers";

test('Helpers: price m²', () => {
    expect(priceM2(1000, 1)).toBe(1000);
});

test('Helpers: Loan price test', () => {
    expect(monthLoanPrice(50000, 1.1, 0.34, 15)).toBeCloseTo(315.61804);
});

test('Helpers: profitabiliy', () => {
    expect(profitability(50000, 500, 2)).toBeCloseTo(10);
});

test('Helpers: cashflow', () => {
    expect(cashflow(300, 500, 2)).toBeCloseTo(116.666);
});

test('Helpers: loanAmount', () => {
    expect(loanAmount(10000, 10, 1000, 2000)).toBeCloseTo(10000);
});

test('Helpers: loanAmount', () => {
    expect(totalPrice(10000, 10, 1000)).toBeCloseTo(12000);
});

