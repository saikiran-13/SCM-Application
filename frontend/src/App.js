import './App.css';
import { Product, Factory,  Qualitycheck, Store, Supplychainmanagement,Login,RegisterUser, Warehouse } from './pages'
import { useState,createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
export const Appcontext = createContext()
function App() {

  const [btnText,setBtnText] = useState('')
  const [path,setPath] = useState('')
  const [admin,isAdmin] = useState(false)
  const [productDetails,setProductDetails] = useState({
  'id':'',
  'name':'',
  'image':"",
  'battery':"",
  'camera':"",
   'price':""
  })
  return (
    <div className="App flex flex-col justify-between">
      <Appcontext.Provider value={{btnText,path,admin,productDetails,setProductDetails,setBtnText,setPath,isAdmin}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Supplychainmanagement />}></Route>
          <Route path="/register" element={<RegisterUser/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/factory" element={<Factory />} />
          <Route path="/createproduct" element={<Product/>} />
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
