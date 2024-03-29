import navbar from '../styles/modules/navbar.module.scss';
import icon from '../styles/modules/icons.module.scss';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faGear } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';

import Dropdown from '../components/Dropdown';

export default function Navbar () {
    const t = useTranslations('navbar');
    const router = useRouter();

    const [settingsOn, setSettingsOn] = useState(true);
    const [settingsClicked, setSettingsClicked] = useState(false);
    const handleSettingsClick = () => {
        setSettingsClicked(true);
        setTimeout(() => {
            setSettingsClicked(false);
            setSettingsOn(!settingsOn);
        }, 200);
    };

    const settingsItems = [
        {
            text: t('settings.login'),
            route: "/auth/login"
        }
    ] 


    const goToHomePage = () => {
        router.push('/');
    };

    const chevronDown = <FontAwesomeIcon icon={faCircleChevronDown} 
                                         className={`${icon.default} ${icon.clickable} 
                                         ${clsx(settingsClicked && !settingsOn && icon['negative-spinner'])}
                                         ${clsx(settingsClicked && settingsOn && icon['positive-spinner'])}`}  
                                         onClick={handleSettingsClick}/>;
    const gear = <FontAwesomeIcon icon={faGear} 
                                  className={`${icon.default} ${icon.clickable} 
                                  ${clsx(settingsClicked && settingsOn && icon['negative-spinner'])}
                                  ${clsx(settingsClicked && !settingsOn && icon['positive-spinner'])}`}  
                                  onClick={handleSettingsClick}/>;


    return (
            <>
                <div className={`tw-row tw-flex tw-justify-around tw-p-2 ${navbar.shape} ${navbar['light-theme']}`}>
                    <div className={`tw-w-1/12 ${navbar['menu-element']}`} onClick={goToHomePage}>
                        {t('mainCategories._0')}
                    </div>
                    <div className={`tw-w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._1')}
                    </div>
                    <div className={`tw-w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._2')}
                    </div>
                    <div className={`tw-w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._3')}
                    </div>
                    <div className={`tw-w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._4')}
                    </div>
                    <div className={`tw-w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._5')}
                    </div>
                    <div className={`tw-w-1/12 ${navbar['dropdown-element']}`}>
                        <span className={navbar.clickable}>
                            {t('mainCategories._6')}
                        </span>
                        {!settingsOn ? chevronDown : gear}
                        <Dropdown items={settingsItems} animClass={settingsOn ? 'fadeOut' : 'fadeIn'}></Dropdown>
                    </div>
                </div>
            </>
        )
}