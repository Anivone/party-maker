import React, {useEffect, useState} from "react";
import axios from "axios";

const API_GET_RATING = 'http://localhost:5000/person/rating/'

const PersonRating = ({
                          personId
                      }) => {

    const [state, setState] = useState({
        musicRating: 0,
        atmosphereRating: 0,
        organizationRating: 0,
        friendlyRating: 0,
        adequateRating: 0,
        civilizedRating: 0,
    });

    useEffect(() => {
        (async () => {
            const data = await asyncGetRequest();
            console.log('data: ', data);
            if (data.success)
                setState({
                    ...state,
                    ...data.personRating,
                });
        })();
    }, [state.authorized]);

    const asyncGetRequest = async () => {
        try {
            const response = await axios.get(API_GET_RATING + personId);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='d-flex flex-row justify-content-around'>
            <div className='d-flex flex-column'>
                <div>
                    <span><b>Music Rating: </b> {state.musicRating}</span>
                </div>
                <div>
                    <span><b>Atmosphere Rating: </b> {state.atmosphereRating}</span>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <div>
                    <span><b>Organization Rating: </b> {state.organizationRating}</span>
                </div>
                <div>
                    <span><b>Friendly Rating: </b> {state.friendlyRating}</span>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <div>
                    <span><b>Adequate Rating: </b> {state.adequateRating}</span>
                </div>
                <div>
                    <span><b>Civilized Rating: </b> {state.civilizedRating}</span>
                </div>
            </div>
        </div>
    );

}

export default PersonRating;