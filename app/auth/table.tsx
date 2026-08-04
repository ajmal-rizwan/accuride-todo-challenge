interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

function Table({
  todos,
  loading,
  onEdit,
  onDelete,
  changeStatus,
}: {
  todos: Todo[];
  loading: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  changeStatus: (id: string, status: boolean) => void;
}) {
  const { t } = useTranslation("common");
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-gray-200 rounded-lg">
            {loading ? (
              <>Loading...</>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      {t("title")}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t("description")}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t("dueDate")}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t("status")}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {todos.map((todo) => (
                    <tr key={todo.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {todo.title}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {todo.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {todo.dueDate
                          ? new Date(todo.dueDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            todo.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {todo.completed ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            title="Edit todo"
                            onClick={() => onEdit(todo)}
                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            title="Delete todo"
                            className="text-red-600 hover:text-red-900 font-medium"
                            onClick={() => onDelete(todo.id)}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>

                          {!todo.completed ? (
                            <button
                              onClick={() => changeStatus(todo.id, true)}
                              title="Mark as completed"
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => changeStatus(todo.id, false)}
                              title="Undo"
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <ArrowUturnLeftIcon className="h-5 w-5" />
                            </button>
                          )}

                          {/* <button className="text-green-600 hover:text-green-900 font-medium">
                                  {!todo.completed ?( <CheckCircleIcon className="h-5 w-5" /> ) : 
                                  ( <XCircleIcon className="h-5 w-5 text-gray-400" /> )}
                            </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {todos.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No todos yet — add one to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
