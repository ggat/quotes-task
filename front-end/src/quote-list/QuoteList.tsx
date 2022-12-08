import React, { FormEventHandler, useCallback, useState } from "react";
import { Quote } from "../api-types";
import "./QuoteList.css";

export type Props = {
    quotes: Quote[];
    onEdit: (quote: Quote) => void;
    onDelete: (quote: Quote) => void;
    editQuote?: Quote;
};

function QuoteList({ quotes, onEdit, onDelete, editQuote }: Props) {
    return (
        <div>
            {quotes.map(({ id, content, author: { name: authorName } }) => (
                <p key={id}>
                    {content} - <strong>{authorName}</strong>
                </p>
            ))}
        </div>
    );
}

export default QuoteList;
