import FacebookAuth from "./FacebookAuth";
import GoogleAuth from "./GoogleAuth";
import PhoneAuth from "./PhoneAuth";

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}
const SignInForm = ({ onSwitchToSignUp }: SignInFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-center text-2xl font-bold">Chào mừng trở lại</h3>

      <PhoneAuth />

      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-secondary-foreground">hoặc</span>
        <hr className="flex-1" />
      </div>

      <FacebookAuth textContent="Đăng nhập với Facebook" />
      <GoogleAuth textContent="Đăng nhập với Google" />

      <p className="text-center">
        Chưa có tài khoản?{" "}
        <button className="font-bold" onClick={onSwitchToSignUp}>
          Đăng ký
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
