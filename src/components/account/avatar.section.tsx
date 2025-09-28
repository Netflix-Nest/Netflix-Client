import { useState, useRef, startTransition, useTransition } from "react";
import { VStack, Text, Badge, Box, Button, HStack } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { FaCamera, FaSave, FaTimes } from "react-icons/fa";
import { toaster } from "../ui/toaster";
import { UserProfile } from "@netflix-clone/types";
import { useFormStatus } from "react-dom";
import { uploadAvatarAction } from "@/lib/server-action/avatar.actions";
import { signIn, useSession } from "next-auth/react";
import unstable_update from "next-auth";
import { authOptions } from "@/app/api/auth/auth.options";
function SubmitButton({ disabled }: { disabled: boolean }) {
  // useFormStatus is only work in a react component is rendered in <form> has action is server action.
  // therefore, if u try to write btn in form and get useFormStatus in father component -> it's not working.
  // because the form context is not transmitted out.
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="sm"
      colorScheme="green"
      variant="solid"
      loading={pending}
      disabled={disabled || pending}>
      <FaSave />
      Save Avatar
    </Button>
  );
}
export const AvatarSection = ({ user }: { user: UserProfile }) => {
  const { data: session, update } = useSession();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toaster.create({
          title: "Invalid file type",
          description: "Please select an image file",
          type: "error",
          duration: 3000,
        });
        return;
      }

      if (file.size > 15 * 1024 * 1024) {
        toaster.create({
          title: "File too large",
          description: "Please select an image smaller than 15MB",
          type: "error",
          duration: 3000,
        });
        return;
      }

      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    if (!avatarFile) return;

    formData.append("file", avatarFile);
    formData.append("userId", user.id.toString());

    startTransition(async () => {
      const result = await uploadAvatarAction(formData);

      if (result.success) {
        // Reset states
        setAvatarFile(null);
        setAvatarPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        toaster.create({
          title: "Avatar updated successfully",
          type: "success",
          duration: 3000,
        });
      } else {
        toaster.create({
          title: "Upload failed",
          description: result.error,
          type: "error",
          duration: 3000,
        });
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "green";
      case "INACTIVE":
        return "red";
      default:
        return "gray";
    }
  };

  const handleCancelAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <VStack gap={6} justifyContent="left">
      <Box position="relative" display="inline-block">
        <Avatar.Root size="2xl">
          <Avatar.Image
            src={
              avatarPreview ||
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${user.avatar}`
            }
            alt={user.fullName}
          />
        </Avatar.Root>

        {/* Overlay hover */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity="0"
          transition="opacity 0.2s"
          cursor="pointer"
          _hover={{ opacity: 1 }}
          onClick={() => fileInputRef.current?.click()}>
          <FaCamera color="white" size="24px" />
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarSelect}
          style={{ display: "none" }}
        />
      </Box>

      {avatarFile && (
        <form action={handleFormSubmit}>
          <HStack gap={2}>
            <SubmitButton disabled={!avatarFile || isPending} />
            <Button
              type="button"
              size="sm"
              colorScheme="gray"
              variant="outline"
              onClick={handleCancelAvatar}
              disabled={isPending}>
              <FaTimes />
              Cancel
            </Button>
          </HStack>
        </form>
      )}

      <VStack gap={2}>
        <Badge
          colorPalette={getStatusColor(user.status)}
          fontSize="sm"
          px={3}
          py={1}
          borderRadius="full">
          {user.status}
        </Badge>
        <Text color="gray.400" fontSize="sm">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </Text>
      </VStack>
    </VStack>
  );
};
