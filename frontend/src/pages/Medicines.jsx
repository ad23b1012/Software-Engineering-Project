import React, { useState } from 'react';
import { medicines } from '../assets/medicines.js';
import { useNavigate } from 'react-router-dom';

const Medicines = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query) {
            const filteredMedicines = medicines.filter((item) =>
                item.name.toLowerCase().includes(query)
            );
            setRecommendations(filteredMedicines.slice(0, 5)); // Limit to top 5 recommendations
        } else {
            setRecommendations([]);
        }
    };

    const filteredMedicines = medicines.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            {/* Search Bar */}
            <div className="relative w-3/4 sm:w-1/2">
                <input
                    type="text"
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-2 max-h-48 overflow-y-auto z-10">
                        {recommendations.map((item) => (
                            <li
                                key={item._id}
                                onClick={() => navigate(`/medicine/${item._id}`)}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Title and Description */}
            <h1 className="text-3xl text-center font-medium">Medicines</h1>
            <p className="sm:w-1/3 text-center text-sm">
                Browse through our list of trusted and effective medicines.
            </p>

            {/* Medicines Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {filteredMedicines.slice(0, 10).map((item) => (
                    <div
                        key={item._id}
                        onClick={() => navigate(`/medicine/${item._id}`)}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:translate-y-[-5px] transition-transform duration-300"
                    >
                        <img
                            className="w-full h-40 object-cover bg-blue-50"
                            src={item.image}
                            alt={item.name}
                        />
                        <div className="p-4">
                            <p className="text-green-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-600 text-sm">{item.usage}</p>
                            <p className="text-blue-500 text-sm font-semibold">₹{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Button */}
            <button
                onClick={() => {
                    navigate('/medicines');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-colors"
            >
                View More
            </button>
        </div>
    );
};

export default Medicines;
