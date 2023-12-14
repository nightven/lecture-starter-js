/* eslint-disable no-restricted-globals */
import createElement from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call showModal function

    const bodyElement = createElement({ tagName: 'div', className: 'modal-winner' });

    const fighterImage = createFighterImage(fighter);

    bodyElement.append(fighterImage);

    function restart() {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    showModal({
        title: `${fighter.name} is the winner!`,
        bodyElement,
        onClose: () => restart()
    });
}
