import { prisma } from "./database.server"

export const addExpense = async (expenseData) => {
    try {
        return await prisma.expense.create(
            {
                data: {
                    title: expenseData.title,
                    amount: +expenseData.amount,
                    date: new Date(expenseData.date)
                }
            }
        )
    } catch (err) {
        console.error(err)
        throw new Error('Failed to add expense.')
    }
}

export const getExpenses = async () => {
    try {
        return await prisma.expense.findMany({orderBy: {
            date: 'desc'
        }})
    } catch (err) {
        console.error(err)
        throw new Error('Failed to get expenses.')
    }
}

export const getExpense = async (id) => {
    try {
        return await prisma.expense.findFirst({ where: { id }})
    } catch (err) {
        console.error(err)
        throw new Error('Failed to get expense.')
    }
}

export const updateExpense = async (id, expenseData) => {
    try {
        return await prisma.expense.update({
            where: { id },
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date)
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error('Failed to update expense.')
    }
}

export const deleteExpense = async (id) => {
    try {
        return await prisma.expense.delete({ 
            where: { id }
        })
    } catch (err) {
        console.error(err)
        throw new Error('Failed to delete expense.')
    }
}