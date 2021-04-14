
let i = 0;
let t = 0;
let incomeIndex = 0;
let expenseIndex = 0;



document.getElementById('expense-btn').addEventListener('click', checkInput)
document.getElementById('income-btn').addEventListener('click', checkInput)

if(window.localStorage.getItem("incomeStorage") == undefined){
    let incomeStorage = [];

    localStorage.setItem("incomeStorage", JSON.stringify(incomeStorage));
}

if(window.localStorage.getItem("expenseStorage") == undefined){
    let expenseStorage = [];
    
    localStorage.setItem("expenseStorage", JSON.stringify(expenseStorage));
}


let incomeArray = localStorage.getItem("incomeStorage");
let incomeStorage = JSON.parse(incomeArray);

let expenseArray = localStorage.getItem("expenseStorage");
let expenseStorage = JSON.parse(expenseArray);

let balance = localStorage.getItem("balance");

let spanBalance = document.getElementById('span-balance');


// load the localstorage in the todo app
onload = function() {
  
  if (i === 0 && t === 0){
    balance = 0;
    spanBalance.innerHTML = balance;
    localStorage.setItem("balance", JSON.stringify(balance));
  }
  while (i < incomeStorage.length) {
    let newTr = createNewTr(incomeStorage[i]); 

    updateBalance('income-btn', incomeStorage[i].amount);
    
    document.getElementById('income-tbody').appendChild(newTr);
    i++  
  }
  while (t < expenseStorage.length) {
    let newTr = createNewTr(expenseStorage[t]);
    
    updateBalance('expense-btn', expenseStorage[t].amount);
    
    document.getElementById('expense-tbody').appendChild(newTr);
    t++  
  }
  spanBalance.innerHTML = balance;
}


function checkInput() {
  let inputName = document.getElementById('input-name').value.trim();
  let inputAmount = document.getElementById('input-amount').value.trim();
  let inputSelect = document.getElementById('select-type').value;
  let inputDate = document.getElementById('input-date').value.trim();
  
  if (inputName === '' || inputAmount === '' || inputDate === '') {
    alert("You missed one of the input lines! ")
  } else {
    if (this.id === 'income-btn') {
      incomeObj = {
        name: inputName,
        amount: inputAmount,
        type: inputSelect,
        date: inputDate
      } 
    
      incomeStorage.push(incomeObj);
      localStorage.setItem("incomeStorage", JSON.stringify(incomeStorage));
      
      updateBalance(this.id, incomeObj.amount);

      let newTr = createNewTr(incomeStorage[i]); 

      document.getElementById('income-tbody').appendChild(newTr);
      i++
    } else {
      
      expenseObj = {
        name: inputName,
        amount: inputAmount,
        type: inputSelect,
        date: inputDate
      }

      expenseStorage.push(expenseObj);
      localStorage.setItem("expenseStorage", JSON.stringify(expenseStorage));

      updateBalance(this.id, expenseObj.amount);

      let newTr = createNewTr(expenseStorage[t]); 
      
      document.getElementById('expense-tbody').appendChild(newTr);
      t++;
    }
  }
  document.getElementById('input-name').value = '';
  document.getElementById('input-amount').value = '';
  document.getElementById('input-date').value = '';
}



function createNewTr(input) {
  let tr = document.createElement('tr');
  let tdName = document.createElement('td');
  let tdAmount = document.createElement('td');
  let tdType = document.createElement('td');
  let tdDate = document.createElement('td');
  let tdedit = document.createElement('td');
  let tdClose = document.createElement('td');

  let inputNameTd = document.createElement('input');
  inputNameTd.type = 'text';
  inputNameTd.value = input.name;
  inputNameTd.classList.add('input-name-td');
  inputNameTd.disabled = true;

  let inputAmountTd = document.createElement('input');
  inputAmountTd.type = 'number';
  inputAmountTd.value = input.amount;
  
  inputAmountTd.classList.add('input-amount-td');
  inputAmountTd.disabled = true;

  let selectTypeTd = document.createElement('select');
  selectTypeTd.classList.add('select-type-td')
  selectTypeTd.disabled = true;
  let optionType_1 = document.createElement('option');
  let optionType_2 = document.createElement('option');
  let optionType_3 = document.createElement('option');
  
  if (input.type === 'cash') {
    optionType_1.value = 'cash';
    optionType_2.value = 'credit';
    optionType_3.value = 'other';

    optionType_1.innerHTML = 'Cash';
    optionType_2.innerHTML = 'Credit';
    optionType_3.innerHTML = 'Other';
  } else if (input.type === 'credit') {
    optionType_1.value = 'credit';
    optionType_2.value = 'cash';
    optionType_3.value = 'other';

    optionType_1.innerHTML = 'Credit';
    optionType_2.innerHTML = 'Cash';
    optionType_3.innerHTML = 'Other';
  } else {
    optionType_1.value = 'other';
    optionType_2.value = 'cash';
    optionType_3.value = 'credit';

    optionType_1.innerHTML = 'Other';
    optionType_2.innerHTML = 'Cash';
    optionType_3.innerHTML = 'Credit';
  }
  

  selectTypeTd.appendChild(optionType_1);
  selectTypeTd.appendChild(optionType_2);
  selectTypeTd.appendChild(optionType_3);

  let inputDateTd = document.createElement('input');
  inputDateTd.type = 'Date';
  inputDateTd.value = input.date;
  inputDateTd.classList.add('input-date-td');
  inputDateTd.disabled = true;

  let closeBtn = createCloseButton(input);
  let editBtn = createEditButton(inputNameTd, inputAmountTd, selectTypeTd, inputDateTd);

  tdedit.appendChild(editBtn);
  tdClose.appendChild(closeBtn);

  // console.log(input);
  tdName.appendChild(inputNameTd);
  tdAmount.appendChild(inputAmountTd);
  tdType.appendChild(selectTypeTd);
  tdDate.appendChild(inputDateTd);

  tr.appendChild(tdName);
  tr.appendChild(tdAmount);
  tr.appendChild(tdType);
  tr.appendChild(tdDate);
  tr.appendChild(tdedit);
  tr.appendChild(tdClose);
  
  return tr;

}


