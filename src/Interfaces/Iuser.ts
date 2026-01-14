export interface IUser {
  _id: string;

  userName: string;
  email: string;
  password: string;

  mobileNumber?: string;

  role: "admin" | "doctor" | "petOwner";
  gender: "male" | "female";

  isVerified: boolean;
  isActive: boolean;
  status: string;

  image: {
    secure_url: string;
    public_id: string;
  };

  address?: string;
  otpCode?: string;
  otpExpire?: string;

  wishlist: string[];

  createdAt: string;
  updatedAt: string;
}

export type ILogin = Pick<IUser, "email" | "password">;

export interface ISignup extends ILogin {
  userName: string;
  re_password: string;
}

export interface IAuthSlice {
  token: string | null;
  status: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface IUpdateUser {
  userName?: string;
  mobileNumber?: string;
  gender?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface UserImage {
  secure_url: string;
  public_id?: string;
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
  gender?: string;
  mobileNumber?: string;
  recoveryEmail?: string;
  image?: UserImage;
  createdAt?: string;
}

export interface UsersOverview {
  totalUsers: number;
  pendingUsers: number;
  verifiedUsers: number;
  blockedUsers: number;
  deletedUsers: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
