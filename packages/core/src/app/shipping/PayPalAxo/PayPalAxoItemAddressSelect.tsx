import { Address, CustomerAddress } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent, memo, useCallback } from 'react';

import ShippableItem from '../ShippableItem';
import PayPalAxoAddressSelect from './PayPalAxoAddressSelect';

export interface PayPalAxoItemAddressSelectProps {
    item: ShippableItem;
    addresses: CustomerAddress[];
    onSelectAddress(address: Address, itemId: string, itemKey: string): void;
    onUseNewAddress(address: Address | undefined, itemId: string, itemKey: string): void;
}

const PayPalAxoItemAddressSelect: FunctionComponent<PayPalAxoItemAddressSelectProps> = ({
    item: { id, key, imageUrl, quantity, name, options, consignment },
    addresses,
    onSelectAddress,
    onUseNewAddress,
}) => {
    const handleUseNewAddress = useCallback(
        (address: Address) => {
            onUseNewAddress(address, id as string, key);
        },
        [id, onUseNewAddress, key],
    );

    const handleSelectAddress = useCallback(
        (address: Address) => {
            onSelectAddress(address, id as string, key);
        },
        [id, key, onSelectAddress],
    );

    return (
        <div className="consignment">
            <figure className="consignment-product-figure">
                {imageUrl && <img alt={name} src={imageUrl} />}
            </figure>

            <div className="consignment-product-body">
                <h4 className="optimizedCheckout-contentPrimary">{`${quantity} x ${name}`}</h4>

                {(options || []).map(({ name: optionName, value, nameId }) => (
                    <ul
                        className="product-options optimizedCheckout-contentSecondary"
                        data-test="consigment-item-product-options"
                        key={nameId}
                    >
                        <li className="product-option">{`${optionName} ${value}`}</li>
                    </ul>
                ))}

                <PayPalAxoAddressSelect
                    addresses={addresses}
                    onSelectAddress={handleSelectAddress}
                    onUseNewAddress={handleUseNewAddress}
                    selectedAddress={consignment && consignment.shippingAddress}
                />
            </div>
        </div>
    );
};

export default memo(PayPalAxoItemAddressSelect);
