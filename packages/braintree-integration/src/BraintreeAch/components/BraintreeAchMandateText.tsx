import React, { FunctionComponent, useEffect } from 'react';

import { useCheckout, usePaymentFormContext } from '@bigcommerce/checkout/payment-integration-api';
import { useLocale } from '@bigcommerce/checkout/locale';
import { CheckboxFormField } from '@bigcommerce/checkout/ui';

import { OwnershipTypes } from '../constants';

export interface BraintreeAchMandateTextProps {
    isInstrumentFeatureAvailable?: boolean;
    updateMandateText: (mandateText: string) => void;
}

const BraintreeAchMandateText: FunctionComponent<BraintreeAchMandateTextProps> = ({
    isInstrumentFeatureAvailable,
    updateMandateText,
}) => {
    const { checkoutState } = useCheckout();
    const { paymentForm } = usePaymentFormContext();
    const { language } = useLocale();

    const {
        businessName,
        accountType,
        accountNumber,
        routingNumber,
        ownershipType,
        firstName,
        lastName,
    } = paymentForm.getFormValues();

    const depositoryName = ownershipType === OwnershipTypes.Business ? businessName : `${firstName} ${lastName}`;
    const outstandingBalance = checkoutState.data.getCheckout()?.outstandingBalance;
    const storeName = checkoutState.data.getConfig()?.storeProfile.storeName;
    const symbol = checkoutState.data.getCart()?.currency.symbol;

    const mandateTextTranslationKey = isInstrumentFeatureAvailable
        ? 'payment.braintreeach_vaulting_mandate_text'
        : 'payment.braintreeach_mandate_text';

    const mandateTextTranslationProps = {
        accountType: String(accountType).toLowerCase(),
        accountNumber: String(accountNumber),
        currentDate: new Date().toJSON().slice(0, 10),
        depositoryName: String(depositoryName),
        routingNumber: String(routingNumber),
        outstandingBalance: `${symbol}${outstandingBalance}`,
        storeName: String(storeName),
    };

    const mandateText = language.translate(mandateTextTranslationKey, mandateTextTranslationProps);

    useEffect(() => {
        updateMandateText(mandateText);
    }, [mandateText, updateMandateText]);

    const handleChange = (value: boolean) => {
        paymentForm.setFieldValue('orderConsent', value);
    };

    return (
        <div className="mandate-text" data-test="mandate-text">
            <CheckboxFormField
                labelContent={mandateText}
                name="orderConsent"
                onChange={handleChange}
            />
        </div>
    );
};

export default BraintreeAchMandateText;
