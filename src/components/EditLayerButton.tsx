import { MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSetAtom } from "jotai";
import { Layer, edit } from "~/atoms/layer";

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
