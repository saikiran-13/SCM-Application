import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Producthistory = () => {
  return (
    <div className="mx-auto max-w-md bg-lightblue">
      <Accordion className="shadow-lg rounded-lg bg-lightblue">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-black  text-b" />}
          className=" bg-lightblue border-b"
        >
          <Typography className="text-black b font-semibold">
            Product History
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-white border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography className="text-gray-600 font-medium">Id:</Typography>
              <Typography>1</Typography>
            </div>
            <div>
              <Typography className="text-gray-600 font-medium">
                Battery:
              </Typography>
              <Typography>5000mAh</Typography>
            </div>
            <div>
              <Typography className="text-gray-600 font-medium">
                Camera:
              </Typography>
              <Typography>64MP</Typography>
            </div>
            <div>
              <Typography className="text-gray-600 font-medium">
                Price:
              </Typography>
              <Typography>12000</Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Producthistory;
