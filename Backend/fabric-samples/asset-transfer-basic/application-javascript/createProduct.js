const { connectToFabric } = require('./utils/connectFabric');

async function createProduct(contract, pid, name,image, battery, camera, price) {
  console.log('\n--> Submit Transaction: CreateProduct, creates new Product with ID, name, Battery, Camera, and Price arguments');
  const result = await contract.submitTransaction('CreateProduct', pid, name,image, battery, camera, price);
  return result.toString();
}

async function transferProduct(contract, pid) {
  console.log('\n--> Submit Transaction: TransferProduct, Transfer Product from factory to the warehouse');
  const result = await contract.submitTransaction('TransferProduct', pid, 'WareHouse', "Created");
  return result.toString();
}

async function createAndTransferProduct(pid, name,image, battery, camera, price, operation, username, password, organization) {
  const { contract, gateway } = await connectToFabric(username, password, organization);

  try {
    if (operation === 'create') {
      return await createProduct(contract, pid, name,image, battery, camera, price);
    }

    if (operation === 'transfer') {
      return await transferProduct(contract, pid);
    }

    return "Invalid Operation";

  } catch (error) {
    console.error(error.message);
    throw error;
  } finally {
    gateway.disconnect();
  }
}

module.exports = { createAndTransferProduct };
