
const Faq = () => {
    return (
        <div>
            <div className="container mx-auto">
                <section className="dark:bg-gray-100 dark:text-gray-800 py-12 mt-[100px]">
                    <div className="container flex flex-col justify-center px-4 mx-auto md:p-8">
                        <h2 className="text-2xl font-bold sm:text-4xl text-center">Frequently Asked Questions</h2>
                        <p className="mt-4 mb-8 dark:text-gray-600 text-center">Explore common queries about our services and platform.</p>
                        <div className="space-y-5">
                            <details className="w-full border rounded-lg" open="">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What services does WorkTrackPro offer?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">WorkTrackPro offers a robust suite of project management tools designed to enhance productivity and collaboration. Our services include task tracking, time management, team collaboration features, project analytics, and more to streamline your workflow.</p>
                            </details>
                            <details className="w-full border rounded-lg">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How can I collaborate with my team on WorkTrackPro?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Collaborating with your team on WorkTrackPro is straightforward. You can create projects, assign tasks, share files, and communicate in real-time using our platform. Additionally, our integration with other tools makes it easy to keep everyone on the same page.</p>
                            </details>
                            <details className="w-full border rounded-lg">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">Can I request custom features or integrations?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Yes, WorkTrackPro offers custom feature development and integrations to meet your specific needs. Whether you need a particular functionality or integration with other software, our team can work with you to tailor the platform accordingly.</p>
                            </details>
                            <details className="w-full border rounded-lg">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How do I stay updated with WorkTrackPro's latest features and updates?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">To stay informed about WorkTrackPro's latest features, updates, and promotions, subscribe to our newsletter. You will receive regular updates directly to your inbox, ensuring you are always up-to-date with our offerings.</p>
                            </details>
                            <details className="w-full border rounded-lg">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How can I access support or resources?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">WorkTrackPro provides extensive support and resources to help you make the most of our platform. You can access tutorials, user guides, and support materials through our help center. Additionally, our support team is available to assist you with any questions or issues you may encounter.</p>
                            </details>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Faq;