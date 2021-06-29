import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useSelector } from "react-redux";
//Router
import { useHistory } from "react-router";
//Image refactoring function
import { smallImage } from "../util";
//Images
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathId }) => {
    //Data
    const { screenshots, game, isLoading } = useSelector(
        (state) => state.detail
    );
    const history = useHistory();
    //Exit Detail
    const exitDetailHandler = (e) => {
        const element = e.target;
        if (element.classList.contains("shadow")) {
            document.body.style.overflow = "auto";
            history.push("/");
        }
    };

    //Get stars
    const getStars = () => {
        const stars = [];
        const rating = Math.floor(game.rating);
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<img alt="star" key={i} src={starFull}></img>);
            } else {
                stars.push(<img alt="star" key={i} src={starEmpty}></img>);
            }
        }
        return stars;
    };

    //Get platform images
    const getPlatform = (platform) => {
        switch (platform) {
            case "PlayStation 4":
                return playstation;
            case "Xbox One":
                return xbox;
            case "PC":
                return steam;
            case "Nintendo Switch":
                return nintendo;
            case "iOS":
                return apple;
            default:
                return gamepad;
        }
    };
    return (
        <>
            {!isLoading && (
                <CardShadow className="shadow" onClick={exitDetailHandler}>
                    <Detail layoutId={pathId}>
                        <Stats>
                            <div className="rating">
                                <motion.h3 layoutId={`title ${pathId}`}>
                                    {game.name}
                                </motion.h3>
                                <motion.p layoutId={`rating ${pathId}`}>
                                    Rating: {game.rating}
                                </motion.p>
                                {getStars()}
                            </div>
                            <Info>
                                <h3>Platforms</h3>
                                <Platforms>
                                    {game.platforms.map((data) => (
                                        <img
                                            key={data.platform.id}
                                            src={getPlatform(
                                                data.platform.name
                                            )}
                                            alt={data.platform.name}
                                        />
                                    ))}
                                </Platforms>
                            </Info>
                        </Stats>
                        <Media>
                            <motion.img
                                layoutId={`image ${pathId}`}
                                src={smallImage(game.background_image, 1280)}
                                alt={game.name}
                            />
                        </Media>
                        <Description>
                            <p>{game.description_raw}</p>
                        </Description>
                        <div className="gallery">
                            {screenshots.results.map((data) => (
                                <img
                                    src={smallImage(data.image, 1280)}
                                    alt="game"
                                    key={data.id}
                                ></img>
                            ))}
                        </div>
                    </Detail>
                </CardShadow>
            )}
        </>
    );
};

const CardShadow = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    &::-webkit-scrollbar {
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #333;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const Detail = styled(motion.div)`
    width: 80%;
    border-radius: 1rem;
    padding: 2rem 5rem;
    background: white;
    position: absolute;
    left: 10%;
    color: black;
    img {
        width: 100%;
    }
`;

const Stats = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        width: 2rem;
        height: 2rem;
        display: inline;
    }
`;

const Info = styled(motion.div)`
    text-align: center;
`;

const Platforms = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    img {
        margin-left: 3rem;
    }
`;

const Media = styled(motion.div)`
    margin-top: 5rem;
    img {
        width: 100%;
    }
`;

const Description = styled(motion.div)`
    margin: 3rem 0rem;
`;

export default GameDetail;
