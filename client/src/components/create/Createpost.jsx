import { useState, useEffect, useContext } from "react";
import { API } from "../../service/api";

import {
  Box,
  FormControl,
  InputBase,
  styled,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataProvider.jsx";

const Container = styled(Box)`
  margin: 50px 120px;
`;

const Image = styled("img")({
  width: "100%",
  height: "70vh",
  objectFit: "cover",
});
const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: 200;
  border-color: cyan;

  margin-top: 50px;
  font-size: 18px;
  // &:focus-visible {
  //   outline: none;
  // }
`;
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};
const Createpost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const location = useLocation();
  const { account } = useContext(DataContext);
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const response = await API.uplaodFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Image src={url} alt="postbanner" />
      <StyledFormControl>
        <label htmlFor="fileinput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileinput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button variant="contained">Publish</Button>
      </StyledFormControl>
      <Textarea
        minRows={4}
        placeholder="Write your mind ✒️"
        onChange={(e) => handleChange(e)}
        name="description"
      />
    </Container>
  );
};

export default Createpost;
