import { CameraResultType, CameraSource, Plugins } from '@capacitor/core'
import { IonButton, IonCol, IonGrid, IonIcon, IonListHeader, IonRow } from '@ionic/react'
import { cameraOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import defaultImg from '../assets/default.png'
import './AddPictureNewApartment.scss'

const { Camera } = Plugins;

export interface Picture {
    filename: string,
    base64: string,
}

const AddPictureNewApartment: React.FC<{ updatePicture: (picture: Picture) => void }> = (props) => {
    const [picture, setPicture] = useState<Picture>()
    const { t } = useTranslation('general');

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            quality: 80,
            resultType: CameraResultType.Base64,
            source: CameraSource.Prompt,
            width: 500,
        });

        if (!photo || !photo.base64String) return

        const fileName = new Date().getTime() + '.jpeg'
        const newPicture: Picture = {
            filename: fileName,
            base64: photo.base64String,
        }
        setPicture(newPicture)
        props.updatePicture(newPicture)
    }

    return (
        <div id="AddPictureNewApartment">
            <IonListHeader className="ion-margin-top">{t('apartment.picture')}</IonListHeader>
            <IonGrid>
                <IonRow className="ion-align-items-center ion-padding-top">
                    <IonCol>
                        <div className="img-container" style={{ backgroundImage: `url(${picture ? 'data:image/jpeg;base64,' + picture.base64 : defaultImg})` }} />
                    </IonCol>
                    <IonCol>
                        <IonButton onClick={takePhotoHandler} className="ion-margin"><IonIcon icon={cameraOutline} /></IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    )
}

export default AddPictureNewApartment