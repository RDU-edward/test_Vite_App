import React from "react";
import toCurrency from "../utils/toCurrency";

const ReservationDetails = ({
  selectedReservation,
  setSelectedReservation,
}) => {
  console.log(selectedReservation);
  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50 px-4">
      <div className="card card-xs bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer ">
        <div className="absolute right-2">
          <div
            onClick={() => setSelectedReservation(null)}
            className="text-red-500 text-xl cursor-pointer hover:scale-150"
          >
            &times;
          </div>
        </div>
        <div className="card-body p-4 mt-2">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div className="flex-1">
              <h3 className="card-title text-lg mb-2">
                {selectedReservation.property_title}
              </h3>
              <div className="text-gray-600 text-sm mb-2">
                Client Name:{" "}
                <span className="font-semibold text-base">
                  {selectedReservation.fullname}
                </span>
              </div>
              <div className="flex gap-2 items-center flex-wrap text-xs text-gray-600">
                <span className={" text-xs bg-green-600 py-1 px-4 text-white "}>
                  {selectedReservation.payment_status.toUpperCase()}
                </span>
                <span className="text-xs bg-gray-200 py-1 px-4">
                  {toCurrency(selectedReservation.amount_paid)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold  text-gray-700">
                {toCurrency(selectedReservation.monthly_price)}
              </p>
            </div>
          </div>

          <div className="divider my-2"></div>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="font-semibold text-sm text-gray-700">
                  Property Type
                </label>
                <p className="text-gray-600">
                  {selectedReservation.property_type}
                </p>
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-700">
                  Client Email
                </label>
                <p className="text-gray-600">{selectedReservation.email}</p>
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-700">
                  Contact Number
                </label>
                <p className="text-gray-600">
                  {selectedReservation.contact_number}
                </p>
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-700">
                  Number of Occupants
                </label>
                <p className="text-gray-600">
                  {selectedReservation.total_occupants}
                </p>
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-700">
                  Move-in Date
                </label>
                <p className="text-gray-600">
                  {selectedReservation.movein_date}
                </p>
              </div>

              <div>
                <label className="font-semibold text-sm text-gray-700">
                  Reservation Date
                </label>
                <p className="text-gray-600">
                  {
                    new Date(selectedReservation.created_at)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
