#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

for ((i=0; i<9; i++)); do
  peer channel fetch $i -c channel1 | jq
done

cat all_blocks_info.txt




