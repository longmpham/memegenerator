import React, { useState, useEffect } from "react";
import "./Main.css";
import memesData from "../../memesData";

const Main = () => {

  // const [url, setUrl] = useState("https://i.imgflip.com/4acd7j.png");
  // const [topText, setTopText] = useState("TOP TEXT");
  // const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [formData, setFormData] = useState({
    topText: "top text",
    bottomText: "bottom text",
    url: "https://i.imgflip.com/4acd7j.png"
  });
  const [memesArr, setMemesArr] = React.useState(memesData)

  // const [loading, setLoading] = useState(false);
  // const [memes, setMemes] = useState('');

  const getImage = () => {
    // create a randomizer
    const memesArray = memesArr.data.memes
    const randomGeneratedNumber = Math.floor(Math.random() * memesArray.length);

    // get url of image(rng)
    const url = memesArray[randomGeneratedNumber].url;

    // set url of new image!
    setFormData(prevFormData => ({
      ...prevFormData,
      url: url,
    }))
    // console.log(url)

    // now update the text fields to be blank
  };



  // useEffect(() => {

  //   const fetchData = async () => {

  //     // 1. loading screen
  //     // 2. get promise (await for data)
  //     // 3. setdata and/or log
  //     // 4. set loading false
  //     // 5. call function
      
  //     setLoading(true);

  //     const response = await fetch(memesData);
  //     console.log(response)
  //     const memesD = await response.text();

  //     console.log(memesD);
  //     setMemes(memesD);
  //     setLoading(false);

  //   }
  //   fetchData();
  // },[])

  // const handleChangeTopText = (event) => {
  //   setTopText(event.target.value);
  // };

  // const handleChangeBottomText = (event) => {
  //   setBottomText(event.target.value);
  // };
  
  // create one handler for the textchanges.
  const handleTextChange = (event) => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }
  
  const handleSubmit = (event) => { 
    event.preventDefault();
    console.log(formData)
    console.log('submit')
  }

  return (
    <>
      {/* text input for top and bottom */}
      <form onSubmit={handleSubmit} className="form">
        <div className="main-input-area">
          <input
            className="main-input"
            type="text"
            placeholder="Top text here..."
            onChange={handleTextChange}
            name="topText"
          ></input>
          <input
            className="main-input"
            type="text"
            placeholder="Bottom text here..."
            onChange={handleTextChange}
            name="bottomText"
          ></input>
        </div>
        {/* BUTTON AREA */}
        <div className="main-button-area">
          <button className="main-button" type="submit" onClick={getImage}>
            SELECT NEW MEME
          </button>
          {/* <button className='main-button' type='text' onClick={() => alert('submit')}>SUBMIT MEME</button> */}
        </div>
      </form>
      {/* PICTURE GENERATOR */}
      <div className="main-image-area">
        <h3 className="main-image-top-text">{formData.topText}</h3>
        {/* <h3 className="main-image-top-text">{topText}</h3> */}
        <img className="main-image" src={formData.url} />
        <h3 className="main-image-bottom-text">{formData.bottomText}</h3>
        {/* <h3 className="main-image-bottom-text">{bottomText}</h3> */}
      </div>
    </>
  );
};

export default Main;
