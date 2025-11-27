let loggedInUser = {
    name: "Ali Khan",
    walletBalance: 5000,
    transactions: [
        {id:"TXN001", datetime:"2025-11-27 10:00", type:"credit", amount:1000, fromto:"Bank Deposit"},
        {id:"TXN002", datetime:"2025-11-27 12:30", type:"debit", amount:500, fromto:"Recharge"},
        {id:"TXN003", datetime:"2025-11-27 14:45", type:"credit", amount:2000, fromto:"Wallet Top-up"}
    ]
};

function showDashboard(){
    document.getElementById("dashboardName").innerText=loggedInUser.name;
    document.getElementById("dashboardBalance").innerText=loggedInUser.walletBalance;
    loadTransactions();
}

function loadTransactions(){
    const tbody=document.getElementById("transactionBody");
    tbody.innerHTML="";
    loggedInUser.transactions.forEach(txn=>{
        const tr=document.createElement("tr");
        tr.innerHTML=`<td>${txn.id}</td><td>${txn.datetime}</td><td class="${txn.type}">${txn.type.toUpperCase()}</td><td>₹${txn.amount}</td><td>${txn.fromto}</td>`;
        tbody.appendChild(tr);
    });
}

function openService(serviceFile){
    window.open("services/"+serviceFile, "_blank");
}

window.onload=showDashboard;
