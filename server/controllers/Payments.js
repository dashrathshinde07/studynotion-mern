/**
 * This file contains the functions to handle payment-related operations using Razorpay.
 * The main functionalities include capturing payments for course enrollment and verifying the payment signature.
 */

const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");

/**
 * capturePayment function
 * - Gets courseId and userId from the request
 * - Validates the courseId
 * - Checks if the user is already enrolled in the course
 * - Creates an order using Razorpay
 * - Returns the order details as a response
 */
exports.capturePayment = async (req, res) => {
  // Get courseId and userId from the request body and user object respectively
  const { course_id } = req.body;
  const userId = req.user.id;

  // Validation: Check if course_id is provided
  if (!course_id) {
    return res.json({
      success: false,
      message: "Please provide valid course ID",
    });
  }

  // Validate course details
  let course;
  try {
    // Fetch course details using course_id
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the course",
      });
    }

    // Check if the user is already enrolled in the course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // Create an order for the course
  const amount = course.price;
  const currency = "INR";
  const options = {
    amount: amount * 100, // Amount in paise (smallest unit of currency)
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userId,
    },
  };

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    // Return response
    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

/**
 * verifySignature function
 * - Verifies the payment signature sent by Razorpay
 * - If the signature is valid, enrolls the student in the course
 * - Updates the student and course details in the database
 * - Sends a confirmation email to the student
 */
exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";

  // Get the signature from the headers
  const signature = req.headers["x-razorpay-signature"];

  // Create a hash using the webhook secret
  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  // Compare the signature with the computed hash
  if (signature === digest) {
    console.log("Payment is Authorised");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      // Enroll the student in the course
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not Found",
        });
      }

      console.log(enrolledCourse);

      // Update the student's enrolled courses list
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      console.log(enrolledStudent);

      // Send a confirmation email
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from StudyNotion",
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          enrolledStudent.firstName
        )
      );

      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signature Verified and Course Added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};
