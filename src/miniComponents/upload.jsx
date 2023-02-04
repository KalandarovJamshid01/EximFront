import { useId, useState } from 'react';
import { IconButton, Box } from "@mui/material";
import { 
  KeyboardArrowRightOutlined as ArrowRight,
  CloudDone as DoneIcon
} from "@mui/icons-material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import axios from 'axios';
import { peekaboo } from '../PEEKABOO';

export default function Upload(selectionProps) {
  const {
    label,
    placholder = "Выберите файл...",
    //eslint-disable-next-line
    optionChange
  } = selectionProps;
  const htmlKey = useId();
  const [newFile, setNewFile] = useState(false);
  const [isUploaded, setUploaded] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleChangeUpload = (event) => {
    setProgress(0);
    setUploaded(false);
    setNewFile(false);
    const uploadedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', uploadedFile);

    const uploadFile = async () => {
      setProgress(50);
      const response = await axios.post(`${peekaboo}/upload`, formData);
      if (response.status === 200) {
        setNewFile(response.data);
        setTimeout(() => {
          setProgress(100);
          setUploaded(true);
          optionChange.change(
            optionChange.stateVal, 
            response.data
          );
        }, 600);
      }
    }
    uploadFile();
  }

  return (
    <div className="content__submit">
      <h4>{label}</h4>
      <div className="content__submit--selection">
        <label className="submit-upload" htmlFor={htmlKey}>
          { isUploaded ? (
            <h4 className="text-white w-100">
              Загружено! <span className={"color-orange"}>{newFile.filename}</span>
            </h4>
          ) : (
            <span className="submit-upload--label">{placholder}</span>
          )}
          <input
            id={htmlKey}
            type={"file"}
            className="submit-upload--input"
            onChange={handleChangeUpload}
          />
        </label>
        { !isUploaded && (
          <Box sx={{ width: "100%" }} className={`submit-upload--progress`}>
            <LinearProgressWithLabel value={progress ? progress : 0}/>
          </Box>
        )}
        <IconButton className="submit-button">
          <label htmlFor={htmlKey}>
            { isUploaded ? (
              <DoneIcon/>
            ) : (
              <ArrowRight/>
            )}
          </label>
        </IconButton>
      </div>
    </div>
  );
}
