import { Select, SelectProps } from "antd";
import { colors } from "~/utils/colors";

const palettes: SelectProps["options"] = Object.entries(colors).map(
  ([type, palettes]) => {
    return {
      label: type,
      options: Object.entries(palettes).map(([title, colors]) => {
        return {
          value: title,
          label: (
            <div className="flex space-between w-full">
              <div className="w-1/2">{title}</div>
              <div className="w-1/2 flex overflow-hidden rounded-sm my-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
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
