/**
 * Project Euler #13
 */

import * as inputNumber from "./number.json";

type NonEmptyArray<T> = [T, ...T[]];
type Valid = { _type: "valid" } & { input: NonEmptyArray<string>; length: number };
type InputError = { _type: "error" } & { error: string };
type ValidateResult = Valid | InputError;
//========
// Helpers
//========
const validate = (input: string[]): ValidateResult => {
  if (input.length === 0) return { _type: "error", error: "Empty rows" };

  const len = input[0].length;
  const ok = input.every(s => s.length === len);
  if (!ok) return { _type: "error", error: "Data is not valid; ragged array" } as InputError;

  return { _type: "valid", input: input as NonEmptyArray<string>, length: len } as Valid;
}

/**
 * Gets numeric of string at position idx
 * @param s string
 * @param idx index of the digit
 * @returns number
 */
const digitAt = (s: string, idx: number): number => s.charCodeAt(idx) - 48;

/**
 * Sums numbers of a column from array input at index colIdx
 * @param input ReadonlyArray<string>
 * @param colIdx number
 * @returns number
 */
const sumColumn = (input: ReadonlyArray<string>, colIdx: number): number =>
  input.reduce((acc, s) => acc + digitAt(s, colIdx), 0);

/**
 * Calculates carry given the previous carry and column's sum
 * @param carry number
 * @param colSum number
 * @returns number
 */
const nextCarry = (carry: number, colSum: number): number =>
  Math.floor((carry + colSum) / 10);

/**
 * Creates array of column indices of length len from rightmost element to 
 * colIdx stopInclusive
 * @param len number length of number
 * @param stopInclusive number - column to stop 
 * @returns number[] 
 */
const colsRightToLeft = (len: number, stopInclusive: number): number[] =>
  Array.from({ length: len - stopInclusive }, (_, k) => (len - 1) - k);

/**
 * Sum columns of elements in input up to elementLength - N
 * 
 * @param N number
 * @param input string[]
 * @returns number
 */
const getCarryVal = (N: number, input: NonEmptyArray<string>): number => {
  const len = input[0].length;
  const cols = colsRightToLeft(len, N);
  return cols.reduceRight(
    (carry, colIdx) => nextCarry(carry, sumColumn(input, colIdx)),
    0
  );
};

/**
 * Gets the first N digits from the sum of numbers represented in the input
 * @param N number
 * @param input string[]
 * @returns string representing the first 10 digits of the sum
 */
const getFirstNFromSumOf = (N: number, input: NonEmptyArray<string>): string => {
  const carry = getCarryVal(N, input);
  const sumHigh = input.reduce((acc, s) => acc + Number(s.slice(0, N)), 0);
  return String(sumHigh + carry).slice(0, N);
};

const validation = validate(inputNumber.input);
if (validation._type === "error") {
  throw Error(`${validation.error}`);
}
const { input } = validation;
const result = getFirstNFromSumOf(10, input);
console.log(`${result}`);