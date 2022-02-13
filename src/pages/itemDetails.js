import React from "react";
import { useLocation } from "react-router-dom";

export default function ItemDetails() {
  let location = useLocation();

  console.log("location.state",location.state)
  return (
    <section className="details-page">
      {
        location.state.type == 'user'?
        <div className="row">
        <div className="left">
          <img src={location.state.data.avatar_url} />
        </div>
        <div className="right">
          <p className="txt-lg">{location.state.data.login}</p>
          <p className="txt-sm">Type: {location.state.data.type}</p>

          <p className="">URL: <a href={location.state.data.url}>{location.state.data.url}</a></p>
          <p className="">Organization URL:<a href={location.state.data.organizations_url}>{location.state.data.organizations_url}</a></p>
          <p className="">Repos URL:<a href={location.state.data.repos_url}>{location.state.data.repos_url}</a></p>
          <p className="">atarred URL: <a href={location.state.data.starred_url}>{location.state.data.starred_url}</a></p>
        </div>
      </div>
      :
      <div className="row">
        <div className="left">
          <img src={location.state.data.owner.avatar_url} />
        </div>
        <div className="right">
          <p className="txt-lg">{location.state.data.owner.login}</p>
          <p className="txt-sm">Type: {location.state.data.owner.type}</p>

          <p className="">URL: <a href={location.state.data.owner.url}>{location.state.data.owner.url}</a></p>
          <p className="">Organization URL:<a href={location.state.data.owner.organizations_url}>{location.state.data.owner.organizations_url}</a></p>
          <p className="">Repos URL:<a href={location.state.data.owner.repos_url}>{location.state.data.owner.repos_url}</a></p>
          <p className="">atarred URL: <a href={location.state.data.owner.starred_url}>{location.state.data.owner.starred_url}</a></p>
        </div>
      </div>
      }
    </section>
  );
}
