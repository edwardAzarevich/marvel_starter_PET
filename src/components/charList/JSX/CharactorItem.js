const CharactorItem = ({ name, thumbnail }) => {
    console.log(name, thumbnail);
    return (
        <li className="char__item char__item_selected">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharactorItem;