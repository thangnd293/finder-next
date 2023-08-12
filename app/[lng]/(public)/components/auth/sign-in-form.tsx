import GoogleAuth from "./google-auth";
import PhoneAuth from "./phone-auth";

interface ISignInFormProps {
  onSwitchToSignUp: () => void;
}
export default function SignInForm({ onSwitchToSignUp }: ISignInFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-center text-2xl font-bold">Chào mừng trở lại</h3>

      <PhoneAuth />

      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-secondary-foreground">hoặc</span>
        <hr className="flex-1" />
      </div>

      <GoogleAuth textContent="Đăng nhập với Google" />

      <p className="text-center">
        Chưa có tài khoản?{" "}
        <button className="font-bold" onClick={onSwitchToSignUp}>
          Đăng ký
        </button>
      </p>
    </div>
  );
}
