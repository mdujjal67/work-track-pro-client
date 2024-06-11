// import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useContext } from 'react';


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    if(loading){
        return <span className="loading loading-ring loading-lg mt-[300px] ml-[600px] pb-10"></span>
    }

    // Filter payments for the logged-in user
    const userPayments = payments.filter(payment => payment.email === user.email);


    return (
        <div>
            <h1 className="text-3xl text-center font-bold my-8">Payment History: {userPayments.length}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Month</th>
                    </tr>
                </thead>
                <tbody>
                    {userPayments.map((payment, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{payment.transactionId}</td>
                            <td>$ {payment.salary}</td>
                            <td>{payment.month}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
