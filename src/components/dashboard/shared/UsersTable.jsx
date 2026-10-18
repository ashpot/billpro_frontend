
import React from "react";
import { FaEye, FaBan, FaCheckCircle, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusStyle = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-700";

    case "inactive":
      return "bg-gray-100 text-gray-700";

    case "suspended":
      return "bg-red-100 text-red-700";

    case "pending":
    case "unverified":
      return "bg-yellow-100 text-yellow-700";

    case "deactivated":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
};

const UsersTable = ({
  users = [],
  loading = false,
  onViewUser,
  onToggleStatus,
  onDeleteUser,
}) => {
  const hasActions =
    typeof onViewUser === "function" ||
    typeof onToggleStatus === "function" ||
    typeof onDeleteUser === "function";

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-secondaryLight">
            Users
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and review registered users.
          </p>
        </div>

        <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          {users.length} {users.length === 1 ? "user" : "users"}
        </span>
      </div>

      {loading && users.length === 0 ? (
        <div className="px-5 py-12 text-center text-sm text-gray-500">
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium text-gray-600">No users found</p>
          <p className="mt-1 text-sm text-gray-400">
            Registered users will appear here.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  User ID
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  User
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date Joined
                </th>

                
                  <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => {
                const status = String(user.status || "Unknown");
                const isSuspended =
                  status.toLowerCase() === "suspended";

                return (
                  <tr
                    key={user.id ?? index}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50/70"
                  >
                    <td className="whitespace-nowrap px-5 py-4">
  <Link
    to={`/admin/users/${user.id}`}
    className="font-semibold text-primary hover:underline"
    title="View user details"
  >
    #{user.id ?? "N/A"}
  </Link>
</td>
                    <td className="px-5 py-4">
                      <div className="flex min-w-[190px] items-center gap-3">
                        <img
                          src={
                            user.photo ||
                            "/media/users/default.jpg"
                          }
                          alt={user.name || "User"}
                          className="h-10 w-10 shrink-0 rounded-full border border-gray-100 bg-gray-100 object-cover"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              "/media/users/default.jpg";
                          }}
                        />

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-800">
                            {user.name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-400">
                            Registered user
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.email || "N/A"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                      {user.phone || "N/A"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                      {formatDate(user.date)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
  <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={() => onToggleStatus?.(user)}
      disabled={!onToggleStatus}
      title={
        String(user.status).toLowerCase() === "suspended"
          ? "Unblock user"
          : "Block user"
      }
      className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {String(user.status).toLowerCase() === "suspended"
        ? "Unblock"
        : "Block"}
    </button>

    <button
      type="button"
      onClick={() => onDeleteUser?.(user)}
      disabled={!onDeleteUser}
      title="Delete user"
      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Delete
    </button>
  </div>
</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {loading && users.length > 0 && (
        <p className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
          Refreshing user data...
        </p>
      )}
    </section>
  );
};

export default UsersTable;
