import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import React from "react";

const NotificationSetting = () => {
  return (
    <AccordionItem value="notification-setting">
      <AccordionTrigger>Cài đặt thông báo</AccordionTrigger>
      <AccordionContent>Cài đặt thông báo</AccordionContent>
    </AccordionItem>
  );
};

export default NotificationSetting;
