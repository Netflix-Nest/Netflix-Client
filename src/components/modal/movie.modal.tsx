import React, { useEffect, useState } from "react";
import { Dialog, Portal, Grid } from "@chakra-ui/react";
import { CommentClient, Content } from "@netflix-clone/types";
import { movieApi } from "@/utils/api";

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
  const [comments, setComments] = useState<CommentClient[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  useEffect(() => {
    const getComments = async (
      current: number,
      pageSize: number,
      id: number
    ) => {
      try {
        const cmts = await movieApi.getComments(current, pageSize, id);
        if (cmts.data) {
          setComments(cmts.data);
          setTotalComments(cmts.data.length);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (isOpen) {
      setCurrentPage(1);
      setComments([]);
      getComments(1, commentsPerPage, movie.id);
    }
  }, [isOpen]);

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
            <HeroSectionModal isVideoLoaded={isVideoLoaded} movie={movie} />

            <Dialog.Body px={6} py={6}>
              <Grid templateColumns="2fr 1fr" gap={8}>
                <LeftContent movie={movie} />

                <RightContent movie={movie} />
              </Grid>

              <EpisodeSection movie={movie} />

              <CommentSection
                comments={comments}
                commentsPerPage={commentsPerPage}
                currentPage={currentPage}
                movie={movie}
                setComments={setComments}
                setCurrentPage={setCurrentPage}
                setTotalComments={setTotalComments}
                totalComments={totalComments}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NetflixMovieDialog;
