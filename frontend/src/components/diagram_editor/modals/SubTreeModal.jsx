import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DiagramEditor from "../DiagramEditor";
import { getSubtree } from "../../../api_helper/TreeWrapper";
import "./SubTreeModal.css";
import { saveSubtree } from "../../../api_helper/TreeWrapper";

const SubtreeModal = ({
  isOpen,
  onClose,
  projectName,
  subtreeName,
  setDiagramEdited,
}) => {
  // STATE
  const [initialJson, setInitialJson] = useState(null);
  const [resultJson, setResultJson] = useState(null);

  // EFFECTS
  useEffect(() => {
    const fetchSubtree = async () => {
      if (isOpen) {
        try {
          const response = await getSubtree(subtreeName, projectName);
          setInitialJson(JSON.parse(response));
          console.log("Initial JSON:", JSON.parse(response));
        } catch (error) {
          console.error("Failed to fetch subtree:", error);
        }
      }
    };
    fetchSubtree();
  }, [isOpen, projectName, subtreeName]);

  const handleCancel = async () => {
    try {
      console.log("The subtree is:", resultJson);
      await saveSubtree(resultJson, projectName, subtreeName);
    } catch (error) {
      console.error("Failed to save subtree:", error);
    }
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby="sub-tree-modal-title"
      aria-describedby="sub-tree-modal-description"
    >
      <Box className="modal-box">
        <div className="modal-menu">
          <h2 className="modal-name">{subtreeName}</h2>
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            className="close-button"
            style={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          {initialJson && (
            <DiagramEditor
              modelJson={initialJson}
              setResultJson={setResultJson}
              projectName={projectName}
              setDiagramEdited={setDiagramEdited}
              hasSubtrees={false}
            />
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default SubtreeModal;
