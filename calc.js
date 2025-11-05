let a = ''; //first number 
let b = ''; //second number 
let sing = ''; //знак операций 
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/'];

// экран
const out = document.querySelector('.calc-screen p');

function clearAll () {
    a = ''; //first number and result 
    b = ''; //second number  
    sing = ''; //знак 
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll; 

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if(!event.target.classList.contains('btn')) return;
    //нажата кнопка clearAll ac
    if(event.target.classList.contains('ac')) return;

    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    //  если нажата клавиша 0-9 или .
    if (digit.includes(key)){
        if (b === '' && sing === ''){
         a += key;
         
         out.textContent = a;
    }
    else if (a !='' && b !='' && finish) {
        b = key;
        finish =false;
        out.textContent = b;

    }else {
        b += key;
        out.textContent = b;
    }
    console.table(a, b , sing);
    return;
}

    // если нажата клавиша + - / *
     if (action.includes(key)) {
        sing = key;
        out.textContent = sing;
        console.table(a, b , sing);
        return;
     }


    // Нажата =
      if (key === '='){
        if (b ==='') b = a;
        switch (sing){
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X": 
                a = a * b;
                break;
            case "/":
                a = a / b;
                break;
        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sing);
      }
}