import { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Box, TextField, Button, Typography } from "@mui/material";
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

const Comp = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: auto;
`;

const Image = styled("img")({
  width: `100px`,
  margin: `auto`,
  display: `flex`,
  padding: `50 0 0`,
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: black;
  height: 48px;
  border-radius: 2px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: blue;
  color: black;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const intialValues = {
  name: "",
  username: "",
  password: "",
};
const intialLogin = {
  username: "",
  password: "",
};
const Login = ({ isUserAuth }) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, toggleAccount] = useState("login");
  const [login, setLogin] = useState();
  const [signup, setSignup] = useState(intialLogin);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleSignup = () => {
    toggleAccount(account === "login" ? "signup" : "login");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const { setAccount } = useContext(DataContext);
  const signupUser = async function () {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        setError("");
        setSignup(intialValues);
        toggleAccount("login");
      }
    } catch (error) {
      setError("Something went wrong! Please try again later");
    }
  };
  const loginUser = async () => {
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        setError("");
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        setAccount(
          { username: response.data.username },
          { name: response.data.name }
        );
        isUserAuth(true);
        navigate("/");
      }
    } catch (error) {
      setError("Something went wrong! Please try again later");
    }
  };

  return (
    <Comp>
      <Box>
        <Image src={imageURL} alt="Login.png" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              id="login-username"
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter username"
              variant="filled"
            />
            <TextField
              id="login-password"
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
              variant="standard"
            />
            {error && <Error>{error}</Error>}

            <LoginButton onClick={() => loginUser()} variant="outlined">
              Log in
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={toggleSignup} variant="contained">
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="signup-name"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
              variant="filled"
            />
            <TextField
              id="signup-username"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
              variant="filled"
            />
            <TextField
              id="signup-password"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
              variant="standard"
            />

            <SignupButton onClick={() => signupUser()} variant="outlined">
              Sign up
            </SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton onClick={() => toggleSignup()} variant="contained">
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Comp>
  );
};

export default Login;
