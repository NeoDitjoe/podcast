import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 import '../App.css';

function ShowCarousel({ preview }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 10,
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
      <div className='carousel-container'>
            <h2>Possible shows you might be interested in </h2>
            <br></br>
            <Slider {...sliderSettings}>
              {preview.length > 0
                ? preview.map((item) => (
                  <div key={item.key} className='carousel-item'>
                   <img className='carousel-img' src={item.props.images} alt={item.props.titles} />
                    {/* <p style={{ color:'black'}}>{index+1}</p> */}
                  </div>
                ))
                : null}
            </Slider>
          </div> 
  );
}

export default ShowCarousel;
