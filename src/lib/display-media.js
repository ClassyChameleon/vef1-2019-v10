// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import save from './storage';
// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let type; // object sem inniheldur núverandi típu á forsíðu.
let player;

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 * breytti í export. Þetta fall mun núna bara sýna
 * mynd og texta sem getRandomImage sækir.
 */
export function getNewImage(result) {
    type = result.media_type;
    title = result.title;
    text = result.explanation;
    img = result.url;
    document.querySelector('.apod__title').innerHTML = title;
    document.querySelector('.apod__text').innerHTML = text;
    if (type == "video"){
        if (document.querySelector('.apod__image').hasAttribute('src')){
            document.querySelector('.apod__image').removeAttribute('src');
        }
        if (!(document.querySelector('.apod__video'))){
            player = document.createElement('iframe');
            player.setAttribute('class','apod__video');
            player.setAttribute('src',img);
            player.setAttribute('style','border:none;');
            player.setAttribute('height','480');
            player.setAttribute('width','854');
            document.querySelector('.apod').insertBefore(player, document.querySelector('.apod__image'));
        } else {
            document.querySelector('iframe').setAttribute('src',img);
        }
    } else {
        if ((document.querySelector('iframe'))) {
            player = document.querySelector('iframe');
            player.parentNode.removeChild(player);
        }
        document.querySelector('.apod__image').setAttribute('src',img);
    }
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
    //save(type, img, text, title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
    getRandomImage();
    const newImg = document.getElementById("new-image-button");
    newImg.addEventListener('click',getRandomImage);
    const saveImg = document.getElementById("save-image-button");
    saveImg.addEventListener('click',saveCurrentImage);
    /**
     * const loadImg = document.querySelector(a);
     * loadImg.addEventListener('click',loadFavorites);
     */
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {

}
