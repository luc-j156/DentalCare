import axiosClient from "./axiosClient";

export const doctorService = {
  getAllDoctors: async () => {
    const response = await axiosClient.post("/detail/doctor");
    return response.data;
  },

  getDoctorsBySpecialist: async (specialist) => {
    const response = await axiosClient.post("/getDoctorFromSpecialist", {
      Specialist: specialist,
    });
    return response.data;
  },

  updateDoctorStatus: async (id, status) => {
    const response = await axiosClient.post("/update/status", {
      id,
      status,
    });
    return response.data;
  },
};

export default doctorService;
