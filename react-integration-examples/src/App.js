import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import * as iink from 'iink-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyComponent from "./componets/MyComponent";

function App() {
    // const editorRef = useRef(null);
    // const editorStyle = {
    //     'minWidth': '100px',
    //     'minHeight': '100px',
    //     'width': '100vw',
    //     'height': 'calc(100vh - 190px)',
    //     'touchAction': 'none',
    // };
    //
    // useEffect(() => {
    //     let editor = editorRef.current;
    //     editor = iink.register(editorRef.current, {
    //         recognitionParams: {
    //             type: 'TEXT',
    //             protocol: 'WEBSOCKET',
    //             apiVersion: 'V4',
    //             server: {
    //                 scheme: 'https',
    //                 host: 'webdemoapi.myscript.com',
    //                 applicationKey: '1463c06b-251c-47b8-ad0b-ba05b9a3bd01',
    //                 hmacKey: '60ca101a-5e6d-4159-abc5-2efcbecce059',
    //             },
    //         },
    //     });
    //     window.addEventListener('resize', () => {
    //         editor.resize()
    //     });
    //
    //     return () => {
    //         window.removeEventListener('resize', () => {
    //             editor.resize()
    //         });
    //         this.editor.close();
    //     }
    // }, []);

    return (
        <div className="App">
            {/*<div className="App">*/}
            {/*    <header className="App-header">*/}
            {/*        <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*        <h1 className="App-title">IHM R&D for MyScript integration in SC+ using React</h1>*/}
            {/*    </header>*/}
            {/*    <div style={editorStyle} ref={editorRef} touch-action="none">*/}
            {/*    </div>*/}

            {/*</div>*/}

           <MyComponent/>
        </div>
    )
}

export default App;
