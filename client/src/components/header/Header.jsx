import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Components = styled(AppBar)`
  background: #ffffff;
  color: #000;
`;
const Content = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 25px;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <Components>
      <Content>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Logout</Link>
      </Content>
    </Components>
  );
};

export default Header;
