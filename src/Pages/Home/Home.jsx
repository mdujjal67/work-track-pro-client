import { useEffect } from "react";
import SwipperSlider from "./SwipperSlider";
import Faq from "./Faq";
import ValuesAndCulture from "./ValuesAndCulture";
import Services from "./Services";
import Testimonials from "./Testimonial";

const Home = () => {

    // dynamic title
    useEffect((() => {
        document.title = "WorkTrackPro | Home"
    }), [])


    return (
        <div>
            <SwipperSlider></SwipperSlider>
            <Services></Services>
            <Testimonials></Testimonials>
            <Faq></Faq>
            <ValuesAndCulture></ValuesAndCulture>
        </div>
    );
};

export default Home;