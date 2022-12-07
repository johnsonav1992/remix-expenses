import React from 'react'
import AuthForm from '~/components/auth/AuthForm'

import authStyles from '~/styles/auth.css'


const AuthPage = () => {
    return (
        <AuthForm />
    )    
}

export const action = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams
    const authMode = searchParams.get('mode') || 'login'

    const formData = await requestAnimationFrame.formData()
    const credentials = Object.fromEntries(formData)

    if (authMode === 'login') {

    } else {
    
    }
}

export const links = () => {
    return [{rel: 'stylesheet', href: authStyles}]
}

export default AuthPage