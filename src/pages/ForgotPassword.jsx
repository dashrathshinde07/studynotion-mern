// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getPasswordResetToken } from "../services/operations/authAPI";

// const ForgotPassword = () => {
//   const [emailSent, setEmailSent] = useState(false);
//   const [email, setEmail] = useState("");

//   const { loading } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     dispatch(getPasswordResetToken(email, setEmailSent));
//   };

//   return (
//     <div className="text-white flex justify-center items-center">
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <h1>{!emailSent ? "Reset your Password" : "Check Your Email"}</h1>
//           <p>
//             {!emailSent
//               ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
//               : `We have sent the reset email to ${email}`}
//           </p>

//           <form onSubmit={handleOnSubmit}>
//             {!emailSent && (
//               <label>
//                 <p>Email Address*</p>
//                 <input
//                   className="text-black"
//                   type="email"
//                   required
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter Your Email Address"
//                 />
//               </label>
//             )}

//             <button type="submit">
//               {!emailSent ? "Reset Password" : "Resend Email"}
//             </button>
//           </form>

//           <div>
//             <Link to={"/login"}>
//               <p>Back to Login</p>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">
            {!emailSent ? "Reset your Password" : "Check Your Email"}
          </h1>
          <p className="text-gray-600 mb-8">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  <p>Email Address*</p>
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;



