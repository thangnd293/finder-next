import Logo from "@/components/Logo";
import Image from "next/image";
import FeedbackForm from "./FeedbackForm";
import VerifyFormToken from "./VerifyFormToken";

export default function FeedbackPage() {
  return (
    <VerifyFormToken>
      <div className="min-h-screen w-full bg-primary-50">
        <header className="flex h-14 w-full flex-shrink-0 items-center justify-center md:h-20">
          <Logo />
        </header>
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="relative aspect-[4/1] w-full overflow-hidden rounded-md border">
            <Image
              className="object-cover object-center"
              fill
              src="/images/feedback-banner.avif"
              alt="banner"
            />
          </div>
          <FeedbackForm />
        </div>
      </div>
    </VerifyFormToken>
  );
}
