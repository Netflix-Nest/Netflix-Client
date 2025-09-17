"use client";

import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Input,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  useDisclosure,
  Flex,
  Icon,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import { UserProfile } from "@netflix-clone/types";
import { toaster } from "../ui/toaster";
import { FaEdit } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";

export default function Account({ user }: { user: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    username: user.username,
    phoneNumber: user.phoneNumber,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { open, onOpen, onClose } = useDisclosure();
  // const toast = useToast();

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    toaster.create({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
      type: "success",
      duration: 3000,
      closable: true,
    });
  };

  const handlePasswordChange = () => {
    // Handle password change logic here
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
  };

  const formatViewingTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
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

  return (
    <Box bg="gray.900" minH="100vh" color="white" pt={20}>
      <Container maxW="4xl">
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="2xl" mb={2} color="white">
              Account Settings
            </Heading>
            <Text color="gray.400" fontSize="lg">
              Manage your account information and preferences
            </Text>
          </Box>

          {/* Profile Section */}
          <Card.Root bg="gray.800" border="1px" borderColor="gray.700">
            <CardBody p={8}>
              <HStack justify="space-between" mb={6}>
                <Heading size="lg" color="white">
                  Profile Information
                </Heading>
                <Button
                  colorScheme={isEditing ? "green" : "red"}
                  variant={isEditing ? "solid" : "outline"}
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }>
                  {isEditing ? "Save Changes" : "Edit Profile"}
                  <FaEdit />
                </Button>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
                {/* Avatar and Basic Info */}
                <VStack gap={6}>
                  <Avatar.Root size="2xl">
                    <Avatar.Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${user.avatar}`}
                      alt={user.fullName}
                    />
                  </Avatar.Root>
                  <VStack gap={2}>
                    <Badge
                      colorScheme={getStatusColor(user.status)}
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full">
                      {user.status}
                    </Badge>
                    <Text color="gray.400" fontSize="sm">
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Text>
                  </VStack>
                </VStack>

                {/* Form Fields */}
                <VStack gap={4} align="stretch">
                  <Field.Root disabled={!isEditing}>
                    <Field.Label color="gray.300">Full Name</Field.Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      bg={isEditing ? "gray.700" : "gray.800"}
                      border="1px"
                      borderColor="gray.600"
                      _focus={{ borderColor: "red.500" }}
                    />
                  </Field.Root>

                  <Field.Root disabled={!isEditing}>
                    <Field.Label color="gray.300">Username</Field.Label>
                    <Input
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      bg={isEditing ? "gray.700" : "gray.800"}
                      border="1px"
                      borderColor="gray.600"
                      _focus={{ borderColor: "red.500" }}
                    />
                  </Field.Root>

                  <Field.Root disabled>
                    <Field.Label color="gray.300">Email</Field.Label>
                    <Input
                      value={user.email}
                      bg="gray.800"
                      border="1px"
                      borderColor="gray.600"
                      color="gray.500"
                    />
                  </Field.Root>

                  <Field.Root disabled={!isEditing}>
                    <Field.Label color="gray.300">Phone Number</Field.Label>
                    <Input
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      bg={isEditing ? "gray.700" : "gray.800"}
                      border="1px"
                      borderColor="gray.600"
                      _focus={{ borderColor: "red.500" }}
                    />
                  </Field.Root>
                </VStack>
              </SimpleGrid>
            </CardBody>
          </Card.Root>

          {/* Stats Section */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            <Card.Root bg="gray.800" border="1px" borderColor="gray.700">
              <CardBody textAlign="center">
                <Text fontSize="3xl" fontWeight="bold" color="red.500">
                  {formatViewingTime(user.viewingTime)}
                </Text>
                <Text color="gray.400">Total Viewing Time</Text>
              </CardBody>
            </Card.Root>

            <Card.Root bg="gray.800" border="1px" borderColor="gray.700">
              <CardBody textAlign="center">
                <Text fontSize="3xl" fontWeight="bold" color="red.500">
                  {user.favoriteGenre.length}
                </Text>
                <Text color="gray.400">Favorite Genres</Text>
              </CardBody>
            </Card.Root>

            <Card.Root bg="gray.800" border="1px" borderColor="gray.700">
              <CardBody textAlign="center">
                <Text fontSize="3xl" fontWeight="bold" color="red.500">
                  {user.role}
                </Text>
                <Text color="gray.400">Account Type</Text>
              </CardBody>
            </Card.Root>
          </SimpleGrid>

          {/* Favorite Genres */}
          <Card.Root bg="gray.800" border="1px" borderColor="gray.700">
            <CardBody p={8}>
              <Heading size="lg" mb={6} color="white">
                Favorite Genres
              </Heading>
              <Flex flexWrap="wrap" gap={3}>
                {user.favoriteGenre.map((genre) => (
                  <Badge
                    key={genre.id}
                    colorScheme="red"
                    variant="solid"
                    fontSize="md"
                    px={4}
                    py={2}
                    borderRadius="full">
                    {genre.name}
                  </Badge>
                ))}
              </Flex>
            </CardBody>
          </Card.Root>

          {/* Security Section */}
          <Card.Root bg="gray.800" border="1px" borderColor="gray.700">
            <CardBody p={8}>
              <HStack justify="space-between" mb={6}>
                <VStack align="start" gap={1}>
                  <Heading size="lg" color="white">
                    Security
                  </Heading>
                  <Text color="gray.400">Manage your account security</Text>
                </VStack>
                <Button colorScheme="red" variant="outline" onClick={onOpen}>
                  Change Password
                  <IoIosLock />
                </Button>
              </HStack>
            </CardBody>
          </Card.Root>
        </VStack>
      </Container>

      {/* Change Password Modal */}
      {/* <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="gray.800" border="1px" borderColor="gray.700">
          <ModalHeader color="white">Change Password</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack gap={4}>
              <FormControl>
                <FormLabel color="gray.300">Current Password</FormLabel>
                <Input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  bg="gray.700"
                  border="1px"
                  borderColor="gray.600"
                  _focus={{ borderColor: "red.500" }}
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300">New Password</FormLabel>
                <Input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  bg="gray.700"
                  border="1px"
                  borderColor="gray.600"
                  _focus={{ borderColor: "red.500" }}
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300">Confirm New Password</FormLabel>
                <Input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  bg="gray.700"
                  border="1px"
                  borderColor="gray.600"
                  _focus={{ borderColor: "red.500" }}
                  color="white"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} color="gray.400">
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
}
