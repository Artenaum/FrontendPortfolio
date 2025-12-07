import {Checkbox, TableBody, TableCell, TableRow} from '@mui/material'
import type {GenericData} from '../../../shared/types/common.types'

interface EnhancedTableBodyProps {
    data: GenericData[]

    tableSetting: {
        header: string
        headerKey: string
        editId?: number | string
        editKey?: string
    }[]

    addRowSelection?: boolean
    selected?: readonly (number | string)[]
    handleCheckbox?: (id: number | string) => void
}

const EnhancedTableBody = (props: EnhancedTableBodyProps) => {
    return (
        <TableBody>
            {props.data.map((row) => {
                let isItemSelected = false
                if (props.addRowSelection) {
                    isItemSelected = props.selected!.includes(row.id)
                }
                return (
                    <TableRow
                        aria-checked={isItemSelected}
                        key={row.id}
                        selected={isItemSelected}
                    >
                        {props.addRowSelection && (
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    onClick={() => props.handleCheckbox!(row.id)}
                                />
                            </TableCell>
                        )}

                        {Object.entries(row).map(([key, rowValue]) => {
                            let setting = props.tableSetting.find(
                                (item) => item.headerKey === key
                            )

                            if (setting) {
                                if (setting.editId === row.id) {
                                    let editObject = Object.entries(row.editMode!).map(
                                        ([editKey, editValue]) => {
                                            if (editKey === setting.editKey) {
                                                return editValue
                                            }
                                        }
                                    )
                                    return <TableCell key={key}>{editObject}</TableCell>
                                } else {
                                    return <TableCell key={key}>{rowValue}</TableCell>
                                }
                            }
                        })}
                    </TableRow>
                )
            })}
        </TableBody>
    )
}

export default EnhancedTableBody
