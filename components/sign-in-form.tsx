import { GoogleIcon } from "@/assets/icons";
import Button from "@/components/button";
import Input from "@/components/input";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type TSignInFormValue = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

interface ISignInFormProps {
  onSwitchToSignUp: () => void;
}
export default function SignInForm({ onSwitchToSignUp }: ISignInFormProps) {
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignInFormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver,
  });

  console.log("errors", errors);

  const onSubmit = (data: TSignInFormValue) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="text-center text-2xl font-bold">Welcome back</h3>
        <p className="text-center">Please enter your details.</p>
      </div>

      <Input
        label="Email"
        placeholder="Ex: johndoe@gmail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        placeholder="Ex: JohnDoe@123"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button type="submit">Sign in</Button>

      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-secondary-foreground">or</span>
        <hr className="flex-1" />
      </div>

      <Button leftIcon={<GoogleIcon width={20} height={20} />} variant="social">
        Sign in with Google
      </Button>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <button className="font-bold" onClick={onSwitchToSignUp}>
          Sign up
        </button>
      </p>
    </form>
  );
}
