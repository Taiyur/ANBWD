import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";

export default function CaptureScreen({ navigation }: any) {
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === "back");

  const [hasPermission, setHasPermission] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const camera = await Camera.requestCameraPermission();

    const location = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (camera === "granted" && location === "granted") {
      setHasPermission(true);
    } else {
      Alert.alert("Permission Denied");
    }
  };

  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "json",
            lat,
            lon: lng,
          },
          headers: { "User-Agent": "WasteDetectionApp" },
        }
      );

      setAddress(res.data.display_name);
    } catch {
      setAddress("Address not found");
    }
  };

  const capturePhoto = async () => {
  if (!cameraRef.current) return;

  const photo = await cameraRef.current.takePhoto();

  Geolocation.getCurrentPosition(
    async position => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              format: "json",
              lat: latitude,
              lon: longitude,
            },
            headers: { "User-Agent": "WasteDetectionApp" },
          }
        );

        const fetchedAddress = res.data.display_name;

        // 👉 Navigate AFTER address is fetched
        navigation.navigate("Result", {
  image: photo.path,
  latitude: latitude,
  longitude: longitude,
  address: fetchedAddress,
});

} catch {
  Alert.alert("Error fetching address");
}
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true }
  );
};


  if (!device || !hasPermission) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: "white" }}>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <TouchableOpacity style={styles.captureBtn} onPress={capturePhoto}>
        <Text style={styles.btnText}>CAPTURE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },

  loading: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },

  captureBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#22c55e",
    padding: 20,
    borderRadius: 50,
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
