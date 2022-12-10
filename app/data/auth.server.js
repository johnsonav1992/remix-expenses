import { hash, compare } from "bcryptjs"
import { prisma } from "./database.server"

export const signup = async ({ email, password }) => {
    const existingUser = await prisma.user.findFirst({ where: { email }})

    if (existingUser) {
        const error = new Error('A user with the provided email address exists already.')
        error.status = 422
        throw error
    }

    const passwordHash = await hash(password, 12)

    await prisma.user.create({data: { email: email, password: passwordHash}})
}

export const login = async ({ email, password }) => {
    const existingUser = await prisma.user.findFirst({ where: { email }})

    if (!existingUser) {
        const error = new Error('Could not log in - A user with the provided email address does not exist.')
        error.status = 401
        throw error
    }

    const passwordIsCorrect = await compare(password, existingUser.password)

    if (passwordIsCorrect) {
        const error = new Error('Could not log in - password incorrect. Please try again')
        error.status = 401
        throw error
    }
}