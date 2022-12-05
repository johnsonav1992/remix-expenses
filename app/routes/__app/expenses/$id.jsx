import { redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import React from 'react'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { deleteExpense, updateExpense } from '~/data/expenses.server'
import { validateExpenseInput } from '~/data/validation.server'
// import { getExpense } from '~/data/expenses.server'

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

// export const loader = async ({ params }) => {
//     const expenseId = params.id
//     const expense = await getExpense(expenseId)
//     return expense
// }

export const action = async ({ params, request }) => {
    const expenseId = params.id
    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData)
    
    if(request.method === 'PATCH') {
        try {
            validateExpenseInput(expenseData)
        } catch (err) {
            return err
        }
        
        await updateExpense(expenseId, expenseData)
        return redirect('/expenses')
    }

    await deleteExpense(expenseId)
    return redirect('/expenses')
}

export default UpdateExpensesPage