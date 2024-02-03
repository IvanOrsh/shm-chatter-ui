import { API_URL } from "../constants/urls";

export function useLogout() {
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Error logging out");
    }
  };

  return { logout };
}
