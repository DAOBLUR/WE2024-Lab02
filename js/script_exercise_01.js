//CARD SELECTOR
function ShowHideCardOptions()
{
    const lisOptionsContainer = document.getElementById('select-card-list-container');
    if (lisOptionsContainer.style.display === 'none') {
        lisOptionsContainer.style.display = 'block';
    } else {
        lisOptionsContainer.style.display = 'none';
    }
}

const buttonCardSelector = document.getElementById('select-card-button');
const inputCardSelector = document.getElementById('select-card-value');
const listCardOptionsContainer = document.getElementById('select-card-list-container');
listCardOptionsContainer.style.display = 'none';

buttonCardSelector.addEventListener('click', ShowHideCardOptions);
inputCardSelector.addEventListener('click', ShowHideCardOptions);

//CARD OPTIONS SELECTOR
const listItemsCard = document.querySelectorAll('.list-item-card');

listItemsCard.forEach((item) => {
    item.addEventListener('click', () => {
        inputCardSelector.textContent = item.textContent;
        listCardOptionsContainer.style.display = 'none';
    });
});


//TYPE DOCUMENT
function CardNumberValidator(event) 
{
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) 
    {
        return false;
    }
    return true;
}

//TYPE DOCUMENT SELECTOR
function ShowHideTypeDocumentOptions()
{
    if (documentTypeListContainer.style.display === 'none') {
        documentTypeListContainer.style.display = 'block';
    } else {
        documentTypeListContainer.style.display = 'none';
    }
}

const buttonDocumentSelector = document.getElementById('document-type-button');
const inputDocumentSelector = document.getElementById('document-type-value');
const documentTypeListContainer = document.getElementById('document-type-list-container');
documentTypeListContainer.style.display = 'none';

buttonDocumentSelector.addEventListener('click', ShowHideTypeDocumentOptions);
inputDocumentSelector.addEventListener('click', ShowHideTypeDocumentOptions);

//CARD OPTIONS SELECTOR
const listItemsDoc = document.querySelectorAll('.list-item-doc');

listItemsDoc.forEach((item) => {
    item.addEventListener('click', () => {
        inputDocumentSelector.textContent = item.textContent;
        documentTypeListContainer.style.display = 'none';
    });
});

//VIRTUAL KEYBOARD
const keys = document.querySelectorAll('.key');
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const codeInput = document.getElementById('code-input');

numbers.sort(() => Math.random() - 0.5);

let index = 0;
keys.forEach((key) => {
    key.textContent = numbers[index];

    key.addEventListener('click', () => {
        if(codeInput.value.length < 4) codeInput.value += key.textContent;
    });

    index++;
});

//CLEAN BUTTON
const clean = document.getElementById('clean');

clean.addEventListener('click', () => {
    codeInput.value = "";
});

//CODE INPUT
codeInput.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

codeInput.addEventListener("keydown", (event) => {
    event.preventDefault(); 
});

//CAPTCHA
function GetRandomCaptcha() 
{
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(ImageCount);
    let randomIndex = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    return `${ImagesCaptchaPath}${randomIndex}.jpeg`;
}

const ImagesCaptchaPath = './img/captcha-';
const ImageCount = 10;

function SetRandomCaptcha()
{
    const captchaImage = document.getElementById('captcha-image');
    captchaImage.src = GetRandomCaptcha();
}

const refreshIcon = document.getElementById('refresh-icon');
const refreshLabel = document.getElementById('refresh-label');

refreshIcon.addEventListener('click', SetRandomCaptcha);
refreshLabel.addEventListener('click', SetRandomCaptcha);

SetRandomCaptcha();