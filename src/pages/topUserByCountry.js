import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function TopUserByCountry() {

  let history = useHistory()
  const [country,setCountry] = useState()
  const[showDrop,setShowDrop] = useState(false)
  const [countryData,setCountryData] = useState()

  useEffect(async() => {
    const data = await axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        let status = "status" in response;
        if (!status) {
          response.status = 401;
          return response;
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });

      console.log(data)

      setCountry(data);

  },[])

  function showDropdown(){
    setShowDrop(!showDrop)
  }

 
  const onSubmitFun = async (temp) => {

    const data = await axios
      .get(`https://api.github.com/search/users?q=location:${temp}`)
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
      console.log(data)
      setShowDrop(false)
      setCountryData(data);
  };

  return (
    <>
      <div className="country">
        <div className="show-btn ">
            <button onClick={showDropdown}>Select Country</button>
            {
              showDrop && country?
              <div className="d-block">
                <div className="dropdown">
          {
            country&&country.map((item) => {
              return(
                <button onClick={()=> onSubmitFun(item.name.common)}>{item.name.common}</button>
              )
            })
          }
        </div>
              </div>
              
        :null
            }
            
        </div>

        {
        countryData && countryData?
        <div className="row content">
        <table>
         
          <tr>
            <th>Sl. No.</th>
            <th>Name</th>
            <th>Type</th>
            <th>Avatar</th>
          </tr>
          {countryData &&
            countryData.items &&
            countryData.items.map((item, key) => (
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
        
      </div>
    </>
  );
}
