import { useEffect } from "react";
import axios from "axios";

const TestApi = () => {
  useEffect(() => {
    axios
      .post("/api/user/register", {
        name: "Test User",
        email: "test@example.com",
        password: "123456",
      })
      .then((res) => {
        console.log("REGISTER SUCCESS:", res.data);
      })
      .catch((err) => {
        console.error("REGISTER ERROR:", err.response?.data || err.message);
      });
  }, []);

  return <h2>Check console for API response</h2>;
};

export default TestApi;