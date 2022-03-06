import React, { useState, useEffect } from "react";
import "./Main.css";
import html2canvas from 'html2canvas';

const Main = () => {

  const saveImageRef = React.useRef()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    topText: "top text",
    bottomText: "bottom text",
    url: "https://i.imgflip.com/4acd7j.png",
  });
  const [memesArrFromApi, setMemesArrFromApi] = React.useState([]);

  // load the images from imgflip
  // useEffect(() => {
  //   const fetchData = async () => {
  //     fetch("https://api.imgflip.com/get_memes")
  //       .then((response) => response.json())
  //       .then((data) => setMemesArrFromApi(data.data.memes));
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch("https://api.imgflip.com/get_memes")
      const data = await response.json()
      setMemesArrFromApi(data.data.memes);
      setLoading(false)
    };
    fetchData();
  }, []);

  const handleSaveImage = async () => {
    console.log('save image')
    const element = saveImageRef.current
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true
    })
    const data = canvas.toDataURL('image/png')
    const link = document.createElement('a')

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  // console.log(memesArrFromApi);

  const getImage = () => {
    // create a randomizer
    const memesArray = memesArrFromApi;
    const randomGeneratedNumber = Math.floor(Math.random() * memesArray.length);

    // get url of image(rng)
    const url = memesArray[randomGeneratedNumber].url;

    // set url of new image!
    setFormData((prevFormData) => ({
      ...prevFormData,
      url: url,
    }));
    // console.log(url)
  };

  // create one handler for the textchanges.
  const handleTextChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log("submit");
  };



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
          <button className="main-button" type="submit" onClick={getImage}>SELECT NEW MEME</button>
          <button className='main-button' type='button' onClick={handleSaveImage}>SAVE MEME</button>
        </div>
      </form>
      {/* PICTURE GENERATOR */}
      {loading && <h3>LOADING IMAGES</h3> }
      <div ref={saveImageRef} className="main-image-area">
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
