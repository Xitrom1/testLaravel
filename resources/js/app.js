import './bootstrap';
import '../css/app.css'; 

alert('Ура!');

const   loanAmount = document.getElementById('loanAmount'), //Сумма кредита (Цена автомобиля)
        loanAmountRange = document.getElementById('loanAmountRange'),

        monthsRange = document.getElementById('monthsRange'), //Количество месяцев

        initialPayment = document.getElementById('initialPayment'), //Начальный платёж
        initialPaymentRange = document.getElementById('initialPaymentRange'),

        tradeIn = document.getElementById('tradeIn'), //Trade-in
        tradeInRange = document.getElementById('tradeInRange'),

        residualPayment = document.getElementById('residualPayment'), //Остаточный платёж
        residualPaymentRange = document.getElementById('residualPaymentRange');


const   monthlyPayment = document.getElementById('monthlyPayment'); // Ежемесячный платёж
const   checkboxResidualPayment = document.getElementById('checkboxResidualPayment'); // CheckBox

let     loanAmountCalculate = loanAmount.value.replace (/\s/g, ''),
        initialPaymentCalculate = initialPayment.value.replace (/\s/g, ''),
        tradeInCalculate = tradeIn.value.replace (/\s/g, ''),
        residualPaymentCalculate = residualPayment.value.replace (/\s/g, '');

        loanAmountRangeCalculate = loanAmountRange.value;
        residualPaymentRangeCalculate = residualPaymentRange.value;

        loanAmount.value = new Intl.NumberFormat('ru-RU').format(Number(loanAmount.value));
        residualPayment.value = new Intl.NumberFormat('ru-RU').format(Number(residualPayment.value));

let GeneralMonthlyPayment = 0;
let GeneralMonthlyPaymentNoRound = 0;
//Калькулятор / Рассчёты BEGIN
const calculation = () => {
    loanAmountCalculate = loanAmountRange.value;
    initialPaymentCalculate = initialPaymentRange.value;
    tradeInCalculate = tradeInRange.value;
    residualPaymentCalculate = residualPaymentRange.value;

    console.log(loanAmountCalculate);
    console.log(initialPaymentCalculate);
    console.log(tradeInCalculate);
    console.log(residualPaymentCalculate);
    console.log('----------------------------');

    var dop1 = 0; //Доп1
    let dop2 = 0; //Доп2

    var procent = Number(document.getElementById('interestRate').dataset.value);//Процент
    procent = procent / 100;
    var countMonths = Number(monthsRange.value); //Число месяцев
    var priceCar = Number(loanAmountCalculate); //Цена машины
    var initialPaymentCal = Number(initialPaymentCalculate) + Number(tradeInCalculate); //Начальный платёж
    var residualPaymentCal = Number(residualPaymentCalculate);//Остаточный платёж
    let monthlyPayment = 0; //Ежемесяцный платёж
    let monthlyPaymentHelp1 = 0;
    let monthlyPaymentHelp2 = 0;
    let monthlyPaymentHelp3 = 0;

    if (checkboxResidualPayment.checked) {
        if (Number(loanAmountCalculate) == (Number(initialPaymentCalculate) + Number(tradeInCalculate) + Number(residualPaymentCalculate))) dop1 = 0;
        else dop1 = (priceCar / 100) * 5; //Доп1
    } 
    else {
        if (Number(loanAmountCalculate) == (Number(initialPaymentCalculate) + Number(tradeInCalculate))) dop1 = 0;
        else dop1 = (priceCar / 100) * 5; //Доп1
    }
    
    if (procent != 0) {
        if (!checkboxResidualPayment.checked) {  
            dop2 = Math.round((priceCar - initialPaymentCal) / countMonths); //Доп2

            monthlyPaymentHelp1 = priceCar + dop1 - initialPaymentCal;
            monthlyPaymentHelp2 = procent / 12 * Math.pow((1 + procent / 12), countMonths);
            monthlyPaymentHelp3 = Math.pow((1 + procent / 12), countMonths) - 1;
            monthlyPayment = monthlyPaymentHelp1 * monthlyPaymentHelp2 / monthlyPaymentHelp3;      
        } else {
            dop2 = Math.round((priceCar - initialPaymentCal - residualPaymentCal) / countMonths); //Доп2

            monthlyPaymentHelp1 = priceCar + dop1 - initialPaymentCal - residualPaymentCal;
            monthlyPaymentHelp2 = procent / 12 * Math.pow((1 + procent / 12), countMonths);
            monthlyPaymentHelp3 = Math.pow((1 + procent / 12), countMonths) - 1;
            monthlyPayment = monthlyPaymentHelp1 * monthlyPaymentHelp2 / monthlyPaymentHelp3; 
        }      
    } else {
        if (!checkboxResidualPayment.checked) {  
            dop2 = Math.round((priceCar - initialPaymentCal) / countMonths); //Доп2

            monthlyPaymentHelp1 = priceCar + dop1 - initialPaymentCal;
            monthlyPayment = monthlyPaymentHelp1 / countMonths;      
        } else {
            dop2 = Math.round((priceCar - initialPaymentCal - residualPaymentCal) / countMonths); //Доп2

            monthlyPaymentHelp1 = priceCar + dop1 - initialPaymentCal - residualPaymentCal;
            monthlyPayment = monthlyPaymentHelp1; 
        }   
    }
    GeneralMonthlyPaymentNoRound = monthlyPayment;
    GeneralMonthlyPayment = Math.round(monthlyPayment);
    document.getElementById('monthlyPayment').innerText = new Intl.NumberFormat('ru-RU').format(Number(GeneralMonthlyPayment));
}
calculation();
//Калькулятор / Рассчёты END

