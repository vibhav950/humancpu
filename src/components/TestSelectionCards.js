import React, { useState } from 'react';

const GREY = '#DBE2E9';
const SKY_BLUE = '#00AEEF';
const BUBBLEGUM_PINK = '#FC8EAC'

export default function TestSelectionCards() {
    const [cardHover, setCardHover] = useState({
        card1: false,
        card2: false,
        card3: false,
        card4: false,
    });

    const handleCardHover = (card) => {
        setCardHover({ ...cardHover, [card]: true });
    };

    const handleCardLeave = (card) => {
        setCardHover({ ...cardHover, [card]: false });
    };

    const styles = {
        parentContainer: {
            position: 'relative',
            display: 'flex',  // Use flex display
            flexDirection: 'row',  // Arrange items horizontally
            justifyContent: 'space-between', // Optional: Adjust spacing between items
            alignItems: 'center',
            width: 1000,
            margin: 120,
        },
        card: {
            width: 200,
            height: 200,
            borderRadius: 25,
            backgroundColor: cardHover ? BUBBLEGUM_PINK : GREY,
            alignItems: 'center',
            textAlign: 'center', // Center text inside the cards
        },
        cardIcon: {
            position: 'relative',
            marginTop: 17.5,
            width: 120,
            height: 120,
        },
        cardTitle: {
            marginTop: 10,
            fontSize: 25,
            fontWeight: '700',
            color: SKY_BLUE,
        }
    }

    return (
        <div id="root"
        style={styles.parentContainer}
        onClick={() => {}}
        >
            <div
            style={{
                ...styles.card,
                backgroundColor: cardHover.card1 ? BUBBLEGUM_PINK : GREY,
            }}
            onMouseEnter={() => handleCardHover('card1')}
            onMouseLeave={() => handleCardLeave('card1')}
            >
                <img
                    src={require('../assets/icons/aim-trainer.png')}
                    style={styles.cardIcon}
                />

                <div style={styles.cardTitle}>
                    {'Aim Trainer'}
                </div>
            </div>

            <div
            style={{
                ...styles.card,
                backgroundColor: cardHover.card2 ? BUBBLEGUM_PINK : GREY,
            }}
            onMouseEnter={() => handleCardHover('card2')}
            onMouseLeave={() => handleCardLeave('card2')}
            >
                <img
                    src={require('../assets/icons/reaction-time.png')}
                    style={styles.cardIcon}
                />

                <div style={styles.cardTitle}>
                    {'Reaction Test'}
                </div>
            </div>

            <div
            style={{
                ...styles.card,
                backgroundColor: cardHover.card3 ? BUBBLEGUM_PINK : GREY,
            }}
            onMouseEnter={() => handleCardHover('card3')}
            onMouseLeave={() => handleCardLeave('card3')}
            >
                <img
                    src={require('../assets/icons/typing-test.png')}
                    style={styles.cardIcon}
                />

                <div style={styles.cardTitle}>
                    {'Typing Test'}
                </div>
            </div>

            <div
            style={{
                ...styles.card,
                backgroundColor: cardHover.card4 ? BUBBLEGUM_PINK : GREY,
            }}
            onMouseEnter={() => handleCardHover('card4')}
            onMouseLeave={() => handleCardLeave('card4')}
            >
                <img
                    src={require('../assets/icons/click-test.png')}
                    style={styles.cardIcon}
                />

                <div style={styles.cardTitle}>
                    {'Click Test'}
                </div>
            </div>
        </div>
    );
}
