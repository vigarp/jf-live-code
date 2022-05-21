import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./Home.module.css";

const Home = () => {
  const [allUser, setAllUser] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const queryPage = searchParams.get("page") || 1;
  const querySearch = searchParams.get("search");

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=50&page=${queryPage}`)
      .then((res) => {
        setAllUser(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [queryPage]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchParams({ search: e.target.value });
    }
  };

  const handleNewData = () => {
    return navigate("/");
  };

  const handlePagination = (pagination) => {
    if (pagination < 1) {
      alert("last page");
    } else {
      navigate(`/?page=${pagination}`);
    }
  };
  let searchUser = allUser.find((x) => x.name.first === querySearch);
  return (
    <>
      <div className={`text-center fw-bold`}>User list</div>
      <div className={`text-center my-3`}>
        <button onClick={handleNewData}>Generate Random Data</button>
        <br />
        <input type="text" placeholder="search user" onKeyUp={handleSearch} />
      </div>
      {searchUser ? (
        <>
          <div className={`py-3 bg-light rounded m-3`}>
            <div>
              Name: {searchUser.name.title} {searchUser.name.first}{" "}
              {searchUser.name.last}
            </div>
            <div>Email: {searchUser.email}</div>
            <div>Born: {searchUser.dob.date}</div>
            <div>
              Address: {searchUser.location.city}, {searchUser.location.state},{" "}
              {searchUser.location.country}
            </div>
            <div>
              Phone/Cell: {searchUser.phone} / {searchUser.cell}
            </div>
          </div>
        </>
      ) : (
        <>
          {allUser?.map((user, index) => (
            <div className={`py-3 bg-light rounded m-3`} key={index}>
              <div>
                Name: {user.name.title} {user.name.first} {user.name.last}
              </div>
              <div>Email: {user.email}</div>
              <div>Born: {user.dob.date}</div>
              <div>
                Address: {user.location.city}, {user.location.state},{" "}
                {user.location.country}
              </div>
              <div>
                Phone/Cell: {user.phone} / {user.cell}
              </div>
            </div>
          ))}
        </>
      )}

      <div className={`navigate-button d-flex justify-content-center my-5`}>
        <div
          className={`${styles.userPointer} text-primary`}
          onClick={() => handlePagination(`${parseInt(queryPage) - 1}`)}
        >
          Prev
        </div>
        <div className={`mx-3`}>||</div>
        <div
          className={`${styles.userPointer} user-pointer text-primary`}
          onClick={() => handlePagination(`${parseInt(queryPage) + 1}`)}
        >
          Next
        </div>
      </div>
    </>
  );
};

export default Home;
