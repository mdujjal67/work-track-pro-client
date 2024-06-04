

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

// import react rating
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([])
    useEffect(() => {
        fetch("http://localhost:9000/testimonials")
            .then(res => res.json())
            .then(data => setTestimonials(data))
    }, [])
    return (
        <section className="my-[100px] container mx-auto">
            <h1 className='text-center text-3xl font-bold'>Testimonials</h1>
            <p className='text-center mt-4 mb-10'>What our client say</p>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    testimonials.map(testimonial => <SwiperSlide
                        key={testimonial._id}
                        testimonial={testimonial}>
                        <div className="w-[1080px] mx-auto">
    
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={testimonial.rating}
                                readOnly className="mx-auto mb-4" />
                            <p>{testimonial.details}</p>
                            <h2 className="text-2xl font-semibold text-[#CD9003] text-center pt-2 uppercase">{testimonial.name}</h2>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;