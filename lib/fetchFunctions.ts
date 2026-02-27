export const fetchAllEmployees = async () => {
  try {
    const response = await fetch(
      "https://rfidattendance-mu.vercel.app/api/user/view/all",
    );

    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
