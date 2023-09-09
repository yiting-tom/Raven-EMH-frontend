import React from 'react';

import AuthPage from 'pages/AuthPage';
import DashboardPage from 'pages/DashboardPage';
import EMHRobotPage from 'pages/EMHRobotPage';
import FeedbackPage from 'pages/FeedbackPage';
import RobotProfilePage from 'pages/RobotProfilePage';
// import Map from "pages/Map.js";
// import Notifications from "pages/Notifications.js";
// import Rtl from "pages/Rtl.js";

const routesTable = {
  feedback: {
    path: '/feedback',
    name: 'Feedbacks',
    icon: 'tim-icons icon-notes',
    component: <FeedbackPage />,
  },
  emhRobot: {
    path: '/emh-robot',
    name: 'EMH Robot',
    icon: 'tim-icons icon-atom',
    component: <EMHRobotPage />,
  },
  robotProfile: {
    path: '/robot-profile',
    name: 'EMH Robot Profile',
    icon: 'tim-icons icon-single-02',
    component: <RobotProfilePage />,
  },
  logIn: {
    path: '/auth',
    name: 'Log In / Sign Up',
    icon: 'tim-icons icon-align-center',
    component: <AuthPage />,
  },
  dashboard: {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: <DashboardPage />,
  },
  // map: {
  //   path: '/map',
  //   name: 'Map',
  //   icon: 'tim-icons icon-pin',
  //   component: <MapPage />,
  // },
  // notifications: {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: 'tim-icons icon-bell-55',
  //   component: <NotificationsPage />,
  // },
};

const getRoutes = (layout, routeNames) => {
  const routeList = [];
  for (let i = 0; i < routeNames.length; i += 1) {
    routeList.push({
      ...routesTable[routeNames[i]],
      layout: layout,
    });
  }
  return routeList;
};

export const doctorRoutes = getRoutes('/doctor', [
  'emhRobot',
  'robotProfile',
  'feedback',
]);

export const patientRoutes = getRoutes('/patient', [
  'emhRobot',
  'robotProfile',
]);

export const adminRoutes = getRoutes('/admin', [
  'dashboard',
  'emhRobot',
  'robotProfile',
  'feedback',
  // 'map',
  // 'notifications',
]);