const CreateTable = function() {
     //--Table create BEGIN--
     tableBegin = 
     `<table class="dataTableCreating"> 
     <tr class="table__inner">
         <th><img class="calendar" src="img/calendar.png" alt="#"></th>
         <th>Сумма кредита на<br>начало месяца</th>
         <th>Ежемесячный <dr>платеж</th>
         <th>Сумма <br>долга  </th>
         <th>Процент к <br>долгу</th>
         <th>Сумма кредита на <br>конец месяца</th>
     </tr>`
    //  <tr>
    //      <td colspan="3">Цена автомобиля</td>
    //      <td></td>
    //      <td>`+ loanAmount.value +`</td>
    //  </tr>
    //  <tr>
    //      <td colspan="3">Начальный платёж</td>
    //      <td>`+ loanAmount.value +`</td>
    //      <td>`+ (loanAmount.value - Number(initialPayment.value) - Number(tradeIn.value)) +`</td>
    //  </tr>
    
    let infoCarPrice = loanAmountCalculate;
    let infoInitialPayment = initialPaymentCalculate;
    let infoTradeIn = tradeInCalculate;
    let infoResidualPayment = 0;
        if (checkboxResidualPayment.checked) infoResidualPayment = residualPaymentCalculate;
        else infoResidualPayment = 0;

    //-----
    let infoLoanAmount = infoCarPrice - infoInitialPayment - infoTradeIn - infoResidualPayment;
    const procentOfMonth = (Number(document.getElementById('interestRate').dataset.value) / 12) / 100;
    //-----

    let balanceOfCruditForAMonthBegin = infoLoanAmount + ((infoCarPrice / 100) * 5); //Тело кредита на начало периода
    const regularPayment = new Intl.NumberFormat('ru-RU').format(Number(GeneralMonthlyPayment)); //Регулярный платеж

    let countMonth = Number(document.querySelector('.range__info__current').dataset.value);

    let amountOfCredit = 0; //Тело кредита
    let loanPercentage = 0; //Процент к уплате
    let balanceOfCruditForAMonthEnd = infoLoanAmount + ((infoCarPrice / 100) * 5); //Тело кредита на конец периода

     for (let stringTable = 0; stringTable < monthsRange.value; stringTable++) {    
        amountOfCredit = Math.round(GeneralMonthlyPaymentNoRound / Math.pow((1 + procentOfMonth), (countMonth - (stringTable + 1) + 1))); 
        loanPercentage = Math.round(GeneralMonthlyPaymentNoRound * (1-1/Math.pow((1 + procentOfMonth), countMonth - (stringTable + 1) + 1)));
        balanceOfCruditForAMonthEnd -= GeneralMonthlyPaymentNoRound / Math.pow((1 + procentOfMonth), (countMonth - (stringTable + 1) + 1));
        if (balanceOfCruditForAMonthEnd < 0) balanceOfCruditForAMonthEnd *= -1;
        tableBegin = tableBegin + 
        '<tr class="table__inner">' +
            '<td>'+ (stringTable + 1) +'</td>' +
            '<td>'+ new Intl.NumberFormat('ru-RU').format(Number(Math.round(balanceOfCruditForAMonthBegin))) +' руб. </td>' +
            '<td>'+ regularPayment +' руб. </td>' +
            '<td>'+ new Intl.NumberFormat('ru-RU').format(Number(amountOfCredit)) +' руб. </td>' +
            '<td>'+ new Intl.NumberFormat('ru-RU').format(Number(loanPercentage)) +' руб. </td>' +
            '<td>'+ new Intl.NumberFormat('ru-RU').format(Number(Math.round(balanceOfCruditForAMonthEnd))) +' руб. </td>' +
        '</tr>'

        balanceOfCruditForAMonthBegin -= GeneralMonthlyPaymentNoRound / Math.pow((1 + procentOfMonth), (countMonth - (stringTable + 1) + 1));

        //Тело кредита
     }
     return tableBegin;
     //--Table create END--
}

//Сопряжение input and inputRange BEGIN

