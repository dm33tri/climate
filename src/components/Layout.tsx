import { Layout as AntLayout } from "antd";

import { Side } from "~/components/Side";
import { Layer } from "~/components/Layer";
import { Globe } from "~/components/Globe";

export function Layout() {
  return (
    <AntLayout className="h-screen">
      <Layer />
      <Side />
      <AntLayout.Content>
        <Globe />
      </AntLayout.Content>
    </AntLayout>
  );
}
