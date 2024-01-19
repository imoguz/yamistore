import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReplyIcon from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #3f3f3f",
  boxShadow: 24,
};

interface IErrorModal {
  error: string | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ErrorModal: React.FC<IErrorModal> = ({ open, setOpen, error }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const productId = location?.state || {};
  const id = useParams();
  console.log(id);
  console.log(productId);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            px={1}
            py={0.5}
            bgcolor="#dc3030"
          >
            <ErrorOutlineIcon sx={{ color: "white" }} />
            <Typography
              color="white"
              id="modal-modal-title"
              variant="subtitle1"
            >
              Error
            </Typography>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2, px: 2 }}>
            {error}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-around", my: 3 }}>
            <Button
              variant="outlined"
              sx={{ width: 150 }}
              startIcon={<ReplyIcon />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button
              variant="outlined"
              sx={{ width: 150, color: "green" }}
              endIcon={<HomeIcon />}
              onClick={() => navigate(`/`)}
            >
              Main Page
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ErrorModal;
