import * as React from "react";
import { style } from "../../helpers/muiStyles";
import { Grid, Box, Modal } from "@mui/material";
import yamilogoV from "../../assets/yamilogoV.jpg";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const AuthModal: React.FC<IAuthModal> = ({
  openAuthModal,
  setOpenAuthModal,
}) => {
  return (
    <React.Fragment>
      <Modal
        open={openAuthModal.open}
        onClose={() => setOpenAuthModal({ auth: "", open: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={2} textAlign="center">
              <Box component="img" src={yamilogoV} alt="yami" />
            </Grid>
            <Grid item xs={10}>
              {openAuthModal.auth === "Signin" && (
                <SigninForm {...{ openAuthModal, setOpenAuthModal }} />
              )}
              {openAuthModal.auth === "Signup" && (
                <SignupForm {...{ openAuthModal, setOpenAuthModal }} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default AuthModal;
