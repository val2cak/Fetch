import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { authState } = useContext(AuthContext);

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
        window.location.pathname = `/profile/${authState.id}`;
      });
  };

  return (
    <div className="formContainer">
      <h1>Change Your Password</h1>
      <input
        type="password"
        placeholder="Old Password"
        id="inputCreatePost"
        autoComplete="off"
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="New Password"
        id="inputCreatePost"
        autoComplete="off"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={changePassword}> Save Changes </button>
    </div>
  );
}

export default ChangePassword;
