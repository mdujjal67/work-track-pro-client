import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const Progress = () => {

    const axiosSecure = useAxiosSecure();

    const { data: works = [] } = useQuery({
        queryKey: ['works'],
        queryFn: async () => {
            const res = await axiosSecure.get('/workSheet')
            return res.data
        }
    });


    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10"> Work Records:</h1>

            <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-300">
                            <th></th>
                            <th>Employee Name</th>
                            <th>Task Name</th>
                            <th>Hours Worked</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            works.map((work, index) => <tr key={work._id} className="bg-base-100">
                                <th>{index + 1}</th>
                                <td>{work.name}</td>
                                <td>{work.taskName}</td>
                                <td>{work.hoursWorked}</td>
                                <td>{work.date}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
        </div>
    );
};

export default Progress;