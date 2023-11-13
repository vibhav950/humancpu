import React, { useEffect } from 'react';
import { useState } from 'react';
import randomWords from 'random-words'

const N_WORDS = 200;
const SECONDS = 60;

export default function TypingSpeedScreen() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        setWords();
    }, []);

    function generateWords() {
        return new Array(N_WORDS).
        fill(null).map(() => randomWords());
    }

    const styles = {

    }

    return (
    <div id="root">

    </div>
    );
}
