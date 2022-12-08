import React, {
    FormEventHandler,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Quote } from "../api-types";
import "./QuoteForm.css";

type FormData = {
    content: string;
    author: string;
    id?: number;
};

export type Props = {
    onSubmit: (data: FormData) => void;
    editQuote?: Quote;
    onCancelEditQuote: () => void;
};

function QuoteForm({ editQuote, onCancelEditQuote, onSubmit }: Props) {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        console.log("editQuote changed", editQuote);
        if (editQuote) {
            setContent(editQuote.content);
            setAuthor(editQuote.author.name);
        } else {
            setContent("");
            setAuthor("");
        }
    }, [editQuote]);

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (event) => {
            event.preventDefault();

            if (!editQuote) {
                setContent("");
                setAuthor("");
            }

            onSubmit({
                content,
                author,
                id: editQuote?.id,
            });
        },
        [onSubmit, content, author, editQuote]
    );

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a new quote</h3>
            <div className="quote-inputs">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="content"
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="author"
                />
            </div>
            <div className="quote-form-actions">
                <button type="submit">Submit</button>
                {editQuote && <button onClick={onCancelEditQuote}>Cancel Editing</button>}
            </div>
        </form>
    );
}

export default QuoteForm;
