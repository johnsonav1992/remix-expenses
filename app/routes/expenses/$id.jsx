import { useNavigate } from '@remix-run/react'
import React from 'react'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'

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

export default UpdateExpensesPage