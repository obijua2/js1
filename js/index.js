let cardDetails = {
    name: "Clement Egrinya",
    accountNumber: "6668881111",
    balance: 50000,
    pin: "5555",
    bank: "access"
};

//Recipient Details
let recipientDetails = {
    name: "Obijua Egrinya",
    accountNumber: "0066644499",
    balance: 30000
};


// Function to validate recipient details
function validateRecipientDetails(recipientBank, recipientAccountNumber) {
    
    let correctRecipientDetails = {
        uba: {
            accountNumber: "0066644499"
        },
        access: {
            accountNumber: "5555333377"
        },
        wema: {
            accountNumber: "1234567890"
        }
    };

    return correctRecipientDetails[recipientBank] && correctRecipientDetails[recipientBank].accountNumber === recipientAccountNumber;
}

// Step 1: Ask the user to insert the card
alert("Please insert your card.");

// Step 2: Request card pin
const enteredPin = prompt("Enter your PIN:");

// Step 3: Validate card pin
if (enteredPin === cardDetails.pin) {
    // Step 4: Ask the user for transaction type
    const transactionType = prompt("Enter transaction type:\n1- Withdraw\n2- Transfer");

    // Step 5: Process transaction based on transaction type
    if (transactionType === "1") {
        // Withdraw transaction
        const withdrawAmount = parseFloat(prompt("Enter amount to withdraw:"));
        if (!isNaN(withdrawAmount) && withdrawAmount <= cardDetails.balance) {
            cardDetails.balance -= withdrawAmount;
            alert(`Withdrawal successful! Remaining balance: ${cardDetails.balance}`);
        } else {
            alert("Invalid amount or insufficient balance.");
        }
    } else if (transactionType === "2") {
        // Transfer transaction
        const recipientBankSelection = prompt("Please select recipient's bank:\n1- UBA\n2- Access\n3- Wema");
        let recipientBank;
        switch (recipientBankSelection) {
            case "1":
                recipientBank = "uba";
                break;
            case "2":
                recipientBank = "access";
                break;
            case "3":
                recipientBank = "wema";
                break;
            default:
                alert("Invalid bank selection. Transaction canceled.");
                throw new Error("Invalid bank selection.");
        }

        const recipientAccountNumber = prompt(`Enter recipient's account number for ${recipientBank}:`);
        const confirmMessage = `Recipient Name: ${recipientDetails.name}\nRecipient Account Number: ${recipientAccountNumber}\nRecipient Bank: ${recipientBank}\n\nConfirm recipient details?`;
        const confirmedRecipient = confirm(confirmMessage);

        if (confirmedRecipient && validateRecipientDetails(recipientBank, recipientAccountNumber)) {
            const transferAmount = parseFloat(prompt("Enter amount to transfer:"));
            if (!isNaN(transferAmount) && transferAmount > 0 && transferAmount <= cardDetails.balance) {
                const transferConfirmation = confirm(`Are you sure you want to transfer ${transferAmount} to ${recipientDetails.name}?`);
                if (transferConfirmation) {
                    const transferPin = prompt("Enter your PIN to confirm the transfer:");
                    if (transferPin === cardDetails.pin) {
                        cardDetails.balance -= transferAmount;
                        recipientDetails.balance += transferAmount;
                        alert(`Transfer successful! Remaining balance: ${cardDetails.balance}\nRecipient's balance: ${recipientDetails.balance}`);
                    } else {
                        alert("Transfer canceled. Incorrect PIN.");
                    }
                } else {
                    alert("Transfer canceled.");
                }
            } else {
                alert("Invalid amount or insufficient balance.");
            }
        } else {
            alert("Transfer canceled. Recipient details do not match or were not confirmed.");
        }
    } else {
        alert("Invalid transaction type.");
    }
} else {
    alert("Invalid PIN. Transaction canceled.");
}

