import {createContext, useEffect, useState} from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import LoginPage from "../components/LoginPage";

const ContextAuth = createContext();

const API_LOGOUT = 'http://localhost:5000/authentication/logout';
const API_AUTHORIZATION = 'http://localhost:5000/authentication/';

const ContextAuthProvider = (props) => {
    const [state, setState] = useState({
        userId: null,
        authorized: false,
    });

    useEffect(() => {
        (async () => {
            const data = await asyncAuthorizationRequest();
            console.log('data: ', data);
            if (data.success)
                setState({
                    ...state,
                    ...data,
                    authorized: true,
                });
        })();
    }, []);

    const asyncAuthorizationRequest = async () => {
        try {
            const response = await axios.get(API_AUTHORIZATION);
            return response.data;
        }catch (e) {
            console.error(e);
        }
    }

    const asyncLogoutRequest = async () => {
        try {
            const response = await axios.get(API_LOGOUT);
            return response.data;
        }catch (e) {
            console.error(e);
        }
    }

    const onClickSignIn = (dataSignIn) =>
        setState({
            ...state,
            ...dataSignIn,
            authorized: true,
        });

    const onClickSignOut = () => {
        (async () => {
            const data = await asyncLogoutRequest();
            if (data.success)
                setState({
                    ...state,
                    userId: null,
                    authorized: false,
                });
        })();
    };

    return (
        <ContextAuth.Provider
            value={{
                userId: state.userId,
                authorized: state.authorized,
                onClickSignIn,
                onClickSignOut,
            }}
        >
            {props.children}
        </ContextAuth.Provider>
    );
}

export { ContextAuth, ContextAuthProvider as default };