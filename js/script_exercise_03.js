const Canvas = document.getElementById("myCanvas");
const ctx = Canvas.getContext("2d");

ctx.strokeStyle = "black";

function UpdateGallow()
{
    switch (Attempts) {
        case 1:
            ctx.beginPath();
            ctx.lineTo(25, 125);
            ctx.lineTo(25, 100);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.lineTo(25, 95);
            ctx.lineTo(25, 70);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.lineTo(25, 65);
            ctx.lineTo(25, 40);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.lineTo(25, 35);
            ctx.lineTo(100, 35);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.lineTo(100, 35);
            ctx.lineTo(100, 40);
            ctx.stroke();
            break;
        case 6:
            //head
            ctx.beginPath();
            ctx.arc(100, 50, 10, 0, 2 * Math.PI);
            ctx.stroke();
            break;
        case 7:
            //body 1
            ctx.beginPath();
            ctx.lineTo(100, 65);
            ctx.lineTo(100, 90);
            ctx.stroke();
            break;
        case 8:
            //arm 1
            ctx.beginPath();
            ctx.lineTo(95, 65);
            ctx.lineTo(80, 90);
            ctx.stroke();
            break;
        case 9:
            //arm 2
            ctx.beginPath();
            ctx.lineTo(105, 65);
            ctx.lineTo(120, 90);
            ctx.stroke();
            break;
        case 10:
            //leg 1
            ctx.beginPath();
            ctx.lineTo(95, 95);
            ctx.lineTo(80, 120);
            ctx.stroke();
            break;
        case 11:
            //leg 2
            ctx.beginPath();
            ctx.lineTo(105, 95);
            ctx.lineTo(120, 120);
            ctx.stroke();
            break;
        default:
            console.log('Error');
    }

    Attempts++;
}

const Questions = [
    { hint: "Volcán símbolo", answer: "Misti" },
    { hint: "Monasterio famoso", answer: "Santa Catalina" },
    { hint: "Cañón profundo", answer: "Colca" },
    { hint: "Danza típica", answer: "Wititi" },
    { hint: "Río principal", answer: "Chili" },
    { hint: "Plato de camarones", answer: "Chupe de camarones" },
    { hint: "Material de construcción", answer: "Sillar" },
    { hint: "Iglesia principal", answer: "Catedral de Arequipa" },
    { hint: "Distrito de terrazas", answer: "Yanahuara" },
    { hint: "Museo de la momia", answer: "Santuarios Andinos" },
    { hint: "Reserva de vicuñas", answer: "Salinas y Aguada Blanca" },
    { hint: "Universidad nacional", answer: "Universidad Nacional de San Agustin" },
    { hint: "Puente antiguo", answer: "Puente Bolognesi" },
    { hint: "Valle escénico", answer: "Valle del Colca" },
    { hint: "Festividad de agosto", answer: "Fiesta de la Virgen de la Asuncion" },
    { hint: "Mirador popular", answer: "Mirador de Yanahuara" },
    { hint: "Dormir", answer: "Pichu Pichu" },
    { hint: "Picante", answer: "Rocoto relleno" },
    { hint: "Nobel", answer: "Mario Vargas Llosa" },
    { hint: "Casa histórica", answer: "Casa del Moral" },
    { hint: "Plato de cerdo", answer: "Adobo arequipeño" },
    { hint: "Distrito de arte rupestre", answer: "Socabaya" },
    { hint: "Bebida de anís", answer: "Anis Najar" },
    { hint: "Festival gastronómico", answer: "Arequipa, Mucho Gusto" },
    { hint: "Colegio más antiguo", answer: "Independencia Americana" }
];

Questions.sort(() => Math.random() - 0.5);

//LOGIC
const Title = document.getElementById('title');
const Hint = document.getElementById('hint');
const InputLetter = document.getElementById('input');
const RestartButton = document.getElementById('restart-button');
const WordContainer = document.getElementById('word-container');

const LetterRegex = /^[a-zñ]$/i;

InputLetter.addEventListener("input", function (event) {
    let letter = event.data;

    if(letter.match(LetterRegex))
    {
        LetterEntered(letter);
    }

    setTimeout(
        () => {
            InputLetter.value = "";
        }
        ,300
    );
});


