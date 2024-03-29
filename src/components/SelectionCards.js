    import React, { useState } from 'react';
    import { colors } from '../styles/colors';
    import {useNavigate} from 'react-router-dom';
    export default function SelectionCards(name) {
        name = name.name;
        const navigate = useNavigate();
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
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 1150,
                height: 'auto',
                margin_top: 120,
                margin: 40
            },
            card: {
                width: 250,
                height: 300,
                borderRadius: 25,
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
                justifyContent: 'space-around',
            },
            cardIcon: {
                position: 'relative',
                marginTop: 25,
                width: 105,
                height: 105,
            },
            cardTitle: {
                marginTop: 5,
                fontSize: 25,
                fontWeight: '700',
                color: colors.SKY_BLUE,
            },
            cardSubTitle: {
                margin: 15,
                width: 220,
                marginTop: 25,
                fontSize: 18,
                fontWeight: '600',
                color: colors.SKY_BLUE
            }
        }
        function clickhandle(name, path){
            navigate(path, {state: { name } } );
        }


        return (
            <div id="root"
            style={styles.parentContainer}
            onClick={() => {}}
            >
                <div onClick={() => clickhandle(name, '/AimTrainer')}>
                    <div
                    style={{
                        ...styles.card,
                        backgroundColor: cardHover.card1 ? colors.DARK_GREY : colors.GREY,
                        boxShadow: cardHover.card1
                        ? '0 4px 25px 0 rgba(0, 0, 0, 0.7)'
                        : '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
                        transform: cardHover.card1
                        ? 'translateY(-10px)'
                        : 'translateY(0)',
                        transition: 'transform 0.3s ease',
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
                </div>

                <div onClick={() => clickhandle(name, '/ClickSpeed')}>
                    <div
                    style={{
                        ...styles.card,
                        backgroundColor: cardHover.card2 ? colors.DARK_GREY : colors.GREY,
                        boxShadow: cardHover.card2
                        ? '0 4px 25px 0 rgba(0, 0, 0, 0.7)'
                        : '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
                        transform: cardHover.card2
                        ? 'translateY(-10px)'
                        : 'translateY(0)',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={() => handleCardHover('card2')}
                    onMouseLeave={() => handleCardLeave('card2')}
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

                </div>
                <div onClick={() => clickhandle(name, '/ReactionTime')}>
                    <div
                    style={{
                        ...styles.card,
                        backgroundColor: cardHover.card3 ? colors.DARK_GREY : colors.GREY,
                        boxShadow: cardHover.card3
                        ? '0 4px 25px 0 rgba(0, 0, 0, 0.7)'
                        : '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
                        transform: cardHover.card3
                        ? 'translateY(-10px)'
                        : 'translateY(0)',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={() => handleCardHover('card3')}
                    onMouseLeave={() => handleCardLeave('card3')}
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
                </div>
                <div onClick={() => clickhandle(name, '/TypingSpeed')}>
                    <div
                    style={{
                        ...styles.card,
                        backgroundColor: cardHover.card4 ? colors.DARK_GREY : colors.GREY,
                        boxShadow: cardHover.card4
                        ? '0 4px 25px 0 rgba(0, 0, 0, 0.7)'
                        : '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
                        transform: cardHover.card4
                        ? 'translateY(-10px)'
                        : 'translateY(0)',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={() => handleCardHover('card4')}
                    onMouseLeave={() => handleCardLeave('card4')}
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
            </div>
        );
    }
