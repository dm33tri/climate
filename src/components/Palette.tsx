import { Select, SelectProps } from "antd";
import { colors } from "~/utils/colors";

const palettes: SelectProps["options"] = Object.entries(colors).map(
  ([type, palettes]) => {
    return {
      label: type,
      options: Object.entries(palettes).map(([title, colors]) => {
        return {
          value: `${type}.${title}`,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "50%" }}>{title}</div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  overflow: "hidden",
                  borderRadius: "2px",
                  margin: "4px 0",
                }}
              >
                {colors.map((color, index) => (
                  <div
                    key={`${type}.${title}.${index}`}
                    style={{ background: color, width: "100%" }}
                  />
                ))}
              </div>
            </div>
          ),
        };
      }),
    };
  }
);

export function Palette(props: Omit<SelectProps, "options">) {
  return <Select {...props} options={palettes} />;
}
