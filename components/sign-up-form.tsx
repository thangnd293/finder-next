import { GoogleIcon } from "@/assets/icons";
import Button from "@/components/button";
import Input from "@/components/input";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type TSignUpFormValue = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface ISignUpFormProps {
  onSwitchToSignIn: () => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export default function SignUpForm({ onSwitchToSignIn }: ISignUpFormProps) {
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignUpFormValue>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver,
  });

  const onSubmit = (data: TSignUpFormValue) => {
    console.log("Sign up data", data);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="text-center text-2xl font-bold">Create an account</h3>
        <p className="text-center">Please enter your details.</p>
      </div>
      <Input
        id="email"
        label="Email"
        placeholder="Ex: johndoe@gmail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Ex: JohnDoe@123"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        id="confirm-password"
        label="Confirm password"
        type="password"
        placeholder="Ex: JohnDoe@123"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button>Sign up</Button>

      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-secondary-foreground">or</span>
        <hr className="flex-1" />
      </div>

      <Button leftIcon={<GoogleIcon width={20} height={20} />} variant="social">
        Sign up with Google
      </Button>

      <p className="text-center" onClick={onSwitchToSignIn}>
        Already have an account? <button className="font-bold">Sign in</button>
      </p>
    </form>
  );
}
