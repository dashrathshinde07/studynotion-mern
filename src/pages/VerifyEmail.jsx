// import React, { useEffect, useState } from "react";
// import OTPInput from "react-otp-input";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { sendOtp, signUp } from "../services/operations/authAPI";

// const VerifyEmail = () => {
//   const [otp, setOtp] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { signupData, loading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!signupData) {
//       navigate("/signup");
//     }
//   }, []);

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     const {
//       accoutType,
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       otp,
//       navigate,
//     } = signupData;
//     dispatch(
//       signUp(
//         accoutType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp,
//         navigate
//       )
//     );
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <h1>Verify Email</h1>
//           <p>A verification code has been sent to you. Enter the code below</p>
//           <form onSubmit={handleOnSubmit}>
//             <OTPInput
//               value={otp}
//               onChange={setOtp}
//               numInputs={6}
//               renderInput={(props) => <input {...props} />}
//             />
//             <button type="submit">Verify Email</button>
//           </form>

//           <div>
//             <Link to={"/login"}>
//               <p>Back to login</p>
//             </Link>
//           </div>

//           <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
//             Resend it
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifyEmail;



import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Verify Email</h1>
          <p className="text-gray-600 mb-8 text-center">
            A verification code has been sent to you. Enter the code below.
          </p>
          <form onSubmit={handleOnSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="ml-4 w-6 mr-4 h-7 border border-gray-300 rounded-md text-center text-black"
                  />
                )}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Verify Email
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              <p>Back to login</p>
            </Link>
          </div>

          <button
            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            className="w-full mt-4 bg-gray-200 text-black p-2 rounded-md hover:bg-gray-300"
          >
            Resend it
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

