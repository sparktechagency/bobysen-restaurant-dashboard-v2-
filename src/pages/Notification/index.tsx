/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import NotificationCard from "../../component/NotificationCom/NotificationCard";

import GuruPagination from "../../component/UI/Pagination";
import { notificationArray } from "../../db";
import {
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
} from "../../redux/features/notification/notificationApi";
import { toast } from "sonner";
import ErrorResponse from "../../component/UI/ErrorResponse";
import ResPagination from "../../component/UI/Pagination";
import { useState } from "react";

const Notification = () => {
  const [page, setPage] = useState<number>(1);
  const query: Record<string, any> = {};
  if (page) query["page"] = page;
  query["limit"] = 10;
  const { data: notificationData } = useGetMyNotificationQuery(query);

  const onChange = (page: number, pageSize: number) => {
    setPage(page);
  };
  const [updateNotification] = useMarkAsReadMutation();
  const submit = async () => {
    const toastId = toast.loading("Updating...");
    try {
      await updateNotification({}).unwrap();
      toast.success("Mark as read successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={submit} className="bg-primary text-white ">
          Mark As Read
        </Button>
      </div>
      <div className="container mx-auto mt-4">
        <Row gutter={[16, 16]}>
          {notificationData?.data?.map((data: any, index: number) => (
            <NotificationCard key={index} data={data} />
          ))}
        </Row>
        <div className=" text-end mt-4">
          <ResPagination
            total={notificationData?.meta?.total as number}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
