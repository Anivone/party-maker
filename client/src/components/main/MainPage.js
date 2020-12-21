import React, {createContext, useContext, useEffect, useState} from "react";
import {Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import {ContextAuth} from "../../context/ContextAuth";
import Party from "../party/Party";

const API_PARTIES_REQUEST = 'http://localhost:5000/person/recommendation/'

const MainPage = () => {

    const authContext = useContext(ContextAuth);

    const [state, setState] = useState({
        authorized: false,
        person: []
    });

    useEffect(() => {
        (async () => {
            console.log(API_PARTIES_REQUEST + authContext.userId);
            const data = await asyncGetRequest();
            if (data.success)
                setState({
                    ...state,
                    ...data,
                    authorized: true,
                });
        })();
    }, [state.authorized]);

    const asyncGetRequest = async () => {
        try {
            const response = await axios.get(API_PARTIES_REQUEST + authContext.userId);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    if(state.person.recommendedParties) console.log('parties: ', state.person.recommendedParties);

    if (!authContext.authorized)
        return <Redirect to='/login'/>;

    return (
        <div className='container d-flex flex-column'>
            {state.person.recommendedParties
                ? state.person.recommendedParties.map(p => <Party
                        title={p.title}
                        description={p.description}
                        address={p.address}
                        date={p.date}
                        age={p.age}
                        requiredParticipants={p.requiredParticipants}
                        features={p.features}
                        options={p.options}
                        partyId={p._id}
                    />
                )
                : null
            }
        </div>
    );

}

export default MainPage;