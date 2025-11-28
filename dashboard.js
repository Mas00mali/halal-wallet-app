// DEMO USER DATA (Later Firebase lega)
let loggedInUser = {
    name: "User",
    walletBalance: 5000,

    transactions: [
        { id: "TXN001", datetime: "2025-11-28 10:00 AM", type: "credit", amount: 1500, fromto: "Wallet Add" },
        { id: "TXN002", datetime: "2025-11-28 12:14 PM", type: "debit", amount: 250, fromto: "Recharge" },
        { id: "TXN003", datetime: "2025-11-28 03:50 PM", type: "credit", amount: 2000, fromto: "Top-up" }
    ]
};


// 🚀 DASHBOARD START FUNCTION
function showDashboard() {
    document.getElementById("dashboardName").innerText = loggedInUser.name;
    document.getElementById("dashboardBalance").innerText = loggedInUser.walletBalance;

    loadTransactions();
}


// 🚀 TRANSACTION TABLE FILLER
function loadTransactions() {
    const tbody = document.getElementById("transactionBody");
    tbody.innerHTML = "";

    loggedInUser.transactions.forEach(txn => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${txn.id}</td>
            <td>${txn.datetime}</td>
            <td class="${txn.type}">${txn.type.toUpperCase()}</td>
            <td>₹${txn.amount}</td>
            <td>${txn.fromto}</td>
        `;

        tbody.appendChild(tr);
    });
}


// 🚀 OPEN SERVICE PAGE FUNCTION
function openService(pageName) {
    window.open("services/" + pageName, "_blank");
}


// Auto-Load Dashboard
window.onload = showDashboard;
