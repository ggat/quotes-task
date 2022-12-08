import React, {
    FormEventHandler,
    MouseEvent,
    MouseEventHandler,
    useCallback,
    useMemo,
    useState,
} from "react";
import { Quote } from "../api-types";
import "./QuoteList.css";

export type Props = {
    quotes: Quote[];
    onEdit: (quote: Quote) => void;
    onDelete: (quote: Quote) => void;
    editQuote?: Quote;
};

function QuoteList({ quotes, onEdit, onDelete, editQuote }: Props) {
    const [hoveringQuote, setHoveringQuote] = useState<Quote>();
    const quotesHashMap = useMemo(() => {
        if (!quotes) {
            return;
        }
        const hashMap: { [key: number]: Quote } = {};
        for (let i = 0; i < quotes.length; i++) {
            hashMap[quotes[i].id] = quotes[i];
        }
        return hashMap;
    }, [quotes]);

    const handleQuoteMousEnter = useCallback<MouseEventHandler<any>>(
        (event) => {
            const id = Number(event.currentTarget.getAttribute("data-id"));
            setHoveringQuote(quotesHashMap?.[id]);
        },
        [quotesHashMap]
    );

    const handleQuoteMousLeave = useCallback(() => {
        setHoveringQuote(undefined);
    }, []);

    const handleEditClick = useCallback(() => {
        onEdit(hoveringQuote!);
    }, [onEdit, hoveringQuote]);

    const handleDeleteClick = useCallback(() => {
        onDelete(hoveringQuote!);
    }, [onDelete, hoveringQuote]);

    return (
        <div>
            <div>
                {quotes.length === 0 && (
                    <div>
                        No quotes to show, try adding some, using the form
                        above.
                    </div>
                )}
            </div>
            <div>
                {quotes.map(({ id, content, author: { name: authorName } }) => (
                    <div
                        className="quote"
                        data-id={id}
                        onMouseEnter={handleQuoteMousEnter}
                        onMouseLeave={handleQuoteMousLeave}
                        key={id}
                    >
                        {content} - <strong>{authorName}</strong>
                        {hoveringQuote?.id === id && (
                            <div className="quote-actions">
                                <button onClick={handleEditClick}>Edit</button>
                                <button onClick={handleDeleteClick}>
                                    Delete
                                </button>
                            </div>
                        )}
                        {editQuote?.id === id && (
                            <div className="quote-state">Editing...</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuoteList;
