import { Outlet } from '@remix-run/react'
import React from 'react'

import ExpensesHeader from "~/components/navigation/ExpensesHeader";


import expensesStyles from '~/styles/expenses.css'

const ExpensesAppLayout = () => {
    return (
        <>
            <ExpensesHeader />
            <Outlet />
        </>
    )
}

export function links() {
    return [{ rel: 'stylesheet', href: expensesStyles}]
}

export default ExpensesAppLayout