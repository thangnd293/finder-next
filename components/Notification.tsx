import { useNotificationCount } from "@/service/notification";
import { useEffect, useState } from "react";

const Notification = () => {
  const [originalTitle] = useState(document?.title);
  const { count } = useNotificationCount();

  useEffect(() => {
    if (!count) {
      document.title = originalTitle;
      return;
    }
    document.title = `(${count}) ${originalTitle}`;
  }, [count]);

  return null;
};

export default Notification;
