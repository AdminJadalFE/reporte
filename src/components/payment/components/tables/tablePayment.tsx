import React from 'react'
import { Button } from 'reactstrap'
import { services } from '../../services/services'
import { usePaymentContext } from '../../context/PaymentContext'

export interface DataPayment {
    id: string,
    paymentDate: string,
    paymentMethod: string,
    destination: string,
    reference: string,
    amount: string
}
interface TablePaymentProps {
    dataPayment: DataPayment[]
}
const TablePayment: React.FC<TablePaymentProps> = (
    { dataPayment }

) => {
    const { updatePaymentsCurrentPusharse, currentPusharse, getData, period } = usePaymentContext()
    return (
        <table className="table custom-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Fecha de pago</th>
                    <th>Método de pago</th>
                    <th>Destino</th>
                    <th>Referencia</th>
                    <th>Monto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {dataPayment?.map((row, index) => (
                    <tr key={parseInt(row.id)}>
                        <td> {index + 1}</td>
                        <td>{row.paymentDate}</td>
                        <td>{row.paymentMethod}</td>
                        <td>{row.destination}</td>
                        <td>{row.reference}</td>
                        <td>{row.amount}</td>
                        <td>
                            <Button color="danger" size="sm" onClick={async () => {

                                await services.deletePaymentPusharse(parseInt(row.id))
                                await updatePaymentsCurrentPusharse(parseInt(currentPusharse.id))
                                if (currentPusharse.state == 1) {
                                    await services.updateStatePaymentPusharse(period.year, period.mounth, currentPusharse.id, 0)
                                    await getData()
                                }
                            }}
                                style={{
                                    height: "1.4rem",
                                }}
                                className='d-flex align-items-center'
                            >
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TablePayment