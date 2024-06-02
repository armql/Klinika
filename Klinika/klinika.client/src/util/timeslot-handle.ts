export const getTimespanForSlot = (slot: number) => {
    switch (slot) {
        case 1:
            return '08:00 - 09:00';
        case 2:
            return '09:00 - 10:00';
        case 3:
            return '10:00 - 11:00';
        case 4:
            return '11:00 - 12:00';
        case 5:
            return '12:00 - 13:00';
        case 6:
            return '13:00 - 14:00';
        case 7:
            return '14:00 - 15:00';
        case 8:
            return '15:00 - 16:00';
        case 9:
            return '16:00 - 17:00';
        case 10:
            return '17:00 - 18:00';
        default:
            return 'Not available';
    }
};