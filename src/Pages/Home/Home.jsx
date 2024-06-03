import { useEffect } from "react";
import SwipperSlider from "./SwipperSlider";
import Faq from "./Faq";

const Home = () => {

    // dynamic title
    useEffect((() => {
        document.title = "WorkTrackPro | Home"
    }), [])


    return (
        <div>
            <SwipperSlider></SwipperSlider>
            <Faq></Faq>
        </div>
    );
};

export default Home;