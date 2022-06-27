import test_transactions from '/tst/TestTransactions.js';


/**
 * Add Request Logic Here 
 */


/**
 * @param _transactionId : int
 * @param _clientId : int
 * @param _date : Date
 * @param _price : float
 * @param _amount : float
 * 
 * @return Transaction Object
 */

const createTransaction = (_transactionId, _clientId, _date, _price, _amount) => {
    return {
        transactionId : _transactionId,
        clientId : _clientId,
        date: _date,
        price: _price,
        amount: _amount
    }
}

// Create list of test objects



/**
 * 
 * @param Transactions : array of Transaction Objects
 */

const ShowTransactions = (Transactions) =>{

    const wrapper = document.getElementById("transactions-wrapper");
    Transactions.forEach((transaction) => {
        let div = document.createElement("div");
        div.className = "transaction";
        
        div.innerHTML = `
            <p class="transaction-id">Transaction Id: ${transaction.transactionId}</p>
            <p class="client-id">Client Id : ${transaction.clientId}</p>
            <p class="date">Date: ${transaction.date}</p>
            <p class="price">Price: ${transaction.price}</p>
            <p class="amount">Amount: ${transaction.amount}</p>
        `;

        wrapper.append(div);
    });
    console.log("Showed Transactions");

    return 0;
}

const num = ShowTransactions(test_transactions);

