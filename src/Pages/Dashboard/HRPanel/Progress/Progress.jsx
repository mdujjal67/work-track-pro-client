import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMemo, useState } from "react";


const Progress = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedName, setSelectedName] = useState("");

    const { data: works = [] } = useQuery({
        queryKey: ['works'],
        queryFn: async () => {
            const res = await axiosSecure.get('/workSheet')
            return res.data
        }
    });


    // Get unique employee names
    const employeeNames = useMemo(() => {
        const names = works.map(work => work.name);
        return [...new Set(names)];
    }, [works]);


    // filter by work submitted user name
    const filteredByName = selectedName
        ? works.filter(work => work.name === selectedName)
        : works;
        console.log(filteredByName)


    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10"> Work Records:</h1>

            <div className="input-bordered cursor-pointer required text-black w-[200px] lg:w-[300px] mx-auto outline-none focus:outline-none focus:ring focus:ring-opacity-50 focus:dark:ring-violet-600 rounded-full lg:mt-10 lg:mb-14">
                <select
                    name="level"
                    className="select rounded-full join-item text-black w-full outline-none focus:outline-none focus:ring focus:ring-opacity-50 py-3 focus:dark:ring-violet-600 bg-gray-200"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    required
                >
                    <option value="">Filter by Employee Name</option>
                    {
                        employeeNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))
                    }
                </select>
            </div>

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
                            filteredByName.map((work, index) => <tr key={work._id} className="bg-base-100">
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