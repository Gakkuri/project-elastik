'use client'
import React from 'react'
import {CContainer, CTable, CButton} from '@coreui/react';

const columns = [
    {
        key: 'first_name',
        label: 'First Name',
    },
    {
        key: 'last_name',
        label: 'Last Name',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'date_of_birth',
        label: 'Date of Birth',
    },
    {
        key: 'remove_student',
        label: '',
        _style: { width: '1%' },
    },
];

const usersData = [
    {
        first_name: "John",
        last_name: "Doe",
        email: "test@gmail.com",
        date_of_birth: "11/11/2000"
    },
    {
        first_name: "Jane",
        last_name: "Doe",
        email: "test@gmail.com",
        date_of_birth: "10/10/2000"
    },
    {
        first_name: "Someone",
        last_name: "Doe",
        email: "test@gmail.com",
        date_of_birth: "12/12/2000"
    },
]

const StudentList = () => {
    const onRemoveStudent = () => {

    }

    return (
        <CContainer fluid>
            <CTable 
                columns={columns}
                items={usersData}
                itemsPerPage={10}
                pagination
            />
        </CContainer>
  )
}

export default StudentList