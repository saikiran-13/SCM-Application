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

describe("Transfer, Verify, and Update Product", () => {
    let factoryAdminContext;
    let warehouseAdminContext;
    let storeAdminContext;

    before(async () => {
        factoryAdminContext = getContext({
            mspID: "Org1MSP",
            attributeValue: "admin",
          }).transactionContext;
      
        warehouseAdminContext = getContext({
            mspID: "Org2MSP",
            attributeValue: "admin",
          }).transactionContext;

        storeAdminContext = getContext({
            mspID: "Org3MSP",
            attributeValue: "admin",
        }).transactionContext;
      
        
        await supplyChainManagement.CreateProduct(
            factoryAdminContext,
            "10",
            "Samsung Galaxy s22 Pro",
            "https://www.image.com/product",
            "6000mAh",
            "108MP",
            "84000",
        );
    });

    it("Transfer the Product from Factory to WareHouse", async () => {
        const response = await supplyChainManagement.TransferProduct(
            factoryAdminContext,
            "10",
            "WareHouse",
            "Created"
        );
        expect(response).to.be.equal("Product transferred by Org1MSP");
    });


    it("Only WareHouse Admin verify the Product", async () => {
        try {
            await supplyChainManagement.VerifyProduct(factoryAdminContext, "10", "Defective");
        } catch (err) {
            expect(err.message).to.be.equal("Error: You're not the Warehouse admin");
        }
    });

    it("Cannot Verify Product with invalid ID", async () => {

        try {
            await supplyChainManagement.VerifyProduct(warehouseAdminContext, "5", "Defective");
        } catch (error) {
            expect(error.message).to.be.equal("Error: Product doesn't exist");
        }
    });

    it("Invalid status of the product by warehouse admin", async () => {
        try {
           await supplyChainManagement.VerifyProduct(warehouseAdminContext, "10", "Expired");
        } catch (error) {
            expect(error.message).to.be.equal("Error: invalid Status!!!")
        }
       
       

    });

    it("Product set to Defective by warehouse admin", async () => {

        const response = await supplyChainManagement.VerifyProduct(warehouseAdminContext, "10", "Defective");
        expect(response).to.be.equal("Product quality check done successfully")

    });

    it("Transfer the Defective Product from WareHouse to Factory", async () => {

        const response = await supplyChainManagement.TransferProduct(
            warehouseAdminContext,
             "10",
            "Factory",
            "Defective"
        );
        expect(response).to.be.equal("Product transferred by Org2MSP");
    });

    it("Only Factory Admin can Update the Product",async ()=>{
        try{
            const response = await supplyChainManagement.UpdateProduct(
                warehouseAdminContext,
                "10",
            );
        }
        catch(error){
            expect(error.message).to.be.equal("Error: You're not the Factory admin")
        }
   
       
    })

    it("Product updated successfully by the factory admin",async ()=>{
            const response = await supplyChainManagement.UpdateProduct(
                factoryAdminContext,
                "10",
            );
          expect(response).to.be.equal("Product Updated")
    })

    it("Transfer the Updated Product from Factory to Warehouse", async () => {

        const response = await supplyChainManagement.TransferProduct(
            factoryAdminContext,
            "10",
            "WareHouse",
            "Updated"
        );
        expect(response).to.be.equal("Product transferred by Org1MSP");
    });


    it("Product set to Verified by warehouse admin", async () => {
        const response = await supplyChainManagement.VerifyProduct(
            warehouseAdminContext,
            "10",
            "Verified"
        );
        expect(response).to.be.equal("Product quality check done successfully")
    });

    it("Transfer the Verified Product from Warehouse to Store", async () => {

        const response = await supplyChainManagement.TransferProduct(
            warehouseAdminContext,
            "10",
            "Store",
            "Verified"
        );
        expect(response).to.be.equal("Product transferred by Org2MSP");
    });

    it("Transfer Ownership of the Product to the User",async ()=>{
        const response = await supplyChainManagement.TransferOwnership(
            storeAdminContext,
            "10",
            "Saikiran"
        );
        expect(response).to.be.equal("Product sold to Saikiran");
    
    })

});








