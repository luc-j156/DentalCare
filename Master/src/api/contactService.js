import axiosClient from "./axiosClient";

export const contactService = {
  submitContact: async (contactData) => {
    const response = await axiosClient.post("/add/contactus", contactData);
    return response.data;
  },
};

export default contactService;
