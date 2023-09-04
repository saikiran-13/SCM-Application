#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

#create a channel with two Organizations with two certificate authorities
cd ..
./network.sh down
./network.sh up createChannel -c channel1 -ca
sleep 5
#Adding Org3 to the existing network
cd addOrg3
./addOrg3.sh up -c channel1 -ca

sleep 3

cd ..
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript -c channel1
echo "Deployed..............................................."
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org3MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051

peer lifecycle chaincode package basic.tar.gz --path ../asset-transfer-basic/chaincode-javascript/ --lang node --label basic_1

# Install the chaincode
peer lifecycle chaincode install basic.tar.gz
sleep 5 
# Query the installed chaincodes and store the output in a variable
peer lifecycle chaincode queryinstalled
query_installed_output=$(peer lifecycle chaincode queryinstalled | awk 'NR==2{print $3}')

# Remove the comma from the package ID
package_id=$(echo "$query_installed_output" | tr -d ',')

echo "Package ID: $package_id"
export CC_PACKAGE_ID=$package_id
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --channelID channel1 --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1

peer lifecycle chaincode querycommitted --channelID channel1 --name basic --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

peer chaincode query -C channel1 -n basic -c '{"Args":["ViewAllProducts"]}'

[{"time":"2023-8-9 14:56:26","from":"Factory","to":"WareHouse","status":"Transited"}]

