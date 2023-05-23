import { Button } from "antd";
import { useSetAtom } from "jotai";
import { PlusOutlined } from "@ant-design/icons";

import * as atom from "~/atoms/layer";

/**
 * Renders a button to add a new layer.
 * @returns The rendered component.
 */
export function AddLayerButton() {
  const setEditLayer = useSetAtom(atom.edit);

  return (
    <Button
      icon={<PlusOutlined />}
      onClick={() => setEditLayer({ visible: true })}
      type="primary"
      style={{ width: "100%" }}
    >
      Add layer
    </Button>
  );
}
