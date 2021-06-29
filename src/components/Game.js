import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { popUp } from "../animations";
//Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
//Router
import { Link } from "react-router-dom";
//Image refactoring function
import { smallImage } from "../util";

const Game = ({ name, released, id, image }) => {
    //Stringify
    const stringPathId = id.toString();
    //Load details
    const dispatch = useDispatch();
    const loadDetailHandler = () => {
        document.body.style.overflow = "hidden";
        dispatch(loadDetail(id));
    };
    return (
        <StyledGame
            variants={popUp}
            initial="hidden"
            animate="show"
            layoutId={stringPathId}
            onClick={loadDetailHandler}
        >
            <Link to={`/game/${id}`}>
                <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
                <motion.p>Released Date: {released}</motion.p>
                <motion.img
                    layoutId={`image ${stringPathId}`}
                    src={smallImage(image, 640)}
                    alt={name}
                />
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
