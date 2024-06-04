
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
        <div className="container mx-auto mt-[100px] py-14 bg-gray-50">
            <h1 className="text-3xl font-bold text-center  ">Our Services</h1>
            <h2 className="text-center pb-10 mt-4">Explore what services we provide to our clients</h2>
            <div className="grid grid-cols-3 gap-6 shadow-lg">
                {
                    services.map((service) => <div key={service._id} className=" container mx-auto mt-auto flex-grow">
                        <div className=" rounded-md shadow-md relative p-4 lg:p-0 ">
                            <img src="https://i.ibb.co/5M2w7Hk/pexels-fauxels-3184360.jpg" alt="services-photo" className="object-cover object-center w-full rounded-t-md h-72 p-6 dark:bg-gray-50 rounded-lg lg:rounded-none" />
                            <div className="flex flex-col justify-between p-6 space-y-8">
                                <div className="space-y-2">
                                    <h2 className=" font-semibold text-gray-500"></h2>
                                    <h1 className='text-2xl font-bold'>{service.title}</h1>
                                    <p className="dark:text-gray-800">{service.description.substring(0, 140)}...</p>
                                    {/* <div className='flex justify-between items-center mt-5'>
                                        <div className='flex items-center gap-2'>
                                            <IoLocationOutline className='text-violet-700' />
                                            <p className='text-[14px]'></p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <MdTravelExplore className='text-violet-700' />
                                            <p className='text-[14px]'></p>
                                        </div>
                                    </div> */}
                                </div>
                                <Link to={``}>
                                    <button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50 hover:text-black hover:bg-gray-300">View Details</button>
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