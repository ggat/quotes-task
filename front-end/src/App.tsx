import React, { useCallback, useEffect, useState } from "react";
import { Quote } from "./api-types";
import "./App.css";
import { QuoteForm, QuoteFormProps } from "./quote-form";
import { QuoteList, QuoteListProps } from "./quote-list";

function App() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [editQuote, setEditQuote] = useState<Quote>();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    const fetchList = useCallback(() => {
        setIsFetching(true);
        fetch("/quotes")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("could not fetch quote list");
                }
            })
            .then((quotes) => {
                setQuotes(quotes);
                setError(undefined);
            })
            .catch((e) => setError(e.message))
            .finally(() => setIsFetching(false));
    }, []);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    const handleQuoteFormSubmit = useCallback<QuoteFormProps["onSubmit"]>(
        ({ content, author, id }) => {
            if (id !== undefined) {
                fetch(`/quotes/${id}`, {
                    method: "PUT",
                    body: JSON.stringify({ content, author, id }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        if (res.ok) {
                            fetchList();
                        } else {
                            return res
                                .json()
                                .catch((e) => {
                                    throw new Error("Unknown error.");
                                })
                                .then((body) => {
                                    throw new Error(body.message);
                                });
                        }
                        setEditQuote(undefined);
                    })
                    .catch((e) => {
                        setError(e.message);
                    });
            } else {
                fetch("/quotes", {
                    method: "POST",
                    body: JSON.stringify({ content, author }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        if (res.ok) {
                            fetchList();
                        } else {
                            return res
                                .json()
                                .catch((e) => {
                                    throw new Error("Unknown error.");
                                })
                                .then((body) => {
                                    throw new Error(body.message);
                                });
                        }
                    })
                    .catch((e) => {
                        setError(e.message);
                    });
            }
        },
        [fetchList]
    );

    const handleCancelEditQuote = useCallback<
        QuoteFormProps["onCancelEditQuote"]
    >(() => {
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
            fetch(`/quotes/${quote.id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        fetchList();
                    } else {
                        return res
                            .json()
                            .catch((e) => {
                                throw new Error("Unknown error.");
                            })
                            .then((body) => {
                                throw new Error(body.message);
                            });
                    }
                })
                .catch((e) => {
                    setError(e.message);
                });
        },
        [editQuote, fetchList]
    );

    return (
        <div className="App">
            <div className="status-bar">
                {error && <div className="error-container">{error}</div>}
                {isFetching && <div>Loading quotes...</div>}
            </div>
            <div className="form-container">
                <QuoteForm
                    onSubmit={handleQuoteFormSubmit}
                    editQuote={editQuote}
                    onCancelEditQuote={handleCancelEditQuote}
                />
                <hr />
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
