import {
  Table,
  Button,
  Space,
  TableColumnsType,
  Layout,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
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
                    key: layer.key,
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
              rowKey="key"
              rowSelection={{
                type: "checkbox",
                onSelect: (layer, selected) => {
                  setLayers({
                    action: "edit",
                    layer: { key: layer.key, visible: selected },
                  });
                },
                selectedRowKeys: layers
                  .filter((layer) => layer.visible)
                  .map((layer) => layer.key),
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
        <Row gutter={8} align="middle">
          <Col span={6}>Projection</Col>
          <Col span={18}>
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
        <Row gutter={8} align="middle">
          <Col span={6}>Date</Col>
          <Col span={11}>
            <DatePicker
              style={{ width: "100%" }}
              value={date}
              onChange={(value) => {
                if (value) {
                  setDate(value);
                }
              }}
            />
          </Col>
          <Col span={7}>
            <Select
              defaultValue="0"
              style={{ width: "100%" }}
              value={date.get("hour").toString()}
              onChange={(value) => {
                setDate(date.startOf("day").set("hour", parseInt(value)));
              }}
              options={[
                { value: "0", label: "00:00" },
                { value: "1", label: "01:00" },
                { value: "2", label: "02:00" },
                { value: "3", label: "03:00" },
                { value: "4", label: "04:00" },
                { value: "5", label: "05:00" },
                { value: "6", label: "06:00" },
                { value: "7", label: "07:00" },
                { value: "8", label: "08:00" },
                { value: "9", label: "09:00" },
                { value: "10", label: "10:00" },
                { value: "11", label: "11:00" },
                { value: "12", label: "12:00" },
                { value: "13", label: "13:00" },
                { value: "14", label: "14:00" },
                { value: "15", label: "15:00" },
                { value: "16", label: "16:00" },
                { value: "17", label: "17:00" },
                { value: "18", label: "18:00" },
                { value: "19", label: "19:00" },
                { value: "20", label: "20:00" },
                { value: "21", label: "21:00" },
                { value: "22", label: "22:00" },
                { value: "23", label: "23:00" },
              ]}
            />
          </Col>
        </Row>
      </Space>
    </Layout.Sider>
  );
}
