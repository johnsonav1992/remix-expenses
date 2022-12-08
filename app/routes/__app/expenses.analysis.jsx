import React from 'react'
import { useLoaderData } from '@remix-run/react'

import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import Chart from '~/components/expenses/Chart'
import { getExpenses } from '~/data/expenses.server'

const ExpensesAnalysisPage = () => {
    const expenses = useLoaderData()

    return (
        <main>
            <Chart expenses={expenses}/>
            <ExpenseStatistics expenses={expenses}/>
        </main>
    )    
}

export const loader = async () => {
    const expenses = await getExpenses()
    return expenses
}

export default ExpensesAnalysisPage