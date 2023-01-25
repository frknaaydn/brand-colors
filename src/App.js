import './App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import MainContext from './MainContext';
import BrandsData from "./brands.json"
import Copied from './components/Copied';
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Collection from './components/Collection';
import {forceCheck} from "react-lazyload"
 

function App() {

  const brandsArray =[]

  Object.keys(BrandsData).map(key => {
      brandsArray.push(BrandsData[key])
  })
  
  
  const [brands, setBrands] = useState(brandsArray)
  
  const [selectedBrands, setSelectedBrands] = useState([])
  
  const [copied, setCopied] = useState(false)

  const [search, setSearch] = useState('')

  
 useEffect(() => {
   if(copied){
     setTimeout(() => {
      setCopied(false)
     },500)
   }
 }, [copied])

 useEffect(() => {
   setBrands(brandsArray.filter(brand => brand.title.toLowerCase().includes(search)))
 }, [search])

 useEffect(() => {
  forceCheck();
 }, [brands])


const data ={
  brands,
  selectedBrands,
  setSelectedBrands,
  setCopied,
  search,
  setSearch
}


  return (


    <>
      <MainContext.Provider value={data}>
      {copied && <Copied color={copied} /> }
          <Sidebar/>

      

          <Router>
            <Switch>
                <Route path="/" exact>
                  <Content/>
                </Route>

                <Route path="/collection/:slugs">
                  <Collection/>
                </Route>

            </Switch>
          </Router>

     </MainContext.Provider>
   </>
    );
}

export default App;
