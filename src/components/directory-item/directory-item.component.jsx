import './directory-item.style.scss'
import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category
    const navigate = useNavigate();

    const goToCategory = () => {
        navigate(route);
    };

    return (
        < div className="directory-item-container" onClick={goToCategory}>
            <div className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="directory-item-body-container">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    )

}

export default DirectoryItem;