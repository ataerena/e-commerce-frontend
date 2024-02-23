import navbar from '../styles/style modules/navbar.module.scss';

export default function Navbar () {
    return (
            <>
                <div className={`row flex justify-around p-2 ${navbar['light-theme']}`}>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        All Products
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        House
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        Clothing
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        Technology
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        Pet
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        Grocery
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        Profile
                    </div>
                </div>
            </>
        )
}