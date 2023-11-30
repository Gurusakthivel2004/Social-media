import { Padding } from "@mui/icons-material";
import { Button, TextField, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoomData } from "state";

const ChatRoom = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const username = useSelector((state) => state.user.firstName);
  const [room,setRoom] = useState(" ");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    const room_data = {
        room : room,
        time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        name: username
    }
    if(room !== ""){
        dispatch(
          setRoomData({
            roomData: room_data
          })
        )
        navigate("/chatroom");
    }
    event.preventDefault();
  }

  return (
    <WidgetWrapper sx={{ borderBottomLeftRadius: "0px", borderBottomRightftRadius: "0px"  }} >
      <FlexBetween>
        <form onSubmit={handleSubmit} style={{width : "100%"}}>
            <Typography color={dark} variant="h5" fontWeight="500">
            Join / Create a Room
            </Typography>
            <TextField
                sx={{ gridColumn: "span 2",width: "100%",marginTop: "10%"}}
                required
                label="Room ID"
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                name="room"
                
            />
            <Button
                fullWidth
                type="submit"
                sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                }}
                >
                Join 
            </Button>
        </form>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ChatRoom;
