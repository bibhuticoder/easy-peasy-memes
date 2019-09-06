const DIGITS = [
  "शुन्य",
  "एक",
  "दुई",
  "तीन",
  "चार",
  "पाँच",
  "छ",
  "सात",
  "आठ",
  "नौ",
  "दश",
  "एघार",
  "बाह्र",
  "तेह्र",
  "चौध",
  "पन्ध्र",
  "सोह्र",
  "सत्र",
  "अठार",
  "उन्नाइस",
  "विस",
  "एक्काइस",
  "बाइस",
  "तेईस",
  "चौविस",
  "पच्चिस",
  "छब्बिस",
  "सत्ताइस",
  "अठ्ठाईस",
  "उनन्तिस",
  "तिस",
  "एकत्तिस",
  "बत्तिस",
  "तेत्तिस",
  "चौँतिस",
  "पैँतिस",
  "छत्तिस",
  "सैँतीस",
  "अठतीस",
  "उनन्चालीस",
  "चालीस",
  "एकचालीस",
  "बयालीस",
  "त्रियालीस",
  "चवालीस",
  "पैँतालीस",
  "छयालीस",
  "सच्चालीस",
  "अठचालीस",
  "उनन्चास",
  "पचास",
  "एकाउन्न",
  "बाउन्न",
  "त्रिपन्न",
  "चउन्न",
  "पचपन्न",
  "छपन्न",
  "सन्ताउन्न",
  "अन्ठाउन्न",
  "उनन्साठी",
  "साठी",
  "एकसट्ठी",
  "बयसट्ठी",
  "त्रिसट्ठी",
  "चौंसट्ठी",
  "पैंसट्ठी",
  "छयसट्ठी",
  "सतसट्ठी",
  "अठसट्ठी",
  "उनन्सत्तरी",
  "सत्तरी",
  "एकहत्तर",
  "बहत्तर",
  "त्रिहत्तर",
  "चौहत्तर",
  "पचहत्तर",
  "छयहत्तर",
  "सतहत्तर",
  "अठहत्तर",
  "उनासी",
  "असी",
  "एकासी",
  "बयासी",
  "त्रियासी",
  "चौरासी",
  "पचासी",
  "छयासी",
  "सतासी",
  "अठासी",
  "उनान्नब्बे",
  "नब्बे",
  "एकान्नब्बे",
  "बयानब्बे",
  "त्रियान्नब्बे",
  "चौरान्नब्बे",
  "पन्चानब्बे",
  "छयान्नब्बे",
  "सन्तान्नब्बे",
  "अन्ठान्नब्बे",
  "उनान्सय",
  "एक सय"
];
const DIGIT_PLACES = ["हजार", "लाख", "करोड", "अर्ब", "खर्ब"];

function computeWord(digit, place) {
  return place === 0
    ? computeHundredsPlaceWord(digit)
    : computeGreaterPlaceWord(digit, place);
}

function computeHundredsPlaceWord(digit) {
  if (len(digit) === 0 || digit === 0) return "";
  if (len(digit) <= 2) return DIGITS[digit];
  else if (len(digit) === 3) {
    if (digit === 100) return DIGITS[digit];
    else if (digit % 100 === 0) return DIGITS[str(digit)[0]] + " सय";
    const hundreds = DIGITS[str(digit)[0]];
    const tens = DIGITS[parseInt(str(digit)[1] + str(digit)[2])];
    return hundreds + " सय " + tens;
  }
}

function computeGreaterPlaceWord(digit, place) {
  if (digit === 0) return "";

  // -1 because DIGIT_PLACES start from thousand, excluding hundred
  return DIGITS[digit] + " " + DIGIT_PLACES[place - 1];
}

function compute(number) {
  let parsedNum = parseInt(number);

  // invalid number
  if (len(parsedNum) > 13 || isNaN(parsedNum)) return "Invalid";

  // directly map number 0...100
  if (parsedNum <= 100) return DIGITS[parsedNum];

  // split > 100 numbers
  let splited = splitNumber(str(parsedNum));
  splited = splited.map((digit, place) => {
    // place is a misnomer here, its calculated as per the requirements of this algorithm
    place = splited.length - place - 1;
    return computeWord(digit, place);
  });
  return splited.filter(n => n.length > 0).join(", ");
}

// number: String, return [Number]
function splitNumber(number) {
  let collection = [];

  //last three digits
  collection.push(parseInt(getLastNChars(number, 3)));
  number = removeLastNChars(number, 3);

  //remaining digits in 2 digit chunk
  while (number.length) {
    if(number.length >= 2){
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
function getLastNChars(str, n){
  return str.substr(str.length-n, str.length);
}

function removeLastNChars(str, n){
  return str.substr(0, str.length - n);
}

function len(digit) {
  return str(digit).length;
}

function str(digit) {
  return digit.toString();
}
