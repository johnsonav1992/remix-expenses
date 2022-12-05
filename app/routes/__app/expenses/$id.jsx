import { useNavigate } from '@remix-run/react'
import React from 'react'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { getExpense } from '~/data/expenses.server'

const UpdateExpensesPage = () => {
    const navigate = useNavigate()

    const closeHandler = () => {
        navigate('..')
    }

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm />
        </Modal>
    )    
}

export const loader = async ({ params }) => {
    const expenseId = params.id
    const expense = await getExpense(expenseId)
    return expense
}

export default UpdateExpensesPage