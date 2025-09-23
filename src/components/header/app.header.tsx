"use client";
import { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Stack,
  Link,
  IconButton,
  Spacer,
  Avatar,
  Image,
  Menu,
  MenuItem,
  Text,
  Portal,
} from "@chakra-ui/react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { UserProfile } from "@netflix-clone/types";

export default function AppHeader({ user }: { user: UserProfile }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  // Navigation items
  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/series", label: "Series" },
    { href: "/movies", label: "Phim" },
    { href: "/new", label: "Mới & Phổ biến" },
    { href: "/my-list", label: "Danh sách của tôi" },
    { href: "/browse-by-lang", label: "Duyệt theo ngôn ngữ" },
  ];

  return (
    <Box
      data-header
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      transition="background-color 0.3s ease"
      bg={
        scrolled
          ? "black"
          : "linear-gradient(to bottom,rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100% )"
      }
      px={19}
      paddingRight={10}
      py={0}>
      <Flex align="center">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${process.env.NEXT_PUBLIC_LOGO_HEADER}`}
          alt="Netflix"
          width={141}
          height={55}
        />

        {/* Menu */}
        <Stack direction="row" ml={10} fontSize="md" spaceX={3}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              as={NextLink}
              href={item.href}
              fontWeight={isActiveLink(item.href) ? "bold" : "normal"}
              color={isActiveLink(item.href) ? "white" : "gray.300"}
              transition="all 0.2s"
              _hover={{
                color: "white",
                // fontWeight: "semibold",
              }}>
              {item.label}
            </Link>
          ))}
        </Stack>

        <Spacer />

        {/* Icons */}
        <Stack direction="row" align="center">
          <IconButton aria-label="Search" variant="ghost">
            <Search size={20} />
          </IconButton>
          <IconButton aria-label="Notifications" variant="ghost">
            <Bell size={20} />
          </IconButton>

          {/* User Menu Dropdown */}
          <Menu.Root>
            <Menu.Trigger
              as={Box}
              cursor="pointer"
              display="flex"
              alignItems="center"
              gap={1}
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s">
              <Avatar.Root size="sm" shape="square">
                <Avatar.Fallback name="Avatar" />
                <Avatar.Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${user.avatar}`}
                />
              </Avatar.Root>
              <ChevronDown size={16} color="white" />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg="rgba(0, 0, 0, 0.9)"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  borderRadius="4px"
                  py={2}
                  minW="200px">
                  {session && (
                    <MenuItem
                      value="account"
                      bg="transparent"
                      _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                      display="flex"
                      alignItems="center"
                      onClick={() => router.push("/account")}
                      gap={3}
                      py={3}>
                      <User size={16} />
                      <Text color="white" fontSize="sm">
                        Tài khoản
                      </Text>
                    </MenuItem>
                  )}

                  <MenuItem
                    value="help"
                    bg="transparent"
                    _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                    display="flex"
                    alignItems="center"
                    onClick={() => redirect("/help")}
                    gap={3}
                    py={3}>
                    <HelpCircle size={16} />
                    <Text color="white" fontSize="sm">
                      Trung tâm trợ giúp
                    </Text>
                  </MenuItem>
                  {session && (
                    <Menu.Item
                      value="logout"
                      bg="transparent"
                      _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                      display="flex"
                      alignItems="center"
                      onClick={() => signOut()}
                      gap={3}
                      py={3}
                      borderTop="1px solid rgba(255, 255, 255, 0.2)"
                      mt={1}>
                      <LogOut size={16} />
                      <Text color="white" fontSize="sm">
                        Đăng xuất khỏi Netflix
                      </Text>
                    </Menu.Item>
                  )}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Stack>
      </Flex>
    </Box>
  );
}
