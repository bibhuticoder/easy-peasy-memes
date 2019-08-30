const DIGIT_ONES = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen"
};

const DIGIT_TENS = {
  2: "twenty",
  3: "thirty",
  4: "forty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety"
};

const DIGIT_PLACES = ["", "thousand", "lakh", "crore", "arab", "kharab"];

var number = "123456";

function computeWord(digit, place) {
  if (place === 0) {
    // ones, tens, hundreds place
    return computeHundredsPlaceWord(digit);
  } else {
    // greater than hunderds place
    return computeGreaterPlaceWord(digit, place);
  }
}

function computeHundredsPlaceWord(digit) {
  if (len(digit) === 0) return "";
  else if (len(digit) === 1) return DIGIT_ONES[digit];
  else if (len(digit) === 2) {
    if (digit < 20) return DIGIT_ONES[digit];
    else return DIGIT_TENS[digit[0]] + " " + DIGIT_ONES[1];
  } else if (len(digit) === 3) {
    const hundreds = DIGIT_ONES[str(digit)[0]];
    const tens = DIGIT_TENS[str(digit)[1]];
    const ones = str(digit)[2] === "0" ? "" : DIGIT_ONES[str(digit)[2]];
    return hundreds + " hundred and " + tens + " " + ones;
  }
}

function computeGreaterPlaceWord(digit, place) {
  if (len(digit) === 1) {
    return DIGIT_ONES[digit] + " " + DIGIT_PLACES[place];
  } else if (len(digit) === 2) {
    if (digit < 20) return DIGIT_ONES[digit] + " " + DIGIT_PLACES[place];
    else {
      const tens = DIGIT_TENS[str(digit)[0]];
      const ones = str(digit)[1] === "0" ? "" : DIGIT_ONES[str(digit)[1]];
      const place = DIGIT_PLACES[place];
      return tens + " " + ones + " " + place;
    }
  }
}

function compute(number) {
  let splited = splitNumber(number);
  splited = splited.map((digit, place) => {
    place = splited.length - place - 1;
    return computeWord(digit, place);
  });
  return splited.join(", ");
}

function splitNumber(number) {
  let collection = [];

  //first three
  collection.push(number % 1000);
  number = number.substr(0, number.length - 3);

  //remaining digits
  while (number.length) {
    let parsedNum = parseInt(number);
    let chunk = parsedNum % 100;
    number = number.replace(chunk, "");
    collection.push(chunk);
  }
  return collection.reverse();
}

function len(digit) {
  return digit.toString().length;
}

function str(digit) {
  return digit.toString();
}
