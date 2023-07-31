import { mount } from 'enzyme';
import React from 'react';

import { getAddress, getCart, getConsignment, getCustomer, getPhysicalItem, getShippingAddress } from '@bigcommerce/checkout/test-utils';

import { getCountries } from '../../geography/countries.mock';

import PayPalAxoShipping from './PayPalAxoShipping';
import PayPalAxoShippingForm from './PayPalAxoShippingForm';
import * as usePayPalConnectAddress from './usePayPalConnectAddress';

describe('PayPalAxoShipping', () => {
    const defaultProps = {
        isBillingSameAsShipping: true,
        cart: {
            ...getCart(),
            lineItems: {
                physicalItems: [{ ...getPhysicalItem(), quantity: 3 }],
                giftCertificates: [],
                digitalItems: [],
            },
        },
        customer: getCustomer(),
        isGuest: false,
        onCreateAccount: jest.fn(),
        onSignIn: jest.fn(),
        assignItem: jest.fn(),
        addresses: getCustomer().addresses,
        cartHasChanged: false,
        countries: getCountries(),
        countriesWithAutocomplete: [],
        consignments: [
            { ...getConsignment(), id: 'foo' },
            { ...getConsignment(), id: 'bar' },
        ],
        createCustomerAddress: jest.fn(),
        customerMessage: 'comment',
        shippingAddress: getShippingAddress(),
        isInitializing: false,
        isMultiShippingMode: false,
        shouldShowOrderComments: true,
        onMultiShippingSubmit: jest.fn(),
        onSingleShippingSubmit: jest.fn(),
        isLoading: false,
        isShippingStepPending: false,
        deleteConsignments: jest.fn(),
        updateAddress: jest.fn(),
        onUseNewAddress: jest.fn(),
        getFields: jest.fn(() => []),
        onUnhandledError: jest.fn(),
        initialize: jest.fn(),
        deinitialize: jest.fn(),
        signOut: jest.fn(),
        shouldValidateSafeInput: true,
        shouldShowAddAddressInCheckout: true,
        shouldShowMultiShipping: false,
        onMultiShippingChange: jest.fn(),
    };

    it('loads shipping data  when component is mounted', () => {
        jest.spyOn(usePayPalConnectAddress, 'default').mockImplementation(
            jest.fn().mockImplementation(() => ({
                mergeAddresses: () => getAddress(),
            }))
        );

        const component = mount(<PayPalAxoShipping {...defaultProps} />);

        expect(component.find(PayPalAxoShippingForm)).toHaveLength(1);
    });
});
