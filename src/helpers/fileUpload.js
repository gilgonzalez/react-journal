

export const fileUpload = async (file) => {

    if(!file) throw new Error('No hay ningun archivo para subir loco')

    const cloudinaryURL = 'https://api.cloudinary.com/v1_1/cloudinary-gil/upload'

    const formData = new FormData();
    formData.append('upload_preset', 'react-journalApp')
    formData.append('file', file)

    try {

        const resp = await fetch(cloudinaryURL, {
            method: 'POST',
            body: formData,
        })

        if(!resp.ok) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json()
        return cloudResp.secure_url;
    } catch (error){
        throw new Error(error.message)
    }

    
}