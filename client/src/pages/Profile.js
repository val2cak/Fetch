import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Image } from "cloudinary-react";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListsOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListsOfPosts(response.data);
    });
  }, []);
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1 className="profileUsername"> {username} </h1>
        {authState.username === username && (
          <button
            className="changePasswordButton"
            onClick={() => {
              history.push("/changepassword");
            }}
          >
            Change My Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>

              <Image
                className="body"
                cloudName="val2cak"
                publicId={value.pictureId}
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              />

              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons"></div>
                <label className="likesProfile"> {value.Likes.length} </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
