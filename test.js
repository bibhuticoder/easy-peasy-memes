function test(){
    const inputs = ["1234567898234"];
    const outputs = ["बाह्र खर्ब, चौँतिस अर्ब, छपन्न करोड, अठहत्तर लाख, अन्ठानब्बे हजार, दुई सय चौँतिस"]
    const report = [];
    inputs.forEach((input, i) => {
        const output = compute(input);
        const status = (outputs[i] === output) ? "success" : "failure";
        report.push({status, input, output});
    })
    return report;
}