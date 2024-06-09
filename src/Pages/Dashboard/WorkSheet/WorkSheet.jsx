import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const WorkSheet = () => {

    const [startDate, setStartDate] = useState(new Date());

    const { user } = useContext(AuthContext);
    const { email, designation } = user;


    const axiosSecure = useAxiosSecure();

    const { data: works = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/workSheet')
            return res.data
        }
    });



    const handleContactedUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const taskName = form.taskName.value;
        const hoursWorked = form.hoursWorked.value;
        const date = form.date.value;

        const workSheet = { taskName, hoursWorked, date, email, designation };
        console.log(workSheet);

        // send works data to the server 
        fetch('http://localhost:9000/workSheet', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(workSheet)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Added to WorkSheet!',
                        // text: 'Added!',
                        icon: 'success',
                        confirmButtonText: 'Success',
                        timer: 1500
                    });
                    form.reset()
                }
            })

    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl mt-8 font-bold">Your Work-Sheet:</h1>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-300">
                            <th></th>
                            <th>Task Name</th>
                            <th>Hours Worked</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            works.map((work, index) => <tr key={work._id} className="bg-base-100">
                                <th>{index + 1}</th>
                                <td>{work.taskName}</td>
                                <td>{work.hoursWorked}</td>
                                <td>{work.date}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* This part is for Form section */}
            <h2 className="text-2xl font-bold mb-5">Submit Your Works:</h2>
            <div className="">
                <form onSubmit={handleContactedUser} className="lg:flex lg:gap-3 mb-20">
                    {/* This is for Tasks field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Tasks</span>
                        </label>
                        <select name="taskName" required className="select select-bordered focus:ring focus:ring-blue-500 focus:border-blue-500 active:border-blue-500" >
                            <option disabled selected>Select Your Task</option>
                            <option value="Sales">Sales</option>
                            <option value="Content">Content</option>
                            <option value="Support">Support</option>
                            <option value="Paper-Work">Paper-Work</option>
                        </select>
                        {/* {errors.role && <span className="text-red-500">Role is required</span>} */}
                    </div>

                    {/* This is for hour worked field*/}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Hours Worked</span>
                        </label>
                        <input type="number" name="hoursWorked" required placeholder="Hours Worked" className="input input-bordered focus:ring focus:ring-blue-500 focus:border-blue-500 active:border-blue-500" />
                        {/* {errors.bankAccountNumber && <span className="text-red-500">Bank Account Number is required</span>} */}
                    </div>

                    {/* This is for date field*/}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <DatePicker name="date" className="border border-gray-300 py-3 rounded-lg pl-5 focus:ring focus:ring-blue-500 focus:border-blue-500 active:border-blue-500" selected={startDate} onChange={(date) => setStartDate(date)} required />
                        {/* {errors.salary && <span className="text-red-500">Salary is required</span>} */}
                    </div>

                    <div className="form-control mt-[35px]">
                        <input type="submit" className="btn bg-[#00a1ea] text-white w-full " value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkSheet;