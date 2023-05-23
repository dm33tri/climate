import { createRoot } from "react-dom/client";
import { App, ConfigProvider } from "antd";

import { Layout } from "~/components/Layout";

import "antd/dist/reset.css";

import "~/worker";
import "~/atoms/dataset";
import "~/index.css";

/**
 * Root component
 */
export function Root() {
  return (
    <ConfigProvider>
      <App>
        <Layout />
      </App>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
