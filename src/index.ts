/**
 * Project Euler #13
 */

import * as inputNumber from "./number.json";

/**
 * Sum columns of elements in input up to elementLength - N
 * 
 * @param N number
 * @param input string[]
 * @returns number
 */
const getCarryVal = (N: number, input: string[]): number => {
  const elementLength = input[0].length;

  const cols = Array.from(
    { length: elementLength - N }, (_, k) => (elementLength - 1 - k)
  );

  return cols.reduce((carry, colIndex) => {
    const sum = input.reduce((_prev, _curr) => 
      _prev + (_curr.charCodeAt(colIndex) - 48)
    , 0);
    return Math.floor(sum / 10);
  }, 0);
}

/**
 * Gets the first N digits from the sum of numbers represented in the input
 * @param N number
 * @param input string[]
 * @returns string representing the first 10 digits of the sum
 */
const getFirstNFromSumOf = (N: number, input: string[]): string => {
  const carry = getCarryVal(N, input);
  const sum = input.reduce(
    (prev, curr) => prev + Number(curr.slice(0, N)), 
    0
  );
  return String(sum + carry).slice(0, N);
}

// Validate
const validate = (input: string[]): { length: number, valid: boolean } => {
  if (input.length === 0) return { length: 0, valid: false };
  return input.reduce((prev, curr, idx) => {
    if (idx === 0) {
      return { length: curr.length, valid: true };
    }
    return { length: prev.length, valid: prev.valid && curr.length === prev.length }
  }, { length: -1, valid: true });
}

const { input } = inputNumber;
const { valid, length } = validate(input);
if (!valid) {
  throw Error("Data is not valid; ragged array");
}
if (length <= 0 ) {
  throw Error("Empty rows");
}

const result = getFirstNFromSumOf(10, input);
console.log(`${result}`);