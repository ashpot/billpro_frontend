const configuredBaseURL = import.meta.env.VITE_API_BASE_URL;

if (!configuredBaseURL) {
  throw new Error(
    "VITE_API_BASE_URL is not configured. Check your environment file."
  );
}

export const API_BASE = configuredBaseURL.endsWith("/")
  ? configuredBaseURL
  : `${configuredBaseURL}/`;