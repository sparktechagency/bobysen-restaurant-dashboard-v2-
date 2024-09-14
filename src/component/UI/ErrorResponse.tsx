import { toast } from "sonner";
/* eslint-disable @typescript-eslint/no-explicit-any */
const ErrorResponse = (err: any, toastId?: number | string) => {
  console.log(err);
  //console.log("===================", err);
  toast.error(err?.data?.message || "Something went wrong", {
    id: toastId,
    duration: 2000,
  });
};

export default ErrorResponse;
