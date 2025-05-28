import React from 'react'
import CommonCard from "@/components/common/card/CommonCard"
import CommonSidebar from "@/components/common/sidebar/CommonSidebar";
import styles from "./myPage.module.scss"
import Tap from "./tap/Tap"
import { Page1, Page2, Page3 } from "./tapPages/TapPagesView";

function MyPageView() {
  return (
    <div className={styles.CommunityViewLayout}>
      <CommonSidebar/>

      <main className={styles.container}>
        <div className={styles.mainContainerLayout}>
          
            <div className={styles.topLayout}>
              
              
              <div className={styles.myLayout}>
                <div className={styles.myLayout__myLayout1}>
                  <div className={styles.myLayout__faceLayout}/>
                  <div className={styles.myLayout__textarea1}>
                  <div className={styles.myLayout__textarea1__name}>홍길동</div>
                  <div className={styles.myLayout__textarea1__address}>강원도 춘천시 효자동</div>
                  <div className={styles.myLayout__textarea1__birth}>2002년 10월 10일</div>
                  <div className={styles.myLayout__textarea1__tag}>여행 5회차</div>
                </div>
              </div>

                <div className={styles.myLayout__myLayout2}>
                  <div className={styles.myLayout__textarea2}>
                    안녕하세요! 전 바다로 놀러가는 것을 좋아합니다:D 
                    여행 가서는 맛집 위주로 찾아다녀요~!
                  </div>
                  
                </div>
    

             
                
                
              </div>
        
              
            </div>

            <div className={styles.tapLayout}>
              <Tap
                page1={<Page1 />}
                page2={<Page2 />}
                page3={<Page3 />}
                />
            </div>
       
        </div>
 
          
        
      </main>
    </div>
  )
}

export default MyPageView;