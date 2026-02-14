import axios from "axios";

const API = axios.create({
  baseURL: "htpp://Your IP",
  timeout: 20000,
});

export const sendWasteReport = async (
  imageUri: string,
  latitude: number,
  longitude: number,
  address: string
) => {
  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "waste.jpg",
  } as any);

  formData.append("latitude", latitude.toString());
  formData.append("longitude", longitude.toString());
  formData.append("address", address);

  const res = await API.post("/report", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
