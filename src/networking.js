import qs from "qs";

const BASE_URL = "https://paygate.payze.io/";

const TRANSACTION_STATUS_URL = "mobile/transactionStatus";
const SEND_PAYMENT_DATA_URL = "mobile/cardInfo";

async function postData(url = "", data = {}) {
  const response = await fetch(BASE_URL + url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: qs.stringify(data),
  });
  return response.json();
}

async function getData(url = "", params = {}) {
  url += "?" + new URLSearchParams(params).toString();

  const response = await fetch(BASE_URL + url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

export const getTransactionStatus = (transactionId) =>
  getData(`${TRANSACTION_STATUS_URL}`, { transactionId });

export const sendPaymentData = (
  number,
  cardHolder,
  expirationDate,
  securityNumber,
  transactionId,
  billingAddress
) =>
  postData(`${SEND_PAYMENT_DATA_URL}`, {
    number,
    cardHolder,
    expirationDate,
    securityNumber,
    transactionId,
    billingAddress,
  });
