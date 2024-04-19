import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Product, Pusharse } from '../../payment.interface'
import { usePaymentContext } from '../../context/PaymentContext'

interface ModalProductPusharsesProps {
    isProductModalVisible: boolean,
    toggleProductModal?: () => any
    pusharse: Pusharse
}
const ModalProductPusharses: React.FC<ModalProductPusharsesProps> = ({ isProductModalVisible, toggleProductModal, pusharse }) => {
    const { pusharses, currentPusharse } = usePaymentContext()

    /*     const [dataProduct, setDataProduct] = useState([
            {
                id: 1, name: "ALICATE DE CORTE 6' TRUPER", amount: "3"
            }
        ]) */
    return (
        <>
            <Modal
                backdrop={false}
                style={{
                    maxWidth: '1100px',
                    width: '25%',
                    height: '10%',
                    margin: 'auto'
                }}
                size="lg"
                isOpen={isProductModalVisible}
                onClick={toggleProductModal}
                scrollable={true}
                centered
            >
                <ModalHeader toggle={toggleProductModal}>
                    Productos |  compra  {currentPusharse.numberDocument}
                </ModalHeader>
                <ModalBody>
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPusharse.details?.map((row, index) => (
                                <tr key={index + 1}>
                                    <td> {index +1}</td>
                                    <td>{row.productName}</td>
                                    <td>{row.costo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter >
                    {/* <Button className="modal-effect  d-grid mb-3" onClick={toggleVertically}>Cerrar</Button> */}
                    {/* <Button type="button" className="btn btn-primary"> + Nuevo </Button> */}
                </ModalFooter>
            </Modal>
            {isProductModalVisible && <div className="background-modal" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(14, 13, 13, 0.055)',
                //  backdropFilter: 'blur(1px)', // Aplicar desenfoque
            }}
            />
            }
        </>

    )
}

export default ModalProductPusharses