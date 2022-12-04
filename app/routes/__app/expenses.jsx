import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { FaPlus, FaDownload } from 'react-icons/fa'

import ExpensesList from '~/components/expenses/ExpensesList'
import { getExpenses } from '~/data/expenses.server'

const ExpensesLayout = () => {
    const expenses = useLoaderData()

    return (
        <>
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={expenses}/>
            </main>
        </>
    )
}

export const loader = async () => {
    const expenses = await getExpenses()
    return expenses
}


export default ExpensesLayout