function CheckingCorrectnessOfTextMonths() {
    var infoLoanTermOfMonths = document.getElementById('monthsRange').value 
    if (infoLoanTermOfMonths < 21) infoLoanTermOfMonthsTextMonths = 'месяцев';
    else if (
        infoLoanTermOfMonths == 21 || 
        infoLoanTermOfMonths == 31 || 
        infoLoanTermOfMonths == 41 || 
        infoLoanTermOfMonths == 51 || 
        infoLoanTermOfMonths == 61 || 
        infoLoanTermOfMonths == 71 || 
        infoLoanTermOfMonths == 81
        ) infoLoanTermOfMonthsTextMonths = 'месяц';
    else if (
        (infoLoanTermOfMonths > 21 && infoLoanTermOfMonths < 25) || 
        (infoLoanTermOfMonths > 31 && infoLoanTermOfMonths < 35) || 
        (infoLoanTermOfMonths > 41 && infoLoanTermOfMonths < 45) || 
        (infoLoanTermOfMonths > 51 && infoLoanTermOfMonths < 55) || 
        (infoLoanTermOfMonths > 61 && infoLoanTermOfMonths < 65) || 
        (infoLoanTermOfMonths > 71 && infoLoanTermOfMonths < 75) || 
        (infoLoanTermOfMonths > 81 && infoLoanTermOfMonths < 85)
    ) infoLoanTermOfMonthsTextMonths = 'месяца';

    else if (
        (infoLoanTermOfMonths > 24 && infoLoanTermOfMonths < 31) || 
        (infoLoanTermOfMonths > 34 && infoLoanTermOfMonths < 41) || 
        (infoLoanTermOfMonths > 44 && infoLoanTermOfMonths < 51) || 
        (infoLoanTermOfMonths > 54 && infoLoanTermOfMonths < 61) || 
        (infoLoanTermOfMonths > 64 && infoLoanTermOfMonths < 71) || 
        (infoLoanTermOfMonths > 74 && infoLoanTermOfMonths < 81)
    ) infoLoanTermOfMonthsTextMonths = 'месяцев';
    return infoLoanTermOfMonthsTextMonths;
}

const assignValue = () => {
    document.querySelector('.range__info__current').innerHTML = `<div class="monthCount" id="monthCount">` + monthsRange.value + `</div><div class="monthsText">&#160`+ CheckingCorrectnessOfTextMonths() +`</div>`;
    document.querySelector('.range__info__current').dataset.value = monthsRange.value;

    loanAmountCalculate =  Number(loanAmount.value.replace (/\s/g, ''));
    initialPaymentCalculate =  Number(initialPayment.value.replace (/\s/g, ''));
    tradeInCalculate =  Number(tradeIn.value.replace (/\s/g, ''));
    residualPaymentCalculate =  Number(residualPayment.value.replace (/\s/g, ''));

    loanAmount.value = new Intl.NumberFormat('ru-RU').format(Number(loanAmountRange.value));
    initialPayment.value = new Intl.NumberFormat('ru-RU').format(Number(initialPaymentRange.value));
    tradeIn.value = new Intl.NumberFormat('ru-RU').format(Number(tradeInRange.value));
    residualPayment.value = new Intl.NumberFormat('ru-RU').format(Number(residualPaymentRange.value));
}

const assignValueContrast = () => {
    document.querySelector('.range__info__current').innerHTML = `<div class="monthCount" id="monthCount">` + monthsRange.value + `</div><div class="monthsText">&#160`+ CheckingCorrectnessOfTextMonths() +`</div>`;
    document.querySelector('.range__info__current').dataset.value = monthsRange.value;

    loanAmountRange.value = loanAmount.value.replace (/\s/g, '');
    initialPaymentRange.value = initialPayment.value.replace (/\s/g, '');
    tradeInRange.value = tradeIn.value.replace (/\s/g, '');
    residualPaymentRange.value = residualPayment.value.replace (/\s/g, '');

    loanAmountCalculate =  loanAmountRange.value;
    initialPaymentCalculate =  initialPaymentRange.value;
    tradeInCalculate =  tradeInRange.value;
    residualPaymentCalculate =  residualPaymentRange.value;
} 
assignValueContrast();

loanAmount.addEventListener('change', () => {
    if (loanAmountCalculate < (initialPaymentCalculate + tradeInCalculate + residualPaymentCalculate)) {
        initialPaymentCalculate = 0;
        initialPayment.value = 0;
        tradeInCalculate = 0;
        tradeIn.value = 0;
        residualPaymentCalculate = 0;
        residualPayment.value = 0;
    }
    loanAmount.value = Number(loanAmount.value.replace(/[a-zа-яё]/gi, '').replace(/[^\d]/g, ''));

    if (loanAmount.value < 100000) {         //Минимальная сумма кредита
        loanAmount.value = 100000;           //Минимальная сумма кредита
        rangeColorRed();
    }
    else if (loanAmount.value > 7000000) {  //Максильманая сумма кредита
        loanAmount.value = 7000000;         //Максильманая сумма кредита
    }
    assignValueContrast();
    rangeColorRed();
    calculation();

    
})

initialPayment.addEventListener('change', () => {
    initialPayment.value = Number(initialPayment.value.replace(/[a-zа-яё]/gi, '').replace(/[^\d]/g, ''));

    if (initialPayment.value < 0) {         //Минимальный начальный платёж
        initialPayment.value = 0;           //Минимальный начальный платёж
    }
    else if (initialPayment.value > 7000000) {  //Максильманый начальный платёж
        initialPayment.value = 7000000;         //Максильманый начальный платёж
    } 
    checkMinusPayment(loanAmountCalculate, initialPaymentCalculate, tradeInCalculate, residualPaymentCalculate, initialPayment);   
    assignValueContrast();
    rangeColorRed();
    calculation();
})

