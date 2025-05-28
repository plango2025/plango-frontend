import AppLayout from "@/layout/AppLayout";
import {
  Box,
  FileUpload,
  GridItem,
  Icon,
  Input,
  RatingGroup,
  Textarea,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { BackGround, FormContainer } from './ReviewForm.style';

const ReviewForm = () => {
  return (
    <BackGround>
      <AppLayout>
        <GridItem colSpan={12}>
          <FormContainer>
            <h1>일정 리뷰 작성</h1>
            <Input
              ml="3rem"
              mr="3rem"
              placeholder="제목을 입력하세요"
              fontSize="20px"
              variant="flushed"
            />
            {/* 별점 */}
            <RatingGroup.Root count={5} defaultValue={0} size="sm">
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
            {/* 파일 드래그 앤 드롭롭 */}
            <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
              <FileUpload.HiddenInput />
              <FileUpload.Dropzone>
                <Icon size="md" color="fg.muted">
                  <LuUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                  <Box>Drag and drop files here</Box>
                  <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
              <FileUpload.List />
            </FileUpload.Root>
            {/* 드래그 앤 드롭 끝 */}
            <Textarea autoresize placeholder="리뷰를 작성해주세요!" />
          </FormContainer>
        </GridItem>
      </AppLayout>
    </BackGround>
  );
};

export default ReviewForm;
