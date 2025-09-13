import { Box, Slider } from "@chakra-ui/react";
interface IProps {
  setIsHoveredVolume: (v: boolean) => void;
  handleVolumeChange: (v: number) => void;
  isMuted: boolean;
  volume: number;
}
export default function VolumeSlider(props: IProps) {
  const { setIsHoveredVolume, handleVolumeChange, isMuted, volume } = props;
  return (
    <Box
      width="80px"
      position="absolute"
      bottom="55px"
      left="225px"
      padding={"30px"}
      onMouseEnter={() => setIsHoveredVolume(true)}
      onMouseLeave={() => setIsHoveredVolume(false)}>
      <Slider.Root
        height="200px"
        colorPalette="red"
        defaultValue={[100]}
        orientation={"vertical"}
        onValueChange={({ value }) => handleVolumeChange(value[0])}
        value={isMuted ? [0] : [volume]}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
}
