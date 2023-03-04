import * as yup from "yup";

export type UserRole = "CUSTOMER" | "BUSINESS" | "ADMIN";

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email chưa chính xác!")
    .max(50, "Email quá dài!")
    .required("Bạn chưa nhập email!"),
  password: yup
    .string()
    .trim()
    .min(8, "Password chưa chính xác!")
    .required("Bạn chưa nhập password!"),
});

export type LoginSchema = yup.InferType<typeof loginValidationSchema>;

export type LoginResponse = {
  accessToken: string;
  tokenType: "bearer";
  type: UserRole;
};

export interface UserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  phone: string;
  province: string;
  district: string;
  wards: string;
  imageUrl: string;
  displayReview: boolean;
  createdDate: string;
  type: UserRole;
}

export const registerValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email chưa chính xác!")
    .max(50, "Email quá dài!")
    .required("Bạn chưa nhập email!"),
  password: yup
    .string()
    .trim()
    .min(8, "Password chưa chính xác!")
    .required("Bạn chưa nhập password!"),
  firstName: yup
    .string()
    .trim()
    .max(20, "firstName too long!")
    .required("Bạn chưa nhập tên!"),
  lastName: yup
    .string()
    .trim()
    .max(20, "Tên quá dài!")
    .required("Bạn chưa nhập họ và tên đệm!"),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .required("Bạn chưa nhập sdt!"),
  birthDay: yup.string().required("Bạn chưa nhập ngày sinh!"),
  wardsId: yup.string().required("Bạn chưa nhập địa chỉ"),
  type: yup.string().required("Bạn chưa chọn vị trí"),
});

export type RegisterValidation = yup.InferType<typeof registerValidationSchema>;

export interface CreatedBy {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: any;
  type: string;
}

export interface Feedback {
  id: number;
  description: string;
  ratingPoint: number;
  createdBy: CreatedBy;
  createdDate: string;
}

export interface Report {
  id: number;
  typeReportName: string;
  emailReport: string;
  phoneReport: string;
  handled: boolean;
  handledBy?: any;
  createdDate: string;
}
