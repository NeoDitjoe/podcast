import { useState, useEffect } from 'react';
import Cards from './components/Pages/Cards';
import Grid from '@mui/material/Grid';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import Contacts from './components/Pages/Contacts';
import SortBy from './components/SortBy';
import FilterBy from './components/FilterBy';
import './App.css';

function App() {
  const [preview, setPreview] = useState([]);
  const [sortedPreview, setSortedPreview] = useState([]);
  const [filteredPreview, setFilteredPreview] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then( data => {
        const items = data.map((item) => {
          return(
            <Cards
              key={item.id}
              titles={item.title}
              images={item.image}
              genres={item.genres}
              seasons={item.seasons}
              updated={item.updated}
              descriptions={item.description}
        />
          )
        })
        setPreview(items)
      })
   
  }, []);

  const handleSort = (sortOrder) => {
    const sorted = [...preview].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.props.titles.localeCompare(b.props.titles);
      } else {
        return b.props.titles.localeCompare(a.props.titles);
      }
    });
    setSortedPreview(sorted);
  };

  const handleFilter = (filterValue) => {
    const filtered = preview.filter((item) =>
      item.props.titles.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredPreview(filtered);
  };

  return (
    <>
      <div className='App'>
        <Navbar />
        {/* {preview} */}
       <div className=''>
        <SortBy items={preview} onSort={handleSort} />
          <FilterBy items={preview} onFilter={handleFilter} />
          <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
            <Routes>
              <Route path='./components/AboutUs.jsx' element={<AboutUs />} />
              <Route path='./components/Cards.jsx' element={<Cards/>}/>
              <Route path='./components/Contacts.jsx' element={<Contacts />} />
            </Routes>
          </div>
          <Home />
        </div>
      </div>

      <Grid container spacing={5}>
        {filteredPreview.length > 0 ? filteredPreview : sortedPreview}
      </Grid>
    </>
  );
}


export default App;

