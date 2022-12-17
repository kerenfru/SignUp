import axios from "axios";

interface State {
  state_name: string;
}

interface City {
  city_name: string;
}

export const getAccessToken = async (): Promise<{ auth_token: string }> => {
  const response = await axios.get("/getaccesstoken", {
    headers: {
      Accept: "application/json",
      "api-token":
        "UPPw9VIp6lKSi34iMdiOAy9820V18vn8HPl0Coq5aNksec6oZ_5B-hjO6rC88KE9gs4",
      "user-email": "a@b.c",
    },
  });
  return await response.data;
};

export const getUSAStates = async (): Promise<State[]> => {
  const response = await axios.get("states/United States", {
    headers: {
      Accept: "application/json",
    },
  });
  return await response.data;
};

export const getCities = async (state: string): Promise<City[]> => {
  const response = await axios.get(`/cities/${state}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return await response.data;
};
