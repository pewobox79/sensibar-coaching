import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import {AdventCardTypes, ImageType, TextBlock} from "@/types/generalTypes";
import Button from "@/components/global/Button";
import {getBestAvailableImgResolution} from "@/utils/helper/imgHelper";
import Image from "next/image";

const AdventCardModal = ({
                             day,
                             modal,
                             handleModal,
                             content,
                             isText,
                             youtube,
                             image,
                         }: {
    day: number;
    modal: boolean;
    handleModal: () => void;
    content?: AdventCardTypes["content"];
    image?: ImageType;
    isText?: boolean;
    youtube?: string;
}) => {

    const renderContent = () => {
        if (isText && content?.content) {
            return <RenderContentHelper blocks={content.content as TextBlock} />;
        }

        if (youtube && !isText) {
            return (
                <iframe
                    width="auto"
                    height="auto"
                    src={youtube}
                    title="Advent Calendar Youtube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            );
        }

        if (image && !isText) {
            const formattedImage = getBestAvailableImgResolution(image);
            return (
                <Image
                    className="adventCardModalImage"
                    src={formattedImage?.url || ""}
                    alt={formattedImage.alt || ""}
                    width={800}
                    height={800}
                />
            );
        }

        return (
            <h1 style={{ color: "black" }}>
                Bitte in Strapi einen Inhalt für Tag {day} einfügen
            </h1>
        );
    };

    return (
        <div className={`adventCardModal ${modal ? "adventCardModalOpen" : ""}`}>
            <Button title="Schließen" type="submit" action={handleModal} />
            {renderContent()}
        </div>
    );
};

export default AdventCardModal;