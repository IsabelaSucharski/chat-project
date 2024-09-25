import { Avatar, Box, CardHeader, IconButton } from "@mui/material";

interface CustomCardHeaderProps {
  avatar: React.ReactElement | string;
  title: string;
  subheader: string;
  actionIcon: React.ReactElement;
  handleHeaderAction?: () => void;
  tagFilter?: React.ReactElement;
}

const CustomCardHeader: React.FC<CustomCardHeaderProps> = ({
  avatar,
  title,
  subheader,
  actionIcon,
  handleHeaderAction,
  tagFilter,
}) => {
  const isAvatarString = typeof avatar === "string";

  return (
    <CardHeader
      avatar={
        <Avatar>
          {isAvatarString ? (
            <img
              src={avatar as string}
              alt="avatar"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            avatar
          )}
        </Avatar>
      }
      action={
        <Box display="flex" gap={4}>
          {tagFilter && tagFilter}
          <IconButton
            onClick={() => handleHeaderAction && handleHeaderAction()}
          >
            {actionIcon}
          </IconButton>
        </Box>
      }
      title={title}
      subheader={subheader}
    />
  );
};

export default CustomCardHeader;
