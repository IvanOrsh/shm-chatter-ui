import { API_URL } from "../constants/urls";

export function useLogout() {
  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });
  };

  return { logout };
}
