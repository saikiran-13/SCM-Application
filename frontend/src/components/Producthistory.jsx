import React from 'react';
import { Tooltip, useTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    fontSize: '16px',
    maxWidth: '300px',
  },
}));

const Producthistory = ({ handleClick, history }) => {
  const theme = useTheme();
  const classes = useStyles();

  const customStyles = {
    fontSize: '16px !important',
    maxWidth: '300px !important',
  };

  async function handleHistory() {
    handleClick();
  }

  return (
    <div className="mx-auto max-w-md ">
      <div className="flex flex-col rounded-xl justify-around items-center rotate-y-180 transition-transform duration-300 ease-in-out">
        <div className="text-black w-fit mb-5 px-5 py-1 rounded-xl font-main font-bold">
          Product History
        </div>
        {/* Generate tooltips dynamically based on history */}
        {history?.map((item, index) => (
          <div key={index} className="flex flex-col justify-center">
            {index != 0 && (
              <div className="h-5 w-0.5 m-auto bg-lightgreen"></div>
            )}
            <Tooltip
              placement="top"
              classes={{ tooltip: customStyles }}
              describeChild
              title={`Time:${item.element?.time} Location:${
                item.element?.location
              } Status:${item.element?.status}\n 
              ${
                item.nextElement
                  ? `Time:${item.nextElement?.time} From:${item.nextElement?.from} To:${item.nextElement?.to} Status:${item.nextElement?.status}`
                  : ''
              }`}
            >
              <div
                className={`text-white m-auto bg-creamblue hover:bg-darkcreamblue w-36 px-5 py-1 rounded-full`}
              >
                {item.element?.status === 'Updated'
                  ? 'Refurbished'
                  : item.element?.status}
              </div>
            </Tooltip>
          </div>
        ))}
        <button
          className="bg-black text-white px-10 py-2 mt-10 rounded-xl text-md font-bold"
          onClick={handleHistory}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default Producthistory;
