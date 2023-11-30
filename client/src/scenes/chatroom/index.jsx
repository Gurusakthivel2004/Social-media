import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import ChatSection from "scenes/chatpage";

const ChatPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box 
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <ChatSection />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%" >
          <FriendListWidget userId={_id} />
            <AdvertWidget 
                src="https://play-lh.googleusercontent.com/mXog2BuRhYPqKITgx29PpfjFoqAESP3PXF96dc0UEQPz4CxD35xL3cyfw-OECqA2baiR" 
                content="OneFootball is a platform-based football media company. The OneFootball app features live-scores, statistics and news from 200 leagues in 12 different languages covered by a newsroom located in Berlin."
                title1="One Football"
                title2="onefootball.com"
            />
            <Box m="2rem 0" />
            
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
