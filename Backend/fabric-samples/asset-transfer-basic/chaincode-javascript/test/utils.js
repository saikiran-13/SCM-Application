const { Context } = require("fabric-contract-api");
const { ChaincodeStub, ClientIdentity } = require("fabric-shim");
const sinon = require("sinon");

let transactionContext, chaincodeStub, clientIdentity;

const getContext = ({ mspID, attributeValue }) => {
  transactionContext = new Context();
  chaincodeStub = sinon.createStubInstance(ChaincodeStub);
  transactionContext.setChaincodeStub(chaincodeStub);

  clientIdentity = getClientIdentity(mspID, attributeValue);
  transactionContext.clientIdentity = clientIdentity;
  
  chaincodeStub.putState.callsFake((key, value) => {
    if (!chaincodeStub.states) {
      chaincodeStub.states = {};
    }
    chaincodeStub.states[key] = value;
  });
  
  chaincodeStub.getState.callsFake(async (key) => {
    let ret;
    if (chaincodeStub.states) {
      ret = chaincodeStub.states[key];
    }
    return Promise.resolve(ret);
  });
  
  chaincodeStub.getStateByRange.callsFake(async () => {
            function* internalGetStateByRange() {
                if (chaincodeStub.states) {
               
                    const copied = Object.assign({}, chaincodeStub.states);

                    for (let key in copied) {
                        yield {value: copied[key]};
                    }
                }
            }

            return Promise.resolve(internalGetStateByRange());
        });
  
  
  return { transactionContext, chaincodeStub };
};

const getClientIdentity = (mspID, attributeValue) => {
  let clientIdentity = sinon.createStubInstance(ClientIdentity);
  clientIdentity.getMSPID.returns(mspID)
  clientIdentity.getAttributeValue.returns(attributeValue);
  return clientIdentity;
};
module.exports = { getContext, getClientIdentity };
