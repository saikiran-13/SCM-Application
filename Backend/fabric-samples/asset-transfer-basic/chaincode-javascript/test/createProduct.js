/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const sinon = require('sinon');
const chai = require('chai');
const assert = require("assert");
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const { SupplyChainManagement } = require('../index')
const { getContext, getClientIdentity } = require('./utils')

chai.use(sinonChai);

let supplyChainManagement = new SupplyChainManagement()
let transactionContext;

describe('Create Product', () => {

    beforeEach(() => {
        ({ transactionContext } = getContext({
            mspID: "Org1MSP",
            attributeValue: "admin",
        }));
    })

    it('Only Factory Admin allowed to create the Product', async () => {

        ({ transactionContext } = getContext({
            mspID: "Org2MSP",
            attributeValue: "admin",
        }));

        try {
            await supplyChainManagement.CreateProduct(
                transactionContext,
                "1",
                "Realme 7 Pro",
                "https://www.image.com/product",
                "5500mAh",
                "64MP",
                "18000",
            );

        } catch (err) {
            assert.equal(err.message, "Error: You're not the Factory admin")
        }
    });

    it('All Attributes must have non-empty Value', async () => {

        try {
            await supplyChainManagement.CreateProduct(
                transactionContext,
                "",
                "Realme 7 Pro",
                "https://www.image.com/product",
                "5500mAh",
                "64MP",
                "18000",
            );

        } catch (err) {
            assert.equal(err.message, "Error: All product parameters must have a value.")
        }
    });

    it('Product created successfully by the factory admin', async () => {

        try {
            const res = await supplyChainManagement.CreateProduct(
                transactionContext,
                "1",
                "Realme 7 Pro",
                "https://www.image.com/product",
                "5500mAh",
                "64MP",
                "18000",
            );
            const exists = await supplyChainManagement.ProductExists(transactionContext, "1")
            expect(exists).to.be.true
            expect(res).to.be.equal("Product Created")
            sinon.assert.calledWith(
                transactionContext.stub.putState,
                "1",
                sinon.match.any
            );
        } catch (err) {
            console.log(err.message)
        }
    });


    it('Product already created by the Factory Admin', async () => {

        try {
            const res = await supplyChainManagement.CreateProduct(
                transactionContext,
                "1",
                "Realme 7 Pro",
                "https://www.image.com/product",
                "5500mAh",
                "64MP",
                "18000",
            );


            await supplyChainManagement.CreateProduct(
                transactionContext,
                "1",
                "Realme 7 Pro",
                "https://www.image.com/product",
                "5500mAh",
                "64MP",
                "18000",
            );

        } catch (err) {
            assert.equal(err.message, "Error: The Product With Id:1 already created")
        }
    });
});

