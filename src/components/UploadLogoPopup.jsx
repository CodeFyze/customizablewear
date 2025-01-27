import React from "react";

const UploadLogoPopup = ({ onBack }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Upload Your Logo</h2>
          <p className="text-gray-600 mb-4">
            Upload with confidence, we have no set up fees!
          </p>
        </div>
        <div className="space-y-4">
          {/* File Upload Section */}
          <div className="text-center">
            <button className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 flex items-center justify-center mx-auto mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 00-1 1v7H6a1 1 0 00-.707 1.707l4 4a1 1 0 001.414 0l4-4A1 1 0 0014 11h-3V4a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Choose File
            </button>
            <p className="text-sm text-gray-500">
              Drag 'n' Drop Some Files Here, or Click To Select Files
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Upload choose file <strong>JPG, PNG, ESP, AI, PDF</strong>
            </p>
            <p className="text-sm text-gray-500 mt-1">Max size: 8MB</p>
            <p className="text-sm text-gray-500 mt-1">
              Don’t worry how it looks, we will make it look great and send a
              proof before we add to your products!
            </p>
          </div>

          {/* Notes Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              placeholder="Leave a message"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none"
          >
            Back
          </button>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
              Add Another Logo
            </button>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none">
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadLogoPopup;
