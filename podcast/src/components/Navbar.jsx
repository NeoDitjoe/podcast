
import { Link, NavLink } from 'react-router-dom';
import logo from './images/logo-no-background.png';
import SearchButton from './SearchButton';


export const Navbar = () => {
  return (
    <nav>
       <img src= {logo} alt="logo-no-background" className='nav-logo'/> 
      <Link to="/" className='title'></Link> 
      <div className='Menu'>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <SearchButton />
      <ul>
        <li><NavLink to="./AboutUs.jsx">About Us</NavLink></li>
        <li><NavLink to="./Cards.jsx">Podcasts</NavLink></li>
        <li><NavLink to="/host">Blog</NavLink></li>
        <li><NavLink to="/contacts">Contacts</NavLink></li>
      </ul>
    
    </nav>
  );
};

