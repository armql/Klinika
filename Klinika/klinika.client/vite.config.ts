import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "klinika.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      "dotnet",
      [
        "dev-certs",
        "https",
        "--export-path",
        certFilePath,
        "--format",
        "Pem",
        "--no-password",
      ],
      { stdio: "inherit" }
    ).status
  ) {
    throw new Error("Could not create certificate.");
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "https://localhost:7045";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/logout": {
        target,
        secure: false,
      },
      "^/pingauth": {
        target,
        secure: false,
      },
      "^/api/Auth": {
        target,
        secure: false,
      },
      "^/api/Auth/login": {
        target,
        secure: false,
      },
      "^/api/Specialization/getAll": {
        target,
        secure: false,
      },
      "^/api/Specialization/paginate": {
        target,
        secure: false,
      },
      "^/api/Specialization/get": {
        target,
        secure: false,
      },
      "^/api/Specialization/create": {
        target,
        secure: false,
      },
      "^/api/Specialization/update": {
        target,
        secure: false,
      },
      "^/api/Specialization/delete": {
        target,
        secure: false,
      },
      "^/api/Role/getAll": {
        target,
        secure: false,
      },
      "^/api/Role/paginate": {
        target,
        secure: false,
      },
      "^/api/Role/get": {
        target,
        secure: false,
      },
      "^/api/Role/create": {
        target,
        secure: false,
      },
      "^/api/Role/update": {
        target,
        secure: false,
      },
      "^/api/Role/delete": {
        target,
        secure: false,
      },
      "^/api/HelpCenterCategory/getAll": {
        target,
        secure: false,
      },
      "^/api/HelpCenterCategory/paginate": {
        target,
        secure: false,
      },
      "^/api/HelpCenterCategory/get": {
        target,
        secure: false,
      },
      "^/api/HelpCenterCategory/create": {
        target,
        secure: false,
      },
      "^/api/HelpCenterCategory/update": {
        target,
        secure: false,
      },
      "^/api/HelpCenterCategory/delete": {
        target,
        secure: false,
      },
      "^/api/HelpCenter/paginate": {
        target,
        secure: false,
      },
      "^/api/HelpCenter/get": {
        target,
        secure: false,
      },
      "^/api/HelpCenter/create": {
        target,
        secure: false,
      },
      "^/api/HelpCenter/update": {
        target,
        secure: false,
      },
      "^/api/HelpCenter/delete": {
        target,
        secure: false,
      },
      "^/api/Account/paginate": {
        target,
        secure: false,
      },
      "^/api/Account/get": {
        target,
        secure: false,
      },
      "^/api/Account/create": {
        target,
        secure: false,
      },
      "^/api/Account/update": {
        target,
        secure: false,
      },
      "^/api/Account/delete": {
        target,
        secure: false,
      },
      "^/api/Account/assignRole": {
        target,
        secure: false,
      },
      "^/api/ServiceDesk/paginate": {
        target,
        secure: false,
      },
      "^/api/ServiceDesk/get": {
        target,
        secure: false,
      },
      "^/api/ServiceDesk/create": {
        target,
        secure: false,
      },
      "^/api/ServiceDesk/update": {
        target,
        secure: false,
      },
      "^/api/ServiceDesk/delete": {
        target,
        secure: false,
      },
      "^/api/Block/paginate": {
        target,
        secure: false,
      },
      "^/api/Block/get": {
        target,
        secure: false,
      },
      "^/api/Block/create": {
        target,
        secure: false,
      },
      "^/api/Block/update": {
        target,
        secure: false,
      },
      "^/api/Block/delete": {
        target,
        secure: false,
      },
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
});
