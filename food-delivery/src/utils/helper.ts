export const amountFormatting = (amount: number): string => {
    let formattedAmount = String(amount);

    if (String(amount).length === 1) {
        formattedAmount = '0' + String(amount);
    }

    return formattedAmount;
}