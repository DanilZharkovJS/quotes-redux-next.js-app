import { ErrorMessageStyle } from '@/app/styles/ErrorMessageStyle'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import React from 'react'

function AlertError({ title = 'Error', message = 'Something went wrong', className }) {
  return (
    <div className={className}>
      <Alert variant="filled" severity="error" sx={ErrorMessageStyle}>
        <AlertTitle sx={{ fontWeight: '900' }}>{title}</AlertTitle>
        {message}
      </Alert>
    </div>
  )
}

export default AlertError
