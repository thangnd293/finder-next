import GoogleAuth from "./GoogleAuth";
import PhoneAuth from "./phone-auth";

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

const SignUpForm = ({ onSwitchToSignIn }: SignUpFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-center text-2xl font-bold">Tạo tài khoản</h3>

      <PhoneAuth />

      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-secondary-foreground">hoặc</span>
        <hr className="flex-1" />
      </div>

      <GoogleAuth textContent="Đăng ký với Google" />

      <p className="text-center" onClick={onSwitchToSignIn}>
        Đã có tài khoản? <button className="font-bold">Đăng nhập</button>
      </p>
    </div>
  );
};

export default SignUpForm;
