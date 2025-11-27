// Users data
let users = [];
let transactions = [];
let loggedInUser = null;

// Sign Up
function handleSignUp() {
  const name = document.getElementById("signupName").value;
  const aadhar = document.getElementById("signupAadhar").value;
  const pan = document.getElementById("signupPAN").value;
  const email = document.getElementById("signupEmail").value;
  const mobile = document.getElementById("signupMobile").value;
  const userId = document.getElementById("signupUserId").value;
  const password = document.getElementById("signupPassword").value;

  if(!name || !aadhar || !pan || !email || !mobile || !userId || !password){
    alert("All fields required!");
    return;
  }

  if(users.find(u=>u.userId===userId)){
    alert("User ID already exists");
    return;
  }

  const newUser = {
    userId, password, name, aadhar, pan, email, mobile,
    balance: 0
  };
  users.push(newUser);
  alert("Sign up successful! Please login.");
}

// Login
function handleLogin() {
  const userId = document.getElementById("loginUserId").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find(u=>u.userId===userId && u.password===password);
  if(!user) return alert("Invalid credentials");

  loggedInUser = user;
  document.getElementById("authSection").style.display = "none";
  document.getElementById("walletSection").style.display = "block";
  showProfile();
  populateUsers();
  updateBalance();
  updateTxnTable();
}

// Logout
function handleLogout() {
  loggedInUser = null;
  document.getElementById("authSection").style.display = "block";
  document.getElementById("walletSection").style.display = "none";
}

// Show Profile
function showProfile() {
  document.getElementById("profileName").innerText = loggedInUser.name;
  const ul = document.getElementById("profileDetails");
  ul.innerHTML = "";
  for(let key of ["aadhar","pan","email","mobile","userId"]){
    const li = document.createElement("li");
    li.textContent = `${key.toUpperCase()}: ${loggedInUser[key]}`;
    ul.appendChild(li);
  }
}

// Populate Users for transfer
function populateUsers() {
  const select = document.getElementById("toUser");
  select.innerHTML = "";
  users.forEach(u=>{
    if(u.userId !== loggedInUser.userId){
      const option = document.createElement("option");
      option.value = u.userId;
      option.textContent = `${u.name} (${u.balance})`;
      select.appendChild(option);
    }
  });
}

// Update Balance
function updateBalance(){
  document.getElementById("balance").innerText = loggedInUser.balance;
}

// Transaction ID generator
function generateTxnId() {
  return 'TXN' + Math.floor(100000 + Math.random() * 900000);
}

// Transfer
function handleTransfer() {
  const toId = document.getElementById("toUser").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const description = document.getElementById("desc").value || "-";

  if(amount <=0) return alert("Enter valid amount");
  const receiver = users.find(u=>u.userId===toId);
  if(!receiver) return alert("Receiver not found");
  if(loggedInUser.balance < amount) return alert("Insufficient balance");

  loggedInUser.balance -= amount;
  receiver.balance += amount;

  const txnId = generateTxnId();
  const dateTime = new Date().toLocaleString();

  transactions.push({
    txnId, type:"Debit", fromName: loggedInUser.name, toName: receiver.name, amount, description, dateTime
  });
  transactions.push({
    txnId, type:"Credit", fromName: loggedInUser.name, toName: receiver.name, amount, description, dateTime
  });

  alert(`Transfer successful: ${amount} to ${receiver.name}`);

  document.getElementById("amount").value="";
  document.getElementById("desc").value="";

  populateUsers();
  updateBalance();
  updateTxnTable();
}

// Update Transaction Table
function updateTxnTable(){
  const tbody = document.getElementById("txnHistory");
  tbody.innerHTML="";
  transactions.forEach(txn=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${txn.txnId}</td>
                    <td class="${txn.type.toLowerCase()}">${txn.type}</td>
                    <td>${txn.fromName}</td>
                    <td>${txn.toName}</td>
                    <td>${txn.amount}</td>
                    <td>${txn.description}</td>
                    <td>${txn.dateTime}</td>`;
    tbody.appendChild(tr);
  });
}
