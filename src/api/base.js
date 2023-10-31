export const baseURL = process.env.REACT_APP_API_BASE_URL;

export async function checkConnection() {
  try {
    const res = await fetch(`${baseURL}/docs`);
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
