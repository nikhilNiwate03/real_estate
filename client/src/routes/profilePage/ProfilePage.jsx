import React, { Suspense, useContext, useEffect } from "react";
import Chat from "../../components/chat/Chat";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import List from "../../components/list/List";

const ProfilePage = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null); // localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log("Logout", error);
    }
  };

  return (
    currentUser && (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <Link to={"/profile/update"}>
                <button>Update Profile</button>
              </Link>
            </div>
            <div className="info">
              <span>
                Avatar:
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="" />
                ) : (
                  <FaUserCircle size={30} />
                )}
              </span>
              <span>
                Username: <b>{currentUser.username}</b>
              </span>
              <span>
                E-mail: <b>{currentUser.email}</b>
              </span>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="title">
              <h1>My List</h1>
              <Link to={"/add"}>
                <button>Create New Post</button>
              </Link>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => <List posts={postResponse.data.userPosts} />}
              </Await>
            </Suspense>
            {/* <List /> */}
            <div className="title">
              <h1>Saved List</h1>
            </div>
            {/* <List /> */}
          </div>
        </div>
        <div className="chatContainer">
          <div className="wrapper">
            <Chat />
          </div>
        </div>
      </div>
    )
  );
};

export default ProfilePage;