tradeIn.addEventListener('change', () => {
    tradeIn.value = Number(tradeIn.value.replace(/[a-zа-яё]/gi, '').replace(/[^\d]/g, ''));

    if (tradeIn.value < 0) {         //Минимальный Trade-in
        tradeIn.value = 0;           //Минимальный Trade-in
        rangeColorRed();
    }
    else if (tradeIn.value > 7000000) {  //Максильманый Trade-in
        tradeIn.value = 7000000;         //Максильманый Trade-in
    }
    checkMinusPayment(loanAmountCalculate, tradeInCalculate, initialPaymentCalculate, residualPaymentCalculate, tradeIn);
    assignValueContrast();
    rangeColorRed();
    calculation();
})

residualPayment.addEventListener('change', () => {
    residualPayment.value = Number(residualPayment.value.replace(/[a-zа-яё]/gi, '').replace(/[^\d]/g, ''));

    if (residualPayment.value < 50000) {         //Минимальный остаточный платёж
        residualPayment.value = 50000;           //Минимальный остаточный платёж
    }
    else if (residualPayment.value > 7000000) {  //Максильманый остаточный платёж
        residualPayment.value = 7000000;         //Максильманый остаточный платёж
    }
    checkMinusPayment(loanAmountCalculate, residualPaymentCalculate, tradeInCalculate, initialPaymentCalculate, residualPayment);
    assignValueContrast();
    rangeColorRed();
    calculation();
})

//ограничение чисел в input --- END//

//Нажатие на input-ы --- BEGIN
const inputs = document.querySelectorAll('input');
for(let input of inputs) {
    input.addEventListener('focus', () => {if (input.value == 0) {
        input.value = 0;
        assignValueContrast();
        input.value = "";
    }})
    input.onblur = function() {if (input.value == "" || input.value == '-' || input.value == '+' || input.value == '.' || input.value == 'e') {
        input.value = 0;
        assignValueContrast();
        rangeColorRed();
    }}
}

const AllEnters = document.querySelectorAll('.enter');
for (let enter of AllEnters) {
    enter.addEventListener('keydown', (event) => {
        if (event.keyCode == 13) {
            enter.blur();
          }
    }) 
    enter.onblur = () => {
        enter.value = Intl.NumberFormat('ru-RU').format(Number(enter.value));
    }

    enter.addEventListener('focus', () => {
        if (enter.value != 0) enter.value = Number(enter.value.replace(/\s/g, ''));
    })
}
//Нажатие на input-ы --- END

loanAmount.addEventListener('input', () => {
    assignValueContrast();
    calculation();
})
loanAmountRange.addEventListener('input', () => {
    assignValue();
    calculation();
})

monthsRange.addEventListener('input', () => {
    assignValue();
    calculation();
})

initialPayment.addEventListener('input', () => {
    checkMinusPayment(loanAmountCalculate, initialPaymentCalculate, tradeInCalculate, residualPaymentCalculate, initialPayment);
    assignValueContrast();
    calculation();
})
initialPaymentRange.addEventListener('input', () => {
    if (checkboxResidualPayment.checked) {
        if(Number(loanAmountRange.value) < (Number(initialPaymentRange.value) + Number(tradeInRange.value) + Number(residualPaymentRange.value))) {
            initialPaymentRange.value = Number(loanAmountRange.value) - (Number(tradeInRange.value) + Number(residualPaymentRange.value));
        }
    }
    else {
        if(Number(loanAmountRange.value) < (Number(initialPaymentRange.value) + Number(tradeInRange.value))) {
            initialPaymentRange.value = Number(loanAmountRange.value) - (Number(tradeInRange.value));
        }  
    }
    

    assignValue();
    calculation();
})

tradeIn.addEventListener('input', () => {
    checkMinusPayment(loanAmountCalculate, tradeInCalculate, initialPaymentCalculate, residualPaymentCalculate, tradeIn);
    assignValueContrast();
    calculation();
})
tradeInRange.addEventListener('input', () => {
    if (checkboxResidualPayment.checked) {
        if(Number(loanAmountRange.value) < (Number(initialPaymentRange.value) + Number(tradeInRange.value) + Number(residualPaymentRange.value))) {
            tradeInRange.value = Number(loanAmountRange.value) - (Number(initialPaymentRange.value) + Number(residualPaymentRange.value));
        }
    }
    else {
        if(Number(loanAmountRange.value) < (Number(initialPaymentRange.value) + Number(tradeInRange.value))) {
            tradeInRange.value = Number(loanAmountRange.value) - (Number(initialPaymentRange.value));
        }  
    }

    assignValue();
    calculation();
})

