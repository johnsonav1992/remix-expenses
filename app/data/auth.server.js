import { hash, compare } from "bcryptjs"
import { createCookieSessionStorage, redirect } from "@remix-run/node"
import { prisma } from "./database.server"

const SESSION_SECRET = process.env.SESSION_SECRET

const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false
        , secrets: [SESSION_SECRET]
        , sameSite: 'lax'
        , maxAge: 30 * 24 * 60 * 60 // 30 days
        , httpOnly: true
    }
})

const createUserSession = async (userId, redirectPath) => {
    const session = await sessionStorage.getSession()
    session.set('userId', userId)
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session)
        }
    })
}

export const signup = async ({ email, password }) => {
    const existingUser = await prisma.user.findFirst({ where: { email }})

    if (existingUser) {
        const error = new Error('A user with the provided email address exists already.')
        error.status = 422
        throw error
    }

    const passwordHash = await hash(password, 12)

    const user = await prisma.user.create({data: { email: email, password: passwordHash}})

    return createUserSession(user.id, '/expenses')
}

export const login = async ({ email, password }) => {
    const existingUser = await prisma.user.findFirst({ where: { email }})

    if (!existingUser) {
        const error = new Error('Could not log in - A user with the provided email address does not exist.')
        error.status = 401
        throw error
    }

    const passwordIsCorrect = await compare(password, existingUser.password)

    if (!passwordIsCorrect) {
        const error = new Error('Could not log in - password incorrect. Please try again')
        error.status = 401
        throw error
    }

    return createUserSession(existingUser.id, '/expenses')
}