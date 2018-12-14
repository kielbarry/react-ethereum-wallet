import React from 'react';

export const NoMatchingTransaction = () => {
  return (
    <table className="dapp-zebra transactions">
      <tbody>
        <tr className="full-width">
          <td colSpan="3">No matching transactions found.</td>
        </tr>
      </tbody>
    </table>
  );
};

export default NoMatchingTransaction;
