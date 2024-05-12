let cardDetails = {
    name: "Clement Egrinya",
    accountNumber: "6668881111",
    balance: 20000,
    pin: "5555",
    bank: "access"
};

// Function to validate recipient details
function validateRecipientDetails(recipientName, recipientAccountNumber, recipientBank) {
    // Assuming recipient details are hardcoded
    const correctRecipientName = "Obijua Egrinya";
    const correctRecipientAccountNumber = "0066644499";
    const correctRecipientBank = "uba";

    return (recipientName === correctRecipientName &&
        recipientAccountNumber === correctRecipientAccountNumber &&
        recipientBank === correctRecipientBank);
}

// Step 1: Prompt the user to select their bank
let userBank = prompt("Please select your bank: uba, access, or wema").toLowerCase();

// Step 2: Check if the user's bank is valid
if (userBank === "uba" || userBank === "access" || userBank === "wema") {
    // Step 3: Validate Card Details
    let pin = prompt("Enter your PIN:");
    if (pin === cardDetails.pin) {
        // Step 4: Prompt the user to enter recipient's account number
        let recipientAccountNumber = prompt("Enter recipient's account number:");

        // Step 5: Confirm recipient's details
        let recipientName = "Obijua Egrinya"; // Pre-defined recipient name
        let recipientBank = "uba"; // Pre-defined recipient bank
        let confirmMessage = `Recipient Name: ${recipientName}\nRecipient Account Number: ${recipientAccountNumber}\nRecipient Bank: ${recipientBank}\n\nConfirm recipient details?`;
        let confirmedRecipient = confirm(confirmMessage);

        // Step 6: If recipient is confirmed, proceed with the transfer
        if (confirmedRecipient && validateRecipientDetails(recipientName, recipientAccountNumber, recipientBank)) {
            // Step 7: Request amount to transfer
            let transferAmount = prompt("Enter amount to transfer:");
            if (!isNaN(transferAmount) && Number(transferAmount) > 0 && Number(transferAmount) <= cardDetails.balance) {
                // Step 8: Request card pin to confirm transfer
                let transferConfirmation = prompt("Enter your PIN to confirm the transfer:");
                if (transferConfirmation === cardDetails.pin) {
                    // Step 9: Simulate transfer
                    cardDetails.balance -= Number(transferAmount);
                    alert(`Transfer successful! Remaining balance: ${cardDetails.balance}`);
                } else {
                    alert("Transfer canceled. Incorrect PIN.");
                }
            } else {
                alert("Invalid amount or insufficient balance.");
            }
        } else {
            alert("Transfer canceled. Recipient details do not match or were not confirmed.");
        }
    } else {
        alert("Invalid PIN. Please try again.");
    }
} else {
    // Alert the user to choose a valid bank
    alert("Please choose a valid bank (uba, access, or wema).");
}

