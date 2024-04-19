import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom';
import { PaymentProvider } from './context/PaymentContext';
const PagePaymentControl = lazy(() => import("./pages/pagePaymentPucharses"));
const PaymentRoutes = () => {

    return (
        <PaymentProvider>
            <Routes>
                <Route index element={<PagePaymentControl />} />
                <Route path="compras" element={<PagePaymentControl />} />
            </Routes>
        </PaymentProvider>
    )
}
export default PaymentRoutes