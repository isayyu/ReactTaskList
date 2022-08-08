import React from "react";
import { Toaster } from "react-hot-toast";
import styles from "./styles/modules/app.module.scss";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";

function App() {
    return (
        <>
            <div className="App">
                <div className={styles.app__wrapper}>
                    <AppHeader />
                    <AppContent />
                </div>
            </div>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: "2rem",
                    },
                }}
            />
        </>
    );
}

export default App;
