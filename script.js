// Dummy users
const users = [
  { id: "u1", name: "Ali", balance: 1000 },
  { id: "u2", name: "Ahmed", balance: 500 },
  { id: "u3", name: "Fatima", balance: 800 },
];

// Transaction history
let transactions = [];

const fromUserSelect = document.getElementById("fromUser");
const toUserSelect = document.getElementById("toUser");
const balancesList = document.getElementById("balances");
const txnTable = document.getElementById("txnHistory");

function populateSelects() {
  fromUserSelect.innerHTML = "";
  toUserSelect.innerHTML = "";
  users.forEach(u => {
    const option1 = document.createElement("option");
    option1.value = u.id;
    option1.textContent = ${u.name} (${u.balance});
    fromUserSelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = u.id;
    option2.textContent = ${u.name} (${u.balance});
    toUserSelect.appendChild(option2);
  });
}

function updateBalances() {
  balancesList.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = ${u.name}: ${u.balance};
    balancesList.appendChild(li);
  });
}

function updateTxnTable() {
  txnTable.innerHTML = "";
  transactions.forEach(txn => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${txn.txnId}</td>
      <td class="${txn.type.toLowerCase()}">${txn.type}</td>
      <td>${txn.fromName}</td>
      <td>${txn.toName}</td>
      <td>${txn.amount}</td>
      <td>${txn.description}</td>
      <td>${txn.dateTime}</td>
    `;
    txnTable.appendChild(tr);
  });
}

function generateTxnId() {
  return 'TXN' + Math.floor(100000 + Math.random() * 900000);
}

function handleTransfer() {
  const fromId = fromUserSelect.value;
  const toId = toUserSelect.value;
  const amount = parseFloat(document.getElementById("amount").value);
  const description = document.getElementById("desc").value || "-";

  if (amount <= 0) return alert("Enter valid amount");
  if (fromId === toId) return alert("Sender and receiver cannot be same");

  const sender = users.find(u => u.id === fromId);
  const receiver = users.find(u => u.id === toId);

  if (sender.balance < amount) return alert("Insufficient balance");

  sender.balance -= amount;
  receiver.balance += amount;

  const dateTime = new Date().toLocaleString();
  const txnId = generateTxnId();

  // Record transaction (debit)
  transactions.push({
    txnId,
    type: "Debit",
    fromName: sender.name,
    toName: receiver.name,
    amount,
    description,
    dateTime
  });

  // Record transaction (credit)
  transactions.push({
    txnId,
    type: "Credit",
    fromName: sender.name,
    toName: receiver.name,
    amount,
    description,
    dateTime
  });

  alert(Transfer successful: ${amount} from ${sender.name} to ${receiver.name});

  document.getElementById("amount").value = "";
  document.getElementById("desc").value = "";

  populateSelects();
  updateBalances();
  updateTxnTable();
}

// Initial load
populateSelects();
updateBalances();
updateTxnTable();
