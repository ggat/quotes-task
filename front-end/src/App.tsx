import React, { useCallback, useEffect, useState } from "react";
import { Quote } from "./api-types";
import "./App.css";
import { QuoteForm, QuoteFormProps } from "./quote-form";
import { QuoteList, QuoteListProps } from "./quote-list";

function App() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [editQuote, setEditQuote] = useState<Quote>();
    const [isFetching, setIsFetching] = useState(false);

    const fetchList = useCallback(() => {
        setIsFetching(true);
        setTimeout(() => {
            setIsFetching(false);
            setQuotes([
                {
                    id: 1,
                    content: "Imagination is more important than knowledge.",
                    author: {
                        id: 1,
                        name: "Albert Einstein",
                    },
                },
                {
                    id: 2,
                    content:
                        "Insanity: doing the same thing over and over again and expecting different results.",
                    author: {
                        id: 1,
                        name: "Albert Einstein",
                    },
                },
            ]);
        }, 1500);
    }, []);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    const handleQuoteFormSubmit = useCallback<QuoteFormProps["onSubmit"]>(
        ({ content, author, id }) => {
            if (id !== undefined) {
                console.log(`Updating quote with id: ${id}`);
            } else {
                console.log(`Creating a new quote`, { content, author });
            }
            fetchList();
        },
        [fetchList]
    );

    const handleCancelEditQuote = useCallback<
        QuoteFormProps["onCancelEditQuote"]
    >((quote) => {
        setEditQuote(undefined);
    }, []);

    const handleEditQuote = useCallback<QuoteListProps["onEdit"]>((quote) => {
        setEditQuote(quote);
    }, []);

    const handleDeleteQuote = useCallback<QuoteListProps["onDelete"]>(
        (quote) => {
            if (quote.id === editQuote?.id) {
                setEditQuote(undefined);
            }
            // submit the form to the server
            console.log(`Deleting quote with id: ${quote.id}`);
            fetchList();
        },
        [editQuote, fetchList]
    );

    return (
        <div className="App">
            <div className="status-bar">
                {isFetching && <div>Loading quotes...</div>}
            </div>
            <div className="form-container">
                <QuoteForm
                    onSubmit={handleQuoteFormSubmit}
                    editQuote={editQuote}
                    onCancelEditQuote={handleCancelEditQuote}
                />
                <QuoteList
                    quotes={quotes}
                    onEdit={handleEditQuote}
                    onDelete={handleDeleteQuote}
                    editQuote={editQuote}
                />
            </div>
        </div>
    );
}

export default App;
