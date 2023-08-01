
import { useState, useEffect } from 'react';
import Cards from './components/Cards';
import Grid from '@mui/material/Grid';
import { Navbar } from './components/Navbar';
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import "./components/"


function App() {
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then(Response => Response.json())
      .then(data => {
        console.log(data)
        const items = data.map((item) => (
          <Cards
            key={item.id}
            titles={item.title}
            images={item.image}
            genres={item.genres}
            seasons={item.seasons}
            updated={item.updated}
            descriptions={item.description}
          />
        ));
        setPreview(items);
      });
  }, []);

  return (
    <>
      <div className='App'>
        <Navbar />
        <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
       <Routes>
             <Route path='./components/Home.jsx' element={<Home />} />
             <Route path='./components/Cards.jsx' element={<Cards />} />
             
             
             <Route path='./components/Contacts.jsx' element={<Contacts />} />

         </Routes>

     </div>
        <Home />
      </div>
      
      <Grid container spacing={5}>{preview}</Grid>
    </>
  );
}

export default App;
