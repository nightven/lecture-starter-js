/* eslint-disable no-param-reassign */
import controls from '../../constants/controls';

function setIntervalUltimate(fighter) {
    setInterval(() => {
        fighter.isBlockedUltimate = false;
    }, 10000);
}

export function getCriticalStrike(fighter) {
    if (fighter.ultimate.length === 3) {
        return true;
    }
    return false;
}

export function getHitPower(fighter) {
    // return hit power
    const critDamage = getCriticalStrike(fighter);
    const criticalChance = critDamage ? 2 : Math.random() * (2 - 1) + 1;
    if (critDamage) {
        fighter.ultimate = [];
        fighter.isBlockedUltimate = true;
        setIntervalUltimate(fighter);
    }
    const power = fighter.attack * criticalChance;

    return power;
}
export function getBlockPower(fighter) {
    // return block power
    const power = fighter.defense * (Math.random() * (2 - 1) + 1);
    return power;
}

export function getDamage(attacker, defender = { defense: 0 }) {
    // return damage
    const power = getHitPower(attacker);
    const damage = power === attacker.attack * 2 ? power : power - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const leftPlayer = {
            ...firstFighter,
            isBlock: false,
            ultimate: [],
            isBlockedUltimate: true,
            initialHealth: firstFighter.health,
            health: firstFighter.health,
            healthIndicator: document.getElementById('left-fighter-indicator')
        };

        const rightPlayer = {
            ...secondFighter,
            isBlock: false,
            ultimate: [],
            isBlockedUltimate: true,
            initialHealth: secondFighter.health,
            health: secondFighter.health,
            healthIndicator: document.getElementById('right-fighter-indicator')
        };
        setIntervalUltimate(leftPlayer);
        setIntervalUltimate(rightPlayer);

        leftPlayer.healthIndicator.style.width = '100%';
        rightPlayer.healthIndicator.style.width = '100%';

        function playersAttack(attacker, defender) {
            const newDefender = { ...defender };
            if (newDefender.isBlock) {
                newDefender.health -= getDamage(attacker, newDefender);
                if (newDefender.health < 0) {
                    resolve(attacker);
                }
            } else {
                newDefender.health -= getDamage(attacker);
                if (newDefender.health < 0) {
                    resolve(attacker);
                }
            }

            if (newDefender._id === leftPlayer._id) {
                leftPlayer.health = newDefender.health;
                leftPlayer.healthIndicator.style.width = `${(newDefender.health / leftPlayer.initialHealth) * 100}%`;
            } else {
                rightPlayer.health = newDefender.health;
                rightPlayer.healthIndicator.style.width = `${(newDefender.health / rightPlayer.initialHealth) * 100}%`;
            }
        }
        function criticalHandler(fighter, code) {
            if (!fighter.isBlockedUltimate) {
                if (!fighter.ultimate.includes(code)) {
                    fighter.ultimate.push(code);
                }
            }
        }

        document.addEventListener('keydown', event => {
            switch (event.code) {
                case controls.PlayerOneBlock:
                    leftPlayer.isBlock = true;
                    break;
                case controls.PlayerOneAttack:
                    if (leftPlayer.isBlock) {
                        break;
                    } else {
                        playersAttack(leftPlayer, rightPlayer);
                        break;
                    }

                case controls.PlayerTwoBlock:
                    rightPlayer.isBlock = true;
                    break;
                case controls.PlayerTwoAttack:
                    if (!rightPlayer.isBlock) {
                        playersAttack(rightPlayer, leftPlayer);
                    }
                    break;
                default:
                    break;
            }
            const { PlayerOneCriticalHitCombination, PlayerTwoCriticalHitCombination } = controls;
            if (PlayerOneCriticalHitCombination.includes(event.code)) {
                criticalHandler(leftPlayer, event.code);
                if (leftPlayer.ultimate.length === 3) {
                    playersAttack(leftPlayer, rightPlayer);
                }
            }

            if (PlayerTwoCriticalHitCombination.includes(event.code)) {
                criticalHandler(rightPlayer, event.code);
                if (rightPlayer.ultimate.length === 3) {
                    playersAttack(rightPlayer, leftPlayer);
                }
            }
        });
        document.addEventListener('keyup', event => {
            switch (event.code) {
                case controls.PlayerOneBlock:
                    leftPlayer.isBlock = false;
                    break;
                case controls.PlayerTwoBlock:
                    rightPlayer.isBlock = false;
                    break;
                default:
                    break;
            }
        });
    });
}
