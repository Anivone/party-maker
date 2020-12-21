import React, {useContext, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import axios from "axios";
import {ContextAuth} from "../context/ContextAuth";
import {Redirect, useHistory} from "react-router-dom";

const API_LOGIN = 'http://localhost:5000/authentication/login'

const LoginPage = () => {
    const [state, setState] = useState({
        email: "",
        password: "",

        redirect: null
    });

    const authContext = useContext(ContextAuth);

    const onChangeEmail = (evt) => {
        setState({
            ...state,
            email: evt.target.value
        });
    }

    const onChangePassword = (evt) => {
        setState({
            ...state,
            password: evt.target.value
        });
    }

    const asyncPostRequest = async () => {
        try {
            const response = await axios.post(API_LOGIN, {
                email: state.email,
                password: state.password
            });
            return response.data;
        } catch (e) {
            console.error(e)
        }
    }

    const onClickButton = async () => {
        const data = await asyncPostRequest();
        authContext.onClickSignIn({
            authorized: data.authorized,
            userId: data.userId,
        });
    }

    const onClickRegister = (evt) => {
        setState({
            ...state,
            redirect: '/registration'
        })
    }

    if (authContext.authorized)
        return <Redirect to='/'/>;

    if (state.redirect)
        return <Redirect to={state.redirect}/>;

    return (
        <div className='container d-flex vh-100 justify-content-center align-content-center'>
            <div className='w-25 h-100 d-flex flex-column justify-content-center align-content-center'>
                <h3 className='text-center mb-3'>Login</h3>
                <TextField
                    className='mb-4'
                    label={'Email'}
                    variant={"outlined"}
                    value={state.email}
                    type={'email'}
                    placeholder='Input your email'
                    onChange={onChangeEmail}
                />
                <TextField
                    className='mb-4'
                    label={'Password'}
                    variant={"outlined"}
                    value={state.password}
                    type={'password'}
                    placeholder='Input your password'
                    onChange={onChangePassword}
                />
                <Button
                    className='mb-3'
                    color={"secondary"}
                    variant={"contained"}
                    onClick={onClickButton}
                >
                    Login
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={onClickRegister}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}

export default LoginPage;