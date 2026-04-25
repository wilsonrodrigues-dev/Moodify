import { useContext, useEffect } from "react";
import { login, register, getme, logout } from "../services/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await login({ username, email, password });

      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });

      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  async function handlegetme() {
    setLoading(true);
    const data = await getme();
    setUser(data.user);
    setLoading(false);
  }

  const handleLogout = async () => {
    setLoading(true);

    try {
      const data = await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlegetme();
  }, []);

  return {
    user,
    loading,
    handleLogin,
    handleLogout,
    handleRegister,
    handlegetme,
  };
};
