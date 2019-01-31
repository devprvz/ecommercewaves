import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';


class Paypal extends Component {
    render() {
        const onSuccess = (payment) => {
            /*{
                "paid": true,
                "cancelled": false,
                "payerID": "8FCG87AMSW62G",
                "paymentID": "PAYID-LRIBVRQ0TH618443C2864703",
                "paymentToken": "EC-34503636YD263293N",
                "returnUrl": "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LRIBVRQ0TH618443C2864703&token=EC-34503636YD263293N&PayerID=8FCG87AMSW62G", "address": { "recipient_name": "test buyer", "line1": "123 Sample St", "city": "Wellington", "state": "", "postal_code": "6004", "country_code": "NZ" }, "email": "prvz24-buyer@gmail.com"
            }*/
            this.props.onSuccess(payment);
        }

        const onCancel = (data) => {
            /* {
                "paymentToken": "EC-75Y0758091750050T",
                "paymentID": "PAYID-LRH7C3I0M771083NG521112E",
                "intent": "sale",
                "billingID": "EC-75Y0758091750050T",
                "cancelUrl": "https://www.paypal.com/checkoutnow/error?token=EC-75Y0758091750050T"
            }*/
            this.props.transactionCanceled(data)
        }

        const onError = (err) => {
            this.props.transactionError(err)
        }

        let env = 'sandbox';
        let currency = 'NZD';
        let total = this.props.toPay;

        const client = {
            sandbox: 'AYz3iEsOdpXiEeA1fr7S2TBEG6YBZiCqQVDlacClmQE0wsBzMZxvsgsc6J9MD1ThzXsHTaNF9phMy_V1',
            production: ''
        }

        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size: 'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                />
            </div>
        )
    }
}


export default Paypal
