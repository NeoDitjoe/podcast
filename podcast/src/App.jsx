import { useState, useEffect } from 'react';
import Cards from './components/Pages/Cards';
import Grid from '@mui/material/Grid';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import Blog from './components/Pages/Blog'
import Contacts from './components/Pages/Contacts';
import SortBy from './components/SortBy';
import FilterBy from './components/FilterBy';
import Audio from './components/Audio';
import Login from './components/Login';
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

  const fetchShow = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}episodes`)
      .then((response) => response.json())
      .then((data) => console.log(data))
    }

    useEffect(() => {
      fetchShow()
    },[])

  return (
    <>
      <div className='App'>
        <Navbar />
        {/* {preview} */}
       <div className='filter-sort'>
        <SortBy items={preview} onSort={handleSort} />
          <FilterBy items={preview} onFilter={handleFilter} />
          <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
            <Routes>
              <Route path='./components/Pages/AboutUs.jsx' element={<AboutUs />} />
              <Route path='./components/Cards.jsx' element={<items/>}/>
              <Route path='./components/Pages/Blog.jsx' element={<Blog/>} />
              <Route path='./components/Pages/Contacts.jsx' element={<Contacts />} />
              <Route path='./components/Audio.jsx' element={<Audio />} />
              <Route path='./components/Login.jsx' element={<Login />} />
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

