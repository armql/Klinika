import {Input, Textarea} from "../../features/validation/__validation.ts";

export default function Appointments() {
    return (
        <section className="xl:p-12 lg:p-8 md:p-6 p-4 w-full h-screen">
            <div className="flex flex-col gap-4 h-full">
                <div className='w-full border-2 h-[700px] p-8 flex flex-col gap-2'>
                    <h1 className="text-xl font-medium">
                        Appointments Form for [Patient Name]
                    </h1>
                    <div className="flex flex-row gap-12">

                        <div className="w-80 flex flex-col gap-4">
                            <Input htmlFor="patientFullname" labelName="Patients Full Name" placeholder="" type="text"
                                   name="patientFullname"/>
                            <Textarea htmlFor="reasonOfConsult" labelName="Reason of Consult" placeholder="" type="text"
                                      name="reasonOfConsult"/>
                            <div className="flex flex-col p-2 items-start justify-center gap-2 border-2 text-sm">
                                <p className="text-zinc-400">Patients Attendance</p>

                            </div>
                        </div>
                        <div className="w-80 flex flex-col gap-4">
                            <Textarea htmlFor="evaluation" labelName="Evaluation" placeholder=""
                                      type="text"
                                      name="evaluation"
                                      style={{
                                          height: "300px"

                                      }}
                            />
                            <Textarea htmlFor="notes" labelName="Notes for Consult" placeholder="" type="text"
                                      name="notes"
                                      style={{
                                          height: "300px"

                                      }}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-full border-2">
                    <ul className="flex flex-row border-2 justify-between px-2 py-2">
                        <li className="w-40 border-2">
                            Appointment id
                        </li>
                        <li className="w-40 border-2">
                            Reason for consult
                        </li>
                        <li className="w-40 border-2">
                            Reason for consult
                        </li>
                        <li className="w-40 border-2">
                            Reason for consult
                        </li>
                        <li className="w-40 border-2">
                            Reason for consult
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

