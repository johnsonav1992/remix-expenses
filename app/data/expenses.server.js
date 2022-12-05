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
    }
}

export const getExpenses = async () => {
    try {
        return await prisma.expense.findMany({orderBy: {
            date: 'desc'
        }})
    } catch (err) {
        console.error(err)
    }
}

export const getExpense = async (id) => {
    try {
        return await prisma.expense.findFirst({ where: { id }})
    } catch (err) {
        console.error(err)
    }
}