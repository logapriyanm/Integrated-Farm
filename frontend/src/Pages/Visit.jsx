
import VisitImg from "../assets/Visit.jpg";
import VisitDatas from "../Datas/VisitData"
import { steps, audience, benefits } from "../Datas/VisitData"

import { FaCashRegister, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CgMail } from "react-icons/cg";
import { IoCall } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../config';
import { useCart } from "../context/CartContext";


const Visit = () => {

    const navigate = useNavigate();
    const { token } = useCart();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [visitors, setVisitors] = useState(1);
    const [message, setMessage] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Login first then book ticket");
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post(backendUrl + '/api/ticket/book', {
                name, email, phone, date, visitors, message
            }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setEmail('');
                setPhone('');
                setDate('');
                setVisitors(1);
                setMessage('');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <section className="">

            <div
                className=" flex items-center justify-center relative w-full opacity-100   h-[70vh] md:h-[60vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${VisitImg})` }}
            >
                <div className="flex flex-col items-center text-center  text-white px-6">

                    <h1 className="text-2xl flex  gap-5 md:text-5xl font-bold">
                        Visit Us
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-white">
                        Come see sustainable farming in action!
                    </p>

                </div>
            </div>

            <div className="py-10 flex flex-col items-center">
                <h1 className="text-2xl flex gap-5 md:text-3xl text-center  font-bold">Welcome to Logi Integrated Farm</h1>
                <p className="mt-4  text-base md:w-[600px] text-center p-2 text-gray-600">We welcome visits from schools, agriculture students, investors, tourists, and anyone curious about modern integrated farming.</p>
                <p className="mt-10  text-2xl  font-bold text-center "> During Your Visit, You Can:</p>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-10 p-6 md:px-20">
                    {VisitDatas.map((item) => (


                        <div key={item.id} className="rounded-xl overflow-hidden hover:shadow-lg bg-white">
                            <img src={item.image} className="w-full bg-center h-80 object-cover shadow-md" />

                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3 ">
                                    <div className=" bg-green-100 text-green-600 p-2 rounded-4xl ">
                                        {item.logo}
                                    </div>
                                    <h1 className="text-xl font-semibold">{item.title}</h1>
                                </div>
                                <p className="text-gray-600">{item.content}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>

            <div className="md:py-20 py-5">
                <div className="flex flex-col items-center gap-4 text-center pb-10">
                    <div className=" bg-green-100 text-green-600 p-4 rounded-4xl ">
                        <FaCashRegister size={25} />
                    </div>
                    <h1 className="text-2xl font-semibold">Booking System</h1>
                    <p className="text-gray-600 mb-8">Fill the form below to book your visit.</p>
                    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full md:w-[500px] bg-white p-8 rounded-xl shadow-lg">
                        <div className="flex flex-col gap-2 text-left">
                            <label className="font-semibold">Name</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500" required placeholder="Your Name" />
                        </div>
                        <div className="flex flex-col gap-2 text-left">
                            <label className="font-semibold">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500" required placeholder="Your Email" />
                        </div>
                        <div className="flex flex-col gap-2 text-left">
                            <label className="font-semibold">Phone</label>
                            <input onChange={(e) => setPhone(e.target.value)} value={phone} type="tel" className="border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500" required placeholder="Your Phone Number" />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 text-left w-1/2">
                                <label className="font-semibold">Date</label>
                                <input onChange={(e) => setDate(e.target.value)} value={date} type="date" className="border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500" required />
                            </div>
                            <div className="flex flex-col gap-2 text-left w-1/2">
                                <label className="font-semibold">Visitors</label>
                                <input onChange={(e) => setVisitors(e.target.value)} value={visitors} type="number" min="1" className="border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500" required />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-left">
                            <label className="font-semibold">Message (Optional)</label>
                            <textarea onChange={(e) => setMessage(e.target.value)} value={message} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500 h-32 resize-none" placeholder="Any special requests?"></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300 mt-4">
                            Book Ticket
                        </button>
                    </form>
                </div>

                <div className="p-5 flex flex-col items-center justify-center rounded-xl gap-5 bg-green-100 md:mx-60 mx-5">
                    <h1 className="text-xl font-semibold">Current Booking Process:</h1>
                    <div className="flex gap-8 flex-wrap p-5 ">
                        {steps.map((text, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="bg-green-400 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full">
                                    {index + 1}
                                </div>
                                <h1 className="text-sm font-medium">{text}</h1>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="md:pt-16 bg-gray-100 ">
                {/* Audience Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold">Perfect For Everyone</h1>
                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                        Our farm welcomes visitors from all backgrounds who want to learn about sustainable agriculture.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-20">
                    {audience.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl hover:shadow-xs shadow-md p-6 text-center flex flex-col items-center"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-600 text-sm font-primary">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="bg-green-600 mt-16 py-16 px-6">
                    <h1 className="text-center text-3xl font-bold text-white mb-12">
                        Why Visit Logi Integrated Farm?
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:px-40 text-center">
                        {benefits.map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-white">
                                <div className="bg-green-700 p-4 rounded-full mb-4">
                                    {item.icon}
                                </div>
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-sm text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-5 md:py-20 py-5 ">
                <h1 className="text-3xl font-poppins text-center font-bold">Ready to Visit Our Farm?</h1>
                <p className=" font-poppins text-base text-center text-gray-600">Contact us today to schedule your educational and inspiring farm visit experience.</p>
                <div className=" md:flex-row flex flex-col md:gap-10  items-center text-center  justify-center">
                    <button className="bg-green-500 px-6 py-3 cursor-pointer  border-2 mt-2 rounded-lg text-white font-semibold hover:bg-green-600">
                        Schedule Visit
                    </button>
                    <button className="border-2 border-green-600 cursor-pointer md:px-6 px-10 mt-2 py-3  rounded-lg text-green-600 font-semibold hover:bg-green-600 hover:text-white">
                        Learn More
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-30 gap-5 py-10 items-center justify-center">
                    <div className="flex flex-col gap-1  items-center ">
                        <div className="bg-green-700 p-2  rounded-full text-white">
                            <IoCall size={20} />
                        </div>
                        <h1 className="font-semibold mt-2 text-sm">Call Us</h1>
                        <h2 className="text-sm">7904074107</h2>
                    </div>

                    <div className="flex flex-col gap-1  items-center ">
                        <div className="bg-green-700 p-2  rounded-full text-white">
                            <FaWhatsapp size={20} />
                        </div>
                        <h1 className="font-semibold mt-2 text-sm"> Whatsapp</h1>
                        <h2 className="text-sm">7904074107</h2>
                    </div>

                    <div className="flex flex-col gap-1  items-center ">
                        <div className="bg-green-700 p-2  rounded-full text-white">
                            <CgMail size={20} />
                        </div>
                        <h1 className="font-semibold mt-2 text-sm">Email</h1>
                        <h2 className="text-sm">info@lokiintegratedfarm.com</h2>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Visit
