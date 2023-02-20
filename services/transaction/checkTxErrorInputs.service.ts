export const checkTxErrorInputs = (
  amountInput: string,
  tokenAddressInput: string,
  receiverAddressInput: string
) => {
  if (tokenAddressInput.length !== 42) {
    return "Token address must be 40 characters long";
  }
  if (tokenAddressInput.substring(0, 2) !== "0x") {
    return "Token address must start with '0x'";
  }
  if (isNaN(parseInt(amountInput))) {
    return "Amount must be a number";
  }
  if (receiverAddressInput.length !== 42) {
    return "Receiver address must be 40 characters long";
  }
  if (receiverAddressInput.substring(0, 2) !== "0x") {
    return "Receiver address must start with '0x'";
  }
};
