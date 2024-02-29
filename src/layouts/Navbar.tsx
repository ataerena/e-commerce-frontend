import navbar from '../styles/style modules/navbar.module.scss';

import { useTranslations } from 'next-intl';

export default function Navbar () {
    const t = useTranslations('navbar');

    return (
            <>
                <div className={`row flex justify-around p-2 ${navbar.shape} ${navbar['light-theme']}`}>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._0')}
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._1')}
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._2')}
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._3')}
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._4')}
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._5')}
                    </div>
                    <div className={`w-1/12 ${navbar['menu-element']}`}>
                        {t('mainCategories._6')}
                    </div>
                </div>
            </>
        )
}