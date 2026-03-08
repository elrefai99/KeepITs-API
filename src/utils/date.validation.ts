export function date_validation(payload: { checkin: string, checkout: string }) {
     const checkInDate: Date = new Date(`${payload.checkin}`);
     const checkOutDate: Date = new Date(`${payload.checkout}`);
     const diffInTime: number = checkOutDate.getTime() - checkInDate.getTime();
     const diffInDays: number = diffInTime / (1000 * 60 * 60 * 24);
     return { diffInDays, checkInDate, checkOutDate }
}
