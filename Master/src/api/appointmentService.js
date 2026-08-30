import axiosClient from "./axiosClient";

export const appointmentService = {
  bookAppointment: async (appointmentData) => {
    const response = await axiosClient.post("/add/appointment", appointmentData);
    return response.data;
  },

  getRecentAppointments: async (id, adminRole) => {
    const response = await axiosClient.post("/recent/appointment", {
      id,
      admin: adminRole,
    });
    return response.data;
  },

  getFilteredAppointments: async (date, time) => {
    const response = await axiosClient.post("/getappointment", {
      date,
      time,
    });
    return response.data;
  },

  updatePaymentStatus: async (id, paymentStatus, razorpayPaymentId) => {
    const response = await axiosClient.post("/update/appointmentStatus", {
      id,
      payment_status: paymentStatus,
      razorpay_payment_id: razorpayPaymentId,
    });
    return response.data;
  },
};

export default appointmentService;
