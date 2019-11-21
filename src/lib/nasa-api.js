import {randomNumber} from './helpers';
import {getNewImage} from './display-media';
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'M5nhVF9wmFQqgn4EYBHfOfU7ReYTyFNcKf01hgOU';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 * burt með þetta async. skil ekki, þarf ekki.
 */
export default function getRandomImage() {
    const year = randomNumber(1995,2019);
    let month;
    if (year == 2019){
        month = randomNumber(1,11);
    } else if (year == 1995) {
        month = randomNumber(6,12);
    } else {
        month = randomNumber(1,12);
    }
    let day;
    if (year == 2019 && month == 11) {
        day = randomNumber(1,21);
    } else if (year == 1995 && month == 6) {
        day = randomNumber(16,30);
    } else if (month == 2) {
        if (year % 4 == 0) {
            day = randomNumber(1,29);
        } else {
            day = randomNumber(1,28);
        }
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        day = randomNumber(1,30);
    } else {
        day = randomNumber(1,31);
    }

    let DATE = (`${year}-${month}-${day}`);
    /*if (randomNumber(1,3) == 2){
        DATE = (`2012-08-13`);
    }*/
    fetch(`${URL}?api_key=${API_KEY}&date=${DATE}`)
    .then((result) => {
        if (!result.ok) {
            throw new Error('Non 200 status');
        }
        return result.json();
    })
    .then(result => {
        getNewImage(result);
    })
    .catch(error => {console.log(`Villa með gögn ${error}`)})
}
