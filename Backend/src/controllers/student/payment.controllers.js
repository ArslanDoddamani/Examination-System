import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import razorpay from "../../utils/Razorpay.js";


export const regularSubjectPayment = asyncHandler(async(req, res) => {
    try {
        const { fullName, usn, department, sem, email, phone} = req.student;
        const paymentLinkRequest = {
            amount: 1500 * 100,
            currency: "INR",
            customer: {
                fullName,
                usn,
                department,
                sem,
                email,
                phone
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url: `http://localhost:3000/payment-histroy`, // corrected typo
            callback_method: "get" // corrected typo
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
        console.log(paymentLink);

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        return res
        .status(200)
        .json(new ApiResponse(200,
            {
                paymentLinkId,
                payment_link_url,
                studentDetails: paymentLinkRequest.customer
            }
        ))

        
    } catch (error) {
        throw new ApiError(402, "Error creating payment link");
    }
});