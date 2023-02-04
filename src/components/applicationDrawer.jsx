import { useState, useContext, Fragment } from 'react';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { AppViewContext, AppViewDispatch } from '../contexts/AppViewContext';
import VariantDialog from '../miniComponents/variantsDialog.jsx';
import { IconButton } from "@mui/material";
import { CloseOutlined as CloseIcon } from "@mui/icons-material";

function ApplicationDrawer() {
  const [variantDialog, setVariantDialog] = useState(false);
  //eslint-disable-next-line
  const { handleCallToSnack } = useContext(SnackbarContext);
  // DRAWER VALUES OF CONTEXT SETTINGS
  const { drawer, forms } = useContext(AppViewContext);
  const dispatch = useContext(AppViewDispatch);
  const handleResetDrawer = () => dispatch({type: "DRAWER_RESET"});

  //NOTE: This VariantDialog.jsx is still working even in viewSubmit.jsx is opened or active

  const variantDialogOptions = (variant) => {
    if (variant === "exit") {
      handleResetDrawer(); 
      setVariantDialog(false);
    }
    else if (variant === "close") setVariantDialog(false);
  }

  const closingDrawerState = () => {
    if (forms) setVariantDialog(true);
    else handleResetDrawer();
  }

  return (
    <Fragment>
      <div className={`application__drawer ${drawer.open && "application__drawer--open"}`}>
        <div className={`application__drawer--layout ${drawer.fullWidth && 'full-screen-drawer'}`}>
          <div className="application__drawer--layout-content">
            { drawer.content ? drawer.content : null }
          </div>
          <div className="application__drawer--layout-close">
            <IconButton onClick={closingDrawerState}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {forms && <VariantDialog 
        open={variantDialog}
        optionChange={variantDialogOptions}
      />}
    </Fragment>
  );
}
export default ApplicationDrawer;
