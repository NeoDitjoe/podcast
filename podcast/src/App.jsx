//Imports for components used for the app.
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
import SortBy from './components/SortBy';
import FilterBy from './components/FilterBy';
import Seasons from './components/Seasons';
import Footer from './components/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../src/App.css';

function App() {
  const [preview, setPreview] = useState([]); //Used the useState to control the app's behavior
  const [sortedPreview, setSortedPreview] = useState([...preview]);
  const [filteredPreview, setFilteredPreview] = useState([...preview]);
  const [loading, setLoading] = useState(true)
  const [idStore, setIdStore] = useState(null);
  const [throwSignUp, setThrowSignUp] = useState('signUpPhase')
  const [playableAudio, setPlayableAudio] = useState({
   AudioTitle: null,
   AudioFile: null
  })

  function seasonIdFunction(id) {
    setIdStore(id)
    setThrowSignUp(`seasonPhase`)
  }
  // SUPABASE 
  //Sets up event listeners using the Supabase client's onAuthStateChange to track user authentication status.
  //When a user successfully signs in, the code logs their email to the console, updates the app's phase, and 
  //sets up a cleanup function to unsubscribe from the event when the component is unmounted.
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

//Fetches podcast data from the provided URL using the fetch API within the useEffect hook.
  useEffect(() => {
    setLoading(true); //It starts by setting the loading state to true to indicate that data is being fetched
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then(data => {
        const items = data.map((item) => { //the code within the map function creates a JSX component and passses in various props
          return (
            <Cards
              key={item.id}
              titles={item.title}
              images={item.image}
              genres={item.genres}
              seasons={item.seasons}
              updated={item.updated}
              descriptions={item.description}
              click={() => seasonIdFunction(item.id)}
            />
          )
        })
        setPreview(items); // After the mapping is done, the array of JSX components (items) is set as the state for the preview using the setPreview function.
        console.log('preview data:', items);
        setLoading(false); //The loading state is then set to false to indicate that data fetching is completed.
      })

  }, []);
/*This code defines the SortBy component, which provides a dropdown for sorting the show previews based on different criteria (title, date).
Used the useState hook to manage the sorting order state and Calls the provided onSort function when the user selects a sorting option. */
  const handleSort = (sortOrder) => {
    const sorted = [...preview].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.props.titles.localeCompare(b.props.titles);
      } else if (sortOrder === 'desc') {
        return b.props.titles.localeCompare(a.props.titles);
      } else if (sortOrder === 'date-asc') {
        const dateA = new Date(a.props.updated);
        const dateB = new Date(b.props.updated);
        return dateA - dateB;
      } else if (sortOrder === 'date-desc') {
        const dateA = new Date(a.props.updated);
        const dateB = new Date(b.props.updated);
        return dateB - dateA;
      } else {
        return [...preview];
      }
    });
    setSortedPreview(sorted);
    setFilteredPreview(sorted);
  };
  
