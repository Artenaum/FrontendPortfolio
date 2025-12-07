import {OutlinedInput} from '@mui/material'
import InputStyles from '../../styles/Inputs.module.css'
import {useEffect, useState} from 'react'

interface TableInputFieldProps {
    initialValue: string
    exportFieldValue: (value: string) => void
}

const TableInputField = ({initialValue, exportFieldValue}: TableInputFieldProps) => {
    const [fieldValue, setFieldValue] = useState<string>(initialValue)

    useEffect(() => {
        exportFieldValue(fieldValue)
    }, [fieldValue])

    return (
        <OutlinedInput
            className={`${InputStyles.commonInput} ${InputStyles.textInputRegular}`}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
        />
    )
}

export default TableInputField
