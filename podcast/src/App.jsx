//THE REAL CODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import Supaclient from './components/SupabaseClient';
import { Supabase } from './components/SupabaseClient'
import React, { useState, useEffect } from 'react';
import Cards from './components/Pages/Cards';
import Grid from '@mui/material/Grid';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import Blog from './components/Pages/Blog'
// import Contacts from './components/Pages/Contacts';
import SortBy from './components/SortBy';
import FilterBy from './components/FilterBy';
import Audio from './components/Audio';
import SignIn from './components/SignIn';
import Seasons from './components/Seasons';
import Footer from './components/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function App() {
  const [preview, setPreview] = useState([]);
  const [sortedPreview, setSortedPreview] = useState([]);
  const [filteredPreview, setFilteredPreview] = useState([]);
  const [idStore, setIdStore] = useState(null);
  const [throwSignUp, setThrowSignUp] = useState('signUpPhase')

  function seasonIdFunction(id){
    setIdStore(id)
  }
    // NEW CODE FOR SUPABASE
    React.useEffect(() => {
      const authListener = Supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session) {
          console.log("User signed in successfully:", session.user.email);
          setThrowSignUp('PreviewPhase')
        }
      });
      return () => {
        authListener.unsubscribe;
      };
    }, []);
  

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
              click= {() => seasonIdFunction(item.id)}
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
      } else if(sortOrder === 'desc'){
        return b.props.titles.localeCompare(a.props.titles);
      }else{
        return [...preview]
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

  // const fetchShow = (id) => {
  //   fetch(`https://podcast-api.netlify.app/id/${id}episodes`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //   }

  //   useEffect(() => {
  //     fetchShow()
  //   },[])

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1, // ADD slidesToScroll:2 on smaller screen
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <>
      {throwSignUp === 'signUpPhase' && <Supaclient />}
     {throwSignUp === 'PreviewPhase' &&
<>
      <Seasons 
        id = {idStore}
      />

      <div className='App'>
        <Navbar />
        {/* {preview} */}
       <div className='filter-sort'>
        <SortBy items={preview} onSort={handleSort} />
          <FilterBy items={preview} onFilter={handleFilter} />
          <div className="Routes">
           {/* h-auto min-w-[680px] bg-primary flex justify-center items-center  */}
            <Routes>
              {/* <Route path='/' element={<Home />}></Route> */}
              <Route path='./components/Pages/AboutUs.jsx' element={<AboutUs />} />
              <Route path='./components/Cards.jsx' element={<Cards/>}/>
              <Route path='./components/Pages/Blog.jsx' element={<Blog/>} />
              {/* <Route path='./components/Pages/Contacts.jsx' element={<Contacts />} /> */}


              <Route path='./components/Audio.jsx' element={<Audio />} />
              <Route path='./components/Login.jsx' element={<SignIn />} />
            </Routes>
          </div>
          <Home />
        </div>
      </div>

           {/* Use the Slider component from react-slick 
          <Slider dots={true} infinite={true} slidesToShow={3} slidesToScroll={1}>
            {filteredPreview.length > 0
              ? filteredPreview.map((item) => <div key={item.key}>{item}</div>)
              : sortedPreview.map((item) => <div key={item.key}>{item}</div>)}
          </Slider>  */}
          
  {/* Use the Slider component from react-slick */}
  <div className='carousel-container'>
            <Slider {...sliderSettings}>
              {filteredPreview.length > 0
                ? filteredPreview.map((item) => (
                    <div key={item.key} className='carousel-item'>
                      {item}
                    </div>
                  ))
                : sortedPreview.map((item) => (
                    <div key={item.key} className='carousel-item'>
                      {item}
                    </div>
                  ))}
            </Slider>
          </div>


      <Grid container spacing={5}>
        {filteredPreview.length > 0 ? filteredPreview : sortedPreview}
      </Grid>

      <Footer />
    </>
}
    </>
  );
}


export default App;

//THE REAL CODE ENDS HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!