import Textarea from "@/components/Textarea";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const PartnerFeedbackForm = () => {
  return (
    <>
      <div className="overflow-hidden rounded-md border bg-background">
        <h3 className="bg-primary p-3 text-white">
          Hãy cho chúng tôi biết về buổi hẹn của bạn. Bạn đã có một trải nghiệm
          thế nào?
        </h3>
        <Textarea
          className="!border-none p-3 !outline-none !ring-0"
          placeholder="Câu trả lời của bạn"
        />
      </div>

      <div className="overflow-hidden rounded-md border bg-background">
        <h3 className="bg-primary p-3 text-white">
          Chia sẻ với chúng tôi về đối tác của bạn
        </h3>
        <Textarea
          className="!border-none p-3 !outline-none !ring-0"
          placeholder="Câu trả lời của bạn"
        />
      </div>

      <div className="overflow-hidden rounded-md border bg-background">
        <h3 className="bg-primary p-3 text-white">
          Bạn có muốn tiến tới với đối tác này không?
        </h3>
        <div className="p-3">
          <RadioGroup defaultValue="1">
            <RadioGroupItem value="1" label="Có, tôi muốn tiến tới" />
            <RadioGroupItem value="2" label="Chưa chắc chắn" />
            <RadioGroupItem value="3" label="Không, tôi không muốn tiến tới" />
          </RadioGroup>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border bg-background">
        <h3 className="bg-primary p-3 text-white">
          Bạn có lời khuyên hoặc góp ý cụ thể nào cho chúng tôi không?
        </h3>
        <Textarea
          className="!border-none p-3 !outline-none !ring-0"
          placeholder="Câu trả lời của bạn"
        />
      </div>
    </>
  );
};

export default PartnerFeedbackForm;
