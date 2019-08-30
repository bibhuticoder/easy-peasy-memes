const DIGITS = {
  0: "सुन्ना",
  1: "एक",
  2: "दुई",
  3: "तिन",
  4: "चार",
  5: "पाँच",
  6: "छ",
  7: "सात",
  8: "आठ",
  9: "नौ",
  10: "दस",
  11: "एघार",
  12: "बाह्र",
  13: "तेह्र",
  14: "चौध",
  15: "पन्ध्र",
  16: "सोह्र",
  17: "सत्र",
  18: "अठार",
  19: "उन्नाइस",
  20: "बिस",
  21: "एक्काइस",
  22: "बाइस",
  23: "तेइस",
  24: "चौबिस",
  25: "पच्चिस",
  26: "छब्बिस",
  27: "सत्ताइस",
  28: "अट्ठाइस",
  29: "उनन्तिस",
  30: "तिस",
  31: "एकतिस",
  32: "बत्तिस",
  33: "तेत्तिस",
  34: "चौँतिस",
  35: "पैँतिस",
  36: "छत्तिस",
  37: "सैँतिस",
  38: "अठतिस",
  39: "उनन्चालिस",
  40: "चालिस",
  41: "एकचालिस",
  42: "बयालिस",
  43: "त्रिचालिस",
  44: "चवालिस",
  45: "पैँतालिस",
  46: "छयालिस",
  47: "सतचालिस",
  48: "अठचालिस",
  49: "उनन्चास",
  50: "पचास",
  51: "एकाउन्न",
  52: "बाउन्न",
  53: "त्रिपन्न",
  54: "चवन्न",
  55: "पचपन्न",
  56: "छपन्न",
  57: "सन्ताउन्न",
  58: "अन्ठाउन्न",
  59: "उनन्साठी",
  60: "साठी",
  61: "एकसट्ठी",
  62: "बयसट्ठी",
  63: "त्रिसट्ठी",
  64: "चौसट्ठी",
  65: "पैँसट्ठी",
  66: "छयसट्ठी",
  67: "सतसट्ठी",
  68: "अठसट्ठी",
  69: "उनन्सत्तरी",
  70: "सत्तरी",
  71: "एकहत्तर",
  72: "बहत्तर",
  73: "त्रिहत्तर",
  74: "चौहत्तर",
  75: "पचहत्तर",
  76: "छयहत्तर",
  77: "सतहत्तर",
  78: "अठहत्तर",
  79: "उनासी",
  80: "असी",
  81: "एकासी",
  82: "बयासी",
  83: "त्रियासी",
  84: "चौरासी",
  85: "पचासी",
  86: "छयासी",
  87: "सतासी",
  88: "अठासी",
  89: "उनान्नब्बे",
  90: "नब्बे",
  91: "एकानब्बे",
  92: "बयानब्बे",
  93: "त्रियानब्बे",
  94: "चौरानब्बे",
  95: "पन्चानब्बे",
  96: "छयानब्बे",
  97: "सन्तानब्बे",
  98: "अन्ठानब्बे",
  99: "उनान्सय",
  100: "सय"
};
const DIGIT_PLACES = ["", "हजार", "लाख", "करोड", "अर्ब", "खर्ब"];

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
  else if (len(digit) === 2) return DIGITS[digit];
  else if (len(digit) === 3) {
    if(digit === 100) return DIGITS[digit];
     const hundreds = DIGITS[str(digit)[0]];
     const tens = DIGITS[str(digit)[1]  + str(digit)[2]];
     return hundreds + " सय " + tens;
  }
}

function computeGreaterPlaceWord(digit, place) {
    return DIGITS[digit] + " " + DIGIT_PLACES[place];
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