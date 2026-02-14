import Geolocation from "react-native-geolocation-service";

export const getLocation = () =>
  new Promise(async (resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          // OpenStreetMap reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          const address = data.display_name || "Unknown location";

          resolve({ latitude, longitude, address });
        } catch {
          resolve({ latitude, longitude, address: "Unknown location" });
        }
      },
      error => reject(error),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  });
