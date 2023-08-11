import './App.css';
import { Product, Factory, Qualitycheck, Store, Supplychainmanagement, Login, RegisterUser, Warehouse } from './pages'
import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
export const Appcontext = createContext()
function App() {


  const [products, setProducts] = useState(null)
  const [loading,setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false);
  const [productDetails, setProductDetails] = useState({
    'id': '',
    'name': '',
    'image': "",
    'battery': "",
    'camera': "",
    'price': ""
  })
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div className="App flex flex-col justify-between h-screen overflow-x-hidden">
      <Appcontext.Provider value={{ productDetails,showConfetti, products, selectedProduct,loading,setLoading,setSelectedProduct,setProducts,setShowConfetti, setProductDetails}}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Supplychainmanagement />}></Route>
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/factory" element={<Factory />} />
            <Route path="/createproduct" element={<Product />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/qualitycheck" element={<Qualitycheck />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </BrowserRouter>
      </Appcontext.Provider>
    </div>
  );
}

export default App;
