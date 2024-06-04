import { Link } from 'react-router-dom';
import gif from '../../assets/404-error.gif'
const NotFoundPage = () => {
  return (
    <div className='my-[50px]'>
      <img className='mx-auto lg:w-[400px] w-[300px]' src={gif} alt="" />
      <h1 className='text-2xl lg:text-3xl font-bold text-center '>404 Not Found</h1>
      <p className='text-2xl lg:text-3xl font-medium text-center mt-5 p-4 lg:p-0'>Sorry, the page you are looking for does not exist.</p>
      <div className='text-center mt-5'>
        <Link to='/'>
          <button className='bg-[#23BE0A] text-white py-[11px] px-[16px] lg:px-[20px] lg:py-[11px] text-[18px] font-medium rounded-lg text-center hover:bg-[#23BE0ACC]'>Go To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
