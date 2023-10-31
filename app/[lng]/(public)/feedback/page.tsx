import Image from "next/image";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen w-full bg-primary-50">
      <div className="mx-auto max-w-2xl space-y-6 py-3">
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
  );
}
