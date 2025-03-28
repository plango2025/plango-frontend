import { useState } from "react";
import styles from "./CommonNav.module.scss";
import { Link } from 'react-router-dom';
import nav from './nav.json'
interface Navigation{
    index: number
    path :string
    label: string
    searchValue: string
    isActive:boolean
}

function CommonNav() {
  const [navigation, setNavigation] = useState<Navigation[]>(nav);

  //useState로 선언한 반응성을 가진 데이터를 기반으로 UI를 반복호풀해보도록한다. 
  const navLink = navigation.map((item:Navigation)=>{
    return (
      <Link  to={item.path}key={item.path}className={styles.navigation__menu}>
        <span className={styles.navigation__menu__label}>{item.label}</span>
      </Link>
    );
  }) 
  return (
    <div className={styles.navigation}>
      {navLink}
    </div>
  );
}

export default CommonNav;
