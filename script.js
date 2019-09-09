const DIGITS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen"
];

const DIGIT_TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety"
];

const DIGIT_PLACES = ["Thousand", "Lakh", "Crore", "Arab", "Kharab"];

function computeWord(digit, place) {
  return place === 0
    ? computeHundredsPlaceWord(digit)
    : computeGreaterPlaceWord(digit, place);
}

function computeHundredsPlaceWord(digit) {
  // zero(handled from caller function) and empty string
  if (len(digit) === 0 || digit === 0) return "";
  // 1 ... 19
  else if (digit <= 19) return DIGITS[parseInt(digit)];
  // 20 ... 99
  else if (digit >= 20 && digit <= 99) {
    // 20, 30 ....
    if (digit % 10 === 0) return DIGIT_TENS[str(digit)[0]];
    // 20 ... 99
    else return DIGIT_TENS[str(digit)[0]] + " " + DIGITS[str(digit)[1]];
  }
  // 100, 101, 1001 ....
  else if (digit > 99) {
      const hundreds = (DIGITS[str(digit)[0]] === "0") ? "" : DIGITS[str(digit)[0]] + " Hundred ";
      const tens = (digit % 100 === 0) ? "" : computeHundredsPlaceWord(str(digit)[1] + str(digit)[2]);
      return hundreds + (tens !== "" ? "and " + tens : "");
  }
}

function computeGreaterPlaceWord(digit, place) {
  if (digit === 0) return "";
  return computeHundredsPlaceWord(digit) + " " + DIGIT_PLACES[place - 1];
}

function compute(number) {
  let parsedNum = Math.abs(parseInt(number));

  // invalid number
  if (len(parsedNum) > 13 || isNaN(parsedNum)) return "Invalid";

  // directly map number 0...19
  if (parsedNum <= 19) return DIGITS[parsedNum];

  let splited = splitNumber(number);
  splited = splited.map((digit, place) => {
    place = splited.length - place - 1;
    return computeWord(digit, place);
  });
  return splited.filter(n => n.length > 0).join(", ");
}

// number: String, return [Number]
function splitNumber(number) {
  // don't split if <= 2 digit number
  if (len(number) <= 2) return [number];

  let collection = [];

  //last three digits
  collection.push(parseInt(getLastNChars(number, 3)));
  number = removeLastNChars(number, 3);

  //remaining digits in 2 digit chunk
  while (number.length) {
    if (number.length >= 2) {
      let chunk = getLastNChars(number, 2);
      number = removeLastNChars(number, 2);
      collection.push(parseInt(chunk));
    } else {
      collection.push(parseInt(number));
      number = "";
    }
  }

  // Split was done from ones place, so need to reverse it
  return collection.reverse();
}

// helper methods
function getLastNChars(str, n) {
  return str.substr(str.length - n, str.length);
}

function removeLastNChars(str, n) {
  return str.substr(0, str.length - n);
}

function len(digit) {
  return str(digit).length;
}

function str(digit) {
  return digit.toString();
}
