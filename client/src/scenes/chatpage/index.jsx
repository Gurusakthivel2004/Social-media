import { useTheme } from "@emotion/react";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import socket from "socket";

const ChatSection = () => {
    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState([]);
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { roomData,user } = useSelector((state) => state);
    const username = user.firstName;
    socket.emit("join_room", roomData.room);

    const  handleSubmit = async(e) => {
        const messageData = {
            message: message,
            roomId: roomData.room,
            name: roomData.name,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        await socket.emit("recieve_message", messageData);
        setChatList((prev) => [...prev,messageData]);
        setMessage("");
        e.preventDefault();
    }
    useEffect(() => {
        socket.on("send_message",(data) => {
            setChatList((prev) => {return [...prev,data]});
            console.log(chatList);
        })
        return () => socket.removeListener('send_message')
    },[socket])

    return (
        <Box>
            <WidgetWrapper sx={{ borderBottomLeftRadius: "0px", borderBottomRightftRadius: "0px",p:"0" }} >
                <Typography sx={{textAlign:"center",p:"0.8rem",fontSize:"larger"}}>Chat Online</Typography>
                <FlexBetween sx={{justifyContent: "center",height:"100%",paddingTop: "7%",paddingBottom:"0%"}}>
                    <Box sx={{
                        gridColumn: "span 2",
                        height:"100%",width:"100%",
                        // border:"1px solid grey",
                        borderTopLeftRadius:"20px",
                        borderTopRightRadius:"20px",
                        borderBottomLeftRadius:"20px"
                    }}>
                    <Box sx={{padding:"5%"}}>
                        {
                            chatList.map((m) => {
                                return (
                                    <Box sx={{width:"100%",mb:"0.6rem"}}>
                                        <Box sx={{width:"max-content",ml:m.name === username ? "auto" : ""}}>
                                            <Typography sx={{pl:"0.4rem"}}>{m.name === username ? "" : m.name}</Typography>
                                            <Box sx={{p:"0.8rem",backgroundColor:m.name === username ? "green" : "#14889d",width:"max-content",borderRadius:"10px"}}>
                                                <Typography sx={{color:"white"}}>{m.message}</Typography>
                                            </Box> 
                                            <Typography sx={{textAlign:"end",pr:"0.4rem"}}>{m.time}</Typography> 
                                        </Box>
                                    </Box>
                                );
                            })
                        }
                    </Box>
                    <form onSubmit={handleSubmit} style={{width : "100%",borderRadius:"10px"}}>
                        <FlexBetween sx={{ borderRadius:"0px",p:"3%"}}>
                            <TextField
                                    sx={{ gridColumn: "span 2",width:"90%",borderRadius: "0px",}}
                                    required
                                    placeholder="Dont be shy! start chatting.. :)"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    fullWidth
                                    name="room"
                                    InputProps={{
                                        style: {
                                        borderRadius: "0",
                                        borderTopLeftRadius:"15px",
                                        borderBottomLeftRadius:"15px"
                                        },
                                    }}
                                />
                                <Button
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        borderRadius: "0",
                                        width: "10%",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                        borderTopRightRadius:"15px",
                                        borderBottomRightRadius:"15px"
                                    }}
                                    >
                                    Join 
                                </Button>
                        </FlexBetween>
                    </form>

                    </Box>
                </FlexBetween>
                
            </WidgetWrapper>
        </Box>
    );
};

export default ChatSection;
