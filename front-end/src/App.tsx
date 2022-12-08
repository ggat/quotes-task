import React, { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { QuoteForm, QuoteFormProps } from "./quote-form";

function App() {
    const handleQuoteFormSubmit = useCallback<QuoteFormProps["onSubmit"]>(
        ({ quote, author }) => {
            // submit the form to the server
            console.log({ quote, author });
        },
        []
    );

    return (
        <div className="App">
            <div className="form-container">
                <QuoteForm onSubmit={handleQuoteFormSubmit} />
            </div>
        </div>
    );
}

export default App;
