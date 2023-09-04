/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');



  class SupplyChainManagement extends Contract {
    
    async CreateProduct(ctx, id, name,image, battery, camera, price) {
      const mspId = ctx.clientIdentity.getMSPID();
      if (mspId !== 'Org1MSP') {
        throw new Error("Error: You're not the Factory admin");
      }
  
      if (!id || !name || !battery || !camera || !price) {
        throw new Error("Error: All product parameters must have a value.");
      }
  
      const exists = await this.ProductExists(ctx, id);
      if (exists) {
        throw new Error(`Error: The Product With Id:${id} already created`);
      }
  
      const product = {
        ID: id,
        Name: name,
        Image:image,
        Battery: battery,
        Camera: camera,
        Price: price,
        Location: "Factory",
        Status: "Created",
        History: []
      };
      await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
      return "Product Created"
    }
  
    async ViewProduct(ctx, id) {
      const productJSON = await ctx.stub.getState(id);
      if (!productJSON || productJSON.length === 0) {
        throw new Error(`Error: The product with ID:${id} does not exist`);
      }
      return productJSON.toString();
    }
  
    async ViewAllProducts(ctx) {
      const allProducts = [];
      const iterator = await ctx.stub.getStateByRange("", "");
      let result = await iterator.next();
      while (!result.done) {
        const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
        let record;
        try {
          record = JSON.parse(strValue);
        } catch (err) {
          console.log(err);
          record = strValue;
        }
        allProducts.push(record);
        result = await iterator.next();
      }
      return JSON.stringify(allProducts);
    }
  
    async ProductExists(ctx, id) {
      const productJSON = await ctx.stub.getState(id);
      return productJSON && productJSON.length > 0;
    }
  
    async UpdateProduct(ctx, id) {
      const mspId = ctx.clientIdentity.getMSPID();
      if (mspId !== 'Org1MSP') {
        throw new Error("Error: You're not the Factory admin");
      }
  
      const productJSON = await ctx.stub.getState(id);
      if (!productJSON || productJSON.length === 0) {
        throw new Error(`Product with ID:${id} not found`);
      }
  
      const product = JSON.parse(productJSON.toString());
      if (product.Status === "Defective" && product.Location === "Factory") {
        product.Status = "Updated";
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
      }
      return "Product Updated"
    }
  
    async VerifyProduct(ctx, id, status) {
      const exists = await this.ProductExists(ctx, id);
      const mspId = ctx.clientIdentity.getMSPID();
  
      if (exists && mspId === 'Org2MSP') {
        const productJSON = await ctx.stub.getState(id);
        const product = JSON.parse(productJSON.toString());
  
      if (product.Location == 'WareHouse' && (status === "Defective" || status === 'Verified')) {
          product.Status = status;
          await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
          return "Product quality check done successfully"

        } else {
          throw new Error("Error: invalid Status!!!");
        }

      } 
      else {
        if (!exists) {
          throw new Error("Error: Product doesn't exist");
        } else {
          throw new Error("Error: You're not the Warehouse admin");
        }
      }
    }
  
    async TransferProduct(ctx, id, location, status) {
      const mspId = ctx.clientIdentity.getMSPID();
      if (mspId === 'Org1MSP' || mspId === 'Org2MSP') {
        try {
          const productJSON = await ctx.stub.getState(id);
          const product = JSON.parse(productJSON.toString());
          console.log(product.Location,location)
            if(product.Location!=location){
              await product.History.push({
                timestamp: Date.now(),
                From: product.Location,
                To: location,
                Status: status
              });
            } 
            else{
              return `Product already transferred by ${mspId}`;
            }
  
          product.Location = location;
          await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
          return `Product transferred by ${mspId}`;
        } 
      catch (err) {
          console.error(err);
          throw err;
        }
      } 
      else {
        throw new Error("Error: Only Factory Admin and Warehouse Admin allowed");
      }
    }
  
    async TransferOwnership(ctx, id, owner) {

      const mspId = ctx.clientIdentity.getMSPID();
      const userType = ctx.clientIdentity.getAttributeValue('userType');
      const productJSON = await ctx.stub.getState(id);
      const product = JSON.parse(productJSON.toString());
      if (product.Location == 'Store' && product.Status!="Sold" && (mspId === 'Org3MSP' && userType !== 'user')) {
        product.History.push({
          timestamp: Date.now(),
          From: product.Location,
          To: owner,
          Status: "Sold"
        });
        product.Status = "Sold"
        product.Owner = owner;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
        return `Product sold to ${owner}`
      } 
      else {
        throw new Error("Error: You're not the Store admin");
      }
    }

   
  }
  
module.exports = SupplyChainManagement;