residualPayment.addEventListener('input', () => {
    checkMinusPayment(loanAmountCalculate, residualPaymentCalculate, tradeInCalculate, initialPaymentCalculate, residualPayment);
    assignValueContrast();
    calculation();
})
residualPaymentRange.addEventListener('input', () => {
    if(Number(loanAmountRange.value) < (Number(initialPaymentRange.value) + Number(tradeInRange.value) + Number(residualPaymentRange.value))) {
        residualPaymentRange.value = Number(loanAmountRange.value) - (Number(initialPaymentRange.value) + Number(tradeInRange.value));
    }
    
    assignValue();
    calculation();
})
//Сопряжение input and inputRange END


//Кнопки с годами BEGIN
let currentYear = 1;

const takeActiveYear = currentActive => {
    const currentYearActive = currentActive.dataset.name;
    currentYear = currentYearActive * 12;
};

const inputsYearBtns = document.querySelectorAll('.form_radio_btn');

for(let year of inputsYearBtns) {
    year.addEventListener('click', () => {
        for(let item of inputsYearBtns) {
            item.classList.remove('active'); 
        }
        if (year.dataset.name == 1) monthsRange.value = 12;
        else if (year.dataset.name == 2) monthsRange.value = 24;
        else if (year.dataset.name == 3) monthsRange.value = 36;
        else if (year.dataset.name == 4) monthsRange.value = 48;
        else if (year.dataset.name == 5) monthsRange.value = 60;
        else if (year.dataset.name == 6) monthsRange.value = 72;
        else if (year.dataset.name == 7) monthsRange.value = 84;
        assignValueContrast();
        year.classList.add('active');
        takeActiveYear(year);
       
        calculation()
    })
}
//Кнопки с годами END


//Кнопки "+" и "-" BEGIN
const btnMinus = document.querySelector('.btnMinus');
const btnPlus = document.querySelector('.btnPlus');

btnMinus.addEventListener('click', () => {
    let tempYear = document.querySelector('.active').dataset.name; 
    if (tempYear < 7) tempYear++;
    currentYear = tempYear;
    let newYear = document.querySelector('[data-name ="' + tempYear + '"]');
    for(let item of inputsYearBtns) {
        item.classList.remove('active');
    }
    switch (tempYear) {
        case 1: monthsRange.value = 12;
            break;
        case 2: monthsRange.value = 24;
            break;
        case 3: monthsRange.value = 36;
            break;
        case 4: monthsRange.value = 48;
            break;
        case 5: monthsRange.value = 60;
            break;
        case 6: monthsRange.value = 72;
            break;
        case 7: monthsRange.value = 84;
            break;
    }
    newYear.classList.add('active');
    assignValueContrast();
    calculation();   
})

btnPlus.addEventListener('click', () => {
    let tempYear = document.querySelector('.active').dataset.name; 
    if (tempYear > 1) tempYear--;
    currentYear = tempYear;
    let newYear = document.querySelector('[data-name ="' + tempYear + '"]');
    for(let item of inputsYearBtns) {
        item.classList.remove('active');
    }
    switch (tempYear) {
        case 1: monthsRange.value = 12;
            break;
        case 2: monthsRange.value = 24;
            break;
        case 3: monthsRange.value = 36;
            break;
        case 4: monthsRange.value = 48;
            break;
        case 5: monthsRange.value = 60;
            break;
        case 6: monthsRange.value = 72;
            break;
        case 7: monthsRange.value = 84;
            break;
    }
    newYear.classList.add('active');
    assignValueContrast();
    calculation();   
})
//Кнопки "+" и "-" END


//Сопряжение Input and inputRange месяцев и Года BEGIN
const monthANDChangeYear = () => {
    const inputMonthsHelp = monthsRange.value;
    if (inputMonthsHelp >= 12 && inputMonthsHelp < 24) {
        for(let item of inputsYearBtns) {
            item.classList.remove('active');
        }
        document.getElementById('radioBtn1').classList.add('active');
    }
    else if (inputMonthsHelp >= 24 && inputMonthsHelp < 36) {
        for(let item of inputsYearBtns) {
            item.classList.remove('active');
        }
        document.getElementById('radioBtn2').classList.add('active');
    }
    else if (inputMonthsHelp >= 36 && inputMonthsHelp < 48) {
        for(let item of inputsYearBtns) {
            item.classList.remove('active');
        }
        document.getElementById('radioBtn3').classList.add('active');
    }
    else if (inputMonthsHelp >= 48 && inputMonthsHelp < 60) {
        for(let item of inputsYearBtns) {
            item.classList.remove('active');
        }
        document.getElementById('radioBtn4').classList.add('active');
    }
    else if (inputMonthsHelp >= 60 && inputMonthsHelp < 72) {
        for(let item of inputsYearBtns) {
            item.classList.remove('active');
        }
        document.getElementById('radioBtn5').classList.add('active');
    }
    else if (inputMonthsHelp >= 72 && inputMonthsHelp < 84) {
        for(let item of inputsYearBtns) {
            item.classList.remove('active');
        }
        document.getElementById('radioBtn6').classList.add('active');
    }
    else if (inputMonthsHelp == 84) {
        for(let item of inputsYearBtns) {
            item.classList.remove('active');
        }
        document.getElementById('radioBtn7').classList.add('active');
    }
}

