import AuthForm from '~/components/auth/AuthForm'
import { login, signup } from '~/data/auth.server'
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

    const formData = await request.formData()
    const credentials = Object.fromEntries(formData)

    try {
        validateCredentials(credentials)
    } catch (err) {
        return err
    }

    try {
        if (authMode === 'login') {
            return await login(credentials)
        } else {
            return await signup(credentials)
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