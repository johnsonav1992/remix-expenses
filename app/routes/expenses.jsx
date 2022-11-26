import { Outlet } from '@remix-run/react'

import expensesStyles from '~/styles/expenses.css'

const ExpensesLayout = () => {
    return (
        <main>
            <p>Shared element!</p>
            <Outlet />
        </main>
    )
}

export const links = () => {
    return [{rel: 'stylesheet', href: expensesStyles}]
}

export default ExpensesLayout