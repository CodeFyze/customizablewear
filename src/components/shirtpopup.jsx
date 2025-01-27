import React, { useState } from "react";
import Embroidery from "../assets/images/Embroidery.jpeg";
import Print from "../assets/images/print.jpeg";
import SizePopup from "./shirtpositionpopup";
import AddLogoPopup from "./addlogo";
import AddTextLogoPopup from "./AddTextLogoPopup";
import UploadLogoPopup from "./UploadLogoPopup";

const Popup = ({ onClose, visible }) => {
  const [selectedMethod, setSelectedMethod] = useState("Embroidery");
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [isAddLogoPopupVisible, setIsAddLogoPopupVisible] = useState(false);
  const [isAddTextLogoPopupVisible, setIsAddTextLogoPopupVisible] = useState(false);
  const [isUploadLogoPopupVisible, setIsUploadLogoPopupVisible] = useState(false);

  if (!visible) return null;

  return (
    <>
      {/* Main Popup */}
      {!showSizePopup && !isAddLogoPopupVisible && !isAddTextLogoPopupVisible && !isUploadLogoPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96 md:w-[600px]">
            <div className="font-semibold text-xl mb-4 text-center">
              Russell Classic Heavyweight T-Shirt
            </div>
            <div className="text-lg mb-4 text-center">
              Select an application method
            </div>

            <div className="flex justify-between space-x-4">
              {/* Embroidery Option */}
              <div
                className="flex flex-col items-center cursor-pointer w-full p-2 rounded-md"
                onClick={() => setSelectedMethod("Embroidery")}
              >
                <div
                  className={`border-2 ${
                    selectedMethod === "Embroidery"
                      ? "border-orange-500"
                      : "border-transparent"
                  } rounded-md`}
                >
                  <img
                    src={Embroidery}
                    alt="Embroidery"
                    className="object-cover mb-2 rounded-md"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="text-lg font-semibold text-center">
                  Embroidery
                </div>
                <div className="text-sm text-gray-500 text-center">
                  Embroidery involves stitching logos onto garments by needle
                  and thread.
                </div>
                {selectedMethod === "Embroidery" && (
                  <div className="mt-2 text-sm text-yellow-500">
                    We Recommend
                  </div>
                )}
              </div>

              {/* Print Option */}
              <div
                className="flex flex-col items-center cursor-pointer w-full p-2 rounded-md"
                onClick={() => setSelectedMethod("Print")}
              >
                <div
                  className={`border-2 ${
                    selectedMethod === "Print"
                      ? "border-orange-500"
                      : "border-transparent"
                  } rounded-md`}
                >
                  <img
                    src={Print}
                    alt="Print"
                    className="object-cover mb-2 rounded-md"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="text-lg font-semibold text-center">Print</div>
                <div className="text-sm text-gray-500 text-center">
                  Printing involves pressing logos onto garments using heat.
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                BACK
              </button>
              <button
                onClick={() => setShowSizePopup(true)}
                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
              >
                NEXT STEP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SizePopup */}
      {showSizePopup && (
        <SizePopup
          visible={showSizePopup}
          onClose={() => setShowSizePopup(false)}
          onNext={() => {
            setShowSizePopup(false); // Hide SizePopup
            setIsAddLogoPopupVisible(true); // Show AddLogoPopup
          }}
        />
      )}

      {/* AddLogoPopup */}
      {isAddLogoPopupVisible && (
        <AddLogoPopup
          onBack={() => {
            setIsAddLogoPopupVisible(false);
            setShowSizePopup(true); // Optionally go back to SizePopup
          }}
          onNext={() => {
            setIsAddLogoPopupVisible(false); // Hide AddLogoPopup
            setIsAddTextLogoPopupVisible(true); // Show AddTextLogoPopup
          }}
          onUpload={() => {
            setIsAddLogoPopupVisible(false); // Hide AddLogoPopup
            setIsUploadLogoPopupVisible(true); // Show UploadLogoPopup
          }}
        />
      )}

      {/* AddTextLogoPopup */}
      {isAddTextLogoPopupVisible && (
        <AddTextLogoPopup
          onBack={() => {
            setIsAddTextLogoPopupVisible(false); // Hide AddTextLogoPopup
            setIsAddLogoPopupVisible(true); // Optionally go back to AddLogoPopup
          }}
        />
      )}

      {/* UploadLogoPopup */}
      {isUploadLogoPopupVisible && (
        <UploadLogoPopup
          onBack={() => {
            setIsUploadLogoPopupVisible(false); // Hide UploadLogoPopup
            setIsAddLogoPopupVisible(true); // Show AddLogoPopup
          }}
        />
      )}
    </>
  );
};

export default Popup;
