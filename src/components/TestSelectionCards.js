    import React, { useState } from 'react';

    const GREY = '#DBE2E9';
    const SKY_BLUE = '#00AEEF';
    const BUBBLEGUM_PINK = '#FC8EAC'

    export default function TestSelectionCards() {
        // const history = useHistory();

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

        // const handleCardClick = (card) => {
            // history.push('../screens/TypingSpeedScreen');
        // };

        const styles = {
            parentContainer: {
                position: 'relative',
                display: 'flex',  // Use flex display
                flexDirection: 'row',  // Arrange items horizontally
                justifyContent: 'space-between', // Optional: Adjust spacing between items
                alignItems: 'center',
                width: 1150,
                height: 'auto',
                margin: 120,
                // backgroundColor: 'red',
                marginLeft: 55
            },
            card: {
                width: 250,
                height: 250,
                borderRadius: 25,
                backgroundColor: cardHover ? BUBBLEGUM_PINK : GREY,
                alignItems: 'center',
                textAlign: 'center', // Center text inside the cards
                transition: 'transform 0.3s ease', // Add transition for smooth animation
                transform: cardHover ? 'translateY(-10px)' : 'translateY(0)', // Apply animation
            },
            cardIcon: {
                position: 'relative',
                marginTop: 20,
                width: 105,
                height: 105,
            },
            cardTitle: {
                marginTop: 5,
                fontSize: 25,
                fontWeight: '700',
                color: SKY_BLUE,
            },
            cardSubTitle: {
                margin: 15,
                width: 220,
                marginTop: 10,
                fontSize: 18,
                fontWeight: '600',
                color: SKY_BLUE 
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
                        src={require('../assets/icons/target.png')}
                        style={styles.cardIcon}
                    />

                    <div style={styles.cardTitle}>
                        {'Aim Trainer'}
                    </div>
                    
                    <div style={styles.cardSubTitle}>
                        {'How good would you be as a pro CSGO player?'}
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
                        src={require('../assets/icons/mouse.png')}
                        style={styles.cardIcon}
                    />

                    <div style={styles.cardTitle}>
                        {'Click Speed'}
                    </div>

                    <div style={styles.cardSubTitle}>
                        {'How fast can you spam your left mouse button?'}
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
                        src={require('../assets/icons/speed.png')}
                        style={styles.cardIcon}
                    />

                    <div style={styles.cardTitle}>
                        {'Reaction Time'}
                    </div>

                    <div style={styles.cardSubTitle}>
                        {'How fast are your visual reflexes?'}
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
                        {'Typing Speed'}
                    </div>
                    
                    <div style={styles.cardSubTitle}>
                        {'Are you the fastest typist in the room?'}
                    </div>
                </div>
            </div>
        );
    }
