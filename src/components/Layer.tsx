import {
  Button,
  Drawer,
  Space,
  Form,
  TreeSelect,
  Input,
  Select,
  Slider,
} from "antd";
import { useAtom, useSetAtom } from "jotai";
import { edit, layers, LayerSettings } from "~/atoms/layer";
import { Palette } from "~/components/Palette";

import reanalysis_era5_land from "datasets/reanalysis-era5-land.json";
import goes_16 from "datasets/goes-16.json";

const tree = [...reanalysis_era5_land, ...goes_16];

export function Layer() {
  const [layer, setLayer] = useAtom(edit);
  const [form] = Form.useForm<LayerSettings>();
  const opacity = Form.useWatch("opacity", form);
  const setLayers = useSetAtom(layers);

  const cancel = () => setLayer(null);
  const submit = () => {
    setLayer(null);
    form.submit();
  };
  const onFinish = (layer: LayerSettings) => {
    setLayers({ action: "add", layer });
  };
  const selectProduct = (_value: string, labels: React.ReactNode[]) => {
    if (!form.isFieldTouched("name")) {
      form.setFieldValue("name", labels[0] as string);
    }
  };

  return (
    <Drawer
      title="Edit layer"
      width={640}
      extra={
        <Space>
          <Button type="dashed" onClick={cancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={submit}>
            Save
          </Button>
        </Space>
      }
      open={Boolean(layer)}
      onClose={cancel}
      placement="left"
    >
      <Form
        layout="vertical"
        name="edit-layer"
        form={form}
        onFinish={onFinish}
        initialValues={{
          type: "h3",
          palette: "RdYlGn",
          opacity: 0.5,
          blendMode: "normal",
          ...layer,
        }}
      >
        <Form.Item name="product" label="Product" rules={[{ required: true }]}>
          <TreeSelect
            treeData={tree}
            onChange={selectProduct}
            treeNodeLabelProp="label"
            treeExpandAction="click"
            showSearch
          />
        </Form.Item>
        <Form.Item name="name" label="Layer name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="palette" label="Colors" rules={[{ required: true }]}>
          <Palette />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Hexagon", value: "h3" },
              { label: "Grid", value: "grid" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Opacity" rules={[{ required: true }]}>
          <Form.Item noStyle name="opacity">
            <Input type="number" name="Opacity" min={0} max={1} step={0.1} />
          </Form.Item>
          <Slider
            value={opacity}
            onChange={(value) => form.setFieldValue("opacity", value)}
            step={0.01}
            min={0}
            max={1}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
