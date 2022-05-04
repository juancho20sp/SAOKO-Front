import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    // From AWS config window
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID
}

export default new CognitoUserPool(poolData);