import { useContext, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Data from './components/data/Data'
import ProductDataPopUp from './components/productdatapopup/ProductDataPopUp'
import { ProductContext } from './context/ProductsContext'

function App() {

  const { state } = useContext(ProductContext);
  

  return (
    <div className='app'>
      <Navbar/>
      <Data/>

      {state.isPopUpOpen === true && <ProductDataPopUp/>}
 
        

     
    </div>
  )
}

export default App
