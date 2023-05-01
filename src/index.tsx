import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { App, ConfigProvider } from "antd";

import { queryClient } from "~/query";
import { Layout } from "~/components/Layout";

import "./worker";
import "./atoms/dataset";

import "antd/dist/reset.css";
import "./index.css";

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <App>
          <Layout />
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
