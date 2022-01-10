import { useState } from "react";
import FormData from "form-data";
import axios from "axios";
//right now supports two species of catfish
function App() {
  const [file, setFile] = useState(null);
  const [pred, setPred] = useState(null);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleClassifyRequest = () => {
    let data = new FormData();

    //it's important that "file" is set for the name (first) parameter
    //basically, you can think of "name" as the name of the array for a particular field
    //I'm assuming that with post request, the image/file must be in this array for api request to work (??)
    data.append("file", file, file.name);
    console.log("Type of file: ", typeof file);
    // console.log(URL.createObjectURL(file));
    axios
      .post(
        "http://127.0.0.1:8000/classifybear/",
        data //{
        // headers: {
        //   accept: "application/json",
        //   "Accept-Language": "en-US,en;q=0.8",
        //   "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        // },
        //})
      )
      .then((response) => {
        setPred(response.data.class);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  return (
    <>
      <h1>Bear Classifier</h1>
      <label
        id="custom-file-upload"
        style={{
          display: "inline-block",
          padding: "6px 12px",
          background: "#add8e6",
          borderRadius: "5px",
        }}
      >
        <input
          onChange={handleFileUpload}
          type="file"
          id="img"
          name="img"
          accept="image/*"
          hidden
        />
        Upload Image
      </label>
      {file && (
        <label style={{ paddingLeft: "10px" }} htmlFor="custom-file-upload">
          {file.name}
        </label>
      )}
      <div>
        <button onClick={handleClassifyRequest}>Classify</button>
      </div>
      {file && <img width={400} src={URL.createObjectURL(file)} />}
      {pred && <h2>Prediction: {pred}</h2>}
    </>
  );
}

export default App;
