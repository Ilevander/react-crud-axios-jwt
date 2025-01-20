import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setJwtToken(user.jwtToken);
      setUsername(user.username);
      setRoles(user.roles);
    }
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Token:</strong> {jwtToken}</p>
      <p><strong>Roles:</strong></p>
      <ul>
        {roles instanceof Array && roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
