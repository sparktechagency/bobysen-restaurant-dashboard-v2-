import { useRef, useState } from "react";
import { Button, ConfigProvider } from "antd";
import JoditEditor from "jodit-react";
import { MdDoneOutline } from "react-icons/md";
import {
  useGetContentQuery,
  useInsertContentMutation,
} from "../../redux/features/content/contentApi";
import { toast } from "sonner";
import ErrorResponse from "../../component/UI/ErrorResponse";

const TermsAndCondition = () => {
  const editor = useRef(null);

  const { data: contentData } = useGetContentQuery({});
  const [content, setContent] = useState(contentData?.data?.termsAndConditions);
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
      await insertContentIntoDb({ termsAndConditions: content }).unwrap();
      toast.success("Terms and condition inserted successfully", {
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
        <h1 className="text-primary text-32 font-600  mb-4">
          Terms And Condition
        </h1>
        <JoditEditor
          // config={{
          //   height: "600px",
          // }}
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

export default TermsAndCondition;
