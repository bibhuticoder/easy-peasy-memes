function test() {
  const inputs = [
    "1234567898234",
    "00000000000000000001000000000011",
    "0",
    "123456700000"
  ];
  const outputs = [
    "बाह्र खर्ब, चौँतिस अर्ब, छपन्न करोड, अठहत्तर लाख, अन्ठान्नब्बे हजार, दुई सय चौँतिस",
    "दश खर्ब, एघार",
    "शुन्य",
    "एक खर्ब, तेईस अर्ब, पैँतालीस करोड, सतसट्ठी लाख"
  ];
  const report = [];
  inputs.forEach((input, i) => {
    const output = compute(input);
    const status = outputs[i] === output ? "success" : "failure";
    report.push({ status, input, output });
  });
  return report;
}
