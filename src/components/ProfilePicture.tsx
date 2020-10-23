import { IonButton, IonCol, IonFabButton, IonIcon } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import defaultProfile from '../assets/defaultProfile.jpg';
import { pencilOutline } from 'ionicons/icons';

import { base64FromPath } from '@ionic/react-hooks/filesystem'
import { CameraResultType, CameraSource, FilesystemDirectory, Plugins } from '@capacitor/core';
import AppContext from '../data/app-context';

const { Camera, Filesystem } = Plugins;

const ProfilePicture: React.FC = () => {
    const appCtx = useContext(AppContext);
    const [profileBase64, setProfileBase64] = useState<string>();

    const updateBase64 = async () => {
        if (!appCtx.profile.picture) return
        const file = await Filesystem.readFile({
            path: appCtx.profile.picture,
            directory: FilesystemDirectory.Data
        })
        setProfileBase64('data:image/jpeg;base64,' + file.data)
    }

    useEffect(() => {
        updateBase64()
    }, [appCtx.profile.picture])

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            quality: 80,
            resultType: CameraResultType.Uri,
            source: CameraSource.Prompt,
            width: 500,
        });

        if (!photo || !photo.webPath) return

        const base64 = await base64FromPath(photo.webPath)
        const fileName = new Date().getTime() + '.jpeg'
        await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: FilesystemDirectory.Data
        })

        let updatedProfile = { ...appCtx.profile }
        updatedProfile.picture = fileName;
        appCtx.updateProfile(updatedProfile)
    }
    return (
        <IonCol size="6" sizeSm="5" sizeMd="3" sizeLg="2" className="ion-text-center ion-padding">
            <div className="profile-picture" style={{ backgroundImage: `url(${profileBase64 ? profileBase64 : defaultProfile})` }} />
            <IonFabButton style={{ position: 'absolute', top: "15px", right: "0" }} color="danger" onClick={takePhotoHandler}>
                <IonIcon icon={pencilOutline} />
            </IonFabButton>

        </IonCol>
    )
}

export default ProfilePicture