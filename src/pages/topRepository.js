import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function TopUserByRepo() {

  let history = useHistory()
  const [repo,setRepo] = useState()
  const[showDrop,setShowDrop] = useState(false)
  const [countryData,setCountryData] = useState()
  const [totalpages,setTotalpages] = useState()
  const [pagenumber,setpagenumber] = useState(1)
  // const [countryData,setCountryData] = useState()


  useEffect(async() => {
    const data = await axios
      .get(`https://api.github.com/search/repositories?q=stars&&page=${pagenumber}&&per_page=20`)
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

      setRepo(data);
      setTotalpages(data.total_count/20)

  },[pagenumber])

  return (
    <section className="homePage">
      <div className="row">
        {
          repo && repo.total_count?
          <p className="txt-lg">Total Count: {repo.total_count}</p>:null
        }
        
      </div>
      {
        repo?
        <>
        <div className="row content">
        <table>
         
          <tr>
            <th>Sl. No.</th>
            <th>Name</th>
            <th>Type</th>
            <th>Branch</th>
            <th>Avatar</th>
          </tr>
          {repo &&
            repo.items &&
            repo.items.map((item, key) => (
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
      {totalpages === 1 ? null : (
        <div className="row">
          <div className="pagination">
            <button
              className="btn"
              // onClick={() =>
              //   setpagenumber(pagenumber !== 1 ? pagenumber - 1 : pagenumber)
              // }
              onClick={() => setpagenumber((old) => Math.max(old - 1, 1))}
              disabled={pagenumber === 1}
            >
              prev
            </button>

            {pagenumber}
            <button
              className="btn"
              onClick={() => {
                setpagenumber((old) => old + 1);
              }}
              // disabled={repo.length === 0}
            >
              next
            </button>
          </div>
        </div>
      )}
      </>
      :null
      }   
      
    </section>
  );
}
