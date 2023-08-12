import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleUpload = (input) => {
    const { caption, file } = input;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", file);

    axios
      .post("http://localhost:8000/api/images", formData, {
        headers: {
          authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.message);
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (id, input) => {
    const { caption } = input;
    axios
      .put(
        `http://localhost:8000/api/images/${id}`,
        { caption },
        {
          headers: {
            authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/images/${id}`, {
        headers: {
          authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data.message);
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const values = {
    images,
    setImages,
    handleUpload,
    handleUpdate,
    handleDelete,
  };

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
};
