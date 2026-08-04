"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";

export default function Modal(props: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  item: any;
}) {
  const [title, setTitle] = useState(props.item?.title || "");
  const [description, setDescription] = useState(props.item?.description || "");
  const [dueDate, setDueDate] = useState(props.item?.dueDate || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr || "{}");

    const formattedDate = dueDate ? dueDate : null;
    let method = props.item ? "PUT" : "POST";
    let url = props.item ? `/api/todos/${props.item.id}` : "/api/todos";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        dueDate: formattedDate,
        userId: user.id,
      }),
    });

    if (res.ok) {
      const newTodo = await res.json();
      setTitle("");
      setDescription("");
      setDueDate("");
      props.onClose();
      setTimeout(() => {
        props.onSuccess();
      }, 1000);
    } else {
      setError("Failed to add todo. Please try again.");
    }
    setLoading(false);
  };


  return (
      <Dialog
        open={props.open}
        onClose={props.onClose}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleSubmit}>
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900 mb-4"
                  >
                    {props.item ? "Edit Todo" : "Add New Todo"}
                  </DialogTitle>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter todo title"
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description (optional)"
                        rows={3}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={dueDate}
                        // onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="py-4 flex flex-row-reverse gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
                    >
                      {loading
                        ? "Saving..."
                        : props.item
                          ? "Save Changes"
                          : "Add Todo"}
                    </button>
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  );
}
