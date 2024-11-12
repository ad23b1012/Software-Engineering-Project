import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {  // Destructure as object properties
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const [relDoc, setRelDocs] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc.id !== docId);
            setRelDocs(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-grey-900 md:mx-10'>
            <h1 className='text-3x1 font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of top doctors</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item) => (
                    <div key={item._id || item.id} onClick={() => {navigate(`/appointment/${item._id || item.id}`); scrollTo(0, 0);}} className='border border-gray-300 p-4 rounded-lg cursor-pointer hover:-translate-y-2 transition-all duration-500'>
                        <img className='bg-blue-50' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}rounded-full`}></p>
                                <p>{item.available ? 'Available' : 'not available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
        </div>
    );
}

export default RelatedDoctors;
