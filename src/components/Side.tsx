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
  Spin,
} from "antd";
import {
  ExclamationCircleOutlined,
  ExclamationCircleTwoTone,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { AddLayerButton } from "~/components/AddLayerButton";
import atom, { Layer } from "~/atoms/layer";
import { useAtom } from "jotai";
import ui from "~/atoms/ui";
import { datetime } from "~/atoms/datetime";
import { EditLayerButton } from "./EditLayerButton";
import layer from "~/atoms/layer";

export function Side() {
  const [date, setDate] = useAtom(datetime);
  const [layers, setLayers] = useAtom(atom.layers);
  const [projection, setProjection] = useAtom(ui.projection);
  const columns: TableColumnsType<Layer> = [
    {
      title: "Layer",
      key: "name",
      dataIndex: "name",
      width: "100%",
      render: (value, layer) => {
        if (
          layer.dataset &&
          layer.dataset.variables &&
          layer.dataset.variables.length > 1
        ) {
          const variables = layer.dataset.variables;

          return (
            <Select
              style={{ width: "100%", margin: "-4px -12px" }}
              defaultValue={variables[0]}
              value={layer.variable || variables[0]}
              disabled={!layer.visible}
              onChange={(variable) => {
                setLayers({
                  action: "edit",
                  layer: {
                    name: layer.name,
                    variable: variable === variables[0] ? undefined : variable,
                  },
                });
              }}
              options={variables.map((variable) => ({
                label: `${value} / ${variable}`,
                value: variable,
              }))}
              bordered={false}
            />
          );
        }

        return value;
      },
    },
    {
      title: <Button type="text" size="small" icon={<MoreOutlined />} />,
      align: "center",
      key: "actions",
      render: (layer) => <EditLayerButton layer={layer} />,
    },
  ];

  return (
    <Layout.Sider width={350} style={{ padding: "8px", background: "#fff" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row>
          <Col span={24}>
            <Table
              style={{ width: "100%" }}
              size="small"
              columns={columns}
              dataSource={layers}
              footer={AddLayerButton}
              rowKey="name"
              rowSelection={{
                type: "checkbox",
                onSelect: (layer, selected) => {
                  setLayers({
                    action: "edit",
                    layer: { name: layer.name, visible: selected },
                  });
                },
                selectedRowKeys: layers
                  .filter((layer) => layer.visible)
                  .map((layer) => layer.name),
                renderCell: (_checked, layer, _index, _origin) =>
                  (layer.state === "loading" && (
                    <LoadingOutlined
                      style={{ width: "16px", color: "#1677ff" }}
                    />
                  )) ||
                  (layer.state === "error" && (
                    <ExclamationCircleTwoTone
                      twoToneColor="#fadb14"
                      style={{ width: "16px" }}
                    />
                  )) ||
                  _origin,
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
