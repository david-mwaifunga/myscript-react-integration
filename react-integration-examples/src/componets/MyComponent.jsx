import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faClose, faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.png'
import * as iink from 'iink-js';

const HandwritingModal = ({showModal, editorRef, editorStyle, handleOk, handleCancel, handleClose}) => (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{display: showModal ? 'block' : 'none'}}>
        <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
                <div className="modal-footer">
                    <button onClick={handleOk} className="btn btn-success"><FontAwesomeIcon icon={faCheck} /> DONE</button>
                    <button onClick={handleCancel} className="btn btn-danger"><FontAwesomeIcon icon={faTrashCan} /> CLEAR</button>
                    <button onClick={handleClose} className="btn btn-secondary"><FontAwesomeIcon icon={faClose} /> CLOSE</button>
                </div>
                <div className="modal-body">
                    <div style={editorStyle} ref={editorRef} touch-action="none"></div>
                </div>
            </div>
        </div>
    </div>
);

function MyComponent() {
    const [name, setName] = useState('');
    const [savedNames, setSavedNames] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [initializeHandwriting, setInitializeHandwriting] = useState(false)
    const editorRef = useRef(null);

    const editorStyle = {
        'minWidth': '100px',
        'minHeight': '100px',
        'width': '100vw',
        'height': 'calc(100vh - 190px)',
        'touchAction': 'none'
    };

    const isNullOrEmpty = (input) => {
        return input === null || input === undefined || input === ""
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    const isNotNullOrEmpty = (input) => {
        return isNullOrEmpty(input) === false
    }

    const handleSave = () => {
        setSavedNames(prevState => [...prevState, name]);
        setName('');
    };

    const handleOk = () => {

        if (isNotNullOrEmpty(editorRef.current.outerText)) {
            let extractedText = editorRef.current.outerText.toString().substring(2)
            setName(extractedText.substring(0, extractedText.length - 3));
        }
        setShowModal(false);
    };

    const handleCancel = () => {
        editorRef.current.editor.clear().catch((error) => {
            console.log("Exception:", error.message)
        });
    };

    const handleHandwritingClick = () => {
        setShowModal(true);

        if (initializeHandwriting === false) {
            let editor = iink.register(editorRef.current, {
                recognitionParams: {
                    type: 'TEXT',
                    server: {
                        applicationKey: '000ad1e8-dffd-4a6b-ae54-a7c93e341370',
                        hmacKey: 'f0e2415e-abfb-4d35-a5fd-e650d5e2d803',
                    },
                },
            });

            const handlePointerEvent = (e) => {
                // Check if the event target is inside the handwriting modal
                if (editorRef.current.contains(e.target)) {
                    if (e.pointerType !== 'pen') {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            };

            // Use capture phase to catch events before they reach their target
            document.addEventListener('pointerdown', handlePointerEvent, true);
            document.addEventListener('pointermove', handlePointerEvent, true);
            document.addEventListener('pointerup', handlePointerEvent, true);

            window.addEventListener('resize', () => {
                editor.resize();
            });

            setInitializeHandwriting(true)

            return () => {
                window.removeEventListener('resize', () => {
                    editor.resize();
                });
                document.removeEventListener('pointerdown', handlePointerEvent, true);
                document.removeEventListener('pointermove', handlePointerEvent, true);
                document.removeEventListener('pointerup', handlePointerEvent, true);
                editor.close();
            };
        }
    };



    return (
        <div className="container-fluid bg-dark vh-100 d-flex justify-content-center align-items-center">
            <div className="container bg-light p-5 rounded">
                <div className="row justify-content-center text-center">
                    <img src={logo} className="App-logo m-4" alt="logo" style={{width: '22%', margin: 'auto'}}/>
                    <u>
                        <h2>SMARTCARE</h2>
                        <h6>HANDWRITING - TEXT</h6>
                    </u>
                </div>
                <div className="row justify-content-center">
                    <div className="col-9">
                        <label htmlFor="nameInput">TEXT</label>
                        <div className="row no-gutters">
                            <div className="col-10">
                                <input
                                    type="text"
                                    id="nameInput"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="form-control"
                                />

                            </div>
                            <div className="col-2 p-0">
                                <button className="btn btn-secondary" onClick={handleHandwritingClick}><FontAwesomeIcon icon={faPenToSquare} /></button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <button onClick={handleSave} className="btn btn-primary"><FontAwesomeIcon icon={faSave} /> SAVE</button>
                        </div>
                        <div className="mt-3">
                            <ol>
                                {savedNames.map((savedName, index) => (
                                    <li key={index}>{savedName}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
                <HandwritingModal
                    showModal={showModal}
                    editorRef={editorRef}
                    editorStyle={editorStyle}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    handleClose={() => setShowModal(false)}
                />
            </div>
        </div>
    );
}

export default MyComponent;