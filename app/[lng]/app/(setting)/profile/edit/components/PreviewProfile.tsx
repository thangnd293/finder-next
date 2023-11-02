"use client";

import Button from "@/components/Button";
import { useCurrentUser } from "@/service/user";
import * as RadixDialog from "@radix-ui/react-dialog";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";
import { BsXLg } from "react-icons/bs";
import ActionIcon from "@/components/ActionIcon";
import { UserCard, CardBox } from "@/components/UserCard";

const PreviewProfile = () => {
  const { data, isLoading } = useCurrentUser();

  return (
    <>
      <RadixDialog.Root modal>
        <RadixDialog.Trigger asChild>
          <Button
            className="w-full justify-between rounded-full"
            variant="social"
          >
            Xem trang cá nhân
            <ChevronRightIcon />
          </Button>
        </RadixDialog.Trigger>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className="fixed inset-0 z-50 place-items-center overflow-hidden bg-modal-overplay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:grid">
            <RadixDialog.Content className="h-full w-full md:h-2/3 md:w-2/3">
              <CardBox>
                {(style) => (
                  <div className="relative " style={style}>
                    {isLoading || !data ? (
                      <Spinner />
                    ) : (
                      <UserCard isShow user={data} />
                    )}
                  </div>
                )}
              </CardBox>

              <RadixDialog.Close
                asChild
                className="absolute right-4 top-5 z-10 rounded-full border"
              >
                <ActionIcon variant="filled">
                  <BsXLg />
                </ActionIcon>
              </RadixDialog.Close>
            </RadixDialog.Content>
          </RadixDialog.Overlay>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    </>
  );
};

export default PreviewProfile;
