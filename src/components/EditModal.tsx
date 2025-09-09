"use client";

import { FC, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { editUser } from "../store/usersSlice";
import type { User } from "../types";

// The component accepts the user to be edited and onClose to close the modal
interface Props {
  user: User;
  onClose: () => void;
}

const EditModal: FC<Props> = ({ user, onClose }) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
  });

  // Prevents auto-submission of form, dispatches the editUser with id & updated fields and closes the modal
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editUser({ id: user.id, ...form }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSave}
        className="bg-white rounded-lg shadow-lg w-full max-w-xl m-5"
      >
        <div className="px-6 py-4 flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Basic Modal</h2>
          <button onClick={onClose} className="cursor-pointer">
            <svg
              viewBox="64 64 896 896"
              className=""
              data-icon="close"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 space-y-10 mb-5">
          <div className="flex items-center gap-2">
            <label className="block text-lg text-black mb-1">Name:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:shadow-md focus:shadow-blue-200 invalid:border-red-500 invalid:focus:ring-0"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-lg text-black mb-1">Email:</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:shadow-md focus:shadow-blue-200 invalid:border-red-500 invalid:focus:ring-0"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-lg text-black mb-1">Phone:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:shadow-md focus:shadow-blue-200 invalid:border-red-500 invalid:focus:ring-0"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-lg text-black mb-1">Website:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:shadow-md focus:shadow-blue-200 invalid:border-red-500 invalid:focus:ring-0"
              required
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:text-blue-400 hover:border-blue-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-400 cursor-pointer"
          >
            OK
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
