import dropdown from '../styles/modules/dropdown.module.scss';
import { useRouter } from 'next/router';

export default function Dropdown({ items, animClass, loggedIn }) {
    const router = useRouter();
    const routeToItem = (item) => {
        if (item.func) {
            item.func();
        }

        router.push(item.route);
    }

    return (
        <>
            <div className={`${dropdown.container} ${dropdown[animClass]}`}>
                {
                    items.map((item, index) => (
                        <div key={index} onClick={() => routeToItem(item)}
                             className={`${dropdown.item}`}
                             style={{display: item.logStateExistance == loggedIn ? 'block' : 'none'}} // really weird func for showing different items conditionally
                        >
                            {item.text}
                        </div>
                    ))
                }
            </div>
        </>
    )
}