import { message } from "antd";

export const showMessage = (content: string, type: string, duration?: number) => {
  switch (type) {
    case "success":
      message.success(content, duration ?? 2.5)
      break;
    case "error":
      message.error(content, duration ?? 2.5)
      break;
    case "info":
      message.info(content, duration ?? 2.5)
      break;
    default:
      break;
  }
}
