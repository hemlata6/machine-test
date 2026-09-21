import api from "./axios";

export const getVisiterList = async () => {
    const response = await api.get("/api/visitors");
    return response.data;
};
