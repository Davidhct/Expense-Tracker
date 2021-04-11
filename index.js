
let i = 0;
let e = 0;



if(window.localStorage.getItem("incomeStorage") == undefined){
    let incomeStorage = [];
    
    localStorage.setItem("incomeStorage", JSON.stringify(incomeStorage));
}

if(window.localStorage.getItem("expenseStorage") == undefined){
    let expenseStorage = [];
    
    localStorage.setItem("expenseStorage", JSON.stringify(expenseStorage));
}

console.log(localStorage.getItem("incomeStorage"));
console.log(localStorage.getItem("expenseStorage"));

let incomeArray = localStorage.getItem("incomeStorage");
let incomeStorage = JSON.parse(incomeArray);

let expenseArray = localStorage.getItem("expenseStorage");
let expenseStorage = JSON.parse(expenseArray);


// load the localstorage in the todo app
onload = function() {
  
  while (i < incomeStorage.length) {
    let newTr = createNewTr(incomeStorage[i]); 
    document.getElementById('income-table').appendChild(newTr);
    i++  
  }
  while (e < expenseStorage.length) {
    let newTr = createNewTr(expenseStorage[e]); 
    document.getElementById('expense-table').appendChild(newTr);
    e++  
  }
}
document.getElementById('income-btn').addEventListener('click', function() {
  let inputName = document.getElementById('input-name').value.trim();
  let inputAmount = document.getElementById('input-amount').value.trim();
  let inputSelect = document.getElementById('select-type').value;
  let inputDate = document.getElementById('input-date').value.trim();
  
  if (inputName === '' || inputAmount === '' || inputDate === '') {
    alert("You missed one of the input lines! ")
  } else {
    incomeObj = {
      name: inputName,
      amount: inputAmount,
      type: inputSelect,
      date: inputDate
    }
    
    incomeStorage.push(incomeObj);
    localStorage.setItem("incomeStorage", JSON.stringify(incomeStorage));

    
    let newTr = createNewTr(incomeStorage[i]); 
    console.log(newTr);
    document.getElementById('income-table').appendChild(newTr);
    

    i++
  }
  document.getElementById('input-name').value = '';
  document.getElementById('input-amount').value = '';
  document.getElementById('input-date').value = '';
});

document.getElementById('expense-btn').addEventListener('click', function() {
  let inputName = document.getElementById('input-name').value.trim();
  let inputAmount = document.getElementById('input-amount').value.trim();
  let inputSelect = document.getElementById('select-type').value;
  let inputDate = document.getElementById('input-date').value.trim();
  
  if (inputName === '' || inputAmount === '' || inputDate === '') {
    alert("You missed one of the input lines! ")
  } else {
    expenseObj = {
      name: inputName,
      amount: inputAmount,
      type: inputSelect,
      date: inputDate
    }
    expenseStorage.push(expenseObj);
    localStorage.setItem("expenseStorage", JSON.stringify(expenseStorage));

    
    let newTr = createNewTr(expenseStorage[e]); 
    console.log(newTr);
    document.getElementById('expense-table').appendChild(newTr);
    

    e++;
  }
  document.getElementById('input-name').value = '';
  document.getElementById('input-amount').value = '';
  document.getElementById('input-date').value = '';
});



function createNewTr(input) {
  let tr = document.createElement('tr');
  let tdName = document.createElement('td');
  let tdAmount = document.createElement('td');
  let tdType = document.createElement('td');
  let tdDate = document.createElement('td');
  let tdedit = document.createElement('td');
  let tdClose = document.createElement('td');

  let closeBtn = createCloseButton();
  let editBtn = createEditButton();

  tdedit.appendChild(editBtn);
  tdClose.appendChild(closeBtn);

  console.log(input);
  tdName.innerHTML = input.name;
  tdAmount.innerHTML = input.amount;
  tdType.innerHTML = input.type;
  tdDate.innerHTML = input.date;

  tr.appendChild(tdName);
  tr.appendChild(tdAmount);
  tr.appendChild(tdType);
  tr.appendChild(tdDate);
  tr.appendChild(tdedit);
  tr.appendChild(tdClose);
  
  return tr;

}


function createCloseButton() {
  let closeBtn = document.createElement('button');
  let img = document.createElement('img');
  img.src = './css/images/delete_icon.png'
  closeBtn.appendChild(img);
  closeBtn.classList.add('close-btn')
  closeBtn.id = 'close-btn'

  closeBtn.addEventListener('click', deleteItem);

  return closeBtn;
  
}

function deleteItem(e) {
  
    if (this.parentNode.parentNode.parentNode.classList.contains('income-table') ){
      
      this.parentNode.parentNode.remove();

      let index = incomeStorage.indexOf(this.parentNode.parentNode)
      incomeStorage.splice(index, 1);
      localStorage.setItem("incomeStorage", JSON.stringify(incomeStorage));
      i--;
      console.log(localStorage);
      
    }
    if (this.parentNode.parentNode.parentNode.classList.contains('expense-table') ){
      console.log(this.parentNode.parentNode);
      this.parentNode.parentNode.remove();
      let index = expenseStorage.indexOf(this.parentNode.parentNode);
      expenseStorage.splice(index, 1);
      localStorage.setItem("expenseStorage", JSON.stringify(expenseStorage));
      e--;
      console.log(localStorage);
    }
}


function createEditButton() {
  let editBtn = document.createElement('button');
  let imgEdit = document.createElement('img');
  let imgEditting = document.createElement('img');
  editBtn.id = 'edit-btn';
  imgEdit.src = './css/images/edit_icon.png';
  imgEditting.src = './css/images/editting_icon.png';

  editBtn.appendChild(imgEdit);
  editBtn.classList.add('edit-btn')

  // editItem(editBtn, input, imgEdit, imgEditting);
  
  return editBtn;
  
} 