monthsRange.addEventListener('input', () => {
    monthANDChangeYear();
    calculation();   
})
//Сопряжение Input and inputRange месяцев и Года -END


//Info BEGIN
let helpNumber = 1;
let InfoHide = 0;
document.getElementById('getInfo').addEventListener('click', () => {
    if (document.querySelector('.table') != null) document.querySelector('.table').innerHTML = CreateTable();
    if  (InfoHide != 1) showInfo();
    if (helpNumber != 0) {
        document.getElementById('buttonCurtain').classList.remove('hide');
        showInfo();
        helpNumber = 0;
    } 

    let infoLoanRate = document.getElementById('interestRate').innerText;
    let infoLoanTerm = document.querySelector('.active').innerText.toLowerCase();
    let infoLoanTermOfMonths = document.getElementById('monthsRange').value + ' ' + CheckingCorrectnessOfTextMonths();  
    let infoMonthlyPayment = document.getElementById('monthlyPayment').innerText;
    let infoCarPrice = loanAmountCalculate;
    let infoInitialPayment = initialPaymentCalculate;
    let infoTradeIn = tradeInCalculate;
    let infoResidualPayment = 0;
        if (checkboxResidualPayment.checked) infoResidualPayment = residualPaymentCalculate;
        else infoResidualPayment = 0;
    let infoLoanAmount = infoCarPrice - infoInitialPayment - infoTradeIn - infoResidualPayment;
    let infoAmountOfInterest = 0;
    let infoOverpaymentOnLoan = 0;
    let infoOverPrice = 0;
    let infoTotalAmount = 0;

    infoCarPriceFormat = new Intl.NumberFormat('ru-RU').format(Number(infoCarPrice));
    infoInitialPaymentFormat = new Intl.NumberFormat('ru-RU').format(Number(infoInitialPayment));
    infoTradeInFormat = new Intl.NumberFormat('ru-RU').format(Number(infoTradeIn));
    infoResidualPaymentFormat = new Intl.NumberFormat('ru-RU').format(Number(infoResidualPayment));
    infoLoanAmountFormat = new Intl.NumberFormat('ru-RU').format(Number(infoLoanAmount));
    infoAmountOfInterestFormat = new Intl.NumberFormat('ru-RU').format(Number(infoAmountOfInterest));

    infoAmountOfInterest = new Intl.NumberFormat('ru-RU').format(Number(infoAmountOfInterest));

    infoTotalAmount = new Intl.NumberFormat('ru-RU').format(Number(infoTotalAmount));

    document.querySelector('.info__value').innerHTML = 
        infoLoanRate + '<br>' +
        infoLoanTerm + '<br>' +
        infoLoanTermOfMonths + '<br>' +
        infoMonthlyPayment + ' р.<br><br>' +
        infoCarPriceFormat + ' р.<br>' +
        infoInitialPaymentFormat + ' р. (' + ((Number(infoInitialPayment) / Number(infoCarPrice) * 100).toFixed(2)) + '%)<br>' +
        infoTradeInFormat + ' р. (' + ((Number(infoTradeIn) / Number(infoCarPrice) * 100).toFixed(2)) + '%)<br>' +
        infoResidualPaymentFormat + ' р. (' + ((Number(infoResidualPayment) / Number(infoCarPrice) * 100).toFixed(2)) + '%)<br>' +
        infoLoanAmountFormat + ' р. (' + ((Number(infoLoanAmount) / Number(infoCarPrice) * 100).toFixed(2)) + '%)<br><br>' +
        infoAmountOfInterestFormat + ' р. (0%)<br>' +
        infoOverpaymentOnLoan + '%<br>' +
        infoOverPrice + '%<br>' +
        infoTotalAmount + ' р.<br>';

        if (checkboxResidualPayment.checked) {
            document.querySelector('.text__red__none').classList.add('none');
        }
        else document.querySelector('.text__red__none').classList.remove('none');
})

