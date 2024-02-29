const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserById = async (userId, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BACKEND_URL}/users/${userId}`,
    requestOptions
  );

  if (response.status !== 200) {
    throw new Error("Unable to get user. Does this user exist?");
  }
  // console.log("user", response)
  const data = await response.json();

  return data;
};