import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = ({src, content, title1, title2}) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper sx={{borderTopLeftRadius:"0",borderTopRightRadius:"0"}}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={src}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>{title1}</Typography>
        <Typography color={medium}>{title2}</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">{content}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
