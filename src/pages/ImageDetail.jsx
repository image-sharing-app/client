import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ImageContext } from "../contexts/ImageContext";

const ImageDetail = () => {
  const { handleUpdate, handleDelete } = useContext(ImageContext);

  const [image, setImage] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const { imageId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/images/${imageId}`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setImage({ ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isEdit]);

  const [input, setInput] = useState({
    caption: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="relative isolate mx-auto max-w-7xl p-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex flex-row mb-3 justify-between">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-2 items-stretch">
            <img
              src={image.User?.picture_url}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grow self-center">
            <p className="font-bold text-sm">{image.User?.username}</p>
          </div>
          <div className="self-end">
            <button
              onClick={() => {
                setIsEdit(true);
                setInput({ caption: image.caption });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded mr-1"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete(image.id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
        <div>
          <img src={image.image_url} className="w-full mx-auto" />
        </div>
        <div className="mt-3">
          {isEdit === false ? (
            <p className="font-bold text-sm">
              <Link to={`/user/${image.User?.id}`}>{image.User?.username}</Link>
              <span className="font-medium ml-1">{image.caption}</span>
            </p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleUpdate(image.id, input);
                setIsEdit(false);
              }}
            >
              <div className="col-span-full">
                <label
                  htmlFor="caption"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Caption
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={input.caption}
                    type="text"
                    name="caption"
                    id="caption"
                    autoComplete="caption"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>{" "}
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 px-4 rounded  mr-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ImageDetail;
