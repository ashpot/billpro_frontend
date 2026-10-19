
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaUsers,
  FaUser,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import { sendAdminNotification } from "../../services/notificationService";

const SendNotificationPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [userId, setUserId] = useState("");

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess(null);

    const cleanTitle = title.trim();
    const cleanBody = body.trim();

    if (!cleanTitle || !cleanBody) {
      setError("Please enter both a notification title and message.");
      return;
    }

    if (cleanTitle.length > 300) {
      setError("The title cannot exceed 300 characters.");
      return;
    }

    if (audience === "user" && !userId.trim()) {
      setError("Enter the ID of the user who should receive this notification.");
      return;
    }

    const payload = {
      title: cleanTitle,
      body: cleanBody,
      audience,
    };

    if (audience === "user") {
      const parsedUserId = Number(userId);

      if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
        setError("Enter a valid positive user ID.");
        return;
      }

      payload.user_id = parsedUserId;
    }

    try {
      setSending(true);

      const response = await sendAdminNotification(payload);
      const data = response?.data ?? {};

      setSuccess(data.notification ?? null);

      // Do not report success if the backend returned a failed result.
      if (
        data.notification?.status === "failed" ||
        data.notification?.status === "no_devices"
      ) {
        setError(
          data.notification.status === "no_devices"
            ? "The notification was recorded, but no registered device tokens were found."
            : "The notification was recorded, but sending failed. Check the details for the result."
        );
        return;
      }

      setTitle("");
      setBody("");
      setUserId("");
    } catch (err) {
      console.error("Failed to send notification:", err);
      setError(
        err?.message ||
          "Unable to send the notification. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <DashboardNavbar title="Send Notification" />

        <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
          <Link
            to="/admin/notifications"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary"
          >
            <FaArrowLeft size={12} />
            Back to Notifications
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Send Notification
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Send a push notification to all registered devices or one user.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 shrink-0 text-green-600" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-green-800">
                    Notification recorded
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    Status: {success.status || "Unknown"} ·{" "}
                    {success.success_count ?? 0} accepted ·{" "}
                    {success.failure_count ?? 0} failed
                  </p>
                  {success.id && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/admin/notifications/${success.id}`)
                      }
                      className="mt-2 text-sm font-semibold text-green-800 underline"
                    >
                      View notification details
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl bg-white p-5 shadow-sm sm:p-7 lg:col-span-3"
            >
              <div>
                <label
                  htmlFor="notification-title"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Notification Title
                </label>
                <input
                  id="notification-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={300}
                  required
                  placeholder="e.g. Important Account Update"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-yellow-100"
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {title.length}/300 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="notification-body"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Notification Message
                </label>
                <textarea
                  id="notification-body"
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  required
                  rows={6}
                  maxLength={2000}
                  placeholder="Write the message recipients will see on their devices..."
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-yellow-100"
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {body.length}/2000 characters
                </p>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Choose Recipients
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setAudience("all")}
                    aria-pressed={audience === "all"}
                    className={`rounded-xl border p-4 text-left transition ${
                      audience === "all"
                        ? "border-primary bg-yellow-50 ring-1 ring-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FaUsers className="mb-3 text-xl text-gray-600" />
                    <p className="font-semibold text-gray-800">
                      All Users
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Send to every registered device token.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAudience("user")}
                    aria-pressed={audience === "user"}
                    className={`rounded-xl border p-4 text-left transition ${
                      audience === "user"
                        ? "border-primary bg-yellow-50 ring-1 ring-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FaUser className="mb-3 text-xl text-gray-600" />
                    <p className="font-semibold text-gray-800">
                      One User
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Send to a specific user's registered devices.
                    </p>
                  </button>
                </div>
              </div>

              {audience === "user" && (
                <div>
                  <label
                    htmlFor="notification-user-id"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    User ID
                  </label>
                  <input
                    id="notification-user-id"
                    type="number"
                    min="1"
                    step="1"
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                    required
                    placeholder="Enter the user's ID"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-yellow-100"
                  />
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <Link
                  to="/admin/notifications"
                  className="rounded-xl border border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaPaperPlane size={13} />
                  {sending ? "Sending..." : "Send Notification"}
                </button>
              </div>
            </form>

            <aside className="space-y-5 lg:col-span-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-primary" />
                  <h2 className="font-bold text-gray-800">
                    Before You Send
                  </h2>
                </div>

                <ul className="space-y-3 text-sm leading-6 text-gray-600">
                  <li>
                    • Keep the title concise so it is easier to read on a
                    mobile notification.
                  </li>
                  <li>
                    • Make the message clear and relevant to the recipients.
                  </li>
                  <li>
                    • All Users targets registered device tokens, not
                    necessarily every account in the database.
                  </li>
                  <li>
                    • One User sends to the device tokens registered to that
                    user.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
                <p className="font-semibold text-yellow-900">
                  Delivery information
                </p>
                <p className="mt-2 text-sm leading-6 text-yellow-800">
                  The result reflects Firebase's response to the send
                  request. It does not guarantee that every device displayed
                  the notification.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SendNotificationPage;
