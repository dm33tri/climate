import { Table, Button, Space, TableColumnsType, Layout } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { AddLayerButton } from "~/components/AddLayerButton";
import atom, { Layer } from "~/atoms/layer";
import { useAtom } from "jotai";

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
    render: (_layer) => (
      <Space size="small">
        <Button type="text" size="small" icon={<MoreOutlined />} />
      </Space>
    ),
  },
];

export function Side() {
  const [layers] = useAtom(atom.layers);

  return (
    <Layout.Sider width={300} className="p-3">
      <Table
        size="small"
        columns={columns}
        dataSource={layers}
        footer={AddLayerButton}
        rowKey={(layer) => layer.name}
        // rowSelection={{ type: "checkbox" }}
        pagination={false}
        showHeader={false}
      />
    </Layout.Sider>
  );
}
