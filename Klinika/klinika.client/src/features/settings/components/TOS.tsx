function Tos() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <div>
                <h1 className="text-2xl font-medium">Terms of Service and Agreement</h1>
                <p className="text-zinc-600">
                    Welcome to our Medical Reservation System. By using our service, you agree to the following terms:
                </p>
            </div>

            <div>
                <h3 className="font-medium">
                    Reservation policies
                </h3>
                <p className="text-sm text-zinc-800">
                    You must confirm your reservation prior to your appointment. Failure to do so may result in
                    cancellation fees. It is your responsibility to ensure that you have received a confirmation
                    notification from our system. If you do not receive a confirmation, please contact us immediately.
                    You must cancel your reservation at least 24 hours in advance. Failure to do so may result in a
                    cancellation fee. If you need to cancel your reservation, please do so as soon as possible.
                </p>
            </div>
            <div>
                <h3 className="font-medium">
                    Misuse of System and Responsibility for Reservations
                </h3>
                <p className="text-sm text-zinc-800">
                    You are responsible for keeping your
                    reservation and showing up on time. If you cannot make it, please cancel your reservation as soon as
                    possible. Failure to show up for your reservation without prior cancellation may result in a no-show
                    fee. Repeated no-shows may result in the suspension of your account. Any misuse of our system,
                    including but not limited to making false reservations, may result in termination of your account.
                    We reserve the right to investigate any suspicious activity and take appropriate action, including
                    reporting such activity to law enforcement authorities.
                </p>
            </div>
            <div>
                <h3 className="font-medium">
                    Changes to Terms, Privacy and Data Protection
                </h3>
                <p className="text-sm text-zinc-800">
                    We reserve the right to change these terms at any
                    time. Continued use of our service constitutes agreement to the new terms. We will notify you of any
                    significant changes to our terms by email or through our website. We collect and store your personal
                    information for the purpose of providing our services. We will not share your information with third
                    parties without your consent, except as necessary to provide our services or as required by law. We
                    take reasonable steps to protect your personal information, but we cannot guarantee the security of
                    any information you transmit to us. Please review our Privacy Policy for more information on how we
                    handle your personal data.
                </p>
            </div>
            <div>
                <h3 className="font-medium">
                    Liability and Dispute Resolution
                </h3>
                <p className="text-sm text-zinc-800">
                    We are not responsible for any loss or damage arising from your
                    failure to comply with our terms. We provide our service as is, without any warranties of any kind,
                    either express or implied. To the extent permitted by law, we disclaim all warranties, including but
                    not limited to, implied warranties of merchantability and fitness for a particular purpose. All
                    disputes arising out of or relating to these terms will be resolved in accordance with the laws of
                    our jurisdiction. You agree to submit to the exclusive jurisdiction of the courts in our
                    jurisdiction.
                </p>
            </div>
        </div>
    );
}

export default Tos;