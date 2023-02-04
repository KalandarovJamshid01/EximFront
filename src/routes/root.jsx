import React from "react";
import { RootProvider } from "../contexts/RootContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppViewProvider } from "../contexts/AppViewContext";
import { DashboardProvider } from "../contexts/DashboardContext";
// APP AND ROUTE PAGES
import ErrorPage from "./error";
import Home from "../pages/home/home";
import AuthPage from "../pages/auth";
import AppView from "../pages/app/index";
import Submits from "../pages/app/submission/submission";
import Certification from "../pages/app/certification";
import AdminAuth from "../pages/admin/auth";
// DASHBOARD PAGES COMPONENTES
import Dashboard from "../pages/admin/dashboard/index";
import Requests from "../pages/admin/dashboard/requests/requests";
// 3RD PARTY APPS
import { SnackbarProvider } from "notistack";
import Chat from "../pages/chat/Chat";

export function root() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "chatAdmin",
      element: (
        <DashboardProvider>
          <Chat />
        </DashboardProvider>
      ),
    },
    {
      path: "chatClient",
      element: (
        <AppViewProvider>
          <Chat />
        </AppViewProvider>
      ),
    },
    {
      path: "auth",
      children: [
        {
          path: "user",
          element: (
            <SnackbarProvider>
              <AuthPage />
            </SnackbarProvider>
          ),
        },
        {
          path: "admin",
          element: (
            <SnackbarProvider>
              <AdminAuth />
            </SnackbarProvider>
          ),
        },
      ],
    },
    {
      path: "app",
      element: (
        <AppViewProvider>
          <AppView />
        </AppViewProvider>
      ),
      children: [
        {
          path: "submissions",
          element: <Submits />,
        },
        {
          path: "certification",
          element: <Certification />,
        },
        {
          path: "support",
          element: <p>Online Support</p>,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <DashboardProvider>
          <Dashboard />
        </DashboardProvider>
      ),
      children: [
        {
          path: "applications",
          element: <Requests />,
        },
        {
          path: "accepted-applications",
          element: <p>ACCEPTED REQUESTS</p>,
        },
        {
          path: "all-applications",
          element: <p>ALL REQUESTS</p>,
        },
      ],
    },
  ]);
  return (
    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>
  );
}

// FIX THE STYLES
// REMOVE THE LOADERS
