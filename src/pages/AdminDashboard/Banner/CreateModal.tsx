/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { toast } from "sonner";
import FileUpload from "../../../component/FileUpload";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import UseImageUpload from "../../../hooks/useImageUpload";
import { useInsertBannerMutation } from "../../../redux/features/banner/bannerApi";

const CreateModal = ({ setshow }: any) => {
  const [insertBanner] = useInsertBannerMutation();

  const { imageUrl, setFile, imageFile } = UseImageUpload();
  const addBanner = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const formData = new FormData();
      formData.append("file", imageFile as File);
      await insertBanner(formData).unwrap();
      toast.success("Banner added successfully", {
        id: toastId,
        duration: 2000,
      });
      setshow(false);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="block mx-auto">
        <FileUpload setSelectedFile={setFile} imageUrl={imageUrl} />
      </div>
      <Button
        onClick={addBanner}
        className="bg-primary text-white font-500 w-full h-[40px] mt-4"
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateModal;
