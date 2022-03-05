import React, { useState } from "react";
import "./Main.css";
import memesData from "../../memesData";

const Main = () => {

  const [url, setUrl] = useState('https://i.imgflip.com/4acd7j.png');
  const [topText, setTopText] = useState('TOP TEXT');
  const [bottomText, setBottomText] = useState('BOTTOM TEXT');

  const getImage = () => {
    // create a randomizer
    const memesArray = memesData.data.memes;
    const randomGeneratedNumber = Math.floor(Math.random() * memesArray.length);

    // get url of image(RNG)
    const url = memesArray[randomGeneratedNumber].url

    // set url
    setUrl(url)
    // console.log(url)
  };

  const handleChangeTopText = (event) => {
    setTopText(event.target.value)
  }
  const handleChangeBottomText = (event) => {
    setBottomText(event.target.value)
  }

  return (
    <>
      {/* text input for top and bottom */}
      <form className="form">
        <div className="main-input-area">
          <input
            className="main-input"
            type="text"
            placeholder="Top text here..."
            onChange={handleChangeTopText}
          ></input>
          <input
            className="main-input"
            type="text"
            placeholder="Bottom text here..."
            onChange={handleChangeBottomText}
          ></input>
        </div>
      </form>
      {/* BUTTON AREA */}
      <div className="main-button-area">
        <button className="main-button" type="button" onClick={getImage}>
          SELECT NEW IMAGE
        </button>
        {/* <button className='main-button' type='text' onClick={() => alert('submit')}>SUBMIT MEME</button> */}
      </div>

      {/* PICTURE GENERATOR */}
      <div className="main-image-area">
        <h3 className="main-image-top-text">{topText}</h3>
        <img
          className="main-image"
          src={
            url
          }
        />
        <h3 className="main-image-bottom-text">{bottomText}</h3>
      </div>
    </>
  );
};

export default Main;
