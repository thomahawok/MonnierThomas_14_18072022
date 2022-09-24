import EukaDataTable from 'euka-datatables'
import { useGlobalState } from '../state/State'
import { getUsers } from '../services/getUsers'
import { useEffect, useState } from 'react'
import { deleteUser } from '../services/deleteUser'

/**
 * DataTable component
 * @returns {React.ReactElement} JSX.Element - the list of employees
 */

export default function DataTable() {
  const selected = document.querySelector('.selected-info')
  const [employeesList, setEmployeesList] = useState()
  const [employeesListToDelete, setEmployeesListToDelete] = useState()

  if (
    employeesListToDelete !== null &&
    employeesListToDelete !== undefined &&
    selected !== null
  ) {
    selected.addEventListener('click', (e) => {
      console.log(employeesListToDelete)
      employeesListToDelete.map((data) => deleteUser(data.id))
    })
  }

  useEffect(() => {
    getUsers()
      .then((data) => {
        setEmployeesList(data)
      })
      .catch((error) => console.log(error))
  }, [])

  let columns = [
    {
      name: 'firstName',
      label: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
    },
    {
      name: 'startDate',
      label: 'Start Date',
    },
    {
      name: 'department',
      label: 'Department',
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
    },
    {
      name: 'street',
      label: 'Street',
    },
    {
      name: 'city',
      label: 'City',
    },
    {
      name: 'state',
      label: 'State',
    },
    {
      name: 'zipCode',
      label: 'Zip Code',
    },
  ]

  let options = {
    responsive: 'collapse',
    recordsPerPageOptions: { 10: 10, 25: 25, 50: 50, 100: 100 },
    selectRows: true,
    onRowsSelect: (selectedData) => {
      'selectedData'

      setEmployeesListToDelete(selectedData)
    },
  }

  return (
    <>
      <section className="dataTable">
        <h2 className="dataTable__employeeTitle">Current Employees</h2>
        <EukaDataTable
          key={'table-1'}
          columns={columns}
          data={employeesList}
          options={options}
        />
      </section>
    </>
  )
}
