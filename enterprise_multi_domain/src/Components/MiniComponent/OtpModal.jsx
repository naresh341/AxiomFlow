import { useSelector } from "react-redux";

export default function OtpModal({ isOpen, onClose }) {
  const { otp, loading } = useSelector((state) => state.otp);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[380px] rounded-lg shadow-xl p-5">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your OTP</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✖
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-blue-500 text-sm">Generating OTP...</p>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">
              Use this OTP to continue
            </p>

            {/* OTP DISPLAY BOX */}
            <div className="text-3xl font-bold tracking-widest bg-gray-100 py-3 rounded">
              {otp?.data?.otp || "------"}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <button
          onClick={onClose}
          className="mt-5 w-full bg-blue-600 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
