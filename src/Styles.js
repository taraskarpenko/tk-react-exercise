import styled from "styled-components";
import { NavLink } from 'react-router-dom'

const NewRecipeButton = styled.button`
allign: center;
width: 90%;
margin: 5px 0px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
font-size: 18px;
padding: 10px;
`;

const SearchField = styled.input`
font-size: 18px;
display:flex;
allign: center;
width: 70%;
padding: 10px;
`;

const SideBarWrapper = styled.div`
display:flex;
border-style: solid;
border-width:2px;
border-color:green;
flex-basis: 30%;
flex-direction: column;
`;

const SideBarLink = styled(NavLink)`
background-color: #f5efbf;
color: black;
padding: 14px 25px;
text-align: center;
text-decoration: none;
display:flex;
font-size: 18px;

&.active {
    border-style: solid;
    border-width:2px;
    border-color:green;
    color: black;
    background-color: #dff7a1;
    text-decoration: underline;
  };
`;


const AppWraper = styled.div`
  height: 100%;
  text-align: center;
  position: float;
  display: flex;
`;


export { SideBarWrapper, AppWraper, SideBarLink, SearchField, NewRecipeButton }