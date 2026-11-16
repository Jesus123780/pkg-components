import React, { useEffect, useRef } from 'react'
import styles from './AsideSales.module.css'

/** Native details keeps drafts mounted and removes hidden controls from tab order. */
export function CheckoutDisclosure({title,summary,required=false,children}:{title:string;summary?:string;required?:boolean;children:React.ReactNode}) {
  const ref=useRef<HTMLDetailsElement>(null)
  const automatic=useRef(false)
  useEffect(()=>{
    const element=ref.current
    if(!element)return
    if(required&&!element.open){element.open=true;automatic.current=true}
    if(!required&&automatic.current){element.open=false;automatic.current=false}
  },[required])
  return <details ref={ref} className={styles.section}>
    <summary className={styles.sectionHeader} onClick={()=>{automatic.current=false}}><span>{title}</span><small title={summary}>{summary}</small><span aria-hidden='true' className={styles.chevron}/></summary>
    <div className={styles.sectionBody}>{children}</div>
  </details>
}
