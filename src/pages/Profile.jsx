import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  const { profile, setProfile } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setProfile({ ...res.data });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className=" relative isolate mx-auto max-w-7xl p-6 lg:px-8">
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
        <div className="flex flex-row justify-between mb-6">
          <div className="w-36 h-36 rounded-full overflow-hidden mr-5">
            <img
              src={profile.picture_url}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="self-center justify-items-start grow">
            <p className="font-bold text-3xl">{profile.name}</p>
            <p className="text-2xl">@{profile.username}</p>
          </div>
          <div className="self-end">
            <Link
              to="/image/upload"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded"
            >
              Add Image
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border-t border-gray-300 pt-6">
          {profile.Images?.map((image) => {
            return (
              <div
                className="col-span-1 h-64 overflow-hidden relative"
                key={image.id}
              >
                <Link to={`/image/${image.id}`}>
                  <img
                    src={image.image_url}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </Link>
              </div>
            );
          })}
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

export default Profile;
