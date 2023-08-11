import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Details = ({ Product }) => {
  return (
    <div className="mx-auto max-w-md bg-lightblue">
      <Accordion className="shadow-lg rounded-lg bg-lightblue">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-black  text-b" />}
          className=" bg-lightblue border-b"
        >
          <Typography className="text-black b font-semibold">
            Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-white border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography className="text-gray-600 font-medium">Id:</Typography>
              <Typography>{Product.id}</Typography>
            </div>
            <div>
              <Typography className="text-gray-600 font-medium">
                Battery:
              </Typography>
              <Typography>{Product.battery}</Typography>
            </div>
            <div>
              <Typography className="text-gray-600 font-medium">
                Camera:
              </Typography>
              <Typography>{Product.camera}</Typography>
            </div>
            <div>
              <Typography className="text-gray-600 font-medium">
                Price:
              </Typography>
              <Typography>{Product.price}</Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Details;
