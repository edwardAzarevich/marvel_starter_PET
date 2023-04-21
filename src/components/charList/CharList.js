import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import CharactorItem from './JSX/CharactorItem';
import Spinner from '../spinner/spinner';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';

class CharList extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        charactors: [],
        loading: true
    }

    marvelService = new MarvelService();

    onCharatcorList = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharactarsLoading);
    }

    onCharactarsLoading = (charactors) => {
        this.setState({ charactors, loading: false });
        console.log(this.state.loading);
    }
    componentDidMount() {
        this.onCharatcorList();
    }
    render() {
        const { loading } = this.state;
        const spinner = loading ? <Spinner /> : null;
        let listCharactor = null;
        let i = 0;
        if (this.state.charactors.length > 0) {
            listCharactor = this.state.charactors.map((item, i) => {
                const { name, thumbnail } = item;
                return (
                    <CharactorItem name={name} thumbnail={thumbnail} key={i} />
                )
            })
        }
        return (
            <div className="char__list" >
                <ul className="char__grid">
                    {spinner}
                    {listCharactor}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}



export default CharList;