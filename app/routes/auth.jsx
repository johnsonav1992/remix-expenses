import React from 'react'

import authStyles from '~/styles/auth.css'

const AuthPage = () => {
    return (
        <div>Auth</div>
    )    
}

export const links = () => {
    return [{rel: 'stylesheet', href: authStyles}]
}

export default AuthPage