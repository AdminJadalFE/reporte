import { fetchSinToken } from "../../../Util/fetch";
import { Pusharse } from "../payment.interface";

export interface Payment {
  idPusharse: number;
  paymentDate: string;
  paymentMethod: string;
  destination: string;
  reference: string;
  amount: number;
}
interface fecthPushurse {
  status: boolean;
  pusharses: Pusharse[];
}
const getPusharses = async (
  year: string,
  mounth: string
): Promise<Pusharse[]> => {
  try {
    const response: fecthPushurse = await fetchSinToken(
      "pusharse/list",
      "POST",
      {
        year,
        mounth,
      }
    );
    if (response.status) {
      //console.log(response.pusharses);
      return response.pusharses;
    }
    throw new Error(`Error en la solicitud`);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw Error;
  }
};
const listPaymentPusharse = async (idPusharse: number) => {
  try {
    const response = await fetchSinToken("/paymentPusharse/list", "POST", {
      idPusharse,
    });
    console.log(response);
    if (response.status) {
      return response.payment;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw Error;
  }
};
const deletePaymentPusharse = async (idPayment: number) => {
  try {
    const response = await fetchSinToken("paymentPusharse/delete", "POST", {
      idPayment,
    });
    return response.status;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw Error;
  }
};
const savePayment = async (payment: Payment) => {
  try {
    const response = await fetchSinToken(
      "paymentPusharse/save",
      "POST",
      payment
    );
    return response.status;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw Error;
  }
};
const updateStatePaymentPusharse = async (
  year,
  mounth,
  idPusharse: string,
  newState: number
) => {
  try {
    const response = await fetchSinToken("pusharse/updateState", "POST", {
      year,
      mounth,
      idPusharse,
      newState,
    });
    return response.status;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw Error;
  }
};

export const services = {
  getPusharses,
  listPaymentPusharse,
  deletePaymentPusharse,
  savePayment,
  updateStatePaymentPusharse,
};
