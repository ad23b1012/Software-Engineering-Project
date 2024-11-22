import React, { useState, useEffect } from "react";

const History = () => {
  const [currentUploads, setCurrentUploads] = useState({
    prescription: { front: null, back: null },
    report: { front: null, back: null },
  });

  const [savedItems, setSavedItems] = useState(() => {
    const savedData = localStorage.getItem("savedItems");
    return savedData ? JSON.parse(savedData) : { prescription: [], report: [] };
  });

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result); // Base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (event, side, type) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file, (base64) => {
        const newUpload = {
          file: base64,
          name: file.name,
          uploadTime: new Date().toLocaleString(),
          description: "",
        };
        setCurrentUploads((prev) => ({
          ...prev,
          [type]: { ...prev[type], [side]: newUpload },
        }));
      });
    }
  };

  const handleDescriptionChange = (event, side, type) => {
    const description = event.target.value;
    setCurrentUploads((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [side]: { ...prev[type][side], description },
      },
    }));
  };

  const handleSave = (type) => {
    const newSavedItems = { ...savedItems };
    const uploads = currentUploads[type];
    Object.keys(uploads).forEach((side) => {
      if (uploads[side]) {
        newSavedItems[type].push(uploads[side]);
      }
    });
    setSavedItems(newSavedItems);
    saveToLocalStorage("savedItems", newSavedItems);

    // Reset the current upload for the saved section
    setCurrentUploads((prev) => ({
      ...prev,
      [type]: { front: null, back: null },
    }));
  };

  const handleDelete = (type, index) => {
    const updatedItems = { ...savedItems };
    updatedItems[type].splice(index, 1);
    setSavedItems(updatedItems);
    saveToLocalStorage("savedItems", updatedItems);
  };

  const renderUploadSection = (title, uploads, type) => (
    <div className="bg-gray-50 p-6 shadow-md rounded-lg mb-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {["front", "back"].map((side) => (
          <div key={side} className="flex flex-col items-center">
            <label
              htmlFor={`${type}-${side}`}
              className="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Upload {side.charAt(0).toUpperCase() + side.slice(1)}
            </label>
            <input
              id={`${type}-${side}`}
              type="file"
              onChange={(e) => handleUpload(e, side, type)}
              className="hidden"
            />
            {uploads[side] ? (
              <div className="mt-4 text-center">
                <img
                  src={uploads[side].file}
                  alt={`${type} ${side}`}
                  className="w-40 h-40 object-cover rounded-lg mb-2"
                />
                <p className="text-sm text-gray-700">
                  Uploaded on: {uploads[side].uploadTime}
                </p>
                <textarea
                  value={uploads[side].description}
                  onChange={(e) => handleDescriptionChange(e, side, type)}
                  placeholder="Add a description"
                  className="mt-2 w-full border rounded p-2 text-sm"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No file uploaded.</p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => handleSave(type)}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 block mx-auto"
      >
        Save
      </button>
    </div>
  );

  const renderSavedItems = (title, items, type) => (
    <div className="bg-gray-100 p-6 shadow-md rounded-lg mb-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Saved {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {items.map((item, index) => (
          <div key={index} className="text-center relative">
            <img
              src={item.file}
              alt={`${type} saved`}
              className="w-40 h-40 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-gray-700">
              Uploaded on: {item.uploadTime}
            </p>
            <p className="text-sm text-gray-600 italic">
              Description: {item.description || "No description provided"}
            </p>
            <button
              onClick={() => handleDelete(type, index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs shadow hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    saveToLocalStorage("savedItems", savedItems);
  }, [savedItems]);

  return (
    <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Upload Your Medical Files
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Upload, view, manage, and delete your medical reports securely.
      </p>
      {renderUploadSection("Add Your Prescription", currentUploads.prescription, "prescription")}
      {renderSavedItems("Prescriptions", savedItems.prescription, "prescription")}
      {renderUploadSection("Add Your Report", currentUploads.report, "report")}
      {renderSavedItems("Reports", savedItems.report, "report")}
    </div>
  );
};

export default History;
