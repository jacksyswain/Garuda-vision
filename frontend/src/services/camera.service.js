import API from "./api";

export const getCameras = () => API.get("/cameras");
export const addCamera = (data) => API.post("/cameras", data);
export const deleteCamera = (id) => API.delete(`/cameras/${id}`);