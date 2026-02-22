import { useState } from "react";
import { addCamera } from "../../services/camera.service";

const AddCameraModal = ({ onClose, refresh }) => {
  const [form, setForm] = useState({ name: "", rtspUrl: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCamera(form);
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded w-96"
      >
        <h2 className="text-lg mb-4">Add Camera</h2>

        <input
          className="w-full mb-3 p-2 bg-gray-800"
          placeholder="Camera Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full mb-3 p-2 bg-gray-800"
          placeholder="RTSP URL"
          onChange={(e) =>
            setForm({ ...form, rtspUrl: e.target.value })
          }
        />

        <div className="flex justify-between">
          <button className="bg-blue-600 px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCameraModal;