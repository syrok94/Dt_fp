const baseUrl = "http://localhost:8082";

export const doSignIn = async (payload: any) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Sign-in failed with status ${res.status}`);
    }

    return  res;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

export const doSignUp = async (payload: any) => {
  try {

    const res = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Sign-up failed with status ${res.status}`);
    }

    return  res;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};