function createCloseButton(input) {
  let closeBtn = document.createElement('button');
  let img = document.createElement('img');
  img.src = './css/images/delete_icon.png'
  closeBtn.appendChild(img);
  closeBtn.classList.add('close-btn')
  closeBtn.id = 'close-btn'

  deleteItem(closeBtn, input);
  
  return closeBtn;
  
}

function deleteItem(closeBtn, input) {
  
  closeBtn.addEventListener('click', function() {
    
    if (this.parentNode.parentNode.parentNode.id === 'income-tbody') {
      
      this.parentNode.parentNode.remove()
      
      let index = incomeStorage.indexOf(input)
      
      updateBalance('expense-btn', incomeStorage[index].amount);
      
      incomeStorage.splice(index, 1);
      localStorage.setItem("incomeStorage", JSON.stringify(incomeStorage));
      i--;
      
    } else if (this.parentNode.parentNode.parentNode.id === 'expense-tbody'){
        this.parentNode.parentNode.remove();

        let index = expenseStorage.indexOf(input);
  
        updateBalance('income-btn', expenseStorage[index].amount);

        expenseStorage.splice(index, 1);
        localStorage.setItem("expenseStorage", JSON.stringify(expenseStorage));
        t--;
        
      }
      if (i === 0 && t === 0) {
        updateBalance('reset', '0');
      }
  });
  
}


function createEditButton(inputNameTd, inputAmountTd, selectTypeTd, inputDateTd) {
  let editBtn = document.createElement('button');
  let imgEdit = document.createElement('img');
  let imgEditting = document.createElement('img');
  editBtn.id = 'edit-btn';
  imgEdit.src = './css/images/edit_icon.png';
  imgEditting.src = './css/images/editting_icon.png';

  editBtn.appendChild(imgEdit);
  editBtn.classList.add('edit-btn')

  editItem(editBtn, inputNameTd, inputAmountTd, selectTypeTd, inputDateTd, imgEdit, imgEditting);
  
  return editBtn;
  
} 



function editItem(editBtn, inputNameTd, inputAmountTd, selectTypeTd, inputDateTd, imgEdit, imgEditting) {
  
  editBtn.addEventListener('click', function(e) {
  
    if (this.parentNode.parentNode.parentNode.id === 'income-table') {
      for (let k = 0; k < incomeStorage.length; k++) {
        if (incomeStorage[k].name === inputNameTd.value) {
          incomeIndex = k;
        }
      }
    } else {
      for (let k = 0; k < expenseStorage.length; k++)  {
        console.log(expenseStorage[k]);
        if (expenseStorage[k].name === inputNameTd.value) {
          expenseIndex = k;
        }
      }
    }

    if (inputNameTd.disabled === true) {
      
      inputNameTd.disabled = !inputNameTd.disabled;
      inputAmountTd.disabled = !inputAmountTd.disabled;
      selectTypeTd.disabled = !selectTypeTd.disabled;
      inputDateTd.disabled = !inputDateTd.disabled;
      
      editBtn.removeChild(imgEdit)
      editBtn.appendChild(imgEditting);
        
    } else {
      inputNameTd.disabled = !inputNameTd.disabled;
      inputAmountTd.disabled = !inputAmountTd.disabled;
      selectTypeTd.disabled = !selectTypeTd.disabled;
      inputDateTd.disabled = !inputDateTd.disabled;
        
          
      editBtn.removeChild(imgEditting);
      editBtn.appendChild(imgEdit); 
      
      if (this.parentNode.parentNode.parentNode.id === 'income-table') {
        let tmp = incomeStorage[incomeIndex].amount;
        
        incomeStorage[incomeIndex].name = inputNameTd.value;
        incomeStorage[incomeIndex].amount = inputAmountTd.value;
        incomeStorage[incomeIndex].type = selectTypeTd.value;
        incomeStorage[incomeIndex].date = inputDateTd.value;

        let before = parseInt(tmp, 10);
        let after = parseInt(incomeStorage[incomeIndex].amount, 10);

        after = before - after;

        updateBalance('expense-btn', after);

        localStorage.setItem("incomeStorage", JSON.stringify(incomeStorage))
      } 
      if (this.parentNode.parentNode.parentNode.id === 'expense-table') {
        let tmp = expenseStorage[expenseIndex].amount;

        expenseStorage[expenseIndex].name = inputNameTd.value;
        expenseStorage[expenseIndex].amount = inputAmountTd.value;
        expenseStorage[expenseIndex].type = selectTypeTd.value;
        expenseStorage[expenseIndex].date = inputDateTd.value;

        let before = parseInt(tmp, 10);
        let after = parseInt(expenseStorage[expenseIndex].amount, 10);

        after = before - after;

        updateBalance('income-btn', after);

        localStorage.setItem("expenseStorage", JSON.stringify(expenseStorage));
      }
    }
    
  },false); 
  
  
}

function updateBalance(pointer, amount) {
  let intAmount = parseInt(amount, 10)
  if (pointer === 'income-btn') {

    balance = balance + intAmount;

  } else if (pointer === 'expense-btn') {
    balance = balance - intAmount;
    
  } else {
    balance = intAmount;
  }
  spanBalance.innerHTML = balance;
  localStorage.setItem("balance", JSON.stringify(balance));
  
}
  
  
function sortDate(pointer) {

}