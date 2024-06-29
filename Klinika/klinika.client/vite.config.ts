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
                'api/Auth/me',
                'api/Auth/login',
                'api/Auth/refreshToken',
                'api/Fee/all',
                'api/Fee/purchase',
                'api/Fee/cleanup',
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
                'api/Role/delete',
                'api/Role/bulkDelete'
            ], target),

            // HelpCenterCategory
            ...createProxyRoutes([
                'api/HelpCenterCategory/getAll',
                'api/HelpCenterCategory/paginate',
                'api/HelpCenterCategory/get',
                'api/HelpCenterCategory/create',
                'api/HelpCenterCategory/update',
                'api/HelpCenterCategory/delete',
                'api/HelpCenterCategory/bulkDelete'
            ], target),

            // HelpCenter
            ...createProxyRoutes([
                'api/HelpCenter/paginate',
                'api/HelpCenter/get',
                'api/HelpCenter/create',
                'api/HelpCenter/update',
                'api/HelpCenter/delete',
                'api/HelpCenter/bulkDelete'
            ], target),

            // Account
            ...createProxyRoutes([
                'api/Account/paginate',
                'api/Account/get',
                'api/Account/create',
                'api/Account/update',
                'api/Account/delete',
                'api/Account/assignRole',
                'api/Account/count',
                'api/Account/getCurrent',
                'api/Account/updateEmail',
                'api/Account/updatePassword',
                'api/Account/updateName',
                'api/Account/bulkDelete'
            ], target),

            // ServiceDesk
            ...createProxyRoutes([
                'api/ServiceDesk/paginate',
                'api/ServiceDesk/get',
                'api/ServiceDesk/create',
                'api/ServiceDesk/update',
                'api/ServiceDesk/delete',
                'api/ServiceDesk/bulkDelete'
            ], target),

            // Block
            ...createProxyRoutes([
                'api/Block/paginate',
                'api/Block/get',
                'api/Block/create',
                'api/Block/update',
                'api/Block/delete',
                'api/Block/bulkDelete'
            ], target),

            // Metrics
            ...createProxyRoutes([
                'api/Metrics/all',
                'api/Metrics/create',
            ], target),

            // Reservation
            ...createProxyRoutes([
                'api/Reservation/paginateById',
                'api/Reservation/paginate',
                'api/Reservation/get',
                'api/Reservation/getAll',
                'api/Reservation/create',
                'api/Reservation/update',
                'api/Reservation/delete',
                'api/Reservation/bulkDelete',
            ], target),

            // Consultation
            ...createProxyRoutes([
                'api/Consultation/paginateById',
                'api/Consultation/paginate',
                'api/Consultation/get',
                'api/Reservation/getAll',
                'api/Consultation/create',
                'api/Consultation/update',
                'api/Consultation/delete',
                'api/Consultation/bulkDelete'
            ], target),

            // Patient
            ...createProxyRoutes([
                'api/Patient/paginate',
                'api/Patient/get',
                'api/Patient/getAll',
                'api/Patient/create',
                'api/Patient/update',
                'api/Patient/delete',
                'api/Patient/bulkDelete'
            ], target),

            // SpecializedDoctor
            ...createProxyRoutes([
                'api/SpecializedDoctor/paginate',
                'api/SpecializedDoctor/get',
                'api/SpecializedDoctor/getAll',
                'api/SpecializedDoctor/create',
                'api/SpecializedDoctor/update',
                'api/SpecializedDoctor/delete',
                'api/SpecializedDoctor/bulkDelete'
            ], target),

            // Image
            ...createProxyRoutes([
                'api/Image/paginate',
                'api/Image/get',
                'api/Image/getAll',
                'api/Image/create',
                'api/Image/update',
                'api/Image/delete',
                'api/Image/bulkDelete'
            ], target),

            // UserRoles
            ...createProxyRoutes([
                'api/UserRoles/paginate',
                'api/UserRoles/get',
                'api/UserRoles/getAll',
                'api/UserRoles/create',
                'api/UserRoles/update',
                'api/UserRoles/delete',
                'api/UserRoles/bulkDelete'
            ], target),

            // PrimaryCareDoctor
            ...createProxyRoutes([
                'api/PrimaryCareDoctor/paginate',
                'api/PrimaryCareDoctor/get',
                'api/PrimaryCareDoctor/getAll',
                'api/PrimaryCareDoctor/create',
                'api/PrimaryCareDoctor/update',
                'api/PrimaryCareDoctor/delete',
                'api/PrimaryCareDoctor/bulkDelete'
            ], target),

            // REPORT
            ...createProxyRoutes([
                'api/Report/paginate',
                'api/Report/prescribe',
            ], target),

            // PLANET
            ...createProxyRoutes([
                'api/Planet/paginate',
                'api/Planet/getAll',
                'api/Planet/get',
                'api/Planet/create',
                'api/Planet/update',
                'api/Planet/delete-soft',
                'api/Planet/bulkDelete'
            ], target),

            // SATELLITE
            ...createProxyRoutes([
                'api/Satellite/paginate',
                'api/Satellite/getAll',
                'api/Satellite/get',
                'api/Satellite/create',
                'api/Satellite/update',
                'api/Satellite/delete-soft',
                'api/Satellite/bulkDelete'
            ], target),
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        },
    },
});
