const baseUrl = "";

export const doSignIn = async (payload: any) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res;
};

export const doSignUp = async (payload: any) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res;
};