/* this code represents a React app for browsing podcast shows. It fetches show data, allows sorting and filtering of shows, 
and provides a user interface with various components to interact with the data and navigate through the app's pages. */
  const handleFilter = (filterValue) => {
    const filtered = preview.filter((item) =>
      item.props.titles.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredPreview(filtered);
    setSortedPreview(filtered);
  };


//This object sliderSettings holds configuration options for the carousel slider component.
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 10, // ADD slidesToScroll:2 on smaller screen
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


  function HandleBackButton () {
  if(throwSignUp === 'seasonPhase'){
    setThrowSignUp('PreviewPhase')
  }
  }

  const [historyStore, setHistoryStore] = useState(null)
  useEffect(() => {
    const fetchHistoty = async () => {
      const { data, error } = await Supabase
      .from('history')
      .select()
        if (error) {
          setHistoryStore(null)
          console.log(error)
        }
    if (data) {
      setHistoryStore(data)
    }
    }
    fetchHistoty()
    }, [])

  const [favs, setfavs] = useState(null)
  useEffect(() => {
    const fetchFavs = async () => {
      const { data, error } = await Supabase
      .from('favourites')
      .select()
        if (error) {
          setfavs(null)
          console.log(error)
        }
    if (data) {
      setfavs(data)
    }
    }
    fetchFavs()
    }, [])

    async function history(event) {
      const title = event.target.id
      const audio = event.target.value
    
      const { data, error } = await Supabase
          .from('history')
          .insert({title, audio});
      
      if (error) {
          console.error('Error adding shows', error);
          return null;
      }
      if (data) {
      console.log(data)
      }

      setPlayableAudio(prev => ({
        ...prev,
        AudioTitle: title
      }))
      setPlayableAudio(prev => ({
        ...prev,
        AudioFile: audio
      }))
      console.log("playinng")
  }

 console.log(playableAudio.AudioTitle)


  return ( /*If throwSignUp is 'signUpPhase', the Supaclient component is rendered.
  If throwSignUp is 'PreviewPhase', the main app content is rendered */
    <> 

      {throwSignUp === 'signUpPhase' && <Supaclient />} 
      {throwSignUp !== 'signUpPhase' &&  <Navbar /> }
      {throwSignUp === 'seasonPhase' &&   <>
      <button onClick={HandleBackButton}>BackToPreview</button>
        <Seasons 
            id={idStore}
            history={history}
          />
          </>
          }
      {throwSignUp === 'PreviewPhase' &&
        <>
          <div className='App'> 
            <div className='filter-sort'>
              <SortBy items={preview} onSort={handleSort} />
              <FilterBy items={preview} onFilter={handleFilter} />
              <button onClick={()=> setThrowSignUp('HistoryPhase')}>History</button>
              <button onClick={()=> setThrowSignUp('FavouritesPahse')}>Favourites</button>
               {/* Display loading state */}
  {loading ? (
            <h1 className="loading">Loading...</h1> // This code uses a conditional rendering approach to display a loading message
          ) : (
          
              <div className="Routes">
                <Routes>
                  {/* <Route path='/' element={<Home />}></Route> */}
                  <Route path='./components/Pages/AboutUs.jsx' element={<AboutUs />} />
                  <Route path='./components/Cards.jsx' element={<Cards />} />
                  <Route path='./components/Pages/Blog.jsx' element={<Blog />} />
                  {/* <Route path='./components/Pages/Contacts.jsx' element={<Contacts />} /> 
              <Route path='./components/Audio.jsx' element={<Audio />} />
              {/* <Route path='./components/Login.jsx' element={<SignIn />} /> */}
                </Routes>
              </div>
              )} 
              <Home />  {/*This part of the code closes the conditional rendering block started earlier.*/ }
        
            </div>
          
          </div>
          
          
          {/* this code segment sets up a carousel of podcast show previews using the Slider component. 
          The content of the carousel is determined based on whether there are filtered previews or not.
          If filtered previews exist, they are shown; otherwise, sorted previews are displayed in the carousel.
            Each preview item is wrapped in a div with appropriate styling for the carousel effect.*/ }
            <div className='carousel-container'>
            <h2>Possible shows you might be interested in </h2>
            <br></br>
            <Slider {...sliderSettings}>
              {preview.length > 0
                ? preview.map((item) => (
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
          
          {/*This code renders a Grid component with the specified spacing of 5 units.
          Inside the Grid, {preview} is rendered, which implies rendering all JSX components stored in the preview state array. */}
          <Grid container spacing={5}>
          {/* {preview} */}

            {filteredPreview.length > 0 ? sortedPreview : preview}
           
          </Grid>
          <Footer /> 
        </>
        //The footer component is then rendered
      }
       {(historyStore && throwSignUp === 'HistoryPhase') && (
     
     <div className="history">
        <button onClick={()=> setThrowSignUp('PreviewPhase')}>BackToPreview</button>
        <h3>History</h3>
       {historyStore.map(history => (
       <>
         <p>{history.title}</p>

         <audio controls>
           <source src={history.audio}/>
         </audio>
         </>
       ))}
       </div>
   )}
     {(favs && throwSignUp === 'FavouritesPahse') && (
     <div className="favs">
       <button onClick={()=> setThrowSignUp('PreviewPhase')}>BackToPreview</button>
        <h3>favourites</h3>
       {favs.map(favs => (
       <>
         <p>{favs.EpiTitle}</p>

         <audio controls>
           <source src={favs.EpiFile}/>
         </audio>
         </>
       ))}
       </div>
   )}

    { (playableAudio.AudioTitle && throwSignUp !== 'signUpPhase') &&
         <div className='audioControl'>
        <p>{playableAudio.AudioTitle}</p>
        <audio src={playableAudio.AudioFile} controls autoPlay />
        <button onClick={()=> setPlayableAudio(prev => ({ ...prev, AudioTitle: null,AudioFile:null}))} >Close</button>
        </div>
        }
    </>
  );
}


export default App; //This is where i exported my App

