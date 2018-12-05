import React from 'react';
export const NoMatchingTransaction = () => {
  return (
    <table class="dapp-zebra transactions">
      <tbody>
        <tr class="full-width">
          <td colspan="3">No matching transactions found.</td>
        </tr>
      </tbody>
    </table>
  );
};

export default NoMatchingTransaction;
