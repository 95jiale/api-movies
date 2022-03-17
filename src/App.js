import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [endPoint, setEndPoint] = useState("");
  const [container, setContainer] = useState([]);
  const [finalPoint, setFinalPoint] = useState("");

  // NEW_CODE
  const [textBox, setTextBox] = useState("");

  useEffect(() => {
    // NEW_CODE
    if (finalPoint != "") {
      fetchMe();
    }
  }, [finalPoint]);

  function fetchMe() {
    fetch(`https://imdb-data-searching.p.rapidapi.com/om?t=+${endPoint}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb-data-searching.p.rapidapi.com",
        "x-rapidapi-key": "75aca8c5c7msh1b169377e5d5910p1a2202jsn1ae8d366d2a2",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setContainer(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function onChangeHandler(e) {
    // NEW_CODE
    let val = e.target.value;
    val = val.replaceAll(" ", "%20");
    console.log(val);
    setEndPoint(val);
    setTextBox(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    setFinalPoint(endPoint);
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input type="text" value={textBox} onChange={onChangeHandler} />
        <button type="submit">submit</button>
      </form>

      {/* NEW_CODE */}
      <div className="h1">Title: {container.Title}</div>
      <p className="p1">Release Date: {container.Released}</p>
      <p>Total Runtime: {container.Runtime}</p>

      {/* {container.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.Poster} alt="" />
            <p>{item.Title}</p>
          </div>
        );
      })} */}
    </div>
  );
}

export default App;
