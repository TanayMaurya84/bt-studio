import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import MinimalDiagramEditor from "./MinimalDiagramEditor";

const EditorContainer = () => {
  const [graphJson, setGraphJson] = useState(null);

  const getGraph = async (project_name: any) => {
    try {
      const response = await axios.get("/tree_api/get_project_graph/", {
        params: {
          project_name: project_name,
        },
      });
      if (response.data.success) {
        setGraphJson(response.data.graph_json);
      }
    } catch (error) {
      console.error("Error fetching graph:", error);
    }
  };

  useEffect(() => {
    // Fetch graph when component mounts
    getGraph("minimal");
  }, []);

  return (
    <div id="editor-container">
      {graphJson ? (
        <MinimalDiagramEditor modelJson={graphJson} />
      ) : (
        <p>Loading...</p> // Display a loading message until the graph is fetched
      )}
    </div>
  );
};

export default EditorContainer;
