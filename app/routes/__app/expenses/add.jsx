import React from 'react'
import { useNavigate } from '@remix-run/react'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { addExpense } from '~/data/expenses.server'
import { redirect } from '@remix-run/node'
import { validateExpenseInput } from '~/data/validation.server'
import { requireUserSession } from '~/data/auth.server'

const AddExpensesPage = () => {
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

export const action = async ({ request }) => {
    const userId = await requireUserSession(request)
    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData)
    
    try {
        validateExpenseInput(expenseData)
    } catch(err) {
        return err
    }
    
    await addExpense(expenseData, userId)

    return redirect('/expenses')
}

export default AddExpensesPage