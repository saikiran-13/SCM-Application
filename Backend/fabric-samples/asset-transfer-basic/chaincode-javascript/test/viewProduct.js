/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';
// const { Contract } = require('fabric-contract-api');
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


describe("View Products", async () => {

    beforeEach(async () => {
        ({ transactionContext } = getContext({
            mspID: "Org1MSP",
            attributeValue: "user",
        }));
        await supplyChainManagement.CreateProduct(
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
            "2",
            "Iphone 14 Pro",
            "https://www.image.com/product",
            "5000mAh",
            "108MP",
            "90000",
        );
    })

    it("Read the Product details by ProductId", async () => {
        let actualProduct = await supplyChainManagement.ViewProduct(transactionContext, "1")
        const expectedProduct = {
            ID: "1",
            Name: "Realme 7 Pro",
            Image: "https://www.image.com/product",
            Battery: "5500mAh",
            Camera: "64MP",
            Price: "18000",
            Location: "Factory",
            Status: "Created",
            History: []
        };
        sinon.assert.calledWith(transactionContext.stub.getState, "1")
        expect(actualProduct).to.deep.equal(JSON.stringify(expectedProduct))
    })

    it("View all the Products available till now", async () => {
        let allProducts = await supplyChainManagement.ViewAllProducts(transactionContext)

        const expectedProduct = {
            ID: "2",
            Name: "Iphone 14 Pro",
            Image:    "https://www.image.com/product",
            Battery: "5000mAh",
            Camera: "108MP",
            Price: "90000",
            Location: "Factory",
            Status: "Created",
            History: []
        }

        expect(allProducts).to.deep.include(JSON.stringify(expectedProduct))
    })


})









