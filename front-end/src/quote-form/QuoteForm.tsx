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
    onCancelEditQuote: (quote: Quote) => void;
};

function QuoteForm({ onSubmit, editQuote }: Props) {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
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
                id: editQuote?.id
            });
        },
        [onSubmit, content, author, editQuote]
    );

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter the quote:
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </label>
            <label>
                Enter the author of the quote:
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
