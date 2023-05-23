import { MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSetAtom } from "jotai";
import { Layer, edit } from "~/atoms/layer";

/**
 * Renders a button that, when clicked, sets the `edit` atom to the values of the provided `layer`.
 * @param props.layer The layer to edit.
 * @returns The rendered button.
 */
export function EditLayerButton({ layer }: { layer: Layer }) {
  const setEditLayer = useSetAtom(edit);

  return (
    <Button
      type="text"
      size="small"
      icon={<MoreOutlined />}
      onClick={() => {
        const {
          name,
          key,
          product,
          type,
          palette,
          opacity,
          visible,
          year,
          month,
          day,
          time,
        } = layer;
        setEditLayer({
          name,
          key,
          product,
          type,
          palette,
          opacity,
          visible,
          year,
          month,
          day,
          time,
        });
      }}
    />
  );
}
