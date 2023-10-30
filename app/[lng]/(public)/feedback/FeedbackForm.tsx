"use client";

import Textarea from "@/components/Textarea";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { useState } from "react";
import Button from "@/components/Button";

const FeedbackForm = () => {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <>
      {isJoined ? (
        <>
          <div className="overflow-hidden rounded-md border bg-background">
            <h3 className="bg-primary p-3 text-white">
              Hãy cho chúng tôi biết về buổi hẹn của bạn. Bạn đã có một trải
              nghiệm thế nào?
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
                <RadioGroupItem
                  value="3"
                  label="Không, tôi không muốn tiến tới"
                />
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
      ) : (
        <>
          <div className="overflow-hidden rounded-md border bg-background">
            <div className="h-2.5 bg-primary" />
            <div className="divide-y p-4">
              <h1 className="pb-3 text-2xl font-bold">
                Buổi hẹn của bạn thế nào
              </h1>
              <div>
                <p className="pt-3">
                  Chào Thắng, chúng tôi rất vui khi bạn đã có một buổi hẹn với A
                  vào ngày 20/10/2021. Chúng tôi rất mong nhận được phản hồi của
                  bạn về buổi hẹn này.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border bg-background">
            <h3 className="bg-primary p-3 text-white">
              Bạn có tham gia buổi hẹn này không?
            </h3>
            <div className="flex items-center justify-end gap-2 p-3">
              <Button size="sm" variant="ghost">
                Không
              </Button>
              <Button size="sm" onClick={() => setIsJoined(true)}>
                Có
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeedbackForm;
