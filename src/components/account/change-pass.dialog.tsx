"use client";
import {
  Box,
  Button,
  Dialog,
  Field,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { useState } from "react";
import { userApi } from "@/utils/api";
import { useSession } from "next-auth/react";
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";

interface IProps {
  isLoading: boolean;
  setIsLoading: (v) => void;
  onClose: () => void;
  open: boolean;
}

export default function ChangePassDiaLog(props: IProps) {
  const { isLoading, onClose, open, setIsLoading } = props;
  const { data: session } = useSession();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State để quản lý trạng thái hiện/ẩn password
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handlePasswordChange = async () => {
    if (
      passwordData.confirmPassword === "" ||
      passwordData.currentPassword === "" ||
      passwordData.newPassword === ""
    ) {
      toaster.create({
        title: "Error",
        description: "Please fill all fields!",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toaster.create({
        title: "Error",
        description: "New passwords don't match.",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }
    setIsLoading(true);
    const res = await userApi.changePass(
      session?.user.id!,
      passwordData.currentPassword,
      passwordData.newPassword
    );
    setIsLoading(false);
    if (res.data) {
      onClose();
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toaster.create({
        title: "Password changed",
        description: "Your password has been changed successfully.",
        type: "success",
        duration: 3000,
        closable: true,
      });
    } else {
      toaster.create({
        title: "Password changed error",
        description: res.error,
        type: "error",
        duration: 3000,
        closable: true,
      });
    }
  };

  const togglePasswordVisibility = (fieldKey: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldKey]: !prev[fieldKey],
    }));
  };

  return (
    <Dialog.Root open={open} closeOnInteractOutside={true} size="md">
      <Dialog.Trigger />
      <Dialog.Backdrop bg="blackAlpha.900" backdropFilter="blur(8px)" />
      <Dialog.Positioner>
        <Dialog.Content
          bg="linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)"
          border="2px solid"
          borderColor="whiteAlpha.200"
          borderRadius="xl"
          boxShadow="0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            bg: "linear-gradient(90deg, transparent, #f59e0b, #ef4444, transparent)",
            animation: "shimmer 3s linear infinite",
          }}
          css={{
            "@keyframes shimmer": {
              "0%": { transform: "translateX(-100%)" },
              "100%": { transform: "translateX(100%)" },
            },
          }}>
          {/* Decorative corner elements */}
          <Box
            position="absolute"
            top="0"
            right="0"
            width="60px"
            height="60px"
            bg="linear-gradient(135deg, rgba(245, 158, 11, 0.1), transparent)"
            borderBottomLeftRadius="full"
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="40px"
            height="40px"
            bg="linear-gradient(45deg, rgba(200, 68, 1, 0.1), transparent)"
            borderTopRightRadius="full"
          />

          <Dialog.Header
            color="white"
            fontWeight="700"
            fontSize="24px"
            display="flex"
            alignItems="center"
            gap="3"
            pb="6"
            position="relative">
            <Box p="2" borderRadius="lg" color="white">
              <Text fontSize="xl" fontWeight="bold">
                Change Password
              </Text>
            </Box>
          </Dialog.Header>

          <Dialog.CloseTrigger
            color="gray.400"
            _hover={{
              color: "red.400",
              transform: "rotate(90deg)",
              bg: "whiteAlpha.100",
            }}
            transition="all 0.2s"
            borderRadius="md"
            p="1"
          />

          <Dialog.Body py="6">
            <VStack gap="6">
              {[
                {
                  label: "Current Password",
                  value: passwordData.currentPassword,
                  key: "currentPassword" as keyof typeof passwordData,
                  color: "#9F80E0",
                },
                {
                  label: "New Password",
                  value: passwordData.newPassword,
                  key: "newPassword" as keyof typeof passwordData,
                  color: "#4D7ED6",
                },
                {
                  label: "Confirm New Password",
                  value: passwordData.confirmPassword,
                  key: "confirmPassword" as keyof typeof passwordData,
                  color: "#4D7ED6",
                },
              ].map((field, index) => (
                <Field.Root key={field.key} width="100%">
                  <Field.Label
                    color={field.color}
                    fontSize="sm"
                    fontWeight="500"
                    display="flex"
                    alignItems="center"
                    gap="2"
                    mb="2">
                    {field.label}
                  </Field.Label>
                  <Box position="relative" width={"100%"}>
                    <Input
                      type={showPassword[field.key] ? "text" : "password"}
                      value={field.value}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          [field.key]: e.target.value,
                        })
                      }
                      bg="rgba(0, 0, 0, 0.4)"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      borderRadius="lg"
                      color="white"
                      fontSize="md"
                      h="12"
                      pr="12"
                      _hover={{
                        borderColor: "whiteAlpha.300",
                        bg: "rgba(0, 0, 0, 0.6)",
                      }}
                      _focus={{
                        borderColor:
                          index === 0
                            ? "blue.400"
                            : index === 1
                            ? "yellow.400"
                            : "green.400",
                        boxShadow: `0 0 0 3px ${
                          index === 0
                            ? "rgba(59, 130, 246, 0.1)"
                            : index === 1
                            ? "rgba(245, 158, 11, 0.1)"
                            : "rgba(34, 197, 94, 0.1)"
                        }`,
                        bg: "rgba(0, 0, 0, 0.7)",
                        transform: "translateY(-1px)",
                      }}
                      _placeholder={{ color: "gray.500" }}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      transition="all 0.2s ease"
                    />

                    {/* Icon toggle password visibility */}
                    <Box
                      position="absolute"
                      right="3"
                      top="50%"
                      transform="translateY(-50%)"
                      w="8"
                      h="8"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      color="gray.400"
                      _hover={{
                        color: "white",
                        bg: "whiteAlpha.100",
                      }}
                      transition="all 0.2s ease"
                      onClick={() => togglePasswordVisibility(field.key)}
                      fontSize="lg">
                      {showPassword[field.key] ? <IoMdEye /> : <IoEyeOff />}
                    </Box>
                  </Box>
                </Field.Root>
              ))}
            </VStack>
          </Dialog.Body>

          <Dialog.Footer
            pt="6"
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            gap="3">
            <Button
              variant="ghost"
              onClick={onClose}
              color="gray.400"
              _hover={{
                color: "gray.200",
                bg: "whiteAlpha.100",
                transform: "translateY(-1px)",
              }}
              _active={{ transform: "translateY(0)" }}
              borderRadius="lg"
              h="12"
              px="6"
              transition="all 0.2s">
              Cancel
            </Button>
            <Button
              bg="linear-gradient(135deg, #ef4444, #dc2626)"
              color="white"
              onClick={handlePasswordChange}
              loading={isLoading}
              loadingText="Changing..."
              _hover={{
                bg: "linear-gradient(135deg, #dc2626, #b91c1c)",
                boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)",
                _before: {
                  left: "100%",
                },
              }}
              _active={{
                transform: "translateY(0)",
                boxShadow: "0 5px 15px rgba(239, 68, 68, 0.3)",
              }}
              borderRadius="lg"
              h="12"
              px="8"
              fontWeight="600"
              fontSize="md"
              transition="all 0.2s"
              boxShadow="0 4px 15px rgba(239, 68, 68, 0.2)"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: "absolute",
                top: "0",
                left: "-100%",
                width: "100%",
                height: "100%",
                bg: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "left 0.5s",
              }}>
              Change
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
