import { Button, ConfigProvider } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { MdDoneOutline } from "react-icons/md";
import {
  useGetContentQuery,
  useInsertContentMutation,
} from "../../redux/features/content/contentApi";
import { toast } from "sonner";
import ErrorResponse from "../../component/UI/ErrorResponse";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const { data: contentData } = useGetContentQuery({});
  const [content, setContent] = useState(contentData?.data?.privacyPolicy);
  const [insertContentIntoDb] = useInsertContentMutation();
  const onSubmit = async () => {
    const toastId = toast.loading("Creating....");
    if (!content) {
      toast.error("Please insert some content before submitting", {
        id: toastId,
        duration: 2000,
      });
    }

    try {
      await insertContentIntoDb({ privacyPolicy: content }).unwrap();
      toast.success("Privacy policy inserted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <ConfigProvider>
      <div>
        <h1 className="text-primary text-32 font-600  mb-4">Privacy Policy</h1>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={onSubmit}
            className="bg-primary flex items-center border-0 font-600 "
            size="large"
            icon={<MdDoneOutline />}
          >
            Submit
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PrivacyPolicy;
