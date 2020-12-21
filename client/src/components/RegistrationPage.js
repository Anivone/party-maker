import React, {useContext, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import axios from "axios";
import {ContextAuth} from "../context/ContextAuth";
import {Redirect, useHistory} from "react-router-dom";

const API_REGISTER = 'http://localhost:5000/authentication/registration'

const RegistrationPage = () => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        birthDate: "",
        city: "",
        email: "",
        password: "",

        redirect: null
    });

    const authContext = useContext(ContextAuth);

    const onChangeInput = (evt) => {
        setState({
            ...state,
            [evt.target.name]: evt.target.value
        });
    }

    const asyncPostRequest = async () => {
        try {
            const response = await axios.post(API_REGISTER, {
                firstName: state.firstName,
                lastName: state.lastName,
                middleName: state.middleName,
                birthDate: state.birthDate,
                city: state.city,
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

    const onClickLogin = (evt) => {
        setState({
            ...state,
            redirect: '/login'
        })
    }

    if (authContext.authorized)
        return <Redirect to='/'/>;

    if (state.redirect) {
        console.log('redirected');
        return <Redirect to={state.redirect}/>;
    }

    return (
        <div className='container d-flex vh-100 justify-content-center align-content-center'>
            <div className='w-25 h-100 d-flex flex-column justify-content-center align-content-center'>
                <h3 className='text-center mb-3'>Registration</h3>
                <TextField
                    className='mb-3'
                    name={'firstName'}
                    label={'First Name'}
                    variant={"outlined"}
                    value={state.firstName}
                    type={'text'}
                    placeholder='Input your first name'
                    onChange={onChangeInput}
                />
                <TextField
                    className='mb-3'
                    name={'lastName'}
                    label={'Last Name'}
                    variant={"outlined"}
                    value={state.lastName}
                    type={'text'}
                    placeholder='Input your last name'
                    onChange={onChangeInput}
                />
                <TextField
                    className='mb-3'
                    name={'middleName'}
                    label={'Middle Name'}
                    variant={"outlined"}
                    value={state.middleName}
                    type={'text'}
                    placeholder='Input your middle name'
                    onChange={onChangeInput}
                />
                <TextField
                    className='mb-3'
                    name={'birthDate'}
                    label={'Birth Date'}
                    variant={"outlined"}
                    value={state.birthDate}
                    type={'text'}
                    placeholder='Input your birth date'
                    onChange={onChangeInput}
                />
                <TextField
                    className='mb-3'
                    name={'city'}
                    label={'City'}
                    variant={"outlined"}
                    value={state.city}
                    type={'text'}
                    placeholder='Input your city'
                    onChange={onChangeInput}
                />
                <TextField
                    className='mb-3'
                    name={'email'}
                    label={'Email'}
                    variant={"outlined"}
                    value={state.email}
                    type={'email'}
                    placeholder='Input your email'
                    onChange={onChangeInput}
                />
                <TextField
                    className='mb-3'
                    name={'password'}
                    label={'Password'}
                    variant={"outlined"}
                    value={state.password}
                    type={'password'}
                    placeholder='Input your password'
                    onChange={onChangeInput}
                />

                <Button
                    className='mb-3'
                    color={"secondary"}
                    variant={"contained"}
                    onClick={onClickButton}
                >
                    Register
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={onClickLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}

export default RegistrationPage;