import dropdown from '../styles/modules/dropdown.module.scss';
import { useRouter } from 'next/router';

export default function Dropdown({ items, animClass }) {
    const router = useRouter();
    const routeToItem = (item) => {
        router.push(item.route);
    }

    return (
        <>
            <div className={`${dropdown.container} ${dropdown[animClass]}`}>
                {
                    items.map((item, index) => (
                        <div key={index} onClick={() => routeToItem(item) }
                             className={`${dropdown.item}`}
                        >
                            {item.text}
                        </div>
                    ))
                }
            </div>
        </>
    )
}