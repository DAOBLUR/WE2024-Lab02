const display = document.querySelector("#display");
const buttons = document.querySelectorAll('button');
const history = document.querySelector("#history");

let IsEnabled = true;
let OperatorEnabled = false;
let DotEnabled = true;
let LeftParenCount = 0;

buttons.forEach((btn) => {
    btn.onclick = () => {

        if(btn.id === 'copy')
        {
            CopyEntryToClipboard();
            return;
        }

        if(!IsEnabled) return;
        
        if(btn.id == 'backspace') 
        {
            let string = display.innerText.toString();
            display.innerText = string.substr(0, string.length - 1);
            DotEnabled = !DotEnabled;
            OperatorEnabled = !OperatorEnabled;
        }

        else if(btn.id == 'clean') 
        { 
            display.innerText = '';
            OperatorEnabled = false;
            DotEnabled = true;
        }

        else if(btn.id == 'equal' && display.innerText != '') 
        {
            try 
            {
                Equal();
            } 
            catch(e) 
            {
                display.innerText = 'Error';
                IsEnabled = false;
                setTimeout(() => {
                    display.innerText = '';
                    IsEnabled= true;
                }, 2000)
            }
        }

        else if(display.innerText == '' && btn.id == 'equal') 
        {
            display.innerText = 'Null';
            setTimeout(() => {
                display.innerText = '';
                IsEnabled= true;
            }, 2000)
        }

        else if(display.innerText.length >= 16) return;
        
        else if(btn.id == 'leftParen') 
        {
            display.innerText += '(';
            LeftParenCount++;
        }

        else if(btn.id == 'rightParen' && LeftParenCount > 0) 
        {
            display.innerText += ')';
            OperatorEnabled = true;
            LeftParenCount--;
        }

        else if(btn.id == 'mod' && OperatorEnabled) 
        {
            display.innerText += '%';
            OperatorEnabled = false;
        }

        else if(btn.id == 'pi') 
        {
            if(display.innerText.length === 0) display.innerText += 'π'; 
            else display.innerText += 'xπ';
            OperatorEnabled = true;
        }

        else if(btn.id == 'division' && OperatorEnabled) 
        {
            display.innerText += '/';
            OperatorEnabled = false;
        }

        else if(btn.id == 'multiplication' && OperatorEnabled) 
        {
            display.innerText += 'x';
            OperatorEnabled = false;
        }

        else if(btn.id == 'squareRoot' && display.innerText != '') 
        {
            display.innerText = '√(' + display.innerText + ')';
        }

        else if(btn.id == 'squared' && display.innerText != '' && !display.innerText.includes('²'))
        {
            display.innerText = '(' + display.innerText + ')²';
        }

        else if(btn.id == 'subtraction' && OperatorEnabled) 
        {
            display.innerText += '-';
            OperatorEnabled = false;
        }

        else if(btn.id == 'addition' && OperatorEnabled)
        {
            display.innerText += '+';
            OperatorEnabled = false;
        }

        else if(btn.id == 'point' && DotEnabled) 
        {
            display.innerText += '.';
            DotEnabled = false;
        }

        else if(btn.id == 'percentage' && display.innerText != '') 
        {
            display.innerText = '(' + display.innerText + ')/100';
        }

        else if(btn.id in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
        {
            display.innerText += btn.id;
            OperatorEnabled = true;
            DotEnabled = true;
        }

        else return;
    }
})

document.addEventListener('keydown', function(event) 
{
    if(!IsEnabled) return;

    let key = event.key;

    if(key == 'Backspace') 
    {
        let string = display.innerText.toString();
        display.innerText = string.substr(0, string.length - 1);
        DotEnabled = !DotEnabled;
        OperatorEnabled = !OperatorEnabled;
    }

    else if(key.toLowerCase() == 'c') {
        display.innerText = '';
        OperatorEnabled = false;
        DotEnabled = true;
    }

    else if(key.toLowerCase() == 'enter' && display.innerText != '') {
        try 
        {
            Equal();
        } 
        catch(e) 
        {
            display.innerText = 'Error';
            IsEnabled = false;
            setTimeout(() => {
                display.innerText = '';
                IsEnabled= true;
            }, 2000)
        }
    }

    else if(display.innerText == '' && key.toLowerCase() == 'enter') {
        display.innerText = 'Null';
        setTimeout(() => {
            display.innerText = '';
            IsEnabled= true;
        }, 2000)
    }

    else if(display.innerText.length >= 16) return;
    
    else if(key == '(') {
        display.innerText += '(';
        LeftParenCount++;
    }

    else if(key == ')' && LeftParenCount > 0) 
    {
        display.innerText += ')';
        OperatorEnabled = true;
        LeftParenCount--;
    }

    else if(key.toLowerCase() == 'm' && OperatorEnabled) 
    {
        display.innerText += '%';
        OperatorEnabled = false;
    }

    else if(key.toLowerCase() == 'p') 
    {
        if(display.innerText.length === 0) display.innerText += 'π'; 
        else display.innerText += 'xπ';
        OperatorEnabled = true;
    }

    else if(key == '/' && OperatorEnabled) 
    {
        display.innerText += '/';
        OperatorEnabled = false;
    }

    else if(key == '*' && OperatorEnabled) 
    {
        display.innerText += 'x';
        OperatorEnabled = false;
    }

    else if(key.toLowerCase() == 'r' && display.innerText != '') 
    {
        display.innerText = '√(' + display.innerText + ')';
    }

    else if(key.toLowerCase() == 's' && display.innerText != '' && !display.innerText.includes('²'))
    {
        display.innerText = '(' + display.innerText + ')²';
    }

    else if(key == '-' && OperatorEnabled) 
    {
        display.innerText += '-';
        OperatorEnabled = false;
    }

    else if(key == '+' && OperatorEnabled)
    {
        display.innerText += '+';
        OperatorEnabled = false;
    }

    else if(key == '.' && DotEnabled) 
    {
        display.innerText += '.';
        DotEnabled = false;
    }

    else if(key == '%' && display.innerText != '') 
    {
        display.innerText = '(' + display.innerText + ')/100';
    }

    else if(key in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
    {
        display.innerText += key;
        OperatorEnabled = true;
        DotEnabled = true;
    }

    else return;
});


const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');
let isDark = true;

themeToggleBtn.onclick = () => {
    calculator.classList.toggle('dark');
    themeToggleBtn.classList.toggle('active');
    isDark = !isDark;
}

function Equal()
{
    if(display.innerText == 'Null') return;

    if(LeftParenCount > 0) 
    {
        while(LeftParenCount > 0) 
        {
            display.innerText += ')';
            LeftParenCount--;
        }
    }
    var allOperation = display.innerText;
    AddRowInHistory(allOperation);
    allOperation = allOperation.replaceAll('√', 'Math.sqrt');
    //SQUARE
    allOperation = ReplaceNestedPow(allOperation)

    //OTHERS
    allOperation = allOperation.replaceAll('mod', '%');   
    allOperation = allOperation.replaceAll('x', '*');
    allOperation = allOperation.replaceAll('π', Math.PI)
    display.innerText = eval(allOperation);
}

function ReplaceNestedPow(str) {
    let regex = /\(([^()]+)\)²/g;
    let newStr = str;
    let prevStr = null;
    while (prevStr !== newStr) {
        prevStr = newStr;
        newStr = newStr.replace(regex, 'Math.pow($1,2)');
    }
    return newStr;
}

let historyCount = 0;

function AddRowInHistory(allOperation) {
    history.innerHTML += NewDiv(allOperation);
    historyCount++;
}

function LoadHistory(operation)
{
    display.innerText = operation;
}

function DeleteHistory(id)
{
    document.getElementById(id).remove();
}

function CopyToClipboard(operation)
{
    navigator.clipboard.writeText(operation);
    alert("Copied text");
}

function CopyEntryToClipboard()
{
    if(display.innerText.length == 0) return;
    navigator.clipboard.writeText(display.innerText);
    alert("Copied text");
}


function NewDiv(operation)
{
    return (
        `<div class="row m-0 p-0 history-row" id="history-row-${historyCount}">
            <p class="col-8 my-auto mx-2">${operation}</p>
            <button class="col-1 my-auto m-0 p-0 my-auto me-1 text-success" onclick="CopyToClipboard('${operation}')">
                <span class="material-symbols-outlined">content_copy</span>
            </button>
            <button class="col-1 my-auto m-0 p-0 my-auto me-1 text-primary" onclick="LoadHistory('${operation}')">
                <span class="material-symbols-outlined">history</span>
            </button>
            <button class="col-1 my-auto m-0 p-0 my-auto ms-1 text-danger" onclick="DeleteHistory('history-row-${historyCount}')">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>`
    );
}