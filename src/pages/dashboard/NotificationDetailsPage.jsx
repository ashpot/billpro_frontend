
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaPaperPlane,
  FaExclamationCircle,
} from "react-icons/fa";

import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import { getAdminNotification } from "../../services/notificationService";

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-NG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const statusStyle = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "sent":
      return "bg-green-100 text-green-700";
    case "partial":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "no_devices":
      return "bg-gray-100 text-gray-600";
    case "pending":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const MetricCard = ({ label, value, icon: Icon, color }) => (
  <div className="rounded-xl border border-gray-100 p-4">
    <div className="flex items-center gap-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
        <Icon size={16} />
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-xl font-bold text-gray-800">
          {Number(value || 0).toLocaleString("en-NG")}
        </p>
      </div>
    </div>
  </div>
);

const NotificationDetailsPage = () => {
  const { id } = useParams();

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchDetails() {
      try {
        setLoading(true);
        setError("");

        const response = await getAdminNotification(id);

        if (!cancelled) {
          setNotification(response?.data ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch notification details:", err);

        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load notification details."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (id) fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const status = notification?.status || "Unknown";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <DashboardNavbar title="Notification Details" />

        <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/admin/notifications"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary"
            >
              <FaArrowLeft size={12} />
              Back to Notifications
            </Link>

            <Link
              to="/admin/notifications/send"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              <FaPaperPlane size={12} />
              Send New Notification
            </Link>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="ml-2 font-semibold underline"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
              Loading notification details...
            </div>
          ) : notification ? (
            <>
              <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                      <FaBell size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Notification #{notification.id}
                      </p>
                      <h1 className="mt-1 break-words text-xl font-bold text-gray-800 sm:text-2xl">
                        {notification.title}
                      </h1>
                      <p className="mt-2 text-sm text-gray-500">
                        Created {formatDate(notification.date_created)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${statusStyle(status)}`}
                  >
                    {String(status)
                      .replace("_", " ")
                      .replace(/^./, (letter) => letter.toUpperCase())}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-7">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaUsers />
                      Recipient
                    </div>
                    <p className="mt-2 break-words font-semibold text-gray-800">
                      {notification.receiver || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendarAlt />
                      Date Created
                    </div>
                    <p className="mt-2 font-semibold text-gray-800">
                      {formatDate(notification.date_created)}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                <h2 className="text-lg font-bold text-gray-800">
                  Notification Message
                </h2>

                <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <p className="whitespace-pre-wrap break-words text-base leading-7 text-gray-700">
                    {notification.body}
                  </p>
                </div>
              </section>

              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-gray-800">
                    Sending Results
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Device submission statistics returned by Firebase.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <MetricCard
                    label="Target Devices"
                    value={notification.target_count}
                    icon={FaUsers}
                    color="bg-blue-100 text-blue-700"
                  />

                  <MetricCard
                    label="Accepted by FCM"
                    value={notification.success_count}
                    icon={FaCheckCircle}
                    color="bg-green-100 text-green-700"
                  />

                  <MetricCard
                    label="Failed Submissions"
                    value={notification.failure_count}
                    icon={FaTimesCircle}
                    color="bg-red-100 text-red-700"
                  />
                </div>

                {status === "partial" && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                    <FaExclamationCircle className="mt-1 shrink-0" />
                    <p>
                      Some device submissions failed. Firebase acceptance
                      does not guarantee that a notification was displayed
                      on the recipient's device.
                    </p>
                  </div>
                )}

                {status === "no_devices" && (
                  <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                    No registered device tokens were available when this
                    notification was processed.
                  </div>
                )}

                {status === "failed" && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    The notification submission failed. Review the backend
                    logs for more information.
                  </div>
                )}
              </section>
            </>
          ) : !error ? (
            <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
              Notification not found.
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default NotificationDetailsPage;
