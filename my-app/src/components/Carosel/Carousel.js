import './Carousel.css'
import { useState, useEffect } from 'react';

function Carousel() {
    const slides = [
        {
            url: './image/banner/banner_1.png'
        },
        {
            url: './image/banner/banner_99.png'
        },
        {
            url: './image/banner/banner_1.png'
        },
    ]

    const [currentIndex, setcurrentIndex] = useState(0);

    const prev = () => {
        setcurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    };
    const next = () => {
        setcurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    };
    const gotoSlide = (slideIndex) => {
        setcurrentIndex(slideIndex);
    }
    
    useEffect(() => {
        const timer = setTimeout(()=>{
            if(currentIndex===slides.length-1){
                setcurrentIndex(0);
            }else{
                setcurrentIndex(currentIndex+1);
            }
        },5000);
        return ()=>clearTimeout(timer);
    }, [currentIndex]);

  return (
    <>
        <div className='carousel'>
            <div style={{backgroundImage:`url(${slides[currentIndex].url})`}} className='image'></div>

            <div className='next-prev'>
                <div onClick={next} className='nextSlide'>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
                <div onClick={prev} className='prevSlide'>
                    <i class="fa-solid fa-chevron-left"></i>
                </div>
            </div>
            
            <div className='dots'>
                {
                    slides.map((slide, slideIndex)=>(
                        <div key={slideIndex} onClick={()=>gotoSlide(slideIndex)} className='dot'></div>
                    ))
                }
            </div>
        </div>
    </>
  );
}

export default Carousel;
