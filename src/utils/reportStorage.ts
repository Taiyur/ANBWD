import AsyncStorage from "@react-native-async-storage/async-storage";

const REPORTS_KEY = "municipality_reports";

export const saveReport = async (report: any) => {
  try {
    const existing = await AsyncStorage.getItem(REPORTS_KEY);
    const reports = existing ? JSON.parse(existing) : [];

    reports.push(report);

    await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  } catch (error) {
    console.log("Save report error:", error);
  }
};

export const getReports = async () => {
  try {
    const data = await AsyncStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
