import React, { useEffect, useState } from "react";
import "./new.scss";
import Sidebar from "../../Components/sidebar/Sidebar";
import NavBar from "../../Components/navbar/NavBar";
import { DriveFolderUploadOutlined, UploadFile } from "@mui/icons-material";
import { auth, db, storage } from "../../firebase-config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function NEW({ inputs, title }) {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [prog, setProgress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploDFile = () => {
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, imgUrl: downloadURL }));
          });
        }
      );
    };

    file && uploDFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      (res) => {
        setDoc(doc(db, "users", res?.user.uid), {
          ...data,
          timestamp: serverTimestamp(),
        })
          .then(() => navigate(-1))
          .catch((err) => {
            alert(err);
          });
      }
    );

    //   try{
    //  const res = await createUserWithEmailAndPassword(auth,data.email,data.password);
    //  await setDoc(doc(db,"users",res.user.uid),{
    //    ...data,

    //  })
    //   }
    //   catch (error){
    //     console.log(error);
    //   }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Default"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  id="file"
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input?.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}

              <button disabled={prog !== null && prog < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NEW;
