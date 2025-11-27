let users = [];
let transactions = [];
let loggedInUser = null;

// Show / Hide Forms
function showLogin(){
  document.getElementById("signupDiv").style.display="none";
  document.getElementById("loginDiv").style.display="block";
}

function showSignUp(){
  document.getElementById("loginDiv").style.display="none";
  document.getElementById("signupDiv").style.display="block";
}

// Forgot Password (Simple Alert)
function forgotPassword(){
  alert("Please contact admin to reset your password (Qarz-e-Halal compliant).");
}

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

  users.push({userId, password, name, aadhar, pan, email, mobile, balance:0});
  alert("Sign Up successful! Please login.");
  showLogin();
}

// Login
function handleLogin() {
  const userId = document.getElementById("loginUserId").value;
  const password = document.getElementById("loginPassword").value;
  const user = users.find(u=>u.userId===userId && u.password===password);

  if(!user){
    alert("Invalid credentials!");
    return;
  }

  loggedInUser = user;
  document.getElementById("loginDiv").style.display="none";
  document.getElementById("walletSection").style.display="block";
  showProfile();
  populateUsers();
  updateBalance();
  updateTxnTable();
}

// Logout
function handleLogout() {
  loggedInUser=null;
  document.getElementById("walletSection").style.display="none";
  showLogin();
}

// Profile
function showProfile(){
  document.getElementById("profileName").innerText = loggedInUser.name;
  const ul=document.getElementById("profileDetails");
  ul.innerHTML="";
  ["aadhar","pan","email","mobile","userId"].forEach(key=>{
    const li=document.createElement("li");
    li.textContent=`${key.toUpperCase()}: ${loggedInUser[key]}`;
    ul.appendChild(li);
  });
}

// Populate Users
function populateUsers(){
  const select=document.getElementById("toUser");
  select.innerHTML="";
  users.forEach(u=>{
    if(u.userId!==loggedInUser.userId){
      const option=document.createElement("option");
      option.value=u.userId;
      option.textContent=`${u.name} (${u.balance})`;
      select.appendChild(option);
    }
  });
}

// Update Balance
function updateBalance(){
  document.getElementById("balance").innerText = loggedInUser.balance;
}

// Transaction ID Generator
function generateTxnId(){
  return "TXN"+Math.floor(100000+Math.random()*900000);
}

// Transfer
function handleTransfer(){
  const toId=document.getElementById("toUser").value;
  const amount=parseFloat(document.getElementById("amount").value);
  const desc=document.getElementById("desc").value || "-";

  if(amount<=0){ alert("Enter valid amount"); return; }
  const receiver=users.find(u=>u.userId===toId);
  if(!receiver){ alert("Receiver not found"); return; }
  if(loggedInUser.balance<amount){ alert("Insufficient balance"); return; }

  loggedInUser.balance -= amount;
  receiver.balance += amount;

  const txnId=generateTxnId();
  const dateTime=new Date().toLocaleString();

  transactions.push({txnId, type:"Debit", fromName:loggedInUser.name, toName:receiver.name, amount, description:desc, dateTime});
  transactions.push({txnId, type:"Credit", fromName:loggedInUser.name, toName:receiver.name, amount, description:desc, dateTime});

  alert(`Transfer successful: ${amount} to ${receiver.name}`);
  document.getElementById("amount").value="";
  document.getElementById("desc").value="";
  populateUsers();
  updateBalance();
  updateTxnTable();
}

// Transaction Table
function updateTxnTable(){
  const tbody=document.getElementById("txnHistory");
  tbody.innerHTML="";
  transactions.forEach(txn=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${txn.txnId}</td>
                  <td class="${txn.type.toLowerCase()}">${txn.type}</td>
                  <td>${txn.fromName}</td>
                  <td>${txn.toName}</td>
                  <td>${txn.amount}</td>
                  <td>${txn.description}</td>
                  <td>${txn.dateTime}</td>`;
    tbody.appendChild(tr);
  });
}
