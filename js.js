let cognome = document.getElementById("cognome");
let bottone = document.getElementById("genera");
let nome = document.getElementById("nome");
let giorno = document.getElementById("giorno");
let mese = document.getElementById("mese");
let anno = document.getElementById("anno");
let sesso = document.getElementById("sesso");
let citta = document.getElementById("paese");
let codice = document.getElementById("codice_fiscale");


bottone.addEventListener("click", function() {
    let valoreCognome = cognome.value;
    let valoreNome = nome.value;
    let valoreGiorno = giorno.value;
    let valoreMese = mese.value;
    let valoreAnno = anno.value;

    if(valoreCognome === "" || valoreNome === "" || valoreAnno === "" ||valoreMese === "" ||valoreGiorno === "" || sesso.value === "Seleziona una opzione" || citta.value === "Seleziona una opzione")
    {
        alert("Attenzione, devi completare tutti i campi")
        return;
    }

    if(valoreGiorno <= 0 || valoreGiorno >= 32) { 
        alert("Giorno errato! Inserisci un numero compreso tra 1 e 31");  
        return;
    }

    if(valoreMese <= 0 || valoreMese >= 13) { 
        alert("Mese errato! Inserisci un numero compreso tra 1 e 12");  
        return;
    }

    if(valoreAnno <= 0 || valoreAnno >= 2024) { 
        alert("Anno errato! Inserisci un numero compreso tra 1 e 2023");  
        return;
    }

    for (var i = 0; i < valoreCognome.length; i++) {
        var carattere = valoreCognome.charAt(i);
        
        if (!isLetter(carattere)) {
            alert("Nel cognome inserisci solo lettere, senza numeri o caratteri speciali.");
            return;
        }
    }

    for (var i = 0; i < valoreNome.length; i++) {
        var carattere = valoreNome.charAt(i);
        if (!isLetter(carattere)) {
            alert("Nel nome inserisci solo lettere, senza numeri o caratteri speciali.");
            return;
        }
    }

    function isLetter(carattere) {
        var lettere = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàùèòìÀÈÒÙÌ";
        return lettere.indexOf(carattere) !== -1;
    }

    if(valoreAnno <= 0 || valoreAnno >= 2024) { 
        alert("Anno errato! Inserisci un numero compreso tra 1 e 2023");  
        return;
    }

    let codice_finale = "";
    
    //Cognome
    let consonanti = 0;
    for (let index = 0; index < valoreCognome.length; index++) {

        if(consonanti == 3)
            break;
        const lettera = valoreCognome[index];

        if (lettera !== 'a' && lettera !== 'e' && lettera !== 'i' && lettera !== 'o' && lettera !== 'u')
        {
            consonanti++;
            codice_finale += lettera;
        }
    }

    if(consonanti <= 2){
        let index = 0; 
        while (codice_finale.length < 3 && index < valoreCognome.length) {
        const lettera = valoreCognome[index];
        if (lettera == 'a' || lettera == 'e' || lettera == 'i' || lettera == 'o' || lettera == 'u') {
        codice_finale += lettera;
        }
        index++;
    }
}

if(valoreCognome.length == 2){ codice_finale += "x"; }

//Nome
consonanti = 0;
    for (let index = 0; index < valoreNome.length; index++) {

        if(consonanti == 4)
            break;
        const lettera = valoreNome[index];

        if (lettera !== 'a' && lettera !== 'e' && lettera !== 'i' && lettera !== 'o' && lettera !== 'u')
        {
            consonanti++;
            codice_finale += lettera;
        }
    }

    if(consonanti == 4){
        var nuovaStringa = codice_finale;
        codice_finale = nuovaStringa.slice(0, 4) + nuovaStringa.slice(5);
    }

    if(consonanti <= 2){
        let index = 0; 
        while (codice_finale.length < 6 && index < valoreCognome.length) {
        const lettera = valoreNome[index];
        if (lettera == 'a' || lettera == 'e' || lettera == 'i' || lettera == 'o' || lettera == 'u') {
        codice_finale += lettera;
        }
        index++;
    }
}

if(valoreNome.length == 2){ codice_finale += "x"; }

//Anno
codice_finale += valoreAnno.substring(2);

//Mese
switch (valoreMese) {
    case "1":
        codice_finale += "a";
        break;
    case "2":
        codice_finale += "b";
        break;
    case "3":
        codice_finale += "c";
        break;
    case "4":
        codice_finale += "d";
        break;
    case "5":
        codice_finale += "e";
        break;
    case "6":
        codice_finale += "h";
        break;
    case "7":
        codice_finale += "l";
        break;
    case "8":
        codice_finale += "m";
        break;
    case "9":
        codice_finale += "p";
        break;
    case "10":
        codice_finale += "r";
        break;
    case "11":
        codice_finale += "s";
        break;
    case "12":
        codice_finale += "t";
        break;
}

//Sesso
switch (sesso.value) {
    case "maschio":
        codice_finale += valoreGiorno;
        break;
    case "femmina":
        var giornoIntero = parseInt(valoreGiorno, 10);
        codice_finale += (giornoIntero + 40);
        break;
}

//Città
switch (citta.value) {
    case "brescia":
        codice_finale += "B157"
        break;
    case "ghedi":
        codice_finale += "D999"
        break;
    case "roma":
        codice_finale += "H501"
        break;        
    case "milano":
        codice_finale += "F205"
        break;
    case "bergamo":
        codice_finale += "A794"
        break;
    default:
        break;
}

var nuova = codice_finale.toUpperCase();
codice_finale = nuova;
codice_finale += codice_controllo(codice_finale);
    codice.innerHTML = "Il tuo codice fiscale è: " + codice_finale.toUpperCase();

});


function codice_controllo(codice){

let somma = 0;    
var cifre_dispari = {
    '0': 1,
    '1': 0,
    '2': 5,
    '3': 7,
    '4': 9,
    '5': 13,
    '6': 15,
    '7': 17,
    '8': 19,
    '9': 21,
    'A': 1,
    'B': 0,
    'C': 5,
    'D': 7,
    'E': 9,
    'F': 13,
    'G': 15,
    'H': 17,
    'I': 19,
    'J': 21,
    'K': 2,
    'L': 4,
    'M': 18,
    'N': 20,
    'O': 11,
    'P': 3,
    'Q': 6,
    'R': 8,
    'S': 12,
    'T': 14,
    'U': 16,
    'V': 10,
    'W': 22,
    'X': 25,
    'Y': 24,
    'Z': 23
};

const mappaDaOggetto = new Map();

for (const chiave in cifre_dispari) {
  if (cifre_dispari.hasOwnProperty(chiave)) {
    mappaDaOggetto.set(chiave, cifre_dispari[chiave]);
  }
}

for (let index = 0; index <= 15; index+=2) {
    somma += parseInt(mappaDaOggetto.get(codice[index]));
}

const nuova_mappa = new Map();
var cifre_pari = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'P': 15,
    'Q': 16,
    'R': 17,
    'S': 18,
    'T': 19,
    'U': 20,
    'V': 21,
    'W': 22,
    'X': 23,
    'Y': 24,
    'Z': 25
  };

for (const chiave in cifre_pari) {
  if (cifre_pari.hasOwnProperty(chiave)) {
    nuova_mappa.set(chiave, cifre_pari[chiave]);
  }
}

for (let index = 1; index < 15; index+=2) {
    somma += parseInt(nuova_mappa.get(codice[index]));
}

var numero = somma % 26;
cifre_dispari = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
if(cifre_dispari[numero] === "")
    return "H";
else return cifre_dispari[numero];
}