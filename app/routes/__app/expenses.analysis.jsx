import React from 'react'
import { useCatch, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'

import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import Chart from '~/components/expenses/Chart'
import { getExpenses } from '~/data/expenses.server'
import Error from '~/components/util/Error'

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

    if (!expenses || expenses.length === 0) {
        throw json( { message: 'Could not load expenses analysis'}, {
            status: 404,
            statusText: 'Expenses not found.'
        })
    }

    return expenses
}

export const CatchBoundary = () => {
    const caughtResponse = useCatch()

    return <main>
        <Error title={caughtResponse.statusText}>
            <p>{caughtResponse.data?.message ||
            'Something went wrong'}</p>
        </Error>
    </main>
}

export default ExpensesAnalysisPage