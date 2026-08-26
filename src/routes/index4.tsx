import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/index4")({
  component: () => <Navigate to="/" />,
});
