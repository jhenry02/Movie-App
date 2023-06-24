import emptyImage from '../../images/no-image-available.jpg';

function ActorCard(props) {
    return (
        <div className="d-flex flex-column border border-gray h-100 mx-1">
            {/*For the source we're using, actor images come in 278x185 px sizes.*/}
            {props.actor.profile_path ? (
                <img alt="..." src={`https://image.tmdb.org/t/p/w185${props.actor.profile_path}`}
                 style={{ objectFit: 'cover', height: 'calc(278px * 0.7)', width: 'calc(185px * 0.7)' }} />
            ) : (
                <img alt="..." src={emptyImage} style={{ objectFit: 'cover', height: 'calc(278px * 0.7)', width: 'calc(185px * 0.7)' }} />
            )}
            <div style={{maxWidth: 'calc(185px * 0.7)'}}>
                <h6 className="text-center text-wrap">{props.actor.name}</h6>
                <p className="text-center text-wrap m-0"><small>{props.actor.character}</small></p>
            </div>
        </div>
    );
};

export default ActorCard;

// ActorCard.defaultProps = {
//     actor: {
//         profile_path: '/83o3koL82jt30EJ0rz4Bnzrt2dd.jpg',
//         name: 'Chris Pratt',
//         character: 'Mario (voice)'
//     }
// }