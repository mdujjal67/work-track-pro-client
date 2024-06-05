
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
    const [services, setServices] = useState([])
    // const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:9000/services")
            .then(res => res.json())
            .then(data => {
                setServices(data)
                // setLoading(false)
            })
    }, []);

    return (
        <div id="services" className="container mx-auto mt-[100px] py-20 bg-gray-100 text-center">
            <h1 className="text-2xl font-bold sm:text-4xl text-center  ">Our Services</h1>
            <h2 className="text-center pb-10 mt-4">Explore what services we provide to our clients</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-100">
                {
                    services.map((service) => <div key={service._id} className=" container mx-auto mt-auto flex-grow">
                        <div className=" rounded-md shadow-lg relative p-4 lg:p-0 ">
                            <img src={service.image} alt="services-photo" className="object-cover object-center w-full rounded-t-md h-72 p-6 rounded-lg lg:rounded-none" />
                            <div className="flex flex-col justify-between p-6 space-y-8">
                                <div className="space-y-2">
                                    <h2 className=" font-semibold text-gray-500"></h2>
                                    <h1 className='text-2xl font-bold'>{service.title}</h1>
                                    <p className="dark:text-gray-800">{service.description.substring(0, 135)}...</p>
                                </div>
                                <Link to={``}>
                                    <button className="btn flex items-center justify-center -mt-3 p-3 font-semibold tracking-wide rounded-lg dark:bg-[#00a1ea] dark:text-gray-50 hover:text-black hover:bg-gray-300 transform transition-transform duration-300 mx-auto">View Details</button>
                                </Link>

                            </div>
                        </div>
                    </div>)

                }
            </div>
        </div>
    );

};

export default Services;