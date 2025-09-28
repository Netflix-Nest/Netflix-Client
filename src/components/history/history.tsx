"use client";
import { Content, History } from "@netflix-clone/types";
import MovieCard from "../slider/movie.card";
import { Box } from "@chakra-ui/react";

export default function HistoryMain({
  histories,
  contents,
}: {
  histories: History[];
  contents: Content[];
}) {
  // Tạo map để dễ dàng truy cập history data
  const historyMap = histories.reduce((acc, history) => {
    acc[history.contentId] = history;
    return acc;
  }, {} as Record<number, History>);

  const calculateProgress = (duration: number, totalDuration?: number) => {
    // Giả sử totalDuration là độ dài phim (có thể lấy từ content hoặc set mặc định)
    // Nếu không có totalDuration, có thể dùng giá trị mặc định như 90 phút (5400 seconds)
    const defaultDuration = 5400; // 90 minutes in seconds
    const total = totalDuration || defaultDuration;
    return Math.min((duration / total) * 100, 100);
  };

  return (
    <>
      {contents.map((content) => {
        const history = historyMap[content.id];
        const progressPercentage = history
          ? calculateProgress(history.duration, 300)
          : 0;

        return (
          <Box key={content.id} position="relative">
            <MovieCard isEdit={false} movie={content} removeMovie={() => {}} />

            {/* Progress Bar - chỉ hiển thị khi có history */}
            {history && progressPercentage > 0 && (
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                height="4px"
                bg="rgba(255, 255, 255, 0.3)"
                borderBottomRadius="md">
                <Box
                  height="100%"
                  bg="#e50914"
                  width={`${progressPercentage}%`}
                  borderBottomRadius="md"
                  transition="width 0.3s ease"
                />
              </Box>
            )}
          </Box>
        );
      })}
    </>
  );
}
