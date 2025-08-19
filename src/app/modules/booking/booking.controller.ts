import { Request, Response } from "express";
// import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { catchAsync } from "../../utils/catchAysnc";

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodeToken = req.user as JwtPayload
    const booking = await BookingService.createBooking(req.body, decodeToken.userId);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
    const decodeToken = req.user as JwtPayload;
    const bookings = await BookingService.getUserBookings(decodeToken.userId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Bookings retrieved successfully",
        data: bookings,
    });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
    const booking = await BookingService.getBookingById(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking retrieved successfully",
        data: booking,
    });
});


const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const bookings = await BookingService.getAllBookings();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Bookings retrieved successfully",
        data: bookings,
    });
});


const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
    const { status } = req.body;
    const updated = await BookingService.updateBookingStatus(req.params.id, status);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking Status Updated Successfully",
        data: updated,
    });
});



export const BookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getUserBookings,
    updateBookingStatus,
}