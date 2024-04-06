const readline = require("readline");
const config = require("./config");
const { ethers } = require("ethers");

async function main() {
    // Connect to the ngrok URL
    const provider = new ethers.providers.JsonRpcProvider(config.providerURL);

    const wallet = new ethers.Wallet(config.privateKey, provider);
    const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);
	
	const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
	
	rl.question("Enter price: ", async function (price) {
        rl.question("Enter date (YYYY-MM-DD): ", async function (date) {
            rl.question("Enter customer ID: ", async function (customerID) {
                // Call the function and pass parameters
                await contract.addPurchase(price, date, customerID);

                console.log("Purchase added successfully!");

                // Close the readline interface
                rl.close();

                // Exit the process
                process.exit(0);
            });
        });
    });
}

main().catch(error => {
    console.error("Error:", error);
});