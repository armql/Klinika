import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import {env} from "process";

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
            {stdio: "inherit"}
        ).status
    ) {
        throw new Error("Could not create certificate.");
    }
}

function createProxyRoutes(routes: string[], target: string) {
    return routes.reduce((acc: Record<string, { target: string, secure: boolean }>, route) => {
        acc[`^/${route}`] = {
            target,
            secure: false,
        };
        return acc;
    }, {});
}

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(";")[0]
        : "https://localhost:7045";

// https://vitejs.dev/config/
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
            // AUTH
            ...createProxyRoutes([
                'logout',
                'pingauth',
                'api/Auth',
                'api/Auth/login',
                'api/purchase',
                'api/Auth/refreshToken',
            ], target),

            // SPECIALIZATION
            ...createProxyRoutes([
                'api/Specialization/getAll',
                'api/Specialization/paginate',
                'api/Specialization/get',
                'api/Specialization/create',
                'api/Specialization/update',
                'api/Specialization/delete',
                'api/Specialization/bulkDelete'
            ], target),

            // ROLE
            ...createProxyRoutes([
                'api/Role/getAll',
                'api/Role/paginate',
                'api/Role/get',
                'api/Role/create',
                'api/Role/update',
                'api/Role/delete'
            ], target),

            // HelpCenterCategory
            ...createProxyRoutes([
                'api/HelpCenterCategory/getAll',
                'api/HelpCenterCategory/paginate',
                'api/HelpCenterCategory/get',
                'api/HelpCenterCategory/create',
                'api/HelpCenterCategory/update',
                'api/HelpCenterCategory/delete'
            ], target),

            // HelpCenter
            ...createProxyRoutes([
                'api/HelpCenter/paginate',
                'api/HelpCenter/get',
                'api/HelpCenter/create',
                'api/HelpCenter/update',
                'api/HelpCenter/delete'
            ], target),

            // Account
            ...createProxyRoutes([
                'api/Account/paginate',
                'api/Account/get',
                'api/Account/create',
                'api/Account/update',
                'api/Account/delete',
                'api/Account/assignRole',
                'api/Account/count'
            ], target),

            // ServiceDesk
            ...createProxyRoutes([
                'api/ServiceDesk/paginate',
                'api/ServiceDesk/get',
                'api/ServiceDesk/create',
                'api/ServiceDesk/update',
                'api/ServiceDesk/delete'
            ], target),

            // Block
            ...createProxyRoutes([
                'api/Block/paginate',
                'api/Block/get',
                'api/Block/create',
                'api/Block/update',
                'api/Block/delete'
            ], target),

            // Metrics
            ...createProxyRoutes([
                'api/Metrics/all',
                'api/Metrics/create',
            ], target),
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        },
    },
});
