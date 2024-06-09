import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Messages = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/messages')
            return res.data
        }
    });

    return (
        <div className="container mx-auto ">
            <h1 className="text-3xl text-center font-bold my-10">Visitors Feedback:</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table ">
                        {/* head */}
                        <thead className="bg-base-200 text-[12px] lg:text-[16px]">
                            <tr className="">
                                <th></th>
                                <th className="lg:col-span-1">Email</th>
                                <th className="lg:col-span-5">Feedback</th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px] lg:text-[16px]">

                            {
                                users.map((user, index) => <tr key={user._id} className="bg-base-50">
                                    <th>{index + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.message}</td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Messages;