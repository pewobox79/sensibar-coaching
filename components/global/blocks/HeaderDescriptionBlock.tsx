import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import styles from '@/styles/Blocks.module.css'

const HeaderDescriptionBlock =({title, blocks}:{title:string, blocks:[]})=>{

    return <section className={styles.sectionWrapper}>
        <div className={styles.sectionInner}>
            <h3>{title}</h3>
            <RenderContentHelper blocks={blocks ? blocks: []}/>
        </div>
    </section>
}

export default HeaderDescriptionBlock