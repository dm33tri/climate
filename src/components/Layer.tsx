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
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const tree = [...reanalysis_era5_land, ...goes_16];

export function Layer() {
  const [layer, setLayer] = useAtom(edit);
  const [form] = Form.useForm<LayerSettings>();
  const opacity = Form.useWatch("opacity", form);
  const setLayers = useSetAtom(layers);

  const cancel = () => {
    setLayer(null);
  };

  useEffect(() => {
    if (layer) {
      form.setFieldsValue(layer);
    }
  }, [layer]);

  const remove = () => {
    if (layer && layer.key) {
      setLayers({ action: "remove", layer: { key: layer.key } });
    }
    setLayer(null);
  };

  const onFinish = (settings: LayerSettings) => {
    if (layer && layer.key) {
      setLayers({ action: "edit", layer: { ...layer, ...settings } });
    } else {
      setLayers({
        action: "add",
        layer: { ...layer, ...settings, key: `layer${Date.now()}` },
      });
    }
    cancel();
  };

  const selectProduct = (_value: string, labels: React.ReactNode[]) => {
    if (!form.isFieldTouched("name")) {
      form.setFieldValue("name", labels[0] as string);
    }
  };

  return (
    <Drawer
      title={layer && layer.key ? "Edit layer" : "Add layer"}
      width={640}
      afterOpenChange={(open) => {
        if (!open) {
          form.resetFields();
        }
      }}
      extra={
        <Space>
          <Button type="dashed" onClick={cancel}>
            Cancel
          </Button>
          {layer && layer.name ? (
            <Button
              danger
              type="dashed"
              icon={<DeleteOutlined />}
              onClick={remove}
            >
              Remove layer
            </Button>
          ) : null}
          <Button type="primary" onClick={form.submit}>
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
          palette: "Divergent.RdYlGn",
          opacity: 0.5,
          visible: true,
          ...layer,
        }}
      >
        <Form.Item name="key" hidden>
          <Input />
        </Form.Item>
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
              { label: "Grid", value: "grid" },
              { label: "Hexagon", value: "h3" },
              { label: "Contour", value: "contour" },
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
