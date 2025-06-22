const balance = document.getElementById('balance'); 
const income = document.getElementById('income'); 
const expense = document.getElementById('expense'); 
const transactionList = document.getElementById('transaction-list'); 
const transactionForm = document.getElementById('transaction-form'); 
const text = document.getElementById('text'); 
const amount = document.getElementById('amount'); 
 
let transactions = []; 
 
// Update balance, income, and expense 
function updateValues() { 
    const amounts = transactions.map(transaction => transaction.amount); 
    const totalBalance = amounts.reduce((acc, val) => acc + val, 0).toFixed(2); 
    const totalIncome = amounts 
        .filter(value => value > 0) 
        .reduce((acc, val) => acc + val, 0) 
        .toFixed(2); 
const totalExpense = amounts 
.filter(value => value < 0) 
.reduce((acc, val) => acc + val, 0) 
.toFixed(2); 

    balance.textContent = `₹${totalBalance}`; 
    income.textContent = `+₹${totalIncome}`; 
    expense.textContent = `-₹${Math.abs(totalExpense).toFixed(2)}`; 
} 

// Add transaction to DOM 
function addTransactionDOM(transaction) { 
    const listItem = document.createElement('li'); 
    listItem.classList.add(transaction.amount < 0 ? 'negative' : 'positive'); 
    listItem.innerHTML = ` 
    ${transaction.text} 
    <span>${transaction.amount < 0 ? '-' : '+'}₹${Math.abs(transaction.amount)}</span> 
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button> 
    `;  
transactionList.appendChild(listItem); 
} 

// Add transaction 
function addTransaction(e) { 
e.preventDefault(); 
    if (text.value.trim() === '' || amount.value.trim() === '') { 
    alert('Please add both text and amount.'); 
    return; 
    } 
const transaction = { 
    id: Date.now(), 
    text: text.value, 
    amount: +amount.value 
    }; 
    transactions.push(transaction); 
    addTransactionDOM(transaction); 
    updateValues(); 
    text.value = ''; 
    amount.value = ''; 
} 
// Remove transaction 
function removeTransaction(id) { 
transactions = transactions.filter(transaction => transaction.id !== id); 
init(); 
} 
// Initialize app 
function init() { 
    transactionList.innerHTML = ''; 
    transactions.forEach(addTransactionDOM); 
    updateValues(); 
} 
transactionForm.addEventListener('submit', addTransaction); 
init();