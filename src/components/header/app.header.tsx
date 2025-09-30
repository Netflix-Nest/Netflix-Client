"use client";
import { useEffect, useState, useRef } from "react";
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
  Input,
  Spinner,
} from "@chakra-ui/react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { UserProfile } from "@netflix-clone/types";
import { searchApi } from "@/utils/api";

export default function AppHeader({ user }: { user: UserProfile }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Debounce search with 0.4s delay
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      setIsLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchApi.suggestMovie(searchQuery, 10);
          setSuggestions(results);
        } catch (error) {
          console.error("Search error:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 400);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (movie: any) => {
    router.push(`/movie/${movie.slug || movie.id}`);
    setSearchOpen(false);
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleSearchSubmit = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== "Enter") return;

    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/series", label: "Series" },
    { href: "/movies", label: "Phim" },
    { href: "/bookmark", label: "Đã đánh dấu" },
    { href: "/my-list", label: "Danh sách xem của tôi" },
    { href: "/history", label: "Đã xem gần đây" },
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
          onClick={() => (window.location.href = "/")}
          _hover={{ cursor: "pointer" }}
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
              }}>
              {item.label}
            </Link>
          ))}
        </Stack>

        <Spacer />

        {/* Icons */}
        <Stack direction="row" align="center" position="relative">
          {/* Search Box */}
          <Box position="relative">
            <Flex
              align="center"
              bg={searchOpen ? "rgba(0, 0, 0, 0.8)" : "transparent"}
              border={searchOpen ? "1px solid white" : "none"}
              borderRadius="4px"
              transition="all 0.3s ease"
              overflow="hidden"
              maxW={searchOpen ? "300px" : "40px"}
              minW={searchOpen ? "300px" : "40px"}>
              <IconButton
                aria-label="Search"
                variant="ghost"
                onClick={handleSearchToggle}
                size="sm"
                minW="40px">
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </IconButton>

              {searchOpen && (
                <Input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  placeholder="Tìm kiếm phim, series..."
                  bg="transparent"
                  border="none"
                  color="white"
                  fontSize="sm"
                  _focus={{ outline: "none", boxShadow: "none" }}
                  _placeholder={{ color: "gray.400" }}
                  pr={10}
                />
              )}

              {searchOpen && isLoading && (
                <Box position="absolute" right={3}>
                  <Spinner size="sm" color="white" />
                </Box>
              )}
            </Flex>

            {/* Suggestions Dropdown */}
            {searchOpen && suggestions.length > 0 && (
              <Box
                position="absolute"
                top="calc(100% + 8px)"
                left={0}
                right={0}
                bg="rgba(0, 0, 0, 0.95)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                borderRadius="4px"
                maxH="400px"
                overflowY="auto"
                zIndex={1001}>
                {suggestions.map((movie, index) => (
                  <Box
                    key={movie.id || index}
                    px={4}
                    py={3}
                    cursor="pointer"
                    transition="background 0.2s"
                    _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                    onClick={() => handleSuggestionClick(movie)}
                    borderBottom={
                      index < suggestions.length - 1
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "none"
                    }>
                    <Text color="white" fontSize="sm" fontWeight="medium">
                      {movie.title || movie.name}
                    </Text>
                    {movie.year && (
                      <Text color="gray.400" fontSize="xs" mt={1}>
                        {movie.year}
                      </Text>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

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
