import ContactForm from "../components/ContactForm.tsx";
import FAQ from "../components/FAQ.tsx";
import bg from "../assets/hp-illu.svg";

export default function HelpPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full hidden lg:block">
                <div className="absolute top-0 right-0 w-full h-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${bg})` }}></div>
            </div>
            <div className="relative max-w-4xl mx-auto p-6 mt-20 mb-20 bg-white rounded-lg shadow-md z-10">
                <FAQ />
                <div className="mt-10">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
