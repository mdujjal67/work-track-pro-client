import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Testimonials = () => {

    const axiosPublic = useAxiosPublic()

    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
                const res = await axiosPublic.get("/testimonials");
                return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>;
    }


    return (
        <section className="my-[100px] container mx-auto">
            <h1 className='text-center text-2xl font-bold sm:text-4xl'>Testimonials</h1>
            <p className='text-center mt-4 mb-10'>What our client say</p>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {testimonials.map(testimonial => (
                    <SwiperSlide key={testimonial._id}>
                        <div className="container mx-auto">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={testimonial.rating}
                                readOnly
                                className="mx-auto mb-4"
                            />
                            <p className='w-[280px] md:w-[90%] text-center mx-auto'>{testimonial.details}</p>
                            <h2 className="text-xl font-semibold text-[#CD9003] text-center pt-2 uppercase">{testimonial.name}</h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;
