import React, { useEffect } from 'react';
import Dropdown from './Dropdown';
import Details from './Accordion';
import Qualitycheck from '../assets/Images/Qualitycheck.png';
import { QualityControlProducts } from '../utils/constants/product';
import { useContext } from 'react';
import { Appcontext } from '../App';
import phone from '../assets/Images/phone.webp';
import Noproducts from './Noproducts';

const QualityControl = () => {
  const { products, setProducts } = useContext(Appcontext);

  useEffect(() => {
    async function checkProducts() {
      const token = localStorage.getItem('WareHousetoken');
      const response = await fetch('http://localhost:5000/qualityCheck', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${token}`,
        },
      });

      const qualityCheckProducts = await response.json();
      console.log(qualityCheckProducts);
      setProducts(qualityCheckProducts);
    }

    checkProducts();
  }, []);

  return (
    <div>
      <h3 className="bg-lightnavyblue flex items-center gap-2 text-xl tracking-wider w-fit m-auto text-white font-bold px-10 py-1 rounded-full font-main">
        Quality Check Inventory
        <img src={Qualitycheck} className="h-6 w-6" alt="Img not found"></img>
      </h3>
      {/* <h1>{products[0]?.name}</h1> */}
      {products?.length ? (
        <div className=" relative h-auto w-auto grid grid-cols-1 place-items-center phone:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3  grid-gap-5 font-main font-medium rounded-3xl p-10 mb-20 mx-14 ">
          {products?.map((product, key) => {
            return (
              <div
                key={key}
                className="glassmorphism-form  h-auto flex flex-col items-center gap-2 bg-lightblue border-2 border-black font-main  w-80 rounded-3xl text-xl mx-auto py-5 my-10"
              >
                <span className="text-creamblue font-bold ">
                  {product.name}
                </span>
                <img
                  className="h-60 w-45"
                  src={product?.image}
                  alt={product.name}
                />

                <div className="bg-lightblue">
                  <Details Product={product} />
                </div>
                <Dropdown product={product} />
              </div>
            );
          })}
        </div>
      ) : (
        <Noproducts />
      )}
    </div>
  );
};

export default QualityControl;
