import { useTheme } from "@emotion/react";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "../scenes/widgets/FriendListWidget"
import Navbar from "scenes/navbar";
import socket from "socket";
import UserImage from "./UserImage";
import { setMessageList } from "state";

const MessageSection = () => {
    const { _id, picturePath,firstName } = useSelector((state) => state.user);
    const { selectedUserPicturePath, selectedUsername, messageList } = useSelector((state) => state);
    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState([]);
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const dispatch = useDispatch();
    let messageResponse = [];


    const handleSubmit = async (e) => {
        const values = {
            from : firstName,
            to: selectedUsername.split(" ")[0],
            message: message,
            date: new Date(Date.now()).getDate() +":"+ new Date(Date.now()).getMonth() +":"+ new Date(Date.now()).getFullYear(),
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        console.log(values);
        setMessage("");
        e.preventDefault();
        
        const MessageResponse = await fetch("http://localhost:3001/message/updateMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const messageRes = await MessageResponse.json();
        getMessages();
    }

    const getMessages = async() => {
        const value = {
            username : firstName,
            friendname: selectedUsername.split(" ")[0],
        }
        const GetMessageResponse = await fetch("http://localhost:3001/message/getMessages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        });
        messageResponse = await GetMessageResponse.json()
        dispatch(
            setMessageList({
                messageList: messageResponse
            })
        );
    }

    useEffect(() => {
        getMessages();
    },[selectedUsername])

    return (
        <Box>
            <WidgetWrapper sx={{ borderBottomLeftRadius: "0px", borderBottomRightftRadius: "0px",p:"2rem" }} >
                <Typography sx={{textAlign:"center",p:"0.8rem",fontSize:"larger"}}>Chat Online</Typography>
                <Box sx={{display:"flex"}}>
                    <Box sx={{width:"30%"}}>
                        <FriendListWidget userId={_id} num="2" />
                    </Box>
                    <Box sx={{width:"70%",borderLeft:"1px solid grey",pl:"1rem"}}>
                        <FlexBetween sx={{justifyContent: "center",height:"100%",paddingTop: "0%",paddingBottom:"0%"}}>
                            <Box sx={{
                                gridColumn: "span 2",
                                height:"100%",width:"100%",
                                // border:"1px solid grey",
                                borderTopLeftRadius:"20px",
                                borderTopRightRadius:"20px",
                                borderBottomLeftRadius:"20px"
                            }}>
                            
                            <Box sx={{padding:"5%",display:"flex"}}>
                                <UserImage sx={{}} image={selectedUserPicturePath} size="55px" />
                                <Typography sx={{fontSize:"1rem",pl:"1rem",pt:"1rem"}}>{selectedUsername}</Typography>
                            </Box>
                            <Box sx={{padding:"5%"}}>
                                {
                                    messageList.map((messageDetail) => {
                                        if(messageDetail.from === firstName && messageDetail.to === selectedUsername.split(" ")[0]){
                                            return (
                                                <Box sx={{width:"100%",mb:"0.6rem"}}>
                                                    <Box sx={{width:"max-content",ml:"auto"}}>
                                                        <Typography sx={{textAlign:"end",pr:"0.4rem"}}>{messageDetail.date}</Typography>
                                                        <Box sx={{p:"0.8rem",backgroundColor:"green",width:"max-content",borderRadius:"10px"}}>
                                                            <Typography sx={{color:"white"}}>{messageDetail.message}</Typography>
                                                        </Box> 
                                                        <Typography sx={{textAlign:"end",pr:"0.4rem"}}>{messageDetail.time}</Typography> 
                                                        
                                                    </Box>
                                                </Box>
                                            );
                                        } else if (messageDetail.to === firstName && messageDetail.from === selectedUsername.split(" ")[0]){
                                            return (
                                                <Box sx={{width:"100%",mb:"0.6rem"}}>
                                                    <Box sx={{width:"max-content",ml:""}}>
                                                    <Box sx={{display:"flex"}}>
                                                            <Typography sx={{pl:"0.4rem",flexBasis:"50%"}}>{messageDetail.from}</Typography>
                                                            <Typography sx={{textAlign:"end",flexBasis:"50%",pr:"0.4rem"}}>{messageDetail.date}</Typography>
                                                        </Box>
                                                        <Box sx={{p:"0.8rem",backgroundColor:"#14889d",width:"max-content",borderRadius:"10px"}}>
                                                            <Typography sx={{color:"white"}}>{messageDetail.message}</Typography>
                                                        </Box> 
                                                        <Typography sx={{textAlign:"end",pr:"0.4rem"}}>{messageDetail.time}</Typography> 
                                                    </Box>
                                                </Box>
                                            );
                                        }
                                        
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
                    </Box>
                    
                </Box>
                
                
                
                
            </WidgetWrapper>
        </Box>
    );
};

export default MessageSection;
