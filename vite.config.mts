import { UserConfigExport, defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import {  URL, fileURLToPath } from "node:url"

const app = async (): Promise<UserConfigExport> => {
        return defineConfig({
            plugins: [react()],
            assetsInclude: ["/sb-preview/runtime.js"],
            resolve: {
                alias: [
                    {
                        find: '@',
                        replacement: fileURLToPath(new URL('./assets', import.meta.url)),
                    },
                ]
            }
        }) as UserConfigExport
}

export default app