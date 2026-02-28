'use client'
import Container from "@/components/global/Container";
import {getColor} from "@/utils/helper/colorHelper";
import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import styles from '@/styles/ContactSection.module.css'
import Button from "@/components/global/Button";
import {ContactSectionTypes} from "@/types/generalTypes";
import CalendlyPopup from "@/components/fontendEndComponents/CalendlyPopup";

const ContactSection =({data}:{data: ContactSectionTypes})=>{

    const colorSet = getColor(data?.bgColor?.color as string)


    return <Container id={data.hashId} backgroundColor={colorSet.bgColor}>
        <div className={'sectionInner'}>
            <div className={styles.contactGridWrapper}>

                <div className={styles.calendlyWrapper}>
                    <h3 style={{color: colorSet.color}}>Lass uns kennen lernen!</h3>
                <CalendlyPopup/>
                </div>

                <div className={styles.contactGridLeft}>
                    <RichTextRenderer blocks={data.contactData} textColor={colorSet.color}/>
                    <div>{data.legalLinks.map((link)=>{
                        const textLinkColor = getColor(link?.bgColor?.color as string)
                        return <a className={'globalTextLink'} style={{color: textLinkColor.color}} href={link.href} key={link.id}>{link.label}</a>
                    })}</div>
                </div>
                <div className={styles.socialLinksSection}>
                    <h3 style={{color: colorSet.color}}>Folge mir gern auf</h3>
                    <div className={styles.contactGridRight}>
                    {data.socialLinks.map((socialLink)=>{

                    return <Button key={socialLink.id} type={"button"} title={socialLink.label} href={socialLink.href} target={socialLink?.target}/>
                })}</div>
                </div>
            </div>

        </div>
    </Container>
}

export default ContactSection