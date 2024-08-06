import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data", data);

    try {
      setLoading(true);
      //   const response = await apiConnector(
      //     "POST",
      //     contactusEndpoint.CONTACT_US_API,
      //     data
      //   );
      const response = { status: "OK" };
      console.log("Logging Respnse", response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-14">
        <div className="flex gap-5">
          {/* firstname */}
          <div className="flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              className="text-black"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span>Please enter your name</span>}
          </div>
          {/* last name */}
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="last"
              id="last"
              placeholder="Enter last name"
              {...register("lastname")}
            />
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            typeof="emai"
            id="email"
            placeholder="Enter email Address"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter your email address</span>}
        </div>

        {/* message box */}
        <div className="flex flex-col">
          <label htmlFor="message">Message</label>
          <textarea
            className="text-black"
            name="message"
            id="message"
            cols={30}
            rows={7}
            placeholder="Enter Your message your"
            {...register("message", { required: true })}
          >
            {errors.message && <span>Please Enter your message</span>}
          </textarea>
        </div>

        {/* Button */}
        <button
          className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
