const { ethers } = require("ethers");
const config = require("./config");

async function main() {
    // Connect to the ngrok URL
    const provider = new ethers.providers.JsonRpcProvider(config.providerURL);

    const wallet = new ethers.Wallet(config.privateKey, provider);
    const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);

    // Interact with the contract
    await contract.addPurchase(234,"2030-30-30","Anu");
    console.log("DONE");
}

main().catch(error => {
    console.error("Error:", error);
});