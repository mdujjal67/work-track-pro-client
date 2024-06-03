import { useEffect } from "react";
import SwipperSlider from "./SwipperSlider";
import Faq from "./Faq";
import ValuesAndCulture from "./ValuesAndCulture";

const Home = () => {

    // dynamic title
    useEffect((() => {
        document.title = "WorkTrackPro | Home"
    }), [])


    return (
        <div>
            <SwipperSlider></SwipperSlider>
            <Faq></Faq>
            <ValuesAndCulture></ValuesAndCulture>
        </div>
    );
};

export default Home;