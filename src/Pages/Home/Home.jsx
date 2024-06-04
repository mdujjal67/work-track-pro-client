import { useEffect } from "react";
import SwipperSlider from "./SwipperSlider";
import Faq from "./Faq";
import ValuesAndCulture from "./ValuesAndCulture";
import Services from "./Services";

const Home = () => {

    // dynamic title
    useEffect((() => {
        document.title = "WorkTrackPro | Home"
    }), [])


    return (
        <div>
            <SwipperSlider></SwipperSlider>
            <Services></Services>
            <Faq></Faq>
            <ValuesAndCulture></ValuesAndCulture>
        </div>
    );
};

export default Home;