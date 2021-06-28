import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
//Router
import { Link } from "react-router-dom";
//Image refactoring function
import { smallImage } from "../util";

const Game = ({ name, released, id, image }) => {
    //Load details
    const dispatch = useDispatch();
    const loadDetailHandler = () => {
        document.body.style.overflow = "hidden";
        dispatch(loadDetail(id));
    };
    return (
        <StyledGame onClick={loadDetailHandler}>
            <Link to={`/game/${id}`}>
                <h3>{name}</h3>
                <p>Released Date: {released}</p>
                <img src={smallImage(image, 640)} alt={name} />
            </Link>
        </StyledGame>
    );
};

const StyledGame = styled(motion.div)`
    cursor: pointer;
    min-height: 30vh;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 1rem;
    overflow: hidden;
    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
    }
`;

export default Game;
