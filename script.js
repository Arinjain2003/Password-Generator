const inputSlider = document.querySelector("[ data-lengthSlider]");
const lengthDisplay= document.querySelector("[ data-lengthNumber]");
const passwordDisplay= document.querySelector("[ data-passwordDisplay]");
const copymsg= document.querySelector("[ data-copymsg]");
const copybtn= document.querySelector("[ data-copy]");
const UppercaseCheck= document.querySelector("#Uppercase");
const LowercaseCheck= document.querySelector("#Lowercase");
const numbersCheck= document.querySelector("#Numbers");
const symbolsCheck= document.querySelector("#Symbols");
const generatebtn= document.querySelector(".generatebutton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()_+<>?":{},./~`'

let password ="";
let passwordLength = 10;
let checkount = 0;


handleSlider();

//set pass length
function handleSlider(){
     inputSlider.value = passwordLength;
     lengthDisplay.innerText = passwordLength;
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

//set indicator

function setIndicator(){
   indicator.style.backgroundColot = color;

}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRandomInteger(1,10);
}

function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateSymbol(){
     const randNum = getRandomInteger(0,symbols.length);
     return symbols.charAt(randNum);
}




 //copy button wala code
async function copyContent(){
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
       copymsg.innerText = 'copied';
    }
    catch(e){
        copymsg.innerText = 'failed';
    }
   //to make copy wala visible
   copymsg.classList.add("active");

   setTimeout(()=>{
    copymsg.classList.remove("active");    
   },2000);
    
}

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

function handleChechBoxChange(){
    checkount = 0;
    allCheckBox.forEach( (checkBox)=>{
        if(checkBox.checked){
            checkount++;
        }
    });
    //special condition
    if(passwordLength<checkount){
        passwordLength= checkount;
        handleSlider();
    }
}


allCheckBox.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleChechBoxChange);
})


function shufflePassword(array){
     //Fisher yates method
     
     for(let i = 0 ; i< array.length;i++){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
     }
      let str="";
      array.forEach((el) => (str += el));
      return str;

}


let indicator = document.querySelector('.indicator');

// Set Indicator 
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

// Default Indicator 
setIndicator("#ccc");

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (UppercaseCheck.checked) hasUpper = true;
    if (LowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

generatebtn.addEventListener('click', ()=>{
     //none of checkbox are selected
    if(checkount <=0){
        return;
    }
    if(passwordLength <checkount){
        passwordLength= checkount;
        handleSlider();
    }
    //remove old password
    password = "";
        
    //lets put the stuff mentioned by checkboxes;
    
    let funcArr = [];

    if(UppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(LowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsory addition;

    for(let i = 0; i<funcArr.length;i++){
        password += funcArr[i]();
    }
     console.log(password);
    //remaining addition 

    for(let i = 0; i<passwordLength-funcArr.length; i++){
        let randIndex = getRandomInteger(0 , funcArr.length);
        password += funcArr[randIndex]();
    }
    console.log(password);
    //shuffle the password
   password = shufflePassword(Array.from(password));   
          console.log(password);
    //show in ui
    passwordDisplay.value = password;

     calcStrength();
     console.log('s');
});
