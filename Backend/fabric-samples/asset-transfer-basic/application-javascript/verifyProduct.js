const { connectToFabric } = require('./utils/connectFabric');

async function verifyProduct(pid, status, contract) {
  console.log('\n--> Submit Transaction: VerifyProduct, Verifies the product and set the status');
  const result = await contract.submitTransaction('VerifyProduct', pid, status);
  console.log('*** Result: committed', result);
  return result.toString();
}

async function transferProduct(pid, status, contract) {
  const location = (status === "Defective") ? "Factory" : "Store";
  console.log('\n--> Submit Transaction: TransferProduct, Transfer Product from warehouse to the factory');
  const result = await contract.submitTransaction('TransferProduct', pid, location, status);
  console.log('*** Result: committed', result);
  return result.toString();
}

async function verifyAndTransferProduct(pid, operation, status, username, password, organization) {
  const { contract, gateway } = await connectToFabric(username, password, organization);

  try {
      if (operation === "verify") {
        console.log(status)
        return await verifyProduct(pid, status, contract);
      } else if (operation === "transfer") {
        return await transferProduct(pid, status, contract);
      } else {
        return "Invalid Operation";
      }
    } 
  catch (error) {
    console.error(error.message);
    throw error;
  } 
  finally {
    gateway.disconnect();
  }
}

module.exports = { verifyAndTransferProduct };
