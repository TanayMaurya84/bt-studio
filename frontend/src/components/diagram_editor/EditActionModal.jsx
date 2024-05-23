import React, { useState, useEffect, useRef } from 'react';
import { BasicNodeWidget } from './nodes/basic_node/BasicNodeWidget.tsx';

import { Saturation, Hue, ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

import './EditActionModal.css';
import Modal from '../Modal/Modal';
import { OutputPortModel } from './nodes/basic_node/ports/output_port/OutputPortModel';
import { InputPortModel } from './nodes/basic_node/ports/input_port/InputPortModel';

const EditActionModal = ({ isOpen, onClose, currentActionNode, setColorActionNode, addInputPort, addOutputPort, deleteInputPort, deleteOutputPort}) => {
  // const [color, setColor] = useColor(currentActionNode ? currentActionNode.getColor().replaceAll(",", " ") : "rgb(128 0 128)");
  const [color, setColor] = useColor("rgb(128 0 128)");
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    if (currentActionNode) {
      setColorActionNode(color.rgb['r'], color.rgb['g'], color.rgb['b']);
    }
  }, [color]);

  const isBackgroundDark = () => {
    return ((color.rgb['r'] + color.rgb['g'] + color.rgb['b']) / 3) < 123
  }

  const reRender = () => {
    forceUpdate();
    document.getElementById('node-editor-modal').focus();
  }

  const horizontalScrolling = (e) => {
    e.preventDefault()
    var containerScrollPosition = e.target.scrollLeft
    e.target.scrollBy({
        top: 0,
        left: e.deltaY,
        behaviour: 'smooth'
    })
}

  return (
    <Modal id="node-editor-modal" hasCloseBtn={true} isOpen={isOpen} onClose={onClose} >
      <div className="node-editor-row">
        <label className="node-editor-title" htmlFor="actionNameEditor">Action Editor</label>
      </div>
      <div className="node-editor-row">
        {currentActionNode &&
          <div className="node-editor" style={{backgroundColor: currentActionNode.getColor()}}>
            <label className="node-editor-name" style={{color: isBackgroundDark() ? 'white' : 'black'}}>{currentActionNode.getName()}</label>
            <div className="node-editor-io">
              <div className="node-editor-inputs">
                {Object.entries(currentActionNode.getPorts()).map((port, index) => {
                  if (port[1] instanceof InputPortModel) {
                    return (
                      <div key={index} className="node-editor-input node-editor-io-entry">
                        <label
                          id={port[0]}
                          className="node-editor-io-name"
                          onWheel={horizontalScrolling}
                          style={{color: isBackgroundDark() ? 'white' : 'black'}}>{port[0]}</label>
                        <button 
                          className={"node-editor-io-delete"} 
                          style={{color: isBackgroundDark() ? 'white' : 'black'}} 
                          onClick={() => {deleteInputPort(port[1], port[0]); reRender()}}>-</button>
                      </div>
                    );
                  }
                })}
                <button 
                  className="node-editor-button" 
                  style={{color: isBackgroundDark() ? 'white' : 'black'}} 
                  onClick={() => {addInputPort(); reRender()}} 
                  title='Add input'>
                  +
                </button>
              </div>
              <div className="node-editor-outputs">
                {Object.entries(currentActionNode.getPorts()).map((port, index) => {
                  if (port[1] instanceof OutputPortModel) {
                    return (
                      <div key={index} className="node-editor-output node-editor-io-entry" >
                        <button 
                          className={"node-editor-io-delete"} 
                          style={{color: isBackgroundDark() ? 'white' : 'black'}} 
                          onClick={() => {deleteOutputPort(port[1], port[0]); reRender()}}>-</button>
                        <label 
                          className="node-editor-io-name"
                          onWheel={horizontalScrolling}
                          style={{color: isBackgroundDark() ? 'white' : 'black'}}>{port[0]}</label>
                      </div>
                    );
                  }
                })}
                <button 
                  className="node-editor-button" 
                  style={{color: isBackgroundDark() ? 'white' : 'black'}} 
                  onClick={() => {addOutputPort(); reRender()}} 
                  title='Add output'>
                  +
                </button>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="node-editor-row">
        <label className="node-editor-title" for="favcolor">Color:</label>
        <Saturation height={50} width={300} color={color} onChange={setColor} />
        <Hue color={color} onChange={setColor} />
      </div>
    </Modal>
  );
};

export default EditActionModal;