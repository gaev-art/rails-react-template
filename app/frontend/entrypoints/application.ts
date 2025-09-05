import { createElement } from "react"
import { createRoot } from "react-dom/client"

import App from "@/components/App"

const appElement = document.getElementById("app")
if (!appElement) {
  throw new Error("Root element #app not found")
}

const root = createRoot(appElement)
root.render(createElement(App))
