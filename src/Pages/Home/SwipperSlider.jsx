// import React, { useRef, useState } from 'react';
// import {Swiper} from React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/bundle'
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import SliderContent from './SliderContent';

const SwipperSlider = () => {
    return (
        <div className='container mx-auto'>
            <Swiper spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper">
                <SwiperSlide className=''>
                    <div className=''>
                        <img className='h-[380px] lg:h-[600px] object-cover relative rounded-2xl w-full' src="https://i.ibb.co/5M2w7Hk/pexels-fauxels-3184360.jpg" alt="property-image" />
                        <div className='absolute flex items-center space-y-7 h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)] w-full rounded-xl'>
                            <SliderContent></SliderContent>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[380px] lg:h-[600px] object-cover rounded-2xl w-full' src="https://i.ibb.co/V22XMRh/pexels-janetrangdoan-1024248.jpg" />
                        <div className='absolute flex items-center space-y-7 h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)] w-full rounded-xl'>
                            <SliderContent></SliderContent>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[380px] lg:h-[600px] object-cover rounded-2xl w-full ' src="https://i.ibb.co/5M2w7Hk/pexels-fauxels-3184360.jpg" alt="property-image" />
                        <div className='absolute flex items-center space-y-7 h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)] w-full rounded-xl'>
                            <SliderContent></SliderContent>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[380px] lg:h-[600px] object-cover bg-blend-overlay rounded-2xl w-full' src="https://i.ibb.co/5M2w7Hk/pexels-fauxels-3184360.jpg" alt="property-image" />
                        <div className='absolute flex items-center space-y-7 h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)] w-full rounded-xl'>
                            <SliderContent></SliderContent>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SwipperSlider;