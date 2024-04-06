const { ethers } = require("ethers");
const config = require("./config");

async function main() {
    // Connect to the ngrok URL
    const provider = new ethers.providers.JsonRpcProvider(config.providerURL);

    const wallet = new ethers.Wallet(config.privateKey, provider);
    const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);

	const purchaseCount = await contract.getPurchaseCount();
    
    for (let i = 0; i < purchaseCount; i++) {
        const [price, date, customerID] = await contract.getPurchase(i);
        console.log("Purchase-", i, ": ", "Price:", price.toString(), "Date:", date, "CustomerID:", customerID);
    }
}

main().catch(error => {
    console.error("Error:", error);
});