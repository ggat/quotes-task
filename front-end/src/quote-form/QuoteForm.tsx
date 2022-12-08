import React, { FormEventHandler, useCallback, useState } from "react";
import "./QuoteForm.css";

type FormData = {
    quote: string;
    author: string;
};

export type Props = {
    onSubmit: (data: FormData) => void;
};

function QuoteForm({ onSubmit }: Props) {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (event) => {
            event.preventDefault();
            onSubmit({
                quote,
                author,
            });
        },
        [onSubmit, quote, author]
    );

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter your quote:
                <input
                    type="text"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                />
            </label>
            <label>
                Enter your author:
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </label>
            <input type="submit" />
        </form>
    );
}

export default QuoteForm;
