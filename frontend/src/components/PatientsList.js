import { useEffect, useMemo, forwardRef, useRef } from "react";
import { useTable, useRowSelect } from 'react-table';

// Checkbox to allow user to select patients from the list
const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

// Interactive patient table allows user to select one (and only one) patient
// from the patient table. This selected value is used to assign appointments to
// patients
function PatientTable({ columns, data, setSelectedRows }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    toggleAllRowsSelected,
    prepareRow,
    state: { selectedRowIds },
  } = useTable({ autoResetSelectedRows: false, columns, data },
               useRowSelect,
               hooks => {
                 hooks.visibleColumns.push(columns => [
                   {
                     id: 'selection',
                     Cell: ({ row }) => (
                       <div>
                         <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                       </div>
                     ),
                   },
                   ...columns,
                 ])
               });
    
    useEffect(()=>{
      setSelectedRows(selectedRowIds);
    },[setSelectedRows,selectedRowIds])

  return (
    <>
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps({
          style: {
            backgroundColor: row.isSelected ? 'green' : '',
          },
          onClick: e => {
            toggleAllRowsSelected(false)
            row.toggleRowSelected()
          },
        })}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip"
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
    );
  }

const PatientsList = ({patients, setCurrentPatient}) => {

    const columns = useMemo(
      () => [
        {
          Header: 'Patient ID',
          accessor: 'pk', // accessor is the "key" in the data
        },
        {
          Header: 'First Name',
          accessor: 'first_name',
        },
        {
          Header: 'Last Name',
          accessor: 'last_name',
        },
      ],
      []
    )
    
    if (patients.length === 0) {
      return <div>No Patient data available</div>;
    }
  
    return (
      <div>
        <h2>Patients</h2>
            <PatientTable columns={columns} data={patients} setSelectedRows={setCurrentPatient} />
      </div>
    );

};

export default PatientsList;
