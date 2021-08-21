import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Image } from "cloudinary-react";
import logo from "./fetch_logo.png";

function CreatePost() {
  const { authState } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);

  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const upload = () => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "kqepglvx");
    axios
      .post(`https://api.cloudinary.com/v1_1/val2cak/image/upload`, formData)
      .then((response) => {
        const fileName = response.data.public_id;

        axios
          .post(
            "http://localhost:3001/posts",
            {
              title: title,
              pictureId: fileName,
            },
            {
              headers: { accessToken: localStorage.getItem("accessToken") },
            }
          )
          .then(() => {
            history.push("/");
          });
      });
  };

  return (
    <div>
      <img className="PageLogo" src={logo} alt="logo" />
      <div className="formContainer">
        <h1>Want to post something?</h1>
        <label>Title: </label>
        <input
          autocomplete="off"
          id="inputCreatePost"
          name="title"
          placeholder="(Ex. Title...)"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label>Picture: </label>
        <input
          name="pictureId"
          type="file"
          onChange={(e) => setImage(e.target.files)}
        />

        <button onClick={upload}>Create Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
