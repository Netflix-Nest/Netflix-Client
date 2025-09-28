import React, { useEffect, useState } from "react";
import { Dialog, Portal, Grid } from "@chakra-ui/react";
import { CommentClient, Content, Watchlist } from "@netflix-clone/types";
import { engagementApi, movieApi } from "@/utils/api";

import HeroSectionModal from "./hero.section";
import LeftContent from "./left.content";
import RightContent from "./right.content";
import EpisodeSection from "./episode.section";
import CommentSection from "./comment.section";

const NetflixMovieDialog = ({
  movie,
  isOpen,
  setIsOpen,
  isVideoLoaded,
}: {
  movie: Content;
  isOpen: boolean;
  setIsOpen: (e) => void;
  isVideoLoaded: boolean;
}) => {
  const [watchlist, setWatchlist] = useState<Watchlist[]>([]);
  useEffect(() => {
    const getAndSetWatchlists = async () => {
      const res = await engagementApi.getWatchlists();
      console.log("cal wwatchlist......");
      if (res.data) {
        setWatchlist(res.data);
      } else {
      }
    };
    getAndSetWatchlists();
  }, []);
  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      size="xl"
      scrollBehavior="outside">
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.800" />
        <Dialog.Positioner style={{ transitionDuration: "0.5s" }}>
          <Dialog.Content
            bg="gray.900"
            color="white"
            borderRadius="xl"
            overflow="visible"
            maxH="90vh">
            <HeroSectionModal
              isVideoLoaded={isVideoLoaded}
              movie={movie}
              watchlist={watchlist}
            />

            <Dialog.Body px={6} py={6}>
              <Grid templateColumns="2fr 1fr" gap={8}>
                <LeftContent movie={movie} />

                <RightContent movie={movie} />
              </Grid>

              <EpisodeSection movie={movie} />

              <CommentSection isOpen={isOpen} movie={movie} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NetflixMovieDialog;
