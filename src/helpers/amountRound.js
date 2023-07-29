export function amountRound(amount) {
    if (amount > 1000000000) return (amount/1000000000).toFixed(1)+'kkk';
    if (amount > 1000000) return (amount/1000000).toFixed(1)+'kk';
    if (amount > 1000) return (amount/1000).toFixed(1)+'k';
    return  amount;
}