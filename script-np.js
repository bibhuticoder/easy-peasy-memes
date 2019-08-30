const DIGITS = [
  "सुन्ना",
  "एक",
  "दुई",
  "तिन",
  "चार",
  "पाँच",
  "छ",
  "सात",
  "आठ",
  "नौ",
  "दस",
  "एघार",
  "बाह्र",
  "तेह्र",
  "चौध",
  "पन्ध्र",
  "सोह्र",
  "सत्र",
  "अठार",
  "उन्नाइस",
  "बिस",
  "एक्काइस",
  "बाइस",
  "तेइस",
  "चौबिस",
  "पच्चिस",
  "छब्बिस",
  "सत्ताइस",
  "अट्ठाइस",
  "उनन्तिस",
  "तिस",
  "एकतिस",
  "बत्तिस",
  "तेत्तिस",
  "चौँतिस",
  "पैँतिस",
  "छत्तिस",
  "सैँतिस",
  "अठतिस",
  "उनन्चालिस",
  "चालिस",
  "एकचालिस",
  "बयालिस",
  "त्रिचालिस",
  "चवालिस",
  "पैँतालिस",
  "छयालिस",
  "सतचालिस",
  "अठचालिस",
  "उनन्चास",
  "पचास",
  "एकाउन्न",
  "बाउन्न",
  "त्रिपन्न",
  "चवन्न",
  "पचपन्न",
  "छपन्न",
  "सन्ताउन्न",
  "अन्ठाउन्न",
  "उनन्साठी",
  "साठी",
  "एकसट्ठी",
  "बयसट्ठी",
  "त्रिसट्ठी",
  "चौसट्ठी",
  "पैँसट्ठी",
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
  "एकानब्बे",
  "बयानब्बे",
  "त्रियानब्बे",
  "चौरानब्बे",
  "पन्चानब्बे",
  "छयानब्बे",
  "सन्तानब्बे",
  "अन्ठानब्बे",
  "उनान्सय",
  "सय"
];
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
  else if (len(digit) <= 2) return DIGITS[digit];
  else if (len(digit) === 3) {
    if (digit === 100) return DIGITS[digit];
    const hundreds = DIGITS[str(digit)[0]];
    const tens = DIGITS[str(digit)[1] + str(digit)[2]];
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
