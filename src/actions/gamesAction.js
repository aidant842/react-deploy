import axios from "axios";
import {
    popularGamesURL,
    upcomingGamesURL,
    newGamesURL,
    searchGameURL,
} from "../api";

//Action Creator

export const loadGames = () => async (dispatch) => {
    //Fetch Data
    const popularData = await axios.get(popularGamesURL());
    const upcomingData = await axios.get(upcomingGamesURL());
    const newGamesData = await axios.get(newGamesURL());
    dispatch({
        type: "FETCH_GAMES",
        payload: {
            popular: popularData.data.results,
            upcoming: upcomingData.data.results,
            newGames: newGamesData.data.results,
        },
    });
};

export const fetchSearched = (game_name) => async (dispatch) => {
    const searchGames = await axios.get(searchGameURL(game_name));
    dispatch({
        type: "FETCH_SEARCHED",
        payload: {
            searched: searchGames.data.results,
        },
    });
};
