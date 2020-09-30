const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const symbols = "/.,<>?`~\|';:][{}=-+_)(*&^%$£#@€!§±";
const numbers = "1234567890";

/**
 * This is not the proper way to randomise stuff as it's heavily browser related.
 * But that's good enough for the purpose of this challenge.
 * @param {*} str 
 * @param {*} length 
 */
const generateRandomString = function (str, length) {
    return str
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('')
        .slice(0, length);
};

function generatePassword() {
    const options = document.querySelectorAll('input');
    const length = document.getElementById('length');

    const generatedPwdLabel = document.getElementById('generatedPwd');

    var possiblePassword = '';

    options.forEach(option => {
        if (!option.checked) {
            return;
        }

        switch(option.name) {
            case "uppercaseLetters": 
                possiblePassword += upperLetters;
                possiblePassword = generateRandomString(possiblePassword, length.value);
                break;
            case "lowercaseLetters": 
                possiblePassword += lowerLetters;
                possiblePassword = generateRandomString(possiblePassword, length.value);
                break;
            case "numbers": 
                possiblePassword += numbers;
                possiblePassword = generateRandomString(possiblePassword, length.value);
                break;
            case "symbols": 
                possiblePassword += symbols;
                possiblePassword = generateRandomString(possiblePassword, length.value);
                break;
        }
    });

    generatedPwdLabel.innerText = generateRandomString(possiblePassword, length.value)
}

const generateBtn = document.getElementById("validate");
generateBtn.addEventListener("click", generatePassword)