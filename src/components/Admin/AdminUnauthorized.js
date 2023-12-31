// import Link file to apply link to AdminUnauthorized component
import { Link } from "react-router-dom";
// if admin is not authorized, then the below code will render
const AdminUnauthorized = () => {
  return (
    <div className='not-found-container'>
      <img
        className='not-found-img'
        src='https://res.cloudinary.com/ds72agrl6/image/upload/v1688450431/page-not-found-4922758-4097205_akbtfn.png'
        alt='page not found'
      />
      <h1 className='no-found-heading'>User Unauthorized</h1>
      <p>Please go back to Login</p>
      <button className='btn btn-primary'>
        <Link to='/adminLogin'>Go to Login</Link>
      </button>
    </div>
  );
};
export default AdminUnauthorized;