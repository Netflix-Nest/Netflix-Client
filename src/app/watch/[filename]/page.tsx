import VideoPlayer from "@/components/video/video.player";

export default async function WatchVideo({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = await params;
  console.log(filename);
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
      <VideoPlayer fileName={filename} />
    </div>
  );
}