document.addEventListener('keydown', (event) =>
{
    if(event.key.toLowerCase() == 'enter' && GameEnded) 
    {
        Restart();
        return;
    }

    let letter = event.key;

    if(letter.length === 1 && letter.match(LetterRegex))
    {
        LetterEntered(letter.toLowerCase());
    }

    setTimeout(
        () => {
            InputLetter.value = "";
        }
        ,300
    );
});

const ScoreLabel = document.getElementById('score');

let Games = 0;
let Attempts = 1;

let letters = [];
let UsedLetters = [];
let MissingLetters = 0;
let Score = 0;
let Win = false;
let GameEnded = false;

function StartGame()
{
    InputLetter.value = "";
    Hint.innerText = `Hint: ${Questions[Games].hint}`;
    InputLetter.style.display = 'block';
    RestartButton.style.display = 'none';
    GameEnded = false;

    if(!Win)
    {
        ctx.clearRect(0, 0, Canvas.width, Canvas.height);
        //base 1
        ctx.beginPath();
        ctx.lineTo(75, 130);
        ctx.lineTo(25, 130);
        ctx.stroke();
    
        //base 2
        ctx.beginPath();
        ctx.lineTo(75, 125);
        ctx.lineTo(25, 125);
        ctx.stroke();
    }

    NewQuestion(Questions[Games].answer);
}

function NewQuestion(question)
{
    letters = Array.from(question);

    letters.forEach(letter => {
        if(letter !== " ") MissingLetters++;
    });

    letters.forEach(letter => {
        let box = document.createElement("div");
        if(letter === " ") box.setAttribute("class", "word space");

        else box.setAttribute("class", "word letter");
        WordContainer.appendChild(box);
    });
}

function LetterEntered(letter)
{
    if(!UsedLetters.includes(letter)) 
    {
        if(FormalizeLetters(letter)) CorrectLetter(letter);
        else IncorrectLetter();

        UsedLetters.push(letter);
    }
}

function FormalizeLetters(letter)
{
    let n = 0;
    while(n < letters.length)
    {
        if(letters[n] == letter || letters[n] == letter.toUpperCase())
            return true;

        n++;
    }
    return false;

}

function GetIndex(letter)
{
    let indexes = [];

    for(let i = 0; i < letters.length; i++)
    {
        if(letters[i] === letter || letters[i] === letter.toUpperCase())
        {
            indexes.push(i);
        }
    }

    return indexes;
}

function CorrectLetter(letter)
{
    let indexes = GetIndex(letter)
    MissingLetters -= indexes.length;
    let boxes = document.getElementsByClassName("word");
    for(let i = 0; i < indexes.length; i++)
    {
        let box = boxes[indexes[i]];
        let text = document.createTextNode(letters[indexes[i]]);
        box.appendChild(text);
    }

    if(MissingLetters == 0) WinGame();
}

function IncorrectLetter()
{
    UpdateGallow()

    if(Attempts >= 12)
    {
        GameOver();
    }
}

function WinGame()
{
    GameEnded = true;
    Win = true;
    Score++;
    ScoreLabel.innerHTML = "Score: " + Score;
    Title.innerHTML = "Win"

    InputLetter.style.display = 'none';
    RestartButton.style.display = 'block';
}

function GameOver()
{
    Win = false;
    GameEnded = true;
    Score = 0;
    Attempts = 1;
    Title.innerHTML = "Game Over";

    let boxes = document.getElementsByClassName("word");
    for(let i = 0; i < letters.length; i++)
    {
        if(boxes[i].innerHTML == "")
        {
            let box = boxes[i];
            let myClass = box.className;
            box.className = myClass + " missing";

            let text = document.createTextNode(letters[i]);
            box.appendChild(text);
        }
    }

    InputLetter.style.display = 'none';
    RestartButton.style.display = 'block';
}

function Restart()
{
    letters = [];
    UsedLetters = [];
    MissingLetters = 0;
    Games++;

    WordContainer.innerHTML = "";

    Title.innerHTML = "Hangman";
    InputLetter.style.display = 'block';
    RestartButton.style.display = 'none';
    
    StartGame();
}

StartGame();