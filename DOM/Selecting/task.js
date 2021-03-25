let receipts = document.getElementsByTagName('li');
let total = 0.0;

// test of je de tags hebt gevonden
console.log(receipts);

// De loop selecteert de opgehaalde string en maakt hier een float van
// Op die manier krijg je een mooie optelsom
for (let i = 0; i < receipts.length; i++) {
    let totalString = receipts[i].innerHTML;
    total += parseFloat(totalString);
    console.log("totaal is nu " + total);
    console.log("afgerond getal is " + total.toFixed(2));
}

//Los de opdracht hier op
