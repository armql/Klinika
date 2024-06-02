import {useState} from "react";
import {addMonths, endOfDay, format, getDaysInMonth, isBefore, isSameDay, startOfDay} from "date-fns";
import {CaretLeft, CaretRight} from "@phosphor-icons/react";
import {timeSlots, zReservation} from "../store/zReservation";
import {useConditionalEffect} from "../../handata/hooks/useConditionalEffect.ts";

const Datepicker = () => {
    const {
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedDoctor,
    } = zReservation();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');

    const daysInMonthArray = Array.from(
        {length: getDaysInMonth(currentMonth)},
        (_v, i) => i + 1
    );

    const isDayInPast = (day: number) => {
        return isBefore(endOfDay(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)), startOfDay(new Date()));
    };

    const onDateClick = (day: number) => {
        const newDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day,
        );

        if (isDayInPast(day)) {
            return;
        }

        const formattedDate = format(newDate, 'MM/dd/yyyy');
        const reservation = selectedDoctor?.reservations.find(res => res.date === formattedDate);
        if (reservation && reservation.slots.length === timeSlots.length) {
            return;
        }

        setSelectedDate(newDate);
        setFormattedDate(formattedDate);
    };

    const isTimeSlotReserved = (day: number, slot: number) => {
        const formattedDate = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day), 'MM/dd/yyyy');
        if (selectedDoctor && selectedDoctor.reservations) {
            const reservation = selectedDoctor.reservations.find(res => res.date === formattedDate);
            return reservation?.slots.includes(slot);
        }
        return false;
    };

    const isDateSelected = (day: number) => {
        const newDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day,
        );
        return selectedDate && isSameDay(newDate, selectedDate);
    };

    useConditionalEffect(() => {
        setSelectedTime(null);
        setSelectedDate(null);
    }, !!selectedDoctor, [selectedDoctor]);

    return (
        <section className="flex w-full md:flex-row flex-col items-center justify-between gap-6">
            <div className="flex flex-row justify-between gap-2">
                <button
                    type="button"
                    className={` ${
                        isBefore(endOfDay(addMonths(currentMonth, -1)), new Date())
                            ? "cursor-not-allowed opacity-40 "
                            : ""
                    }`}
                    onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                    disabled={isBefore(endOfDay(addMonths(currentMonth, -1)), new Date())}
                >
                    <CaretLeft size={24}/>
                </button>
                <div className="flex w-full justify-around gap-2 h-[280px]">
                    <div
                        className={`flex cursor-pointer flex-col gap-2 border-2 border-green-500 px-4 py-4 transition duration-300
    active:cursor-pointer`}
                    >
                        <p className={`font-medium text-center h-24 ${formattedDate || "text-zinc-400"}`}>{formattedDate ? format(formattedDate, 'do MMMM yyyy') : format(new Date(), 'do MMMM yyyy')}</p>
                        <ul
                            className="grid grid-cols-7 items-center justify-center gap-4 px-4 pt-3 text-center text-[11px] font-normal">
                            <li>S</li>
                            <li>M</li>
                            <li>T</li>
                            <li>W</li>
                            <li>T</li>
                            <li>F</li>
                            <li>S</li>
                        </ul>
                        <div
                            className="grid grid-cols-7 items-center justify-center gap-4 px-4 pt-2 text-center text-[10px] font-normal">
                            {daysInMonthArray.map((day) => {
                                const formattedDate = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day), 'MM/dd/yyyy');
                                const isFullyBooked = selectedDoctor && selectedDoctor.reservations && selectedDoctor.reservations[formattedDate] && selectedDoctor.reservations[formattedDate].timeslots.length === timeSlots.length;
                                return (
                                    <button
                                        type="button"
                                        key={day}
                                        onClick={() => onDateClick(day)}
                                        disabled={isDayInPast(day) || isFullyBooked}
                                        className={`
                flex items-center justify-center p-[3px] text-center
                ${isDateSelected(day) ? "bg-green-400 text-white" : ""}
                ${isDayInPast(day) ? "cursor-not-allowed opacity-40" : ""}
                ${isFullyBooked ? "cursor-not-allowed opacity-20" : ""}
            `}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                    <CaretRight size={24}/>
                </button>
            </div>
            <div>
                <ul className="flex flex-col w-32 items-center justify-center">
                    {timeSlots.map((slot) => {
                        const isTimeSlotReservedForSelectedDate = selectedDate && isTimeSlotReserved(selectedDate.getDate(), slot.id);

                        return (
                            <li key={slot.id}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedTime(slot)}
                                    className={`border-2 px-1 py-1.5 text-xs w-32
                                ${selectedTime === slot ? "border-green-500" : "border-transparent bg-white hover:border-zinc-200 "}
                                ${isTimeSlotReservedForSelectedDate ? "cursor-not-allowed bg-zinc-200" : "cursor-pointer"}
                            `}
                                >
                                    {`${slot.start} - ${slot.end}`}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </section>
    );
};

export default Datepicker;