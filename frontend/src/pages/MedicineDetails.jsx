import React from 'react';
import { useParams } from 'react-router-dom';
import { medicines } from '../assets/medicines'; // Ensure the path is correct

const MedicineDetails = () => {
    const { id } = useParams();
    const medicine = medicines.find((med) => med._id === id);

    if (!medicine) {
        return <div className="flex items-center justify-center h-screen text-2xl text-red-500">Medicine not found!</div>;
    }

    return (
        <div className="flex flex-col items-center gap-6 my-16 mx-4 text-gray-900 md:mx-10">
            <h1 className="text-4xl font-semibold text-center">{medicine.name}</h1>
            <img
                src={medicine.image}
                alt={medicine.name}
                className="w-2/3 max-w-md rounded-lg shadow-md bg-blue-50"
            />
            <p className="text-lg leading-relaxed text-center">{medicine.description}</p>
            <div className="w-full max-w-md p-6 bg-gray-50 rounded-lg shadow-md">
                <p className="text-gray-600"><strong>Category:</strong> {medicine.category}</p>
                <p className="text-gray-600"><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
                <p className="text-gray-600"><strong>Dosage:</strong> {medicine.dosage}</p>
                <p className="text-blue-500 text-xl font-bold mt-4">₹{medicine.price}</p>
            </div>
            <button 
                onClick={() => { /* Handle the purchase logic here, for example navigate to a checkout page */ }}
                className="bg-blue-500 text-white px-12 py-3 rounded-full mt-8 hover:bg-blue-600 transition-all duration-300"
            >
                Buy Now
            </button>
        </div>
    );
};

export default MedicineDetails;
