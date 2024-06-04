
const ValuesAndCulture = () => {
    return (
        <div className="container mx-auto">
            {/* Company Values and Culture Section */}
            <section id="values-culture" className="py-12 bg-gray-100 mt-[100px]">
                <div className="container mx-auto px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Our Values and Culture</h2>
                        <p className="mt-2 text-gray-600">Discover what drives us and defines our workplace.</p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mission Statement */}
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mission Statement</h3>
                            <p className="text-gray-600">At WorkTrackPro, our mission is to empower employees and enhance workplace productivity through innovative solutions and a supportive work environment.</p>
                        </div>
                        {/* Core Values */}
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Core Values</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                <li>Integrity</li>
                                <li>Collaboration</li>
                                <li>Commitment to Excellence</li>
                                <li>Continuous Improvement</li>
                                <li>Customer Focus</li>
                                {/* Add more core values as needed */}
                            </ul>
                        </div>
                        {/* Culture Description */}
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Culture Description</h3>
                            <p className="text-gray-600">At WorkTrackPro, we foster a collaborative and inclusive culture where employees are encouraged to share ideas, support one another, and thrive both personally and professionally.</p>
                        </div>
                        {/* Employee Benefits and Perks */}
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Employee Benefits and Perks</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                <li>Comprehensive Health Insurance</li>
                                <li>Retirement Savings Plans</li>
                                <li>Flexible Work Arrangements</li>
                                <li>Professional Development Opportunities</li>
                                <li>Wellness Programs</li>
                                <li>Social Events</li>
                                {/* Add more benefits and perks as needed */}
                            </ul>
                        </div>
                        {/* Diversity, Equity, and Inclusion */}
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Diversity, Equity, and Inclusion</h3>
                            <p className="text-gray-600">At WorkTrackPro, we are committed to creating a diverse and inclusive workplace where all employees feel valued, respected, and empowered to succeed.</p>
                        </div>
                        {/* Employee Recognition */}
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Employee Recognition</h3>
                            <p className="text-gray-600">We celebrate the achievements and contributions of our employees through our recognition program, acknowledging their dedication and impact on our success.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ValuesAndCulture;