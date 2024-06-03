import { useEffect } from "react";
import SwipperSlider from "./SwipperSlider";

const Home = () => {

    // dynamic title
    useEffect((() => {
        document.title = "WorkTrackPro | Home"
    }), [])


    return (
        <div>
            <SwipperSlider></SwipperSlider>
        </div>
    );
};

export default Home;