const showInfo = function() {
    if (document.querySelector('.claculate__inner__info').innerHTML == "") {
        document.querySelector('.claculate__inner__info').innerHTML = `
    <div class="info__left">
        <div class="info">
            <div class="info__text">
            <div class="text__blue">
                Ставка кредита:<br>
                Срок кредита:<br>
                Количество платежей<br>
            </div>
            <div class="text__red">Ежемесячный платёж:</div><br>

            <div class="text__blue">
                Цена автомобиля:<br>
                Начальный платёж:<br>
                Trade-in:<br>
                <div class="text__red__none">Остаточный платёж:<br></div>
            </div>
            <div class="text__red">Сумма кредита:<br><br></div>

            <div class="text__blue">
                Сумма процентов:<br>
                Переплата по кредиту:<br>
                Сверх цены:<br>
            </div>
            <div class="text__red">Общая сумма:<br></div>
        </div>

        <div class="info__value">
            <div class="null"></div>
                15% <br>
                4 года <br>
                48 месяцев <br>
                19 802 руб. <br><br>
                0 руб. <br>
                0 руб. (0%) <br>
                0 руб. <br>
                1 000 000 руб. <br>
                1 000 000 руб. <br><br>
                0 руб. <br>
                0% <br>
                0% <br>
                0 руб. <br>
            </div>
        </div>
    </div>
        <div class="info__right">
            <div class="table" id="table"> `+ CreateTable() +` </div>
        </div>
    </div>
   `//<---сюда инфу // ----------------------info-------------------
        document.getElementById('buttonCurtain').innerHTML = `
        <div class="">ˆ</div>
        <div class="">ˆ</div>
        <div class="">ˆ</div>
        <div class="">ˆ</div>
        <div class="">ˆ</div>
        <div class="">ˆ</div>`
        InfoHide = 1;
    }
    else {
        document.querySelector('.claculate__inner__info').innerHTML = "";
        document.getElementById('buttonCurtain').innerHTML = `
        <div class="">ˇ</div>
        <div class="">ˇ</div>
        <div class="">ˇ</div>
        <div class="">ˇ</div>
        <div class="">ˇ</div>
        <div class="">ˇ</div>`
        InfoHide = 0;
    }
    document.querySelector('.claculate__inner__info').classList.add('claculate__inner__info__show'); 
};

document.getElementById('buttonCurtain').addEventListener('click', () => {
    showInfo(); 
})

document.getElementById('getCredit').addEventListener('click', () => {
    document.querySelector('.claculate__inner__info').innerHTML = "";
    document.getElementById('buttonCurtain').classList.add('hide');
    document.querySelector('.claculate__inner__info').classList.remove('claculate__inner__info__show');
    helpNumber = 1;
})

//Info END


//CheckBox BEGIN

checkboxResidualPayment.addEventListener('change', () => {
    if (checkboxResidualPayment.checked) {
        document.querySelector('.blockContainer__residualPayment').classList.add('showFlex');
        document.querySelector('.nullToggle').innerHTML = `
                                <div class="null"></div>
                                <div class="null"></div>
                                <div class="null"></div>
                                <div class="null"></div>
        `
        //-----------------------------------------------------------------
        loanAmountCalculate = Number(loanAmountCalculate);
        initialPaymentCalculate = Number(initialPaymentCalculate);
        tradeInCalculate = Number(tradeInCalculate);
        residualPaymentCalculate = Number(residualPaymentCalculate);

        if (loanAmountCalculate < (initialPaymentCalculate + tradeInCalculate + residualPaymentCalculate)) {

            if (initialPaymentCalculate > residualPaymentCalculate) {
                if ( loanAmountCalculate < (initialPaymentCalculate + tradeInCalculate + residualPaymentCalculate)) {
                    initialPayment.style.border = "2px solid red";
                    setTimeout(GrayBorderOnBlur, 500);
                }
                initialPayment.value = new Intl.NumberFormat('ru-RU').format(Number(initialPaymentCalculate - residualPaymentCalculate));//---------------------------------------
                initialPaymentCalculate = initialPaymentCalculate - residualPaymentCalculate;
                assignValueContrast();
                rangeColorRed();
            }
            else if (tradeInCalculate > residualPaymentCalculate) {
                if ( loanAmountCalculate < (initialPaymentCalculate + tradeInCalculate + residualPaymentCalculate)) {
                    tradeIn.style.border = "2px solid red";
                    setTimeout(GrayBorderOnBlur, 500);
                }
                tradeIn.value = new Intl.NumberFormat('ru-RU').format(Number(tradeInCalculate - residualPaymentCalculate));//---------------------------------------
                tradeInCalculate = tradeInCalculate - residualPaymentCalculate;
                assignValueContrast();
                rangeColorRed();
            }
        }
        //-----------------------------------------------------------------------
    }
    else {
        document.querySelector('.blockContainer__residualPayment').classList.remove('showFlex');
        document.querySelector('.nullToggle').innerHTML = "";
    }
    //---------------------------------------------------------------------------------------
    calculation();
})

const GrayBorderOnBlur = function() {
    for (let enter of AllEnters) {
        enter.style.border = "1px solid #999";
    }
}

//CheckBox END

document.getElementById('loanAmountRange').value =  Number(loanAmountRangeCalculate);
document.getElementById('residualPaymentRange').value = Number(residualPaymentRangeCalculate);
//Range BEGIN
rangeColorRed();
function rangeColorRed () {
    const rangesForFons = document.querySelectorAll('.range');
    for(let range of rangesForFons) {
        if (range != document.querySelector('.months__range')) {
            var x = Number(range.value);
            x = x/70000;
            var color = '-webkit-linear-gradient(left, red 0%, red '+ x +'%, rgba(153, 153, 153, 0.02)  '+ x +'%, rgba(153, 153, 153, 0.02)  100%)';
            range.style.background = color;
        }  
    
        range.addEventListener('input', () => {
            if (range != document.querySelector('.months__range')) {
                var x = Number(range.value);
                x = x/70000;
                var color = '-webkit-linear-gradient(left, red 0%, red '+ x +'%, rgba(153, 153, 153, 0.02)  '+ x +'%, rgba(153, 153, 153, 0.02)  100%)';
                range.style.background = color;
            }
        });
    }
}

