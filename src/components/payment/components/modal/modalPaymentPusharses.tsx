import React, { useEffect, useState } from 'react'
import { Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import TablePayment, { DataPayment } from '../tables/tablePayment';
import FormAddPayment from '../forms/formAddPayment';
import { usePaymentContext } from '../../context/PaymentContext';
import { services } from '../../services/services';
interface ModalPaymentPusharsesProps {
    isPaymentModalVisible: boolean,
    isShowContainerPaymentDetails: boolean
    togglePaymentModal: () => any

}
const ModalPaymentPusharses: React.FC<ModalPaymentPusharsesProps> = (
    { isPaymentModalVisible, togglePaymentModal, isShowContainerPaymentDetails }
) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { currentPusharse, paymentsCurrentPusharse, totalPayment } = usePaymentContext()
    const toogleFormVisible = () => setIsFormVisible(!isFormVisible)


    return (
        <>
            <Modal
                backdrop={false}
                style={{ maxWidth: '1100px', width: '80%', margin: 'auto' }}
                size="lg"
                isOpen={isPaymentModalVisible}
                centered
                onClosed={() => { toogleFormVisible }}
                onClick={() => { }}>
                <ModalHeader toggle={() => {
                    togglePaymentModal()
                    setIsFormVisible(false)
                }} className="p-5">
                    Pagos de la compra: {currentPusharse.numberDocument}
                </ModalHeader>
                <ModalBody className='overflow-scroll'>
                    {
                        paymentsCurrentPusharse?.length != 0 ?
                            <TablePayment dataPayment={paymentsCurrentPusharse} /> :
                            <p style={{
                                color: '#f06161',
                                textAlign: "center"
                            }}>No se encontraron pagos realizados</p>
                    }

                </ModalBody>
                {
                    isFormVisible && currentPusharse.totalAmount > totalPayment && (
                        <ModalBody className="px-5 border-top" >
                            <h4>Registrar pago</h4>
                            <FormAddPayment
                                setIsFormVisible={setIsFormVisible}
                            />
                        </ModalBody>
                    )
                }
                {
                    ((totalPayment > 0 || isFormVisible)) && (
                        <ModalFooter>
                            <div className="d-flex flex-column  justify-content-end">
                                <div className="d-flex gap-5 justify-content-between px-lg-7 py-lg-0">
                                    <Label className="">TOTAL PAGADO: </Label>
                                    <Label className="amount">{totalPayment}</Label>
                                </div>
                                <div className="d-flex gap-5 justify-content-between px-lg-7 py-lg-0">
                                    <Label className="">TOTAL A PAGAR: </Label>
                                    <Label className="amount">{currentPusharse.totalAmount}</Label>
                                </div>
                                <div className="d-flex gap-5 justify-content-between px-lg-7 py-lg-0">
                                    <Label className="">PENDIENTE DE PAGO: </Label>
                                    <Label className="amount">{
                                        (currentPusharse.totalAmount - totalPayment).toFixed(2)
                                    }</Label>
                                </div>
                            </div>
                        </ModalFooter>
                    )
                }
                {
                    currentPusharse.totalAmount > totalPayment &&
                    !isFormVisible &&
                    <ModalFooter
                        className='d-flex justify-content-center'>
                        <button className='btn btn-primary' onClick={toogleFormVisible}>
                            + Nuevo Pago
                        </button>
                    </ModalFooter>
                }
            </Modal>
            {isPaymentModalVisible && <div className="background-modal" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(14, 13, 13, 0.055)',
                //backdropFilter: 'blur(1px)', // Aplicar desenfoque

            }} />}
        </>

    )
}

export default ModalPaymentPusharses

