import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setUser } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useEffect } from "react";


const Friend2 = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  let bgcolor = "none";

  const boxSX = {
    "&:hover": {
      cursor:'pointer',
      opacity: '0.5',
    }, 
  };
  

  const handleClick = () => {
    bgcolor = "white";
    dispatch(
      setUser({
          name: name,
          picture: userPicturePath
        })
    );  
  }

  return (
      <Box 
        sx={boxSX} 
        onClick={handleClick}
      >
        <FlexBetween gap="1rem">
            <UserImage image={userPicturePath} size="55px" />
            <Box>
              <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
            </Box>
          </FlexBetween>
      </Box>
      
  );
};

export default Friend2;
