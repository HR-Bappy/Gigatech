import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {

  const history = useHistory()
  const [userData, setUserData] = useState();
  const [repositoriesData, setRepositoriesData] = useState();

  const [userSec, setUserSec] = useState(true);
  const [repositoriesSec, setRepositoriesSec] = useState(false);

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    let searchTxt = document.getElementById("serchText").value;

    const users = await axios
      .get(`https://api.github.com/search/users?q=${searchTxt}`)
      .then((response) => {
        let status = "status" in response;
        if (!status) {
          response.status = 401;
          return response;
        }
        return response.data;
      })
      .catch((err) => {
        document.getElementById("warning").innerText =
          "Wrong email or password!!";
        console.log(err);
        return [];
      });
    setUserData(users);

    const repositories = await axios
      .get(`https://api.github.com/search/repositories?q=${searchTxt}`)
      .then((response) => {
        let status = "status" in response;
        if (!status) {
          response.status = 401;
          return response;
        }
        return response.data;
      })
      .catch((err) => {
        document.getElementById("warning").innerText =
          "Wrong email or password!!";
        console.log(err);
        return [];
      });
    setRepositoriesData(repositories);

    console.log("ccc", users);
  };

  function setUserSecFun() {
    setUserSec(true);
    setRepositoriesSec(false);
  }
  function setRepoSecFun() {
    setUserSec(false);
    setRepositoriesSec(true);
  }

  return (
    <section className="homePage">
      <div className="row">
        <form className="" onSubmit={onSubmitSearch}>
          <div className="search-sec">
            <input required type="text" id="serchText" />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="btn-list">
          <button type="button" onClick={setUserSecFun}>
            User
          </button>
          <button type="button" onClick={setRepoSecFun}>
            Repositories
          </button>
        </div>
      </div>
      {
        userSec && userData?
        <div className="row content">
        <table>
         
          <tr>
            <th>Sl. No.</th>
            <th>Name</th>
            <th>Type</th>
            <th>Avatar</th>
          </tr>
          {userData &&
            userData.items &&
            userData.items.map((item, key) => (
              <tr onClick={()=> {history.push({
                pathname:`/details/${item.id}`,
                state:{data:item,type:'user'}
              })}}>
                <td>{key + 1}</td>
                <td>{item.login}</td>
                <td>{item.type}</td>
                <td>
                  <img src={item.avatar_url} alt={item.avatar_url} />
                </td>
              </tr>
            ))}
        </table>
      </div>
      :null
      }
      {
        repositoriesSec?
        <div className="row content">
        <table>
          {userData ? console.log(userData.items) : null}
          <tr>
            <th>Sl. No.</th>
            <th>Name</th>
            <th>Type</th>
            <th>Branch</th>
            <th>Avatar</th>
          </tr>
          {repositoriesData &&
            repositoriesData.items &&
            repositoriesData.items.map((item, key) => (
              <tr onClick={()=> {history.push({
                pathname:`/details/${item.id}`,
                state:{data:item,type:'repo'}
              })}}>
                <td>{key + 1}</td>
                <td>{item.owner.login}</td>
                <td>{item.owner.type}</td>
                <td>{item.default_branch}</td>
                <td>
                  <img src={item.owner.avatar_url} alt={item.owner.avatar_url} />
                </td>
              </tr>
            ))}
        </table>
      </div>
      :null
      }
      
    </section>
  );
}
