import { Link, Outlet, useLocation } from 'react-router-dom'
import classes from './MainLayout.module.scss'
import { PATH } from 'utils'
import { Badge } from 'components'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import BackTop from '../BackTop'

export default function MainLayout() {
  const { pathname } = useLocation()
  const [showSubMenu, setShowSubMenu] = useState(false)
  const subMenuRef = useRef<HTMLDivElement>(null)

  const handleShowSubMenu = () => {
    setShowSubMenu(!showSubMenu)
  }

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (subMenuRef.current && !subMenuRef.current.contains(e.target as Node)) {
        setShowSubMenu(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return (
    <div className={classes.mainLayout}>
      <header>
        <div className={classes.header}>
          <Link to={PATH.HOME} className={classes.logo}>
            <img src='/icons/logo.png' alt='Logo' />
          </Link>
          <div className={classes.menu}>
            {MENU_ITEMS.map(({ alt, src, title, to, badgeCount }) => (
              <Link
                key={alt}
                to={to}
                className={clsx(classes.menuItem, pathname === to && classes.active)}>
                <Badge count={badgeCount}>
                  <img src={src} alt={alt} />
                </Badge>
                {title}
              </Link>
            ))}
            <div className={classes.menuMore} ref={subMenuRef}>
              <div onClick={handleShowSubMenu}>
                {showSubMenu ? (
                  <img src='/icons/icon-close.png' alt='Menu' />
                ) : (
                  <img src='/icons/icon-menu.png' alt='Menu' />
                )}
              </div>
              <ul className={clsx(classes.subMenu, showSubMenu && classes.show)}>
                {MENU_ITEMS.map(({ alt, src, title, to, badgeCount }) => (
                  <li
                    key={alt}
                    className={clsx(classes.menuItem, pathname === to && classes.active)}>
                    <Link to={to}>
                      <Badge count={badgeCount}>
                        <img src={src} alt={alt} />
                      </Badge>
                      {title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to='#'>自分の記録</Link>
                </li>
                <li>
                  <Link to='#'>体重グラフ</Link>
                </li>
                <li>
                  <Link to='#'>目標</Link>
                </li>
                <li>
                  <Link to='#'>選択中のコース</Link>
                </li>
                <li>
                  <Link to={PATH.RECOMMENDATION}>コラム一覧</Link>
                </li>
                <li>
                  <Link to='#'>設定</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className={classes.content}>
        <Outlet />
      </div>
      <footer>
        <div className={classes.footer}>
          <Link className={classes.footerItem} to='#'>
            会員登録
          </Link>
          <Link className={classes.footerItem} to='#'>
            運営会社
          </Link>
          <Link className={classes.footerItem} to='#'>
            利用規約
          </Link>
          <Link className={classes.footerItem} to='#'>
            個人情報の取扱について
          </Link>
          <Link className={classes.footerItem} to='#'>
            特定商取引法に基づく表記
          </Link>
          <Link className={classes.footerItem} to='#'>
            お問い合わせ
          </Link>
        </div>
      </footer>
      <BackTop />
    </div>
  )
}

const MENU_ITEMS = [
  {
    title: '自分の記録',
    src: '/icons/icon-memo.png',
    alt: 'Memo',
    to: PATH.RECORD,
  },
  {
    title: 'チャレンジ',
    src: '/icons/icon-challenge.png',
    alt: 'Challenge',
    to: '#',
  },
  {
    title: 'お知らせ',
    src: '/icons/icon-info.png',
    alt: 'Info',
    to: '#',
    badgeCount: 2,
  },
]
