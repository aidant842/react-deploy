import React, { useState } from "react";
//Animation and Styles
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
//Redux and Routes
import { fetchSearched } from "../actions/gamesAction";
import { useDispatch } from "react-redux";

const Nav = () => {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState("");
    const inputHandler = (e) => {
        setTextInput(e.target.value);
    };
    const submitSearch = (e) => {
        e.preventDefault();
        dispatch(fetchSearched(textInput));
        setTextInput("");
    };
    const clearSearched = () => {
        dispatch({ type: "CLEAR_SEARCHED" });
    };
    return (
        <StyledNav>
            <Logo onClick={clearSearched}>
                <img src={logo} alt="Logo" />
                <h1>Ignite</h1>
            </Logo>
            <form className="search" onSubmit={submitSearch}>
                <input value={textInput} onChange={inputHandler} type="text" />
                <button type="submit">Search</button>
            </form>
        </StyledNav>
    );
};

const StyledNav = styled(motion.nav)`
    padding: 3rem 5rem;
    text-align: center;
    input {
        width: 30%;
        font-size: 1.5rem;
        padding: 0.5rem;
        border: none;
        margin-top: 1rem;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    }
    button {
        font-size: 1.5rem;
        border: none;
        padding: 0.5rem 2rem;
        cursor: pointer;
        color: white;
        background: #333;
    }
`;

const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
    img {
        height: 2rem;
        width: 2rem;
    }
`;

export default Nav;
