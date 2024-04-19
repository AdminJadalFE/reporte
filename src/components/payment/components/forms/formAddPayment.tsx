import Select from 'react-select';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import { Button, Input, Label } from 'reactstrap'
import { filterOptionsPaymentMethod } from '../../datas/PaymentPusharses'
import { usePaymentContext } from '../../context/PaymentContext';
import { services } from '../../services/services';

interface FormAddProps {
  setIsFormVisible: Dispatch<SetStateAction<boolean>>
}
const FormAddPayment: React.FC<FormAddProps> = (
  { setIsFormVisible }
) => {
  const [isVisibleErrorForm, setIsVisibleErrorForm] = useState<boolean>(false)
  const [msgError, setMsgError] = useState<string>("")
  const [valueForm, setvalueForm] = useState({
    paymentDate: new Date().toISOString().slice(0, 10),
    paymentMethod: '',
    destination: '',
    reference: '',
    amount: 0
  })
  const { currentPusharse, updatePaymentsCurrentPusharse, totalPayment, getData, period } = usePaymentContext()

  const validForm = () => {
    const { paymentDate, paymentMethod, destination, reference, amount } = valueForm
    return paymentDate.trim() != "" || paymentMethod != null
      || destination != null || reference.trim() != "" || amount != 0
  }
  const [defaultSelect, setDefaultSelect] = useState<any>(
    null
  )
  const onChangePaymentDate = (e: any) => {
    console.log(e)
    const day = e.day;
    const mounth = e.month.number
    const year = e.year
    const dateStr = `${year}/${mounth}/${day}`
    let dateFormat = dateStr.split('/').map((parte, index) => index == 0 ? parte : parte.padStart(2, '0')).join('/');
    setvalueForm({
      ...valueForm,
      paymentDate: dateFormat
    })
  }
  const onChangePaymentMethod = (e: any) => {
    const value = e.value
    setvalueForm(
      {
        ...valueForm,
        paymentMethod: value
      }
    )
  }
  const onChangePaymentDestination = (e: any) => {
    const value = e.value
    setvalueForm(
      {
        ...valueForm,
        destination: value
      }
    )
  }
  const onChangeInput = (e: any) => {
    setvalueForm({
      ...valueForm,
      [e.target.name]: e.target.value
    })
    setDefaultSelect(null)
  }
  const clearForm = () => {
    setvalueForm({
      paymentDate: new Date().toISOString().slice(0, 10),
      paymentMethod: '',
      destination: '',
      reference: '',
      amount: 0
    }
    )
    setIsFormVisible(false)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(valueForm)
    if (!validForm()) {
      setMsgError("Formulario incompleto, por favor llenar todos los campos")
      return setIsVisibleErrorForm(true)
    }
    if (valueForm.amount > currentPusharse.totalAmount - totalPayment) {
      setMsgError("El monto ingresado es mayor al monto pendiente de pago")
      return setIsVisibleErrorForm(true)
    }
    const isSaved = await services.savePayment({
      idPusharse: parseInt(currentPusharse.id),
      paymentDate: valueForm.paymentDate,
      paymentMethod: valueForm.paymentMethod,
      destination: valueForm.destination,
      reference: valueForm.reference,
      amount: valueForm.amount
    })
    if (!isSaved) {
      console.log('hubo un error')
      return
    }
    await updatePaymentsCurrentPusharse(parseInt(currentPusharse.id))
    clearForm()


    if (valueForm.amount == parseFloat((currentPusharse.totalAmount - totalPayment).toFixed(2))
      && currentPusharse.state == 0
    ) {
      await services.updateStatePaymentPusharse(period.year, period.mounth, currentPusharse.id, 1)
      await getData()
      setIsFormVisible(false)
    }
  }

  useEffect(() => {
    // Si isVisibleErrorForm cambia a true, configuramos un temporizador para ocultar el mensaje después de 3 segundos
    if (isVisibleErrorForm) {
      const timeoutId = setTimeout(() => {
        setIsVisibleErrorForm(false);
        setMsgError('');
      }, 7000);
      return () => clearTimeout(timeoutId);
    }
  }, [isVisibleErrorForm]);

  return (
    <>
      {isVisibleErrorForm &&
        <div className="bg-danger-transparent-2 text-danger px-4 py-2 br-3 mb-4 mx-5" role="alert">{msgError}</div>
      }
      <form onSubmit={onSubmit}
        className='d-flex justify-content-around flex-wrap align-items-center px-5 justify-content-stretch'
        style={{ gap: ".8rem", }}>
        <div className="mb-3">
          <Label className="">
            Fecha de pago:
          </Label>
          <div className="input-group d-flex flex-nowrap">
            <div className="input-group-text">
              <div className="">
                <svg
                  className="svg-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H4V5h16zM4 21V10h16v11H4z" />
                  <path d="M4 5.01h16V8H4z" opacity=".3" />
                </svg>
              </div>
            </div>
            <DatePicker
              name='paymentDate'
              onChange={onChangePaymentDate}
              format='YYYY/MM/DD'
              value={valueForm.paymentDate}
            />
          </div>
        </div>
        <div className="mb-3">
          <Label className="form-label">Método de pago</Label>
          <Select
            defaultValue={defaultSelect}
            onChange={onChangePaymentMethod}
            options={filterOptionsPaymentMethod}
            placeholder="Seleccionar"
            classNamePrefix="Search"
            name='paymentMethod'
            required
          />
        </div>
        <div className="mb-3">
          <Label className="form-label">Destino</Label>
          <Select
            defaultValue={defaultSelect}
            onChange={onChangePaymentDestination}
            options={filterOptionsPaymentMethod}
            placeholder="Seleccionar"
            classNamePrefix="Search"
            name='destino'
            required
          />
        </div>
        <div className="mb-3">
          <Label className="form-label">Referencia</Label>
          <Input
            value={valueForm.reference}
            className="form-control w-9"
            type="text" name="reference"
            onChange={onChangeInput}
            required
          />
        </div>
        <div className="mb-3">
          <Label className="form-label">Monto</Label>
          <Input
            value={valueForm.amount}
            max={(currentPusharse.totalAmount - totalPayment).toFixed(2)}
            min={1}
            className="form-control w-9" type="number" name="amount"
            onChange={onChangeInput}
            step={0.01}
            required
          />
        </div>
        <div className="mb-3">
          <Label className="form-label">Acciones</Label>
          <div className="d-flex gap-1 flex-wrap">
            <Button className="btn btn-info"
              type='submit'
            ><i className="fe fe-check"></i></Button>
            <Button
              onClick={() => {
                clearForm()
              }}
              type="button" className="btn btn-danger" ><i className="fe fe-trash-2"></i></Button>
          </div>
        </div>
      </form>
    </>
  )
}
export default FormAddPayment