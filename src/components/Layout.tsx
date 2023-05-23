import { Layout as AntLayout } from "antd";

import { Side } from "~/components/Side";
import { Layer } from "~/components/Layer";
import { Map } from "~/components/Map";

/**
 * Renders the application layout.
 */
export function Layout() {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Layer />
      <Side />
      <AntLayout.Content>
        <Map />
      </AntLayout.Content>
    </AntLayout>
  );
}
