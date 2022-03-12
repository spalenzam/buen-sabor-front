import React from 'react'
import { Routes, Route } from "react-router-dom";
import BuenSaborScreen from '../components/buenSabor/BuenSaborScreen';

const DashBoardRoutes = () => {
    return (
        <>
            {/* <Navbar/> */}

            <div className='container'>
                <Routes>
                    <Route path="/" element={<BuenSaborScreen />} />
                                
                </Routes>
            </div>
            
        </>
    )
}

export default DashBoardRoutes
