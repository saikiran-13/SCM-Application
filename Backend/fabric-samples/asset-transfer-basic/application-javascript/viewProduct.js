/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { connectToFabric } = require('./utils/connectFabric');


function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}


async function viewProducts(username, password, organization) {

	const { contract, gateway } = await connectToFabric(username, password, organization)

	try {

		console.log('\n--> Evaluate Transaction: ViewAllProducts, function returns all the current products on the ledger');
		let result = await contract.evaluateTransaction('ViewAllProducts');
		console.log(`*** Result: ${prettyJSONString(result.toString())}`);
		return prettyJSONString(result.toString())

	} finally {
		gateway.disconnect();
	}
}


module.exports = { viewProducts }
