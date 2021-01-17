import React from 'react'
import { BarLoader } from 'react-spinners'

export default function SplashScreen() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h5>Starting Website</h5>
      <BarLoader color={`#007bff`} width={150} />
    </div>
  )
}
