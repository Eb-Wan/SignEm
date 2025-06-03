import { useNavigate } from "react-router-dom";
import apiClient from "../AxiosConfig.js"

const Logout = () => {
  const navigate = useNavigate();
  apiClient.get("/api/compte/logout", { withCredentials: true })
  .then(response => navigate("/"))
  .catch ((error) => {
    const message = (error.response) ? error.response.data.message : error.message;
    console.error();
    return (<p className="errorMessage">{ message }</p>);
  });
}

export default Logout