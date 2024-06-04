import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
    title: "For Patients",
    rows: [
        {
            title: "What is the purpose of this web application?",
            content: `Our health system web application is designed to streamline the process of making online reservations for medical consultations. 
                It allows patients to book appointments conveniently and enables doctors to manage their daily schedules efficiently.`,
        },
        {
            title: "How do I create an account",
            content:
                "To create an account, click on the \"Register\" button on the homepage. Fill in the required details, such as your name, email address, and password. " +
                "Once completed, you'll receive a confirmation email. Follow the instructions in the email to activate your account.",
        },
        {
            title: "How do I book an appointment?",
            content: `After logging in, go to the "Reservation" section. Choose your preferred doctor, select the date and time, and provide any additional information required. 
      Confirm your booking, and you will receive a confirmation email with the appointment details. `,
        },
        {
            title: "How can I update my profile information?",
            content: "To update your profile information, log in to your account and go to the \"Settings\" section. " +
                "Here you can edit your personal details, update your contact information, and change your password.",
        },
        {
            title: "How can I contact for further assistance?",
            content: "If you have any questions or need help with our web application, please contact us via the form below"
        }
    ],
};

const styles = {
    titleTextColor: "black",
    rowTitleColor: "green",
    rowContentColor: 'grey',
    arrowColor: "black",
};

const config = {
    animate: true,
    tabFocus: true
};

export default function HelpCenter() {
    const [rows, setRowsOption] = useState();

    useEffect(() => {
        if (rows) {
            setTimeout(() => {
                rows[0].expand();
            }, 2500);

            setTimeout(() => {
                rows[0].close();
            }, 5000);

            setTimeout(() => {
                rows[0].scrollIntoView();
                rows[0].scrollIntoView(true);
            }, 10000);
        }
    }, [rows]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-6">FAQ [Frequently Asked Questions]</h1>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
            <hr/>

            <h1 className="text-3xl mt-10 font-bold text-center mb-6">Still having problems? Then contact us!</h1>
        </div>
    );
}