import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Pusharse } from "../payment.interface";
import { services } from "../services/services";
import { getYears } from "../utils";

interface PaymentContextType {
    period: { year: string, mounth: string }
    currentPusharse: Pusharse
    setCurrentPusharse: Dispatch<SetStateAction<Pusharse>>
    allPusharses: Pusharse[],
    pusharses: Pusharse[]
    setPusharses: Dispatch<SetStateAction<Pusharse[]>>
    paymentsCurrentPusharse: any[],
    setPaymentsCurrentPusharse: Dispatch<SetStateAction<any>>,
    totalPayment: number,
    updatePaymentsCurrentPusharse: (pusharseId: number) => any,
    getData: () => any,
    setPeriod: Dispatch<SetStateAction<any>>

}
const PaymentContext = createContext<PaymentContextType | undefined>(undefined)
export const PaymentProvider: React.FC<{ children?: React.ReactNode; }> = ({ children }: { children?: React.ReactNode }) => {
    const [currentPusharse, setCurrentPusharse] = useState<Pusharse>({} as Pusharse)
    const [pusharses, setPusharses] = useState<Pusharse[]>([])
    const [paymentsCurrentPusharse, setPaymentsCurrentPusharse] = useState<any[]>([])
    const [totalPayment, setTotalPayment] = useState<number>(0)
    const [period, setPeriod] = useState({
        year: new Date().getFullYear().toString(),
        mounth: (new Date().getMonth() + 1).toString().padStart(2, '0')
    })
    const [allPusharses, setAllPusharses] = useState<Pusharse[]>([])

    const updatePaymentsCurrentPusharse = async (pusharseId: number) => {
        const paymentsPusharseCurr = await services.listPaymentPusharse(pusharseId)
        setPaymentsCurrentPusharse(paymentsPusharseCurr)
    }
    getYears()
    const getData = async () => {
        try {
            const dataPusharse = await services.getPusharses(period.year, period.mounth)
            setPusharses(dataPusharse);
            setAllPusharses(dataPusharse)
        } catch (error) {
            setPusharses([])
            setAllPusharses([])
        }
    }
    useEffect(() => {
        getData()
    }, [period])
    useEffect(() => {
        let total = 0
        paymentsCurrentPusharse?.forEach((payment) => {
            total += payment.amount
        })
        setTotalPayment(total)
    }, [paymentsCurrentPusharse])

    return (
        <PaymentContext.Provider

            value={{ currentPusharse, setCurrentPusharse, pusharses, setPusharses, paymentsCurrentPusharse, setPaymentsCurrentPusharse, totalPayment, updatePaymentsCurrentPusharse, getData, setPeriod, period, allPusharses }}>
            {children}

        </PaymentContext.Provider>
    )
}
export const usePaymentContext = () => {
    const context = useContext(PaymentContext);
    if (context === undefined) {
        throw new Error("useBonus debe ser utilizado dentro de un BonusProvider");
    }
    return context
}