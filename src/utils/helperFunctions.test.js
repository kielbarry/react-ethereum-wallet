import * as Helpers from './helperFunctions.js';

describe('helper functions', () => {
  const toSentenceStringInputs = [
    '',
    'approve',
    'transferFrom',
    'splitTo2',
    'transfer20Shares',
    'send_payload',
    'send__payload__to_blockchain',
    'setURL',
    'IDONOTFOLLOWRULES',
    'formatFunctionName',
  ];

  const toSentenceExpectedOutputs = [
    '',
    'Approve',
    'Transfer from',
    'Split to 2',
    'Transfer 20 shares',
    'Send payload',
    'Send payload to blockchain',
    'Set url',
    'Idonotfollowrules',
    'Format function name',
  ];

  toSentenceStringInputs.map((str, ind) => {
    it(`returns correct sentence for ${str}`, () => {
      const fn = str => Helpers.toSentence(str);
      expect(fn(str)).toBe(toSentenceExpectedOutputs[ind].toString());
    });
  });

  const tokenCountFormatInputs = [
    1000000000000000000,
    1000000000000000,
    '',
    -1500000000000000000,
  ];

  const tokenCountFormatExpectedOutputs = ['1', '0.001', '0', '-1.5'];

  tokenCountFormatInputs.map((bal, ind) => {
    it(`returns correct sentence for ${bal}`, () => {
      const fn = (bal, dec) => Helpers.formatTokenCount(bal, 18);
      expect(fn(bal)).toBe(tokenCountFormatExpectedOutputs[ind].toString());
    });
  });
});
