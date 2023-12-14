import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)
    if (!fighter) {
        return fighterElement;
    }
    const { name, attack, defense, health } = fighter;

    const fighterImage = createFighterImage(fighter);
    const fighterDetails = createElement({
        tagName: 'div',
        className: 'fighter-preview___detail'
    });

    const fighterName = createElement({ tagName: 'h3' });
    fighterName.innerText = name;
    const fighterHealth = createElement({ tagName: 'p' });
    fighterHealth.innerText = `Health: ${health}`;
    const fighterAttack = createElement({ tagName: 'p' });
    fighterAttack.innerText = `Attack: ${attack}`;
    const fighterDefense = createElement({ tagName: 'p' });

    fighterDefense.innerText = `Defense: ${defense}`;
    fighterDetails.append(fighterName, fighterHealth, fighterAttack, fighterDefense);
    fighterElement.append(fighterImage, fighterDetails);

    return fighterElement;
}
