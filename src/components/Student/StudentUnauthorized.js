import { Link } from "react-router-dom";

const StudentUnauthorized = () => {
    return (
      <div className='not-found-container'>
        <img
          className='not-found-img'
          src='https://res.cloudinary.com/ds72agrl6/image/upload/v1688450431/page-not-found-4922758-4097205_akbtfn.png'
          alt='page not found'
        />
        <h1 className='no-found-heading'>User Unauthorized</h1>
        <p>You are not allowed to write the Test</p>
        <p>Please go back to Login</p>
        <button className='btn btn-primary'>
          <Link to='/studentLogin'>Go to Login</Link>
        </button>
      </div>
    );
  };
  export default StudentUnauthorized;