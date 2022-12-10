import { redirect } from '@remix-run/node'
import React from 'react'
import AuthForm from '~/components/auth/AuthForm'
import { signup } from '~/data/auth.server'
import { validateCredentials } from '~/data/validation.server'

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

    try {
        validateCredentials(credentials)
    } catch (err) {
        return err
    }

    try {
        if (authMode === 'login') {

        } else {
            await signup(credentials)
            return redirect('/expenses')  
        }
    } catch (err) {
        if (err.status === 422) {
            return {
                credentials: err.message
            }
        }
    }
}

export const links = () => {
    return [{rel: 'stylesheet', href: authStyles}]
}

export default AuthPage