[comment]: <> ([![Stargazers][stars-shield]][stars-url])

[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->

<br  />

<div  align="center">

<a  href="https://payze.io"  target="_blank">

<img  src="https://payze.io/assets/images/logo_v2.svg"  alt="Logo"  height="40">

</a>

<h3  align="center">Payze React Native SDK</h3>

</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Payze is the best software platform for running an internet business. We handle money movement flow for our customers by giving them tools they need.

<!-- GETTING STARTED -->

## Installation

Install the package in your project

```
npm install @payze/payze-rn
```

### Installing dependencies

Payze SKD uses [react-native-webview](https://www.npmjs.com/package/react-native-webview) , so you need to install it in your project too

##### If you are using Expo, run:

```
expo install react-native-webview
```

and you should be good to go.
</br>

##### If you are running bare React Native project, run:

```
npm i react-native-webview
```

From react-native 0.60 autolinking will take care of the link step but don't forget to run `pod install`.

_NOTE: If you ever need to uninstall React Native [react-native-webview](https://www.npmjs.com/package/react-native-webview) , run `react-native unlink react-native-webview` to unlink it._

##### iOS & macOS:

If using CocoaPods, in the `ios/` or `macos/` directory run:

```
$ pod install
```

## Basic Usage

```jsx
import React, { useRef } from 'react';
import  Payze  from  "@payze/payze-rn";

// Transaction id given by Payze
const  TRANSACTION_ID = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
const info = {
	cardNumber:  "123456789101",
	cardHolder:  "NAME SURNAME",
	expirationDate:  "01/22",
	securityNumber:  "000",
	billingAddress:  "Address",
};

export  default  function  App() {
	const payMethod = useRef();

	const  setPayMethod = (pay) => (payMethod.current = pay);

	const  onSuccess = () => alert("SUCCESS!");
	const  onError = (errorCode) => alert(`ERROR! ${errorCode}`);

	const pay = () => {
		payMethod.current(
			info.cardNumber,
			info.cardHolder,
			info.expirationDate,
			info.securityNumber,
			TRANSACTION_ID,
			info.billingAddress,
			onSuccess,
			onError
		);
	}

	return (
		...
		...
		<Payze  setPay={setPayMethod}  />
	)
}
```

### For complete example, please visit [Payze example project](https://github.com/payzeio/payze-react-native-sdk-example)

### Props

| Prop                   | Type               | Default | Note                                                                         |
| ---------------------- | ------------------ | ------- | ---------------------------------------------------------------------------- |
| `setPay`               | `Method, Required` |         | Method that takes single argument - Pay() method (see the signature, below). |
| `closeButtonTitle`     | `String`           | `close` | Title of the modal's close button                                            |
| `closeButtonTextStyle` | `Object`           |         | Object to stylise close button                                               |

### Pay() method arguments

| Argument         | Type               | Default | Note                                                                                                         |
| ---------------- | ------------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| `cardNumber`     | `String, Required` |         | Number of the card.                                                                                          |
| `cardHolder`     | `String, Required` |         | Holder of the card.                                                                                          |
| `expirationDate` | `String, Required` |         | Expiration date of the card.                                                                                 |
| `securityNumber` | `String, Required` |         | CVC/CVV of the card.                                                                                         |
| `transactionId`  | `String, Required` |         | Transaction id given by Payze.                                                                               |
| `billingAddress` | `String, Required` |         | Billing address of user (can be an empty string).                                                            |
| `onSuccess`      | `Method, Required` |         | Method to be called after a successful transaction.                                                          |
| `onError`        | `Method, Required` |         | Method to be called after an error while trying to process transaction, that takes errorCode as an argument. |

### Types

```
type errorCode {
	BAD_REQUEST:  1002,
	CARD_VERIFICATION_CANCELLED:  1003,
	TRANSACTION_FAILURE:  1004,
	UNKNOWN_ERROR:  1005,
}
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/LICENSE.txt
