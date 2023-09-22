import { Component, useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';


const RandomChar = (props) => {
    const [charactor, setCharactor] = useState(),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false),
        marvelService = new MarvelService();

    const onCharLoaded = (charactor) => {
        setCharactor(charactor);
        setLoading(false);
    }

    const updateChar = () => {
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        //id = 1017100;
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    useEffect(() => {
        updateChar();
        clearImmediate(props.timeId);
    }, [])

    const onClickTryIt = () => {
        setLoading(true);
        updateChar();
    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View characrot={charactor} /> : null;
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={() => onClickTryIt()} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ characrot }) => {
    const { name, description, thumbnail, homepage, wiki } = characrot;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail.includes('image_not_available')) {
        imgStyle = { 'objectFit': 'contain' };
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;