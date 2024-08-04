// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { resetPassword } from "../services/operations/authAPI";
// import { Link, useLocation } from "react-router-dom";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// const UpdatePassword = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { loading } = useSelector((state) => state.auth);

//   const { password, confirmPassword } = formData;

//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     const token = location.pathname.split("/").at(-1);
//     dispatch(resetPassword(password, confirmPassword, token));
//   };
//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <h1>Choose new Password</h1>
//           <p>Almost done. Enter your new password and youre all set.</p>
//           <form onSubmit={handleOnSubmit}>
//             <label htmlFor="">
//               <p>New Password*</p>
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={password}
//                 onChange={handleOnChange}
//                 placeholder="Password"
//               />
//               <span onClick={() => setShowPassword((prev) => !prev)}>
//                 {showPassword ? (
//                   <AiFillEyeInvisible fontSize={24} />
//                 ) : (
//                   <AiFillEye fontSize={24} />
//                 )}
//               </span>
//             </label>

//             <label htmlFor="">
//               <p>Confirm New Password*</p>
//               <input
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 required
//                 value={confirmPassword}
//                 onChange={handleOnChange}
//                 placeholder="Confirm Password"
//               />
//               <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
//                 {showPassword ? (
//                   <AiFillEyeInvisible fontSize={24} />
//                 ) : (
//                   <AiFillEye fontSize={24} />
//                 )}
//               </span>
//             </label>

//             <button type="submit">Reset Password</button>
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

// export default UpdatePassword;



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Choose New Password</h1>
          <p className="text-gray-600 mb-8">
            Almost done. Enter your new password and you're all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                <p>New Password*</p>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={handleOnChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Password"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible fontSize={24} />
                  ) : (
                    <AiFillEye fontSize={24} />
                  )}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                <p>Confirm New Password*</p>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={handleOnChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Confirm Password"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible fontSize={24} />
                  ) : (
                    <AiFillEye fontSize={24} />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Reset Password
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

export default UpdatePassword;

