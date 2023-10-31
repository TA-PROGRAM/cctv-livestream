import React from 'react'
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom"
import logo from '../../../assets/image/logo-404.png'

function Page401() {
  const history = useHistory()
  return (
    <div className=" flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div className="flex flex-column align-items-center justify-content-center">
        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, rgba(51, 160, 250, 0.4) 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
            <div className="flex justify-content-center align-items-center bg-pink-500 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
              <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
            </div>
            <h1 className="text-900 font-bold text-5xl mb-2">ไม่มีหน้านี้</h1>
            <div className="text-600 mb-5">กรุณากลับไปหน้าหลัก</div>
            <img src={logo} alt="Error" className="mb-5" width="80%" />
            <Button icon="pi pi-arrow-left" label="กลับสู่หน้าหลัก" text onClick={() => history.push(`/`)
            } />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page401