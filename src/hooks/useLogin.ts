import { useState } from "react";

import { client } from "@shared/config/apolloClientConfig/apollo-client";
import { API_URL } from "@shared/constants/urls";
import { UNKNOWN_ERROR_MESSAGE } from "@shared/constants/errors";

interface LoginRequest {
  email: string;
  password: string;
}

export function useLogin() {
  const [error, setError] = useState("");

  const login = async (request: LoginRequest) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      if (res.status === 401) {
        setError("Credentials are not valid");
      } else {
        setError(UNKNOWN_ERROR_MESSAGE);
      }
      return;
    }

    setError("");

    // apollo:
    // - clear cache, refetch queries
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
}
