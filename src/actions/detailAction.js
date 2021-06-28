import axios from "axios";
import { gameDetailsURL, GameScreenshotURL } from "../api";

//Action Creator

export const loadDetail = (id) => async (dispatch) => {
    //Fetch Data
    const detailData = await axios.get(gameDetailsURL(id));
    const screenShotData = await axios.get(GameScreenshotURL(id));
    dispatch({
        type: "GET_DETAIL",
        payload: {
            game: detailData.data,
            screenshots: screenShotData.data,
        },
    });
};
