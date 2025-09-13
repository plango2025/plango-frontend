import { FileUpload, Icon, Box } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

const ImageUploader = ({  onChange }) => {
  return (
    <FileUpload.Root
      maxW="xl"
      alignItems="stretch"
      maxFiles={10}
      onFileChange={(details) => {
        const acceptedFiles = details.acceptedFiles;
        onChange(acceptedFiles);
      }}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon size="md" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>사진을 첨부하세요</Box>
          <Box color="fg.muted">여행에서의 즐거운 순간들을 남겨보아요.</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  );
};

export default ImageUploader;
