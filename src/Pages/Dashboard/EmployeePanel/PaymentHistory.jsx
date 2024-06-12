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

    const reversedPayments = userPayments.slice().reverse();


    return (
        <div>
            <h1 className="text-3xl text-center font-bold my-8">Payment History: {reversedPayments.length}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className='px-2'>Transaction ID</th>
                        <th className='px-2'>Amount</th>
                        <th className='px-2'>Month</th>
                    </tr>
                </thead>
                <tbody>
                    {reversedPayments.map((payment, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className='px-2'>{payment.transactionId}</td>
                            <td className='px-2'>$ {payment.salary}</td>
                            <td className='px-2'>{payment.month}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
