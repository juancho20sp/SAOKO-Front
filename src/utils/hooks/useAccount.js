import React, { useState } from 'react';

// Navigation
import  routes  from '../routes/routes';
import { useNavigate } from 'react-router-dom';


// Redux
import { useDispatch } from 'react-redux';
import { login, logout as reduxLogout, setUserData } from '../../redux/slices/loginSlice';

// AWS
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../aws/UserPool';

const useAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    /**
     * Used to retrieve the current user session
     * @returns The attributes of the user || error
     */
    const getSession = async () => {
        setIsLoading(true);

        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();

            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        setIsLoading(false);
                        reject();
                    }

                    const attributes = await new Promise((resolve, reject) => {
                        user.getUserAttributes((err, attributes) => {
                        if (err) {
                            setIsLoading(false);
                            reject();
                        }

                        const results = {};
                        for (let attribute of attributes) {
                            const { Name, Value } = attribute;
                            results[Name] = Value;
                        }

                        setIsLoading(false);
                        resolve(results);
                        });
                    });

                    setIsLoading(false);
                    resolve({ user, ...session, attributes });
                });
            } else {
                setIsLoading(false);
                reject();
            }
        });
    };

    /**
     * Used to authenticate an user
     * @param {*} Username -> Users username
     * @param {*} Password -> Users password
     * @returns The user data || An error object
     */
    const authenticate = async (Username, Password) => {
        setIsLoading(true);
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    setIsLoading(false);
                    resolve(data);
                    
                    // $
                    debugger;
                    dispatch(login(JSON.stringify(data))); 
                    
                    // Set user attributes
                    getSession().then(({attributes}) =>{
                        dispatch(setUserData(attributes));
                    });

                    navigate(routes.home.path);                 
                },
                onFailure: (err) => {
                    setIsLoading(false);
                    console.log(err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    setIsLoading(false);
                    resolve(data);

                    dispatch(login(JSON.stringify(data)));

                    // Set user attributes
                    getSession().then(({attributes}) =>{
                        dispatch(setUserData(attributes));
                    });

                    navigate(routes.home.path); 
                },
            });
        });
    };

    /**
     * Logs out the current user
     */
    const logout = () => {
        setIsLoading(true);
        const user = Pool.getCurrentUser();

        if (user) {
            user.signOut();
            dispatch(reduxLogout());
            setIsLoading(false);
        }
    };

  return {
    getSession,
    authenticate,
    logout,
    isLoading
  }
};

export default useAccount;
