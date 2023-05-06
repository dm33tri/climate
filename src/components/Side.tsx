import {
  Table,
  Button,
  Space,
  TableColumnsType,
  Layout,
  Switch,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { AddLayerButton } from "~/components/AddLayerButton";
import atom, { Layer } from "~/atoms/layer";
import { useAtom, useSetAtom } from "jotai";
import ui from "~/atoms/ui";
import { datetime } from "~/atoms/datetime";

export function Side() {
  const [date, setDate] = useAtom(datetime);
  const [layers, setLayers] = useAtom(atom.layers);
  const setEditLayer = useSetAtom(atom.edit);
  const [projection, setProjection] = useAtom(ui.projection);
  const columns: TableColumnsType<Layer> = [
    {
      title: "Layer",
      dataIndex: "name",
      key: "name",
      width: "100%",
    },
    {
      title: <Button type="text" size="small" icon={<MoreOutlined />} />,
      align: "center",
      key: "actions",
      render: (layer) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<MoreOutlined />}
            onClick={() => {
              const {
                name,
                product,
                type,
                palette,
                opacity,
                blendMode,
                visible,
                year,
                month,
                day,
                time,
              } = layer;
              setEditLayer({
                name,
                product,
                type,
                palette,
                opacity,
                blendMode,
                visible,
                year,
                month,
                day,
                time,
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Layout.Sider width={350} style={{ padding: "8px", background: "#fff" }}>
      <Space direction="vertical" size="large">
        <Row>
          <Col>
            <Table
              size="small"
              columns={columns}
              dataSource={layers}
              footer={AddLayerButton}
              rowKey="name"
              rowSelection={{
                type: "checkbox",
                getCheckboxProps: () => ({}),
                onSelect: (layer, selected) => {
                  setLayers({
                    action: "edit",
                    layer: { name: layer.name, visible: selected },
                  });
                },
                selectedRowKeys: layers
                  .filter((layer) => layer.visible)
                  .map((layer) => layer.name),
              }}
              pagination={false}
              showHeader={false}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>Projection</Col>
          <Col span={16}>
            <Select
              style={{ width: "100%" }}
              value={projection}
              onChange={(projection) => {
                setProjection(projection);
                location.reload();
              }}
              options={[
                {
                  label: "Mercator",
                  value: "mercator",
                },
                {
                  label: "Globe",
                  value: "globe",
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>Date</Col>
          <Col span={16}>
            <DatePicker
              style={{ width: "100%" }}
              value={date}
              onChange={(date) => {
                if (date) {
                  setDate(date);
                }
              }}
            />
          </Col>
        </Row>
      </Space>
    </Layout.Sider>
  );
}
