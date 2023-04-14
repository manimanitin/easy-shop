import React, { useReducer, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../reducers/auth.reducer';
import { setCurrentUser } from '../actions/Auth.actions';
import AuthGlobal from './AuthGlobal';

const Auth = (props) => {
    const [stateUser, dispatch] = useReducer(authReducer,
        {
            isAuthenticated: false,
            user: {}
        });

    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        if (AsyncStorage.jwt) {
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
            if (setShowChild) {
                dispatch(setCurrentUser(jwt_decode(decoded)));
            }
        }
        return () => setShowChild(false);
    }, []);


    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{ stateUser, dispatch }}
            >
                {props.children}

            </AuthGlobal.Provider>
        );
    }


};
export default Auth;