const AllInputs = document.querySelectorAll('input');
for(let input of AllInputs) {
    input.addEventListener('input', () => {
        rangeColorRed();
    })
}

const rangeMonths = document.querySelector('.months__range');
var color = '-webkit-linear-gradient(left, red 0%, red '+ 0 +'%, #fff '+ 0 +'%, #fff 100%)';
rangeMonths.style.background = color;

//Range END

//MonthsAnimate BEGIN

monthsRange.addEventListener('mouseover', () => {
    document.getElementById('monthCount').style.color = '#dd364e';
})

monthsRange.addEventListener('mouseout', () => {
    document.getElementById('monthCount').style.color = 'rgb(59,113,174, .9)';
    document.getElementById('monthCount').style.fontSize = '18px';
})

monthsRange.addEventListener('input', () => {
    document.getElementById('monthCount').style.color = '#dd364e';
    document.getElementById('monthCount').style.fontSize = '20px';
})
//MonthsAnimate END

//Процентная ставка
InterestRateChangeHelp = 0;
const InterestRateChange = document.querySelector('.change__InterestRate');
const interestRateInput = document.querySelector('.interestRate__input');
const interestRateText = document.getElementById('interestRateText');
InterestRateChange.addEventListener('click', () => {
    if (InterestRateChangeHelp == 0) {
        interestRateInput.classList.remove('hide');
        interestRateText.classList.add('hide');
        InterestRateChangeHelp = 1;
        InterestRateChange.innerText = 'отменить';
        interestRateInput.focus();
        interestRateInput.select();
    }
    else {
        interestRateInput.classList.add('hide');
        interestRateText.classList.remove('hide');
        interestRateText.innerText = interestRateInput.value + '%';
        InterestRateChangeHelp = 0;
        InterestRateChange.innerText = 'изменить';
    }
    interestRate.dataset.value = interestRateInput.value;
    calculation();  
})
interestRateInput.addEventListener('change', () => {
    if (interestRateInput.value == '') interestRateInput.value = 15;
    if (interestRateInput.value < 0) interestRateInput.value = 0;
    else if (interestRateInput.value > 100) interestRateInput.value = 100;
})

interestRateText.addEventListener('click', () => {
    if (InterestRateChangeHelp == 0) {
        interestRateInput.classList.remove('hide');
        interestRateText.classList.add('hide');
        InterestRateChangeHelp = 1;
        InterestRateChange.innerText = 'отменить';
        interestRateInput.focus();
        interestRateInput.select();
    }
    interestRate.dataset.value = interestRateInput.value;
    calculation();  
})

interestRateInput.addEventListener('blur', () => {
    if (InterestRateChangeHelp == 1) {
        interestRateInput.classList.add('hide');
        interestRateText.classList.remove('hide');
        interestRateText.innerText = interestRateInput.value + '%';
        InterestRateChangeHelp = 0;
        InterestRateChange.innerText = 'изменить';
    }
    interestRate.dataset.value = interestRateInput.value;
    calculation();  
})
//Процентная ставка

//=====================Media=====================
var somethingChange = '';

if (window.innerWidth < 901) {
    document.querySelector('.nullToggle2').innerHTML = `
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    `
    document.querySelector('.nullToggle23').innerHTML = `
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>`
}

document.addEventListener("DOMContentLoaded", function(event)
{
    window.onresize = function() {
        resize_info();
    };
});

function resize_info()
{
    if (window.innerWidth < 901) {
        document.querySelector('.nullToggle2').innerHTML = `
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        `
        document.querySelector('.nullToggle23').innerHTML = `
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>
        <div class="null"></div>`
    }
    else {
        document.querySelector('.nullToggle2').innerHTML = '';
        document.querySelector('.nullToggle23').innerHTML = '';
    }
}

const checkMinusPayment = (All, AllMinusCurrent, AllMinus2, AllMinus3, AllMinusCurrentDiv) => {
    All = Number(All);
    AllMinusCurrent = Number(AllMinusCurrent);
    AllMinus2 = Number(AllMinus2);
    AllMinus3 = Number(AllMinus3);

    if (checkboxResidualPayment.checked) {
        if(All < (AllMinusCurrent + AllMinus2 + AllMinus3)) {
            AllMinusCurrent = All - (AllMinus2 + AllMinus3);
            loanAmount.style.border = "2px solid red";
            AllMinusCurrentDiv.style.border = "2px solid red";
            setTimeout(GrayBorderOnBlur, 500);
            return AllMinusCurrentDiv.value = All - (AllMinus2 + AllMinus3);
        }
    }
    else {
        if(All < (AllMinusCurrent + AllMinus2)) {
            AllMinusCurrent = All - AllMinus2;
            loanAmount.style.border = "2px solid red";
            AllMinusCurrentDiv.style.border = "2px solid red";
            setTimeout(GrayBorderOnBlur, 500);
            return AllMinusCurrentDiv.value = All - AllMinus2;
        }
    }
}

