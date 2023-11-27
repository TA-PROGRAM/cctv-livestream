// routes.jsx
import React from "react";
const routes = [
  { key: 'smarth-pole', name: "smarth-pole",path:'/smarth-pole', component: React.lazy(() => import("./views/smarth-pole")),},
  { key: 'ค้นหา', name: "ค้นหา",path:'/search', component: React.lazy(() => import("./views/search")),},
  { key: 'จัดการไซต์', name: "จัดการไซต์",path:'/site', component: React.lazy(() => import("./views/site")),},
  { key: 'จัดการอุปกรณ์', name: "จัดการอุปกรณ์",path:'/device', component: React.lazy(() => import("./views/device")),},
  { path: '/', key: 'หน้าหลัก', name: "หน้าหลัก", exact: true, component: React.lazy(() => import("./views/dashboard")),},
];
export default routes;