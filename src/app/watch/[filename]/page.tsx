import VideoPlayer from "@/components/video/video.player";

export default async function WatchVideo({
  params,
  searchParams,
}: {
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { filename } = await params;
  const { duration } = await searchParams;
  console.log(duration);
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "black",
        zIndex: "9999",
        overflow: "hidden",
      }}>
      <VideoPlayer
        fileName={filename}
        firstSeek={duration === "" ? 0 : +(duration as string)}
      />
    </div>
  );
}
