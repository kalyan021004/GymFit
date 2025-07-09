import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";

// Navbar container
const Nav = styled.div`
  background: linear-gradient(90deg, #1f2937, #4f46e5);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

// Inner wrapper
const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Logo container
const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
  color: #ffffff;
`;

const Logo = styled.img`
  height: 44px;
`;

// Mobile menu icon
const Mobileicon = styled.div`
  color: #ffffff;
  display: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

// Nav items desktop
const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// Styled link
const Navlink = styled(NavLink)`
  color: #e5e7eb;
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #22c55e;
  }

  &.active {
    color: #22c55e;
    border-bottom: 2px solid #22c55e;
  }
`;

// Avatar + logout
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TextButton = styled.div`
  color: #ef4444;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: #f87171;
  }
`;

// Mobile menu
const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  position: absolute;
  top: 80px;
  right: 0;
  background-color: #1f2937;
  padding: 20px 40px;
  border-radius: 0 0 12px 12px;
  list-style: none;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: all 0.4s ease-in-out;
  z-index: 999;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setisOpen(!isOpen)}>
          <MenuRounded sx={{ fontSize: 28 }} />
        </Mobileicon>

        <NavLogo to="/">
          <Logo src={LogoImg} alt="GymFit Logo" />
          <span>
            Gym<span style={{ color: "#22C55E" }}>Fit</span>
          </span>
        </NavLogo>

        <MobileMenu isOpen={isOpen}>
          <Navlink to="/" onClick={() => setisOpen(false)}>🏠 Dashboard</Navlink>
          <Navlink to="/workouts" onClick={() => setisOpen(false)}>🏋️ Workouts</Navlink>
          <Navlink to="/tutorials" onClick={() => setisOpen(false)}>🎥 Tutorials</Navlink>
          <Navlink to="/blogs" onClick={() => setisOpen(false)}>📝 Blogs</Navlink>
          <Navlink to="/contact" onClick={() => setisOpen(false)}>📞 Contact</Navlink>
        </MobileMenu>

        <NavItems>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/tutorials">Tutorials</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </NavItems>

        <UserContainer>
          <Avatar sx={{ bgcolor: "#4F46E5" }} src={currentUser?.img}>
            {currentUser?.name?.[0]?.toUpperCase()}
          </Avatar>
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
