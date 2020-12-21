import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Button} from "@material-ui/core";
import Person from "./Person";

const API_GET_PEOPLE = 'http://localhost:5000/parties/recommendation/'

const PartyRecommendations = ({
                                  partyId
                              }) => {

    const [state, setState] = useState({
        open: false,

        people: []
    });

    useEffect(() => {
        (async () => {
            const data = await asyncGetRequest();
            if (data.success)
                setState({
                    ...state,
                    ...data,
                });
        })();
    }, [state.authorized]);

    const asyncGetRequest = async () => {
        try {
            const response = await axios.get(API_GET_PEOPLE + partyId);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    const onClickButton = async () => {
        setState({
            ...state,
            open: !state.open
        })
    }

    const convertDate = (date) => {
        const myDate = new Date(date);
        return <span>{myDate.getFullYear()}/{myDate.getMonth()}/{myDate.getDate()}</span>
    }

    return (
        <div className='d-flex flex-column'>
            <Button
                variant={"outlined"}
                onClick={onClickButton}
            >
                Recommendations
            </Button>
            {state.people && state.open
                ? state.people.map(p => <Person
                    firstName={p.firstName}
                    lastName={p.lastName}
                    middleName={p.middleName}
                    birthDate={convertDate(p.birthDate)}
                    city={p.city}
                    personId={p.id}
                />)
                : null
            }

        </div>
    );

}

export default PartyRecommendations;