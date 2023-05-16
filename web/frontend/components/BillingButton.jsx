import React from 'react';

const BillingButton = ({ redirectToBilling }) => {
    return (
        <button onClick={redirectToBilling} className="your-button-styles">
            Upgrade to Premium
        </button>
    );
};

export default BillingButton;
