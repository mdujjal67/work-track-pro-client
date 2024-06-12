import Swal from "sweetalert2";


const ContactUs = () => {

    // send data to the server 
    const handleContactedUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const message = form.message.value;

        const contactedUser = { email, message };

        // console.log(contactedUser)

        // send data to the server 
        fetch('https://work-track-pro-server.vercel.app/contactedUser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contactedUser)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Message Sent!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    form.reset()
                }
            })

    }


    return (
        <div className="mb-[100px] mt-5">
            <section className="py-14 dark:bg-gray-100 bg-gray-100 dark:text-gray-900 mx-auto container">
                <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                    <div className="py-6 md:py-0 md:px-6">
                        <h1 className="text-4xl font-bold">Get in touch</h1>
                        <p className="pt-2 pb-4">Fill in the form to send your opinion</p>
                        <div className="space-y-4">
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                                <span>ABC, banani, Dhaka</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <span>123456789</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <span>contact@worktrackpro.com</span>
                            </p>
                        </div>
                    </div>
                    
                    {/* form part */}
                    <form onSubmit={handleContactedUser} noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                        <label className="block">
                            <span className="">Email address</span>
                            <input type="email" name="email" placeholder="Your Email" required className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-100 py-3 focus:dark:ring-violet-600 dark:bg-gray-200 pl-3 mt-2" />
                        </label>
                        <label className="block">
                            <span className="">Message</span>
                            <textarea rows="5" name="message" placeholder="Your Message" required className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-200 pl-3 pt-3 mt-2"></textarea>
                        </label>
                        <input type="submit" name="submit" value="Send" className="btn btn-block bg-[#00a1ea] text-white hover:text-black